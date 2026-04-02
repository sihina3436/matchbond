
import { Router } from "express";
import { sendMessage } from "../controllers/message.controller";
import { saveFCMToken, removeFCMToken } from "../controllers/notification.controller";
import { verifyUser } from "../middleware/auth.middleware";

const router = Router();


router.post("/send", verifyUser, sendMessage);


router.post("/fcm-token", verifyUser, saveFCMToken);
router.post("/fcm-token/remove", verifyUser, removeFCMToken);

export default router;
