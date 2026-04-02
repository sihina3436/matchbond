import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


// Routes
import userRoutes from "./src/routes/user.routes";
import postRoutes from "./src/routes/post.routes";
import chatRoutes from "./src/routes/chatRequest.routes";
import adminRoutes from "./src/routes/admin.routes";
import imageRoutes from "./src/routes/image.routes";
import postLikeRoutes from "./src/routes/postLike.routes";
import messageRoutes from "./src/routes/message.routes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/likes", postLikeRoutes);
app.use("/api/messages", messageRoutes);

// Connect MongoDB + Start Server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

startServer();
