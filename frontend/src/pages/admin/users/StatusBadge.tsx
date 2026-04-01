import React from "react";
import { useUpdateUserProfileStatusMutation } from "../../../redux/userAuth/userAuthAPI";

interface StatusBadgeProps {
  userId: string;
  status: "Pending" | "verify";
  onSuccess?: () => void;
  onError?: () => void;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ userId, status, onSuccess, onError }) => {
  const [updateStatus, { isLoading }] = useUpdateUserProfileStatusMutation();

  const handleToggle = async () => {
    const next = status === "verify" ? "Pending" : "verify";
    try {
      await updateStatus({ userId, status: next }).unwrap();
      onSuccess?.();
    } catch {
      onError?.();
    }
  };

  if (status === "verify") {
    return (
      <button
        onClick={handleToggle}
        disabled={isLoading}
        title="Click to set Pending"
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium
          bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 border border-green-200
          hover:from-yellow-50 hover:to-orange-50 hover:text-yellow-600 hover:border-yellow-200
          transition-all duration-150 disabled:opacity-50 cursor-pointer"
      >
        {isLoading
          ? <i className="ri-loader-4-line animate-spin" />
          : <i className="ri-verified-badge-line" />}
        verify
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      title="Click to verify"
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium
        bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-600 border border-yellow-200
        hover:from-green-50 hover:to-emerald-50 hover:text-green-600 hover:border-green-200
        transition-all duration-150 disabled:opacity-50 cursor-pointer"
    >
      {isLoading
        ? <i className="ri-loader-4-line animate-spin" />
        : <i className="ri-time-line" />}
      Pending
    </button>
  );
};

export default StatusBadge;
