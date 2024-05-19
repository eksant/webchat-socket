// backend/src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
