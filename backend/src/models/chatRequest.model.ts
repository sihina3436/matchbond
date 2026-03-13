import mongoose, { Document, Schema } from "mongoose";

export interface IChatRequest extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "rejected" | "blocked";
}

const ChatRequestSchema = new Schema<IChatRequest>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "blocked"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IChatRequest>(
  "ChatRequest",
  ChatRequestSchema
);
