
import { messaging } from "../config/firebase";
import User from "../models/user.model";


export const sendPushNotification = async (
  receiverId: string,
  senderId: string,     
  senderName: string,
  messageText: string
): Promise<void> => {
  const receiver = await User.findById(receiverId).select("fcmToken");

  if (!receiver?.fcmToken) {
    console.log(`No FCM token for user ${receiverId} — skipping.`);
    return;
  }

  const body =
    messageText.length > 80
      ? `${messageText.slice(0, 80)}…`
      : messageText;

  try {
    await messaging.send({
      token: receiver.fcmToken,
      notification: {
        title: ` ${senderName}`,
        body,
      },
    
      data: {
        senderId,  
        receiverId, 
        type: "chat_message",
      },
      webpush: {
        notification: {
          icon:    "/logo.png",
          badge:   "/badge.png",
          vibrate: [200, 100, 200],
          
          data: { url: `/chat?with=${senderId}&name=${encodeURIComponent(senderName)}` },
        },
        fcmOptions: {
          link: `/chat?with=${senderId}&name=${encodeURIComponent(senderName)}`,
        },
      },
    });

    console.log(`Push notification sent to ${receiverId} from ${senderId}`);
  } catch (error: any) {
    if (
      error.code === "messaging/invalid-registration-token" ||
      error.code === "messaging/registration-token-not-registered"
    ) {
      await User.findByIdAndUpdate(receiverId, { fcmToken: null });
      console.warn(`Removed stale FCM token for user ${receiverId}`);
    } else {
      throw error;
    }
  }
};
