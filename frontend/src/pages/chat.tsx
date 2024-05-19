import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { List, Input, Button } from "antd";
import { Message as MessageType } from "../types/Message";
import Message from "../components/Message";
import { getMessages } from "../utils/api";

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef<Socket | null>(null);
  const currentUser = localStorage.getItem("user") || "";

  useEffect(() => {
    socket.current = io("http://localhost:5000", {
      auth: { token: localStorage.getItem("token") },
    });

    socket.current.on("message", (message: MessageType) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
    };

    fetchMessages();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: MessageType = {
        user: currentUser,
        text: newMessage,
        createdAt: new Date().toISOString(),
      };
      socket.current?.emit("message", message);
      setNewMessage("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 200px)",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          backgroundColor: "#e5ddd5",
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(message) => (
            <Message
              key={message.createdAt}
              message={message}
              isUser={message.user === currentUser}
            />
          )}
        />
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px",
          borderTop: "1px solid #ccc",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder="Type a message..."
          style={{ flex: 1, marginRight: "10px" }}
        />
        <Button type="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
