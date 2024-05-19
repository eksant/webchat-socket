import React from "react";
import { List, Avatar } from "antd";
import { Message as MessageType } from "../types/Message";
import "./Message.css";

const Message: React.FC<{ message: MessageType; isUser: boolean }> = ({
  message,
  isUser,
}) => {
  return (
    <List.Item className={isUser ? "message user" : "message other"}>
      <List.Item.Meta
        avatar={<Avatar>{message.user[0]}</Avatar>}
        title={message.user}
        description={message.text}
      />
      <div className="createdAt">
        {new Date(message.createdAt).toLocaleString()}
      </div>
    </List.Item>
  );
};

export default Message;
