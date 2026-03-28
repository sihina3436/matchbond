import { Request, Response } from "express";
import { uploadBuffer } from "../utils/uploadImage";
import Banner from "../models/Banner.model";

export const uploadSingleImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

  
    const imageUrl = await uploadBuffer(file.buffer, "users");

    res.status(200).json({imageUrl});
  } catch (error) {
    console.error("uploadSingleImage error:", error);
    res.status(500).json({ message: "Cannot upload image! Something went wrong" });
  }
};

//get Banners
export const getBanners = async (req: Request, res: Response) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({ banners });
  } catch (error) {  
      res.status(500).json({ message: "Failed to fetch banners" });
  }
}

// delete banner by id
export const deleteBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBanner = await Banner.findByIdAndDelete(id);
    if (!deletedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete banner" });
  }
}


