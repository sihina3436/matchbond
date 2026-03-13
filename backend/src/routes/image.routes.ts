import { Router } from "express";
import upload from "../middleware/upload.middleware";
import { uploadSingleImage } from "../controllers/image.controller";
import { verifyAdmin,verifyUser } from "../middleware/auth.middleware";

const router = Router();


router.post("/upload-post-image", verifyUser, upload.single("image"), uploadSingleImage);
router.post("/upload-profile-image",verifyUser , upload.single("image"), uploadSingleImage);
export default router;