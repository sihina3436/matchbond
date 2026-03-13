import {  Response } from "express";
import { AuthRequest } from "../types/authRequest";
import PostLike from "../models/postLike.model";
import Post from "../models/post.model";


export const likePost = async (req: AuthRequest, res: Response) => {
    try {
        const { postId } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Check if user already liked the post
        const existingLike = await PostLike.findOne({ post_id: postId, user_id: userId });

        if (existingLike) {
            // Remove like
            await PostLike.deleteOne({ _id: existingLike._id });
            await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } });
            return res.status(200).json({ message: "Post unliked successfully" });
        }

        // Create new like
        const newLike = new PostLike({
            post_id: postId,
            user_id: userId,
            like_count: 1
        });
        await newLike.save();

        await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });

        res.status(201).json({ message: "Post liked successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error liking post", error });
    }
};

export const getPostLikesAndLikedUser = async (req: AuthRequest, res: Response) => {
    try {
        const { postId } = req.params;
        const userId = req.user?.id;

        // Populate only name and ProfilePicture
        const postLikes = await PostLike.find({ post_id: postId }).populate("user_id", "first_name last_name ProfilePicture");

        const totalLikes = postLikes.length;
        const likedByUser = postLikes.some(like => like.user_id._id.toString() === userId);

        res.status(200).json({
            totalLikes,
            likedByUser,
            likedUsers: postLikes.map(like => like.user_id)
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching post likes", error });
    }
};

    