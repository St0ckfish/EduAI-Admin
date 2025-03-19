import { type Client as StompClient, type IMessage, Client } from "@stomp/stompjs";
import { useEffect, useRef, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { baseUrlStock } from "../components/BaseURL";

// Interface definitions for attachment and message types
interface Attachment {
  id: string;
  viewLink: string;
  downloadLink: string;
  isVideo: boolean;
  isAudio: boolean;
  isFile: boolean;
  isImage: boolean;
}

interface Message {
  chatId: number | string;
  id: number | string;
  content: string;
  creationTime: string;
  creatorName: string;
  imageUrl?: string;
  hasAttachment?: boolean;
  attachment?: Attachment;
}

interface UseWebSocketChatProps {
  userId: string | null;
  initialMessages: Message[];
  onNewMessage?: () => void;
}

interface MessagePayload {
  chatId: string | number;
  content: string;
  imageUrl?: string;
}

interface FileMessagePayload extends MessagePayload {
  file?: File;
}

/**
 * Helper function to convert WebSocket URL to HTTP URL
 */
const getHttpUrl = (wsUrl: string) => {
  if (typeof wsUrl !== 'string') {
    console.error("Invalid baseUrl:", wsUrl);
    return 'http://localhost:8080/'; // Fallback URL
  }
  
  // Remove trailing slashes for consistent concatenation
  const cleanUrl = wsUrl.replace(/\/+$/, '');
  
  if (cleanUrl.startsWith('wss://')) {
    return 'https://' + cleanUrl.substring(6) + '/';
  } else if (cleanUrl.startsWith('ws://')) {
    return 'http://' + cleanUrl.substring(5) + '/';
  }
  
  // If it's already an HTTP URL, ensure it ends with a slash
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
    return cleanUrl.endsWith('/') ? cleanUrl : cleanUrl + '/';
  }
  
  // Default case - assume it's a hostname without protocol
  return 'http://' + cleanUrl + '/';
};

// Helper function to safely stringify message IDs for comparison
const safeStringify = (id: string | number | null | undefined): string => {
  return id != null ? String(id) : '';
};

export const useWebSocketChat = ({
  userId,
  initialMessages,
  onNewMessage,
}: UseWebSocketChatProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef<StompClient | null>(null);
  const messagesMapRef = useRef<Map<string, Message>>(new Map());

  // Token management
  const getToken = useCallback(() => {
    return Cookies.get("token") || null;
  }, []);

  // Handle initialization of messages
  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      const newMap = new Map<string, Message>();
      initialMessages.forEach(msg => {
        newMap.set(safeStringify(msg.id), msg);
      });
      messagesMapRef.current = newMap;
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    // Connect only once when the component mounts or when userId changes
    let active = true;
    let disconnectTimeoutId: NodeJS.Timeout | null = null;
    
    const setupWebSocket = async () => {
      const token = getToken();
      
      if (!token || !userId) {
        return;
      }
      
      // Clean up any existing connection first
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
      }

      // Create a new STOMP client
      const stompClient = new Client({
        brokerURL: `${baseUrlStock}ws?token=${token}`,
        debug: function (str: string) {
          console.log("[STOMP Debug]", str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      stompClient.onConnect = () => {
        if (!active) return; // Don't continue if component has unmounted
        
        console.log("WebSocket Connected Successfully");
        setIsConnected(true);
        
        try {
          const subscription = stompClient.subscribe(`/direct-chat/${userId}`, (message: IMessage) => {
            if (!active) return; // Skip processing messages if component unmounted
            
            try {
              const newMessage: Message = JSON.parse(message.body);
              
              // Simplified message handling to match old hook
              setMessages(prevMessages => {
                // Check if message already exists
                const messageExists = prevMessages.some(msg => 
                  safeStringify(msg.id) === safeStringify(newMessage.id)
                );
                
                if (messageExists) {
                  return prevMessages;
                }
                
                // Add new message
                return [...prevMessages, newMessage];
              });
              
              onNewMessage?.();
            } catch (parseError) {
              console.error("Error parsing incoming message:", parseError);
            }
          });
          
          // Store the subscription in case we need to unsubscribe
          return subscription;
        } catch (error) {
          console.error("Error subscribing to chat:", error);
        }
      };

      stompClient.onStompError = frame => {
        if (!active) return;
        console.error("Broker reported error:", frame.headers.message);
        setIsConnected(false);
      };

      stompClient.onWebSocketError = event => {
        if (!active) return;
        console.error("WebSocket connection error:", event);
        setIsConnected(false);
      };

      stompClient.onWebSocketClose = () => {
        if (!active) return;
        console.log("WebSocket connection closed");
        setIsConnected(false);
      };

      // Only activate if we're still mounted
      if (active) {
        // Store the client reference before activating
        stompClientRef.current = stompClient;
        stompClient.activate();
      }
    };

    setupWebSocket();

    // Clean up when unmounting
    return () => {
      active = false;
      
      // Clear any pending timeouts
      if (disconnectTimeoutId) {
        clearTimeout(disconnectTimeoutId);
      }
      
      // Use a short delay to ensure we don't disconnect during quick re-renders
      disconnectTimeoutId = setTimeout(() => {
        if (stompClientRef.current) {
          console.log("Cleaning up WebSocket connection");
          stompClientRef.current.deactivate();
          stompClientRef.current = null;
        }
        setIsConnected(false);
      }, 100);
    };
  }, [userId, getToken]); // Removed onNewMessage from dependencies to prevent reconnections

  // Upload file to server with retry logic
  const uploadFile = async (file: File, retryCount = 0): Promise<string> => {
    const maxRetries = 2;
    const token = getToken();
    
    if (!token || !userId) {
      throw new Error("Token or userId is missing");
    }
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Get the correct API URL
      const apiUrl = getHttpUrl(baseUrlStock);
      // Ensure endpoint is correctly formatted 
      const uploadUrl = `${apiUrl}api/v1/messages/${userId}/file`;
      
      console.log(`Uploading file to ${uploadUrl}`);
      
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set Content-Type here - browser will set it with boundary for multipart/form-data
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      
      if (!result || result.success === false) {
        console.error("File upload failed:", result);
        throw new Error(result?.message || "File upload failed without success");
      }
      
      console.log("File upload successful:", result);
      
      // Return the file ID from the response
      return result.data;
    } catch (error) {
      console.error(`File upload error (attempt ${retryCount + 1}/${maxRetries + 1}):`, error);
      
      // Retry logic for transient errors
      if (retryCount < maxRetries) {
        console.log(`Retrying file upload... (${retryCount + 1}/${maxRetries})`);
        // Wait between retries with exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
        return uploadFile(file, retryCount + 1);
      }
      
      throw error;
    }
  };

  // Send a message with an attachment
  const sendMessageWithAttachment = async (messagePayload: FileMessagePayload): Promise<boolean> => {
    const token = getToken();
    if (!token || !userId) {
      console.error("Cannot send message: missing token or userId");
      return false;
    }
    
    try {
      let attachmentId = "";
      if (messagePayload.file) {
        // First upload the file to get its ID
        attachmentId = await uploadFile(messagePayload.file);
        console.log(`Received attachment ID: ${attachmentId}`);
      }

      // Prepare payload without the file property
      const { file, ...messageData } = messagePayload;
      const payload = {
        ...messageData,
        attachmentId: attachmentId || undefined,
      };

      // Get the correct API URL
      const apiUrl = getHttpUrl(baseUrlStock);
      // Ensure endpoint is correctly formatted
      const sendUrl = `${apiUrl}api/v1/messages/new`;
      
      // تهيئة الرسالة بتنسيق URLSearchParams لإرسال البيانات كمعلمة طلب
      const urlParams = new URLSearchParams();
      urlParams.append('request', JSON.stringify(payload));
      
      console.log(`Sending message with attachment to ${sendUrl} with params:`, urlParams.toString());
      
      const response = await fetch(`${sendUrl}?${urlParams.toString()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // إرسال جسم فارغ لأن البيانات موجودة في URL
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const responseData = await response.json();
      console.log("Message send response:", responseData);
      
      if (responseData.success && responseData.data) {
        // Add the new message to our local state
        const newMessage = responseData.data;
        
        setMessages(prev => {
          // Check if message already exists
          if (prev.some(msg => safeStringify(msg.id) === safeStringify(newMessage.id))) {
            return prev;
          }
          
          // Add new message
          return [...prev, newMessage];
        });
        
        // Notify about new message
        onNewMessage?.();
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Sending message with attachment failed:", error);
      return false;
    }
  };

  const sendMessage = async (messagePayload: MessagePayload): Promise<boolean> => {
    // Ensure we're using string IDs consistently
    const normalizedPayload = {
      ...messagePayload,
      chatId: String(messagePayload.chatId)
    };
    
    if (!stompClientRef.current?.connected) {
      // If WebSocket isn't connected, use REST API as fallback
      try {
        const token = getToken();
        if (!token) {
          console.error("Cannot send message: missing token");
          return false;
        }
        
        // Get the correct API URL
        const apiUrl = getHttpUrl(baseUrlStock);
        // Ensure endpoint is correctly formatted
        const sendUrl = `${apiUrl}api/v1/messages/new`;
        
        // تهيئة الرسالة بتنسيق URLSearchParams لإرسال البيانات كمعلمة طلب
        const urlParams = new URLSearchParams();
        urlParams.append('request', JSON.stringify(normalizedPayload));
        
        console.log(`Sending message via REST API to ${sendUrl} with params:`, urlParams.toString());
        
        const response = await fetch(`${sendUrl}?${urlParams.toString()}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // إرسال جسم فارغ لأن البيانات موجودة في URL
          body: JSON.stringify({}),
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        const responseData = await response.json();
        
        if (responseData.success && responseData.data) {
          // Add the message to our local state
          const newMessage = responseData.data;
          
          setMessages(prev => {
            // Check if message already exists
            if (prev.some(msg => safeStringify(msg.id) === safeStringify(newMessage.id))) {
              return prev;
            }
            // Add new message
            return [...prev, newMessage];
          });
          
          onNewMessage?.();
          return true;
        }
        
        return false;
      } catch (error) {
        console.error("REST API message sending failed:", error);
        return false;
      }
    }

    try {
      // Match the old hook's message format exactly
      stompClientRef.current.publish({
        destination: "/app/sendMessage",
        body: JSON.stringify(normalizedPayload),
        headers: { 'content-type': 'application/json' }
      });
      
      console.log("Message sent via WebSocket:", normalizedPayload);
      return true;
    } catch (error) {
      console.error("Message sending failed:", error);
      return false;
    }
  };

  return {
    messages,
    isConnected,
    sendMessage,
    sendMessageWithAttachment,
  };
};
