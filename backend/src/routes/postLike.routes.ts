import { Router } from "express";
import { likePost, getPostLikesAndLikedUser } from "../controllers/postLike.controller";
import { verifyUser } from "../middleware/auth.middleware";
import { allowRoles } from "../middleware/role.middleware";

const router = Router();

router.post("/like/:postId", verifyUser, allowRoles('user'), likePost);
router.get("/likes/:postId", verifyUser, allowRoles('user'), getPostLikesAndLikedUser);

export default router;
