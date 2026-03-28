import { Router } from "express";
import upload from "../middleware/upload.middleware";
import { uploadSingleImage,getBanners,deleteBanner } from "../controllers/image.controller";
import { verifyAdmin,verifyUser } from "../middleware/auth.middleware";

const router = Router();


router.post("/upload-post-image", verifyUser, upload.single("image"), uploadSingleImage);
router.post("/upload-profile-image",verifyUser , upload.single("image"), uploadSingleImage);
router.post("/upload-banner-image", upload.single("image"),uploadSingleImage );
router.post("/upload-review-image",  upload.single("image"),uploadSingleImage );
router.post("/upload-slide-image",  upload.single("image"),uploadSingleImage );
router.get("/banners", getBanners);
router.delete("/delete-banner/:id", deleteBanner);
export default router;