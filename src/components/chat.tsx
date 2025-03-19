"use client";
import { useGetChatMessagesQuery } from "@/features/chat/chatApi";
import { RootState } from "@/GlobalRedux/store";
import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { MessageBubble } from "./MessageBubble";
import Link from "next/link";
import { toast } from "react-toastify";
import { useWebSocketChat } from "@/hooks/useRealChat";

// Types moved to a separate interface section for better organization
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

interface ChatPageProps {
  userId: string | null;
  regetusers: () => void;
  userName: string;
  userRole: string;
  realuserId: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const EmojiPicker = ({ onEmojiSelect, onClose }: { onEmojiSelect: (emoji: string) => void; onClose: () => void }) => {
  const emojis = [
    "😊", "😂", "🥰", "😍", "😎", "😢", "😭", "😤", "😡",
    "👍", "👎", "❤️", "🎉", "🔥", "✨", "🌟", "💯", "🙏",
    "🤔", "🤗", "🤫", "🤐", "😴", "🥱", "😷", "🤒", "🤕",
    "💪", "👋", "🤝", "✌️", "👌", "🤌", "🤘", "🤙", "👊"
  ];

  return (
    <div className="absolute bottom-16 left-0 z-50 w-72 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800">
      <div className="grid grid-cols-6 gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => {
              onEmojiSelect(emoji);
              onClose(); // Close after selecting
            }}
            className="text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

// Date separator component
const DateSeparator = ({ date }: { date: string }) => (
  <div className="my-4 flex items-center">
    <div className="flex-1 border-t border-gray-300"></div>
    <div className="mx-4 text-sm font-medium text-gray-500">{date}</div>
    <div className="flex-1 border-t border-gray-300"></div>
  </div>
);

// Connection status component with better visual feedback
const ConnectionStatus = ({ isConnected }: { isConnected: boolean }) => (
  isConnected ? null : (
    <div className="absolute top-0 left-0 right-0 bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 text-xs p-1 text-center">
      Connection issues. Messages will still be sent when possible.
    </div>
  )
);

// Helper to log in development only
const logDebug = (message: string, ...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[ChatPage] ${message}`, ...args);
  }
};

const ChatPage = ({ userId, regetusers, userName, userRole, realuserId }: ChatPageProps) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [wasAtBottom, setWasAtBottom] = useState(true);
  
  const { language: currentLanguage } = useSelector(
    (state: RootState) => state.language,
  );
  
  const { data: messagesData, isLoading, error, refetch } = useGetChatMessagesQuery(userId!, {
    skip: userId === null,
  });

  const currentUserName = useSelector(
    (state: RootState) => state.user.name || "Unknown User"
  );

  // Format date for consistent display
  const formatMessageDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Check if date is today
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    
    // Check if date is yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    
    // Otherwise return full date
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  // Scroll handling for when new messages arrive
  const handleScroll = useCallback(() => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      // Consider "at bottom" if within 100px of the bottom
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
      setWasAtBottom(isAtBottom);
    }
  }, []);

  // Initialize WebSocket chat hook
  const { messages: wsMessages, isConnected, sendMessage, sendMessageWithAttachment } = useWebSocketChat({
    userId,
    initialMessages: messagesData || [],
    onNewMessage: () => {
      // Callback when new message is received - update chat list
      regetusers();
      
      // Also refetch messages via REST API to ensure we have the latest data
      // This helps with attachments and other metadata that might not come through WebSocket
      refetch();
      
      // Scroll to bottom only if we were already at the bottom
      if (wasAtBottom) {
        setTimeout(() => {
          chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } 
    }
  });

  // Reset messages when changing between chats
  useEffect(() => {
    // When userId changes (switching chats), reset the state
    setMessages([]); // Clear previous messages
    setInput(""); // Clear input field
    handleRemoveImage(); // Clear any uploaded images
    setWasAtBottom(true); // Reset scroll position tracking
    
    if (messagesData) {
      // Only set messages for the current chat, ensuring strict type comparison
      const filteredMessages = messagesData.filter((msg: { chatId: any; }) => 
        String(msg.chatId) === String(userId)
      );
      setMessages(filteredMessages);
      
      // Log message count for debugging
      logDebug(`Loaded ${filteredMessages.length} messages for chat ${userId}`);
    }
    
    // Auto-scroll to bottom when changing chats
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, 100);
  }, [userId, messagesData]);

  // Update messages from WebSocket (ensuring they're for the current chat)
  useEffect(() => {
    if (wsMessages && wsMessages.length > 0 && userId) {
      // Filter to only include messages for the current chat with strict equality
      const relevantMessages = wsMessages.filter(msg => 
        String(msg.chatId) === String(userId)
      );
      
      if (relevantMessages.length > 0) {
        logDebug(`Processing ${relevantMessages.length} WebSocket messages for chat ${userId}`);
      }
      
      // Merge with current messages, avoiding duplicates
      setMessages(prev => {
        const newMessages = [...prev];
        const seenIds = new Set(newMessages.map(msg => String(msg.id)));
        
        relevantMessages.forEach(wsMsg => {
          if (!seenIds.has(String(wsMsg.id))) {
            newMessages.push(wsMsg);
            seenIds.add(String(wsMsg.id));
          }
        });
        
        // Sort by creation time
        return newMessages.sort((a, b) => 
          new Date(a.creationTime).getTime() - new Date(b.creationTime).getTime()
        );
      });
    }
  }, [wsMessages, userId]);

  // Set up scroll event listener
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  // Handle clicking outside emoji picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showEmojiPicker && !(event.target as Element).closest('.emoji-picker-container')) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker]);

  // Handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    setInput(prev => prev + emoji);
    // Focus back on input after emoji selection
    setTimeout(() => {
      const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (inputElement) inputElement.focus();
    }, 0);
  };

  // Handle image upload with improved validation and feedback
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (file.size > MAX_FILE_SIZE) {
        toast.error("File too large. Max 5MB allowed.");
        return;
      }

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error("Unsupported file type. Use JPEG, PNG, or GIF.");
        return;
      }

      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      toast.success("Image attached successfully");
    }
  };

  // Clear uploaded image
  const handleRemoveImage = () => {
    if (imageFile) {
      setImageFile(null);
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }
    }
  };

  // Send message with improved error handling and user feedback
  const handleSendMessage = async () => {
    const trimmedInput = input.trim();
    
    if (!trimmedInput && !imageFile) {
      toast.error("Cannot send empty message");
      return;
    }

    if (isSending) {
      toast.info("Message is already being sent");
      return;
    }

    if (!userId) {
      toast.error("No chat selected");
      return;
    }

    setIsSending(true);

    try {
      let success;
      
      // Prepare the message payload with string chat ID
      const messagePayload = {
        chatId: String(userId),
        content: trimmedInput || " " // Use space if empty (for image-only messages)
      };
      
      if (imageFile) {
        // Log for debugging
        logDebug(`Sending message with image. File size: ${imageFile.size} bytes, type: ${imageFile.type}`);
        
        // Use file upload + message sending with attachmentId
        success = await sendMessageWithAttachment({
          ...messagePayload,
          file: imageFile
        });
      } else {
        // Use WebSocket for text-only messages
        logDebug("Sending text-only message:", messagePayload);
        success = await sendMessage(messagePayload);
      }

      if (success) {
        // Trigger chat list refresh
        regetusers();
        // Clear input field and image
        setInput("");
        handleRemoveImage();
        setWasAtBottom(true); // Reset scroll position after sending
        
        // Scroll to bottom after sending
        setTimeout(() => {
          chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        
        // Show success message
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Message sending failed:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  // Group messages by date
  const groupMessagesByDate = useCallback((messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    // Filter to only include messages for the current chat
    const filteredMessages = messages.filter(msg => 
      String(msg.chatId) === String(userId)
    );
    
    filteredMessages.forEach(message => {
      const dateStr = formatMessageDate(message.creationTime);
      
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(message);
    });
    
    return groups;
  }, [userId, formatMessageDate]);

  const groupedMessages = groupMessagesByDate(messages);

  // Function to get user profile link based on role
  const getUserProfileLink = () => {
    const roleMap: Record<string, string> = {
      "Teacher": `/teacher/view-teacher/${realuserId}`,
      "Student": `/student/view-student/${realuserId}`,
      "Parent": `/parent/view-parent/${realuserId}`,
      "Employee": `/employee/view-employee/${realuserId}`,
      "Worker": `/worker/view-worker/${realuserId}`
    };
    
    return roleMap[userRole] || "#";
  };

  return (
    <div className="mx-auto flex h-[700px] w-full flex-col rounded-xl bg-bgPrimary shadow-lg">
      <div dir={currentLanguage === "ar" ? "rtl" : "ltr"} className="relative inline-block p-4 border-b border-borderPrimary">
        <div className="flex items-center gap-2 font-medium">
          <img src="/images/userr.png" alt="User avatar" className="w-[50px] h-[50px] rounded-full object-cover" />
          <div>
            <p className="font-bold">{userName}</p>
            <p className="text-sm text-gray-500">{userRole}</p>
          </div>
        </div>
        <div className={`absolute ${currentLanguage === "ar" ? "left-3" : "right-3"} top-5`}>
          <Link 
            href={getUserProfileLink()} 
            className="font-medium text-secondary underline underline-offset-2 hover:text-secondary/80 transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto break-words rounded-xl bg-bgPrimary p-4"
        onScroll={handleScroll}
      >
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}
        
        {error && (
          <div className="flex h-full items-center justify-center text-red-500">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <p className="font-semibold">Error loading messages</p>
              <p className="text-sm">Please refresh the page and try again</p>
            </div>
          </div>
        )}
        
        {!isLoading && !error && Object.keys(groupedMessages).length === 0 && (
          <div className="flex h-full items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="mb-2">No messages yet</p>
              <p className="text-sm">Start the conversation!</p>
            </div>
          </div>
        )}
        
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            <DateSeparator date={date} />
            {dateMessages.map((msg, idx) => (
              <MessageBubble
                key={`${msg.id}-${idx}`}
                message={msg}
                isCurrentUser={msg.creatorName === currentUserName}
                userName={userName}
                currentChatId={userId} 
              />
            ))}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className="m-4 flex flex-col gap-2">
        {imagePreview && (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-20 w-20 rounded-lg object-cover border border-borderPrimary"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 shadow-sm"
              aria-label="Remove image"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        
        <div className="flex items-center justify-between gap-5 rounded-xl border border-borderPrimary bg-bgPrimary px-4 py-2">
          <div className="grid items-center justify-center">
            <label className="relative inline-flex cursor-pointer items-center" aria-label="Upload image">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-label="Upload image"
                disabled={isSending}
              />
              <svg
                className={`h-6 w-6 cursor-pointer ${isSending ? 'opacity-50' : ''} text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </label>
          </div>
          <div className="emoji-picker-container relative">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                aria-label="Emoji picker"
                disabled={isSending}
              >
                <svg className={`h-6 w-6 ${isSending ? 'opacity-50' : ''} text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200`} viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </button>
              {showEmojiPicker && (
                <EmojiPicker
                  onEmojiSelect={handleEmojiSelect}
                  onClose={() => setShowEmojiPicker(false)}
                />
              )}
            </div>

          <input
            type="text"
            className="flex-1 rounded-lg p-2 focus:outline-none bg-transparent focus:bg-white dark:focus:bg-gray-700 border border-transparent focus:border-borderPrimary transition-colors"
            value={input}
            placeholder="Type your message..."
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={isSending}
          />
          <button
            className="ml-4 flex items-center gap-3 rounded-lg bg-[#ffead1] dark:bg-blue-900 hover:bg-[#dfbd90] hover:dark:bg-blue-700 px-3 py-2 font-semibold text-black dark:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleSendMessage}
            disabled={isSending || (!input.trim() && !imageFile)}
            aria-label="Send message"
          >
            {isSending ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Sending</span>
              </>
            ) : (
              <>
                <span>Send</span>
                <svg
                  className="h-5 w-5 text-black dark:text-white"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
