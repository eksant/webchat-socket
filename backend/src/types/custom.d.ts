// backend/src/types/custom.d.ts
import { IUser } from "../models/user";
import { Socket } from "socket.io";

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
