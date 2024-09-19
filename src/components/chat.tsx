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

const ChatPage = () => {
  const [messages, setMessages] = useState<
    (CometChat.TextMessage | CometChat.MediaMessage)[]
  >([]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Function to fetch messages
  const fetchMessages = async () => {
    const UID = "cometchat-uid-1"; // Replace with actual receiver UID
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
      loginUser("1");

      // Fetch chat history
      fetchMessages();

      // Add a message listener
      addMessageListener("chat_listener", (message: any) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
    }

    return () => {
      if (typeof window !== "undefined") {
        // Clean up the listener
        CometChat.removeMessageListener("chat_listener");
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      // Send text message
      sendMessage("cometchat-uid-1", input) // Replace with actual receiver ID
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
      sendImageMessage("cometchat-uid-1", imageFile) // Replace with actual receiver ID
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
    <div className="mx-auto flex h-[700px] max-w-lg flex-col rounded-xl border border-gray-300 bg-gray-50">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto rounded-xl bg-gray-100 p-4">
        {messages.map((msg, idx) => {
          const isSender = msg.getSender()?.getUid() === "USER_ID";
          if (msg instanceof CometChat.TextMessage) {
            return (
              <div
                key={idx}
                className={`mb-4 max-w-xs rounded-lg p-3 font-semibold ${isSender ? "mr-auto bg-[#5570f1] text-left text-white" : "ml-auto bg-[#ffead1] text-right"}`}
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
                className={`mb-4 max-w-xs rounded-lg p-3 ${isSender ? "mr-auto bg-[#5570f1] text-left" : "ml-auto bg-[#ffead1] text-right"}`}
              >
                <img
                  src={msg.getURL()}
                  alt="sent image"
                  className="h-auto w-full rounded-lg"
                />
              </div>
            );
          }
        })}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input, Image Upload, and Send button */}
      <div className="flex items-center rounded-xl border-t border-gray-300 bg-white p-4">
        <input
          type="text"
          className="flex-1 rounded-lg border border-gray-300 p-2 focus:border-blue-300 focus:outline-none focus:ring"
          value={input}
          placeholder="Type your message..."
          onChange={e => setInput(e.target.value)}
        />
        <input
          type="file"
          className="ml-4"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button
          className="ml-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
