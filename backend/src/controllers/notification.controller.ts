
import { Request, Response } from "express";
import User from "../models/user.model";


export const saveFCMToken = async (req: Request, res: Response) => {
  const { userId, token } = req.body;

  if (!userId || !token) {
    return res.status(400).json({ message: "userId and token are required" });
  }

  try {
    await User.findByIdAndUpdate(userId, { fcmToken: token });
    return res.json({ message: "FCM token saved" });
  } catch (error: any) {
    console.error("saveFCMToken error:", error);
    return res.status(500).json({ error: error.message });
  }
};


export const removeFCMToken = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    await User.findByIdAndUpdate(userId, { fcmToken: null });
    return res.json({ message: "FCM token removed" });
  } catch (error: any) {
    console.error("removeFCMToken error:", error);
    return res.status(500).json({ error: error.message });
  }
};
