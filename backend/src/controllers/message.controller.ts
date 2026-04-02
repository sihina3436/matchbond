
import { Request, Response } from "express";
import User from "../models/user.model";
import { sendPushNotification } from "../services/notification.service";


export const sendMessage = async (req: Request, res: Response) => {
  const { senderId, receiverId, text } = req.body;

  if (!senderId || !receiverId || !text?.trim()) {
    return res.status(400).json({ message: "senderId, receiverId and text are required" });
  }

  try {
    const sender = await User.findById(senderId).select("first_name last_name");

    if (sender) {
      const senderName = `${sender.first_name} ${sender.last_name}`;
      // Fire-and-forget — don't let FCM failure block the 200 response
      sendPushNotification(receiverId, senderId, senderName, text.trim()).catch(
        (err) => console.error("Background FCM error:", err)
      );
    }

    // Return 200 immediately — notification is sent in the background
    return res.status(200).json({ message: "Notification queued" });
  } catch (error: any) {
    console.error("sendMessage controller error:", error);
    return res.status(500).json({ error: error.message });
  }
};
