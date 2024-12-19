"use client";
import { useGetChatMessagesQuery } from "@/features/chat/chatApi";
import { RootState } from "@/GlobalRedux/store";
import { Client, IMessage } from "@stomp/stompjs";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MessageBubble } from "./MessageBubble";
import Link from "next/link";

interface Message {
  chatId: number | string;
  id: number | string;
  content: string;
  creationTime: string;
  creatorName: string;
  imageUrl?: string;
}

// Emoji Picker Component
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

// Date separator component remains the same
const DateSeparator = ({ date }: { date: string }) => (
  <div className="my-4 flex items-center">
    <div className="flex-1 border-t border-gray-300"></div>
    <div className="mx-4 text-sm font-medium text-gray-500">{date}</div>
    <div className="flex-1 border-t border-gray-300"></div>
  </div>
);

interface ChatPageProps {
  userId: string | null;
  regetusers: () => void;
  userName: string;
}

const ChatPage = ({ userId, regetusers, userName }: ChatPageProps) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const token = Cookies.get("token");
  const { data: messagesData, isLoading, error } = useGetChatMessagesQuery(userId!, {
    skip: userId === null,
  });

  const currentUserName = useSelector(
    (state: RootState) => state.user.name || "Unknown User"
  );

  const stompClientRef = useRef<Client | null>(null);

  // Group messages by date
  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = new Date(message.creationTime);
      const dateStr = date.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(message);
    });
    
    return groups;
  };

  // Handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    setInput(prev => prev + emoji);
  };

  // Previous useEffects remain the same
  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  // WebSocket connection useEffect remains the same...
  useEffect(() => {
    if (!token || !userId) {
      toast.error("Authentication required to start chat");
      return;
    }

    const stompClient = new Client({
      brokerURL: `wss://eduai.vitaparapharma.com/ws?token=${token}`,
      debug: function (str) {
        console.log("[STOMP Debug]", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // ... rest of the WebSocket setup remains the same
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
      stompClientRef.current = null;
    };
  }, [token, userId]);

  // Previous handlers remain the same...
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const maxSize = 5 * 1024 * 1024;
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

      if (file.size > maxSize) {
        toast.error("File too large. Max 5MB allowed.");
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        toast.error("Unsupported file type. Use JPEG, PNG, or GIF.");
        return;
      }

      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !imageFile) {
      toast.error("Cannot send empty message");
      return;
    }

    if (!stompClientRef.current?.connected) {
      toast.error("Chat connection lost. Please reconnect.");
      return;
    }

    const messagePayload = {
      chatId: userId,
      content: input.trim(),
      ...(imageFile ? { imageUrl: URL.createObjectURL(imageFile) } : {}),
    };

    try {
      stompClientRef.current.publish({
        destination: "/app/sendMessage",
        body: JSON.stringify(messagePayload),
      });

      regetusers();
      setInput("");
      handleRemoveImage();
    } catch (error) {
      console.error("Message sending failed:", error);
      toast.error("Failed to send message");
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const groupedMessages = groupMessagesByDate(messages);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showEmojiPicker && !(event.target as Element).closest('.emoji-picker-container')) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker]);

  return (
    <div className="mx-auto flex h-[700px] w-full flex-col rounded-xl bg-bgPrimary">
      {/* <div className="relative inline-block p-4">
        <img className="w-10 h-10 rounded-lg" src="/images/man.png" alt="Jese image" />
        <Link href="/" className="underline absolute right-4 top-4">
          View Profile
        </Link>
      </div> */}
      <div className="flex-1 overflow-y-auto break-words rounded-xl bg-bgPrimary p-4">
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}
        {error && (
          <div className="flex h-full items-center justify-center text-red-500">
            Error loading messages
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
              className="h-20 w-20 rounded-lg object-cover"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
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
        
        <div className="flex items-center justify-between gap-5 rounded-xl border border-borderPrimary bg-bgPrimary px-4 py-1">
          <div className="flex items-center gap-2">
            <div className="grid items-center justify-center">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <svg
                  className="h-6 w-6 cursor-pointer"
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
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          </div>

          <input
            type="text"
            className="flex-1 rounded-lg p-2 focus:outline-none"
            value={input}
            placeholder="Type your message..."
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button
            className="ml-4 flex items-center gap-3 rounded-lg bg-[#ffead1] dark:bg-blue-900 px-2 py-1 font-semibold text-black hover:bg-[#dfbd90] hover:dark:bg-blue-700 dark:text-white"
            onClick={handleSendMessage}
          >
            Send
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
