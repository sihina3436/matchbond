import mongoose, { Document, Schema } from "mongoose";

export interface IPostLike extends Document {
  post_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  like_count: number;
  
}

const PostLikeSchema = new Schema<IPostLike>(
  {
    post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    like_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IPostLike>("PostLike", PostLikeSchema);