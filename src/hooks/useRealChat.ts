import { Client, IMessage } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { baseUrlStock } from "@/components/BaseURL";

interface Message {
  chatId: number | string;
  id: number | string;
  content: string;
  creationTime: string;
  creatorName: string;
  imageUrl?: string;
}

interface UseWebSocketChatProps {
  userId: string | null;
  initialMessages: Message[];
  onNewMessage?: () => void;
}

export const useWebSocketChat = ({
  userId,
  initialMessages,
  onNewMessage,
}: UseWebSocketChatProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token || !userId) {
      return;
    }

    const stompClient = new Client({
      brokerURL: `${baseUrlStock}ws?token=${token}`,
      debug: function (str) {
        console.log("[STOMP Debug]", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      console.log("WebSocket Connected Successfully");
      setIsConnected(true);

      stompClient.subscribe(`/direct-chat/${userId}`, (message: IMessage) => {
        try {
          const newMessage: Message = JSON.parse(message.body);
          setMessages((prevMessages) => {
            const messageExists = prevMessages.some(
              (msg) => msg.id === newMessage.id
            );
            return messageExists ? prevMessages : [...prevMessages, newMessage];
          });
          onNewMessage?.();
        } catch (parseError) {
          console.error("Error parsing incoming message:", parseError);
        }
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("Broker reported error:", frame.headers["message"]);
      setIsConnected(false);
    };

    stompClient.onWebSocketError = (event) => {
      console.error("WebSocket connection error:", event);
      setIsConnected(false);
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
      stompClientRef.current = null;
      setIsConnected(false);
    };
  }, [userId, onNewMessage]);

  // Upload file to /api/v1/messages/${userId}/file
  const uploadFile = async (file: File): Promise<string> => {
    const token = Cookies.get("token");
    if (!token || !userId) {
      throw new Error("Token or userId is missing");
    }
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `${baseUrlStock}api/v1/messages/${userId}/file`,
      {
        method: "POST",
        headers: {
          // Do not manually set Content-Type for FormData
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const result = await response.json();
    if (result.success) {
      // Returns the file id from the API response
      return result.data;
    } else {
      throw new Error("File upload failed");
    }
  };

  // Send a new message with an optional attachment
  const sendMessageWithAttachment = async (messagePayload: {
    chatId: string | number;
    content: string;
    file?: File;
    imageUrl?: string;
  }) => {
    const token = Cookies.get("token");
    if (!token || !userId) {
      return false;
    }
    let attachmentId = "";
    try {
      if (messagePayload.file) {
        attachmentId = await uploadFile(messagePayload.file);
      }

      // Prepare payload by excluding the file property and adding attachmentId if available
      const { file, ...payloadWithoutFile } = messagePayload;
      const payload = {
        ...payloadWithoutFile,
        attachmentId: attachmentId || undefined,
      };

      const response = await fetch(`${baseUrlStock}api/v1/messages/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      return response.ok;
    } catch (error) {
      console.error("Sending message with attachment failed:", error);
      return false;
    }
  };

  // Existing sendMessage for text (or non-file) messages via WebSocket
  const sendMessage = async (messagePayload: {
    chatId: string | number;
    content: string;
    imageUrl?: string;
  }) => {
    if (!stompClientRef.current?.connected) {
      return false;
    }
    try {
      stompClientRef.current.publish({
        destination: "/app/sendMessage",
        body: JSON.stringify(messagePayload),
      });
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
