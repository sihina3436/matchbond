import { Request, Response } from "express";
import User from "../models/user.model";
import Post from "../models/post.model";
import ChatRequest from "../models/chatRequest.model";

// ✅ Send Request
export const makeRequest = async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body;

  try {
    if (senderId === receiverId) {
      return res.status(400).json({ message: "You cannot send request to yourself" });
    }

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    // Must have post
    const senderPost = await Post.findOne({ user_id: senderId });
    if (!senderPost) {
      return res.status(400).json({
        message: "Create a post before sending chat request",
      });
    }

    // Check BOTH directions
    const existing = await ChatRequest.findOne({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    if (existing) {
      if (existing.status === "blocked") {
        return res.status(403).json({ message: "User is blocked" });
      }
      return res.status(400).json({ message: "Request already exists" });
    }

    await ChatRequest.create({
      senderId,
      receiverId,
    });

    res.status(201).json({ message: "Chat request sent" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Received Requests
export const getReceivedRequests = async (req: Request, res: Response) => {
  const { receiverId } = req.params;

  try {
    const requests = await ChatRequest.find({ receiverId })
      .populate("senderId", "first_name last_name email ProfilePicture")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Sent Requests
export const getSentRequests = async (req: Request, res: Response) => {
  const { senderId } = req.params;

  try {
    const requests = await ChatRequest.find({ senderId })
      .populate("receiverId", "first_name last_name email ProfilePicture")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Accept / Reject
export const updateRequestStatus = async (req: Request, res: Response) => {
  const { requestId } = req.params;
  const { status } = req.body;

  try {
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await ChatRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    await request.save();

    res.json({ message: `Request ${status}`, request });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Block User
export const BlockUser = async (req: Request, res: Response) => {
  const { blockerId, blockedId } = req.body;

  if (!blockerId || !blockedId) {
    return res.status(400).json({ message: "blockerId and blockedId are required" });
  }

  try {
    let request = await ChatRequest.findOne({
      $or: [
        { senderId: blockerId, receiverId: blockedId },
        { senderId: blockedId, receiverId: blockerId },
      ],
    });

    if (request) {
      request.status = "blocked";
      (request as any).blockedBy = blockerId;
      await request.save();
    } else {
      request = await ChatRequest.create({
        senderId: blockerId,
        receiverId: blockedId,
        status: "blocked",
        blockedBy: blockerId,
      });
    }

    return res.json({ message: "User blocked", request });
  } catch (error: any) {
    console.error("BlockUser error:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const UnblockUser = async (req: Request, res: Response) => {
  const { unblockerId, unblockedId } = req.body;

  if (!unblockerId || !unblockedId) {
    return res.status(400).json({ message: "unblockerId and unblockedId are required" });
  }

  try {
    // Find in either direction
    const request = await ChatRequest.findOne({
      $or: [
        { senderId: unblockerId, receiverId: unblockedId },
        { senderId: unblockedId, receiverId: unblockerId },
      ],
      status: "blocked",
    });

    if (!request) {
      return res.status(404).json({ message: "No blocked relationship found" });
    }

    // Only the person who blocked can unblock
    const blockedById = (request as any).blockedBy?.toString();
    if (blockedById && blockedById !== unblockerId) {
      return res.status(403).json({ message: "Only the person who blocked can unblock" });
    }

    request.status = "accepted";
    (request as any).blockedBy = undefined;
    await request.save();

    return res.json({ message: "User unblocked", request });
  } catch (error: any) {
    console.error("UnblockUser error:", error);
    return res.status(500).json({ error: error.message });
  }
};
