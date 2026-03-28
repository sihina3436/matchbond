import mongoose, { Document, Schema } from "mongoose";


// Interface
export interface IBanner extends Document {
  bannerTitle: string;
  bannerImageUrl: string;
  type: "offer" | "review" | "slide" ;

}

// Schema
const BannerSchema = new Schema<IBanner>(
  {
    bannerTitle: {
        type: String,
        required: true,
    },
    bannerImageUrl: {
        type: String,

    },
    type:{
        type: String,
        enum: ["offer", "review", "slide"],
        default: "offer"
    }
  },
  {
    timestamps: true,
  }
);

// Model
const Banner = mongoose.model<IBanner>("Banner", BannerSchema);
export default Banner;