// backend/src/index.ts
import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import chatRoutes from "./routes/chat";
import cors from "cors";
import { authenticateToken } from "./middleware/authMiddleware";
import { verifyToken } from "./utils/jwt";
import { CustomSocket } from "./types/customSocket";

dotenv.config();

const app = express();
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI!, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  } as mongoose.ConnectOptions)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/chat", authenticateToken, chatRoutes);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.use(async (socket: CustomSocket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = await verifyToken(token);
    socket.user = user;
    next();
  } catch (error) {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket: CustomSocket) => {
  console.log("a user connected", socket.user);

  socket.on("message", (msg) => {
    const message = {
      user: socket.user?.username,
      text: msg.text,
      createdAt: new Date(),
    };
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
