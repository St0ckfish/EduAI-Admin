/* eslint-disable @next/next/no-img-element */
"use client";
import {
  useEffect,
  useState,
  useRef,
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
import { useGetChatMessagesQuery } from "@/features/chat/chatApi";
import { toast } from "react-toastify";
import { Client } from "@stomp/stompjs";
import Cookies from "js-cookie";
import axios from "axios";

interface Message {
  chatId: number | string;
  messageId: number;
  attachmentId: number | null;
  isMyMessage: boolean;
  sender: {
    id: number;
    name: string;
    Role: string;
    hasPhoto: boolean;
    photoLink: string | null;
  };
  recipient: {
    id: number;
    name: string;
    Role: string;
    hasPhoto: boolean;
    photoLink: string | null;
  };
  messageContent: string;
  viewLink: string | null;
  downloadLink: string | null;
  isMessage: boolean;
  isVideo: boolean;
  isAudio: boolean;
  isFile: boolean;
  isImage: boolean;
  creationDate: string;
  seenTime: string | null;
}

interface ChatPageProps {
  userId: string | null;
}

const ChatPage = ({ userId }: ChatPageProps) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const token = Cookies.get("token");
  const { data: messagesData, isLoading, error } = useGetChatMessagesQuery(
    userId!,
    {
      skip: userId === null,
    },
  );

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!token || !userId) {
      console.error("Token or userId is missing.");
      return;
    }

    const stompClient = new Client({
      brokerURL: `ws://eduai.vitaparapharma.com/ws?token=${token}`,
      debug: function(str) {
        console.log(str);
    },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    
    stompClient.onConnect = () => {
      console.log("Connected");
    
      stompClient.subscribe(`/chat/${userId}`, (message) => {
        const newMessage: Message = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    };
    
    stompClient.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };
    
    stompClient.onWebSocketError = (event) => {
      console.error('WebSocket error:', event);
    };
    
    stompClient.onWebSocketClose = (event) => {
      console.error('WebSocket closed:', event);
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
      stompClientRef.current = null;
    };
  }, [token, userId]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !imageFile) {
      return;
    }

    if (!stompClientRef.current || !stompClientRef.current.connected) {
      console.error("STOMP client is not connected.");
      return;
    }

    let imageUrl = null;

    // If an image file is selected, upload it first
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("file", imageFile);

        // Send a POST request to upload the image
        const response = await axios.post(
          `/api/chat/${userId}/upload-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        imageUrl = response.data.imageUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
        return;
      }
    }

    const messageBody = JSON.stringify({
      chatId: userId,
      content: input.trim(),
      imageUrl: imageUrl,
    });

    try {
      stompClientRef.current.publish({
        destination: "/app/sendMessage",
        body: messageBody,
      });
      console.log("Message published successfully");
      setInput("");
      setImageFile(null);
    } catch (error) {
      console.error("Error during publish:", error);
    }
  };

  // Scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="mx-auto flex h-[700px] w-full flex-col rounded-xl bg-bgPrimary">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto rounded-xl bg-bgPrimary p-4">
        {isLoading && <p></p>}
        {error && <p>Error loading messages</p>}
        {messages.map((msg: Message, idx: Key | null | undefined) => {
          const isSender = msg.isMyMessage;
          if (msg.isMessage) {
            return (
              <div
                key={idx}
                className={`mb-4 max-w-xs rounded-lg p-3 font-semibold ${
                  isSender
                    ? "ml-auto bg-chat text-right text-black"
                    : "mr-auto bg-[#5570f1] text-left text-white"
                }`}
              >
                <p>{msg.messageContent}</p>
              </div>
            );
          } else if (msg.isImage) {
            return (
              <div
                key={idx}
                className={`mb-4 max-w-xs rounded-lg p-3 ${
                  isSender
                    ? "ml-auto bg-chat text-right"
                    : "mr-auto bg-[#5570f1] text-left"
                }`}
              >
                <img
                  src={msg.viewLink || msg.downloadLink || ""}
                  alt="sent image"
                  className="h-auto w-full rounded-lg"
                />
              </div>
            );
          }
          return null; // Handle other message types if necessary
        })}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input, Image Upload, and Send button */}
      <div className="m-4 flex items-center justify-between gap-5 rounded-xl border border-borderPrimary bg-bgPrimary px-4 py-1">
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
          {imageFile && (
            <p className="mt-2 text-nowrap text-sm text-gray-700">
              {imageFile.name}
            </p>
          )}
        </div>

        <input
          type="text"
          className="flex-1 rounded-lg p-2 focus:outline-none"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-4 flex items-center gap-3 rounded-lg bg-[#ffead1] px-2 py-1 font-semibold text-black hover:bg-[#dfbd90]"
          onClick={handleSendMessage}
        >
          Send
          <svg
            className="h-5 w-5 text-black"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <line x1="10" y1="14" x2="21" y2="3" />{" "}
            <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
