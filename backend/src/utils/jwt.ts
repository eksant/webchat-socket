// backend/src/utils/jwt.ts
import jwt from "jsonwebtoken";
import User from "../models/user";

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

export const verifyToken = async (token: string) => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
