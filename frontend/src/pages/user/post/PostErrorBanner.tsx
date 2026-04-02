import React from "react";
import { AlertTriangle, UserX, ShieldOff, ClipboardList, X } from "lucide-react";

interface PostErrorBannerProps {
  message: string;
  onDismiss: () => void;
}


const ERROR_CONFIG: Record<
  string,
  { icon: React.ReactNode; title: string; description: string; color: string }
> = {
  "Please complete your profile before creating a post": {
    icon: <UserX size={20} />,
    title: "Profile Incomplete",
    description:
      "You need to fill in all profile details (name, NIC, gender, marriage status, income, district, height, weight, occupation) before you can create a post.",
    color: "amber",
  },
  "Your account is not verified yet. Please wait for admin approval.": {
    icon: <ShieldOff size={20} />,
    title: "Account Not Verified",
    description:
      "Your account is pending admin approval. You'll be able to create posts once your account has been verified.",
    color: "orange",
  },
  "All fields are required": {
    icon: <ClipboardList size={20} />,
    title: "Missing Fields",
    description:
      "Please fill in all required fields: description, current living district, education, and an image.",
    color: "rose",
  },
};

const COLOR_CLASSES: Record<string, { bg: string; border: string; icon: string; title: string; desc: string; dismiss: string }> = {
  amber: {
    bg: "bg-amber-50",
    border:  "border-amber-200",
    icon:    "text-amber-500",
    title:   "text-amber-800",
    desc:    "text-amber-700",
    dismiss: "text-amber-400 hover:text-amber-600 hover:bg-amber-100",
  },
  orange: {
    bg: "bg-orange-50",
    border:  "border-orange-200",
    icon: "text-orange-500",
    title:   "text-orange-800",
    desc:    "text-orange-700",
    dismiss: "text-orange-400 hover:text-orange-600 hover:bg-orange-100",
  },
  rose: {
    bg:  "bg-rose-50",
    border:  "border-rose-200",
    icon: "text-rose-500",
    title: "text-rose-800",
    desc: "text-rose-700",
    dismiss: "text-rose-400 hover:text-rose-600 hover:bg-rose-100",
  },
};

const PostErrorBanner: React.FC<PostErrorBannerProps> = ({ message, onDismiss }) => {
  const config = ERROR_CONFIG[message];

  // Fallback for unexpected error messages
  if (!config) {
    return (
      <div className="flex items-start gap-3 p-4 rounded-xl border border-rose-200 bg-rose-50">
        <AlertTriangle size={20} className="text-rose-500 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-rose-800">Something went wrong</p>
          <p className="text-sm text-rose-700 mt-0.5">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="p-1 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-100 transition shrink-0"
        >
          <X size={15} />
        </button>
      </div>
    );
  }

  const c = COLOR_CLASSES[config.color];

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${c.bg} ${c.border}`}>
      <span className={`shrink-0 mt-0.5 ${c.icon}`}>{config.icon}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${c.title}`}>{config.title}</p>
        <p className={`text-sm mt-0.5 ${c.desc}`}>{config.description}</p>
      </div>
      <button
        onClick={onDismiss}
        className={`p-1 rounded-lg transition shrink-0 ${c.dismiss}`}
      >
        <X size={15} />
      </button>
    </div>
  );
};

export default PostErrorBanner;
