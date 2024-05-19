// backend/src/controllers/chatController.ts
import { Request, Response } from "express";
import Message from "../models/message";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find().limit(25).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const postMessage = async (req: Request, res: Response) => {
  try {
    const { user, text, parentId } = req.body;
    const message = new Message({ user, text, parentId });
    console.log("message", message);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
