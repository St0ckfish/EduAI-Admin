/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useRef } from "react";
import {
  loginUser,
  sendMessage,
  sendImageMessage,
  addMessageListener,
} from "@/components/cometchatUser";
import { CometChat } from "@cometchat-pro/chat";
import { useTheme } from "next-themes";

interface ChatPageProps {
  userId: string;
}

const ChatPage = ({ userId }: ChatPageProps) => {
  const { theme, setTheme } = useTheme();
  const [messages, setMessages] = useState<
    (CometChat.TextMessage | CometChat.MediaMessage)[]
  >([]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  console.log(userId);

  // Function to fetch messages
  const fetchMessages = async () => {
    const UID = userId; // Use the current receiver UID
    const limit = 30; // Number of messages to fetch
    const messageRequest = new CometChat.MessagesRequestBuilder()
      .setUID(UID)
      .setLimit(limit)
      .build();

    messageRequest.fetchPrevious().then(
      (fetchedMessages: CometChat.BaseMessage[]) => {
        // Filter messages to only include TextMessage and MediaMessage
        const filteredMessages = fetchedMessages.filter(
          (msg): msg is CometChat.TextMessage | CometChat.MediaMessage =>
            msg instanceof CometChat.TextMessage ||
            msg instanceof CometChat.MediaMessage,
        );
        setMessages(filteredMessages);
      },
      error => {
        console.error("Message fetching failed with error:", error);
      },
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      loginUser("1"); // Assuming "1" is the logged-in user

      // Clear previous messages
      setMessages([]);

      // Fetch chat history
      fetchMessages();

      const listenerID = `chat_listener_${userId}`;

      // Remove any existing message listener
      CometChat.removeMessageListener(listenerID);

      // Add a message listener
      addMessageListener(listenerID, (message: any) => {
        // Only add messages relevant to the current chat
        if (
          (message.getSender().getUid() === userId &&
            message.getReceiverType() === "user") ||
          (message.getReceiverId() === userId &&
            message.getReceiverType() === "user")
        ) {
          setMessages(prevMessages => [...prevMessages, message]);
        }
      });

      return () => {
        // Clean up the listener
        CometChat.removeMessageListener(listenerID);
      };
    }
  }, [userId]);

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      // Send text message
      sendMessage(userId, input)
        .then(() => {
          setInput(""); // Clear input after sending
          fetchMessages(); // Refetch messages after sending a message
        })
        .catch(error => {
          console.error("Message sending failed with error:", error);
        });
    }

    if (imageFile) {
      // Send image message
      sendImageMessage(userId, imageFile)
        .then(() => {
          setImageFile(null); // Clear image after sending
          fetchMessages(); // Refetch messages after sending an image
        })
        .catch(error => {
          console.error("Image sending failed with error:", error);
        });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
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
        {messages.map((msg, idx) => {
          const isSender = msg.getSender()?.getUid() === "1"; // "1" is the logged-in user ID
          if (msg instanceof CometChat.TextMessage) {
            return (
              <div
                key={idx}
                className={`mb-4 max-w-xs rounded-lg p-3 font-semibold ${
                  isSender
                    ? "ml-auto bg-chat text-right text-black"
                    : "mr-auto bg-[#5570f1] text-left text-white"
                }`}
              >
                <p>{msg.getText()}</p>
              </div>
            );
          } else if (
            msg instanceof CometChat.MediaMessage &&
            msg.getType() === "image"
          ) {
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
                  src={msg.getURL()}
                  alt="sent image"
                  className="h-auto w-full rounded-lg"
                />
              </div>
            );
          }
          return null; // Add this line to handle other message types
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
          onChange={e => setInput(e.target.value)}
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
