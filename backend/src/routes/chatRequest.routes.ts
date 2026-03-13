import { Router } from "express";
import {makeRequest,  getReceivedRequests, getSentRequests, updateRequestStatus, BlockUser} from "../controllers/chatRequest.controller";

const router = Router();

router.post("/request", makeRequest); //☑️
router.get("/received/:receiverId", getReceivedRequests); // ☑️
router.get("/sent/:senderId", getSentRequests); // ☑️
router.patch("/status/:requestId", updateRequestStatus); 
router.post("/block-user", BlockUser); // ☑️



export default router;
