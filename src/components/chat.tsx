"use client";
import { useEffect, useState } from "react";
import {
  loginUser,
  sendMessage,
  addMessageListener,
} from "@/components/cometchatUser"; // Correct the import path
import { CometChat } from "@cometchat-pro/chat";

const ChatPage = () => {
  const [messages, setMessages] = useState<CometChat.TextMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      loginUser("USER_ID"); // Replace with actual user ID

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
    sendMessage("cometchat-uid-1", input); // Replace with actual receiver ID
    setInput(""); // Clear input after sending
  };

  return (
    <div>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg.getText()}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;
