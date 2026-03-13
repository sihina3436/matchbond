import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Upload options
const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto" as const,
};

// Upload a single buffer to Cloudinary
export const uploadBuffer = (buffer: Buffer, folder: string = "users"): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { ...opts, folder },
      (err, result) => {
        if (err) return reject(err);
        if (!result?.secure_url) return reject(new Error("Upload failed"));
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};