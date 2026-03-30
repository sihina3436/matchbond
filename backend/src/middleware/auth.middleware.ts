import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import Admin from "../models/admin.model";

export const verifyUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    console.log("Token from cookies:", token);

    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    console.log("Decoded token:", decoded);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};



export const verifyAdmin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    console.log("Token from cookies:", token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized token not found" });
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    console.log("Decoded token:", decoded);

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    req.admin = admin;

    next();
  }
    catch (error) {
      console.error("Admin verification error:", error);
      res.status(401).json({ message: "Invalid token" });
    }

  }
