import { Router } from "express";
import {
  Signup,
  Signin,
  getUser,
  getAllUser,
  UpdateProfile,
  forgotPassword,
  resetPassword,
  deleteUserById,
  addProfilePicture,
  removeProfilePicture,
  updateProfilePicture
} from "../controllers/user.controller";

import { verifyUser } from "../middleware/auth.middleware";
import { allowRoles } from "../middleware/role.middleware";

const router = Router();

router.post("/sign-up", Signup);
router.post("/sign-in", Signin);

router.put("/update-profile/:id", verifyUser, allowRoles('user'), UpdateProfile);
router.get("/get-user/:id", verifyUser, allowRoles('user'),getUser);

router.get("/get-all-users",verifyUser, allowRoles('user'), getAllUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.delete("/delete-user/:id", verifyUser, allowRoles('user'), deleteUserById);

router.post("/add-profile-picture", verifyUser, allowRoles('user'), addProfilePicture);
router.put("/remove-profile-picture", verifyUser, allowRoles('user'), removeProfilePicture);
router.put("/update-profile-picture", verifyUser, allowRoles('user'), updateProfilePicture);



export default router;