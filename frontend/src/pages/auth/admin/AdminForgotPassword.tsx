import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation, useResetPasswordMutation } from "../../../redux/adminAuth/adminAuthApi";
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiArrowLeft } from "react-icons/hi";

type ForgotPasswordStep = "email" | "otp-reset" | "success";

const AdminForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ForgotPasswordStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [forgotPassword, { isLoading: isForgotLoading, error: forgotError }] = useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetLoading, error: resetError }] = useResetPasswordMutation();

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email).unwrap();
      setStep("otp-reset");
    } catch (err: any) {
      console.error("Forgot password error:", err);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await resetPassword({ email, otp, newPassword }).unwrap();
      setStep("success");
      setTimeout(() => navigate("/admin/signin"), 2000);
    } catch (err: any) {
      console.error("Reset password error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-10">

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-blue-200/30 overflow-hidden">
          <div className="p-8 sm:p-10">

            {/* Back Button */}
            <button
              onClick={() => navigate("/admin/login")}
              className="flex items-center gap-2 text-sm text-indigo-400 hover:text-blue-500 transition mb-8"
            >
              <HiArrowLeft size={16} />
              Back to Login
            </button>

            {/* Step 1: Email */}
            {step === "email" && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
                  <p className="text-gray-400 text-sm">
                    Enter your email address to receive an OTP for password reset.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleForgotSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                      <input
                        type="email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/80 border border-gray-200
                        text-gray-700 placeholder:text-gray-300 outline-none
                        focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
                      />
                    </div>
                  </div>

                  {forgotError && (
                    <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      <p className="text-red-400 text-sm">
                        Failed to send OTP. Please check your email address.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isForgotLoading}
                    className="w-full py-3 rounded-xl font-semibold text-white
                    bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-600
                    hover:opacity-90 transition shadow-lg shadow-blue-200
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isForgotLoading ? "Sending OTP..." : "Send OTP"}
                  </button>
                </form>
              </>
            )}

            {/* Step 2: OTP and New Password */}
            {step === "otp-reset" && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h2>
                  <p className="text-gray-400 text-sm">
                    Enter the OTP and your new password.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleResetSubmit}>
                  {/* OTP */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      OTP
                    </label>
                    <input
                      type="text"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-200
                      text-gray-700 placeholder:text-gray-300 outline-none text-center text-2xl tracking-widest
                      focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400" size={18} />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full pl-11 pr-11 py-3 rounded-xl bg-white/80 border border-gray-200
                        text-gray-700 placeholder:text-gray-300 outline-none
                        focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition"
                      >
                        {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400" size={18} />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full pl-11 pr-11 py-3 rounded-xl bg-white/80 border border-gray-200
                        text-gray-700 placeholder:text-gray-300 outline-none
                        focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition"
                      >
                        {showConfirmPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                      </button>
                    </div>
                  </div>

                  {resetError && (
                    <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      <p className="text-red-400 text-sm">
                        Invalid OTP or password reset failed.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isResetLoading}
                    className="w-full py-3 rounded-xl font-semibold text-white
                    bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-600
                    hover:opacity-90 transition shadow-lg shadow-blue-200
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isResetLoading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              </>
            )}

            {/* Step 3: Success */}
            {step === "success" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-3xl">✓</div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Reset!</h2>
                <p className="text-gray-400 text-sm mb-6">
                  Your password has been successfully reset. Redirecting to login...
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminForgotPassword;
