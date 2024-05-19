// backend/src/types/customSocket.d.ts
import { Socket } from "socket.io";
import { IUser } from "../models/user";

export interface CustomSocket extends Socket {
  user?: IUser;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
