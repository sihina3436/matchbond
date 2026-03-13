import { Request, Response } from "express";
import User from "../models/user.model";
import Post from "../models/post.model";
import ChatRequest from "../models/chatRequest.model";

// make chat Request
export const makeRequest = async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body;

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    const senderPost = await Post.findOne({ user_id: senderId });
  

    if (!senderPost) {
      return res.status(404).json({ message: "You must have a post to send a chat request! Create a post first." });
    }

    const existingRequest = await ChatRequest.findOne({
      senderId,
      receiverId,
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Chat request already sent",
      });
    }

    await ChatRequest.create({
      senderId,
      receiverId,
      status: "pending",
    });

    res.status(201).json({ message: "Chat request sent" });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Get all chat requests RECEIVED by a user
export const getReceivedRequests = async (req: Request, res: Response) => {
  const { receiverId } = req.params;

  try {
    const requests = await ChatRequest.find({ receiverId })
      .populate("senderId", "first_name last_name email image")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Get all chat requests SENT by a user
export const getSentRequests = async (req: Request, res: Response) => {
  const { senderId } = req.params;

  try {
    const requests = await ChatRequest.find({ senderId })
      .populate("receiverId", "first_name last_name email image")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Accept OR Reject request
export const updateRequestStatus = async (req: Request, res: Response) => {
  const { requestId } = req.params;
  const { status } = req.body; // accepted | rejected

  try {
    const request = await ChatRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    request.status = status;
    await request.save();

    res.json({ message: `Request ${status}`, request });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Block User
export const BlockUser = async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body;
  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingRequest = await ChatRequest.findOne({
      senderId,
      receiverId,
    });
    if (existingRequest) {
      existingRequest.status = "blocked";
      await existingRequest.save();
    } else {
      await ChatRequest.create({
        senderId,
        receiverId,
        status: "blocked",
      });
    }
    res.status(200).json({ message: "User blocked successfully" });
  }
  catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};



