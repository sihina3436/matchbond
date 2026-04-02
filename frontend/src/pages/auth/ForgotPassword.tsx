import React, { useState } from "react";
import LoginIMG from "../../assets/Signin.jpg";
import { useForgotPasswordMutation } from "../../redux/userAuth/userAuthAPI";
import { useNavigate, Link } from "react-router-dom";
import { HiMail } from "react-icons/hi";

const ForgotPassword: React.FC = () => {

  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      navigate("/reset-password");
    } catch (err: any) {
      console.error("Forgot password failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center px-4 py-10">

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">

        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-purple-200/30 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Left — Form Panel */}
            <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-center">

              {/* Brand */}
              <div className="mb-8">

                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Theeka
                </span>

                <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-1">
                  Forgot Password 🔐
                </h2>

                <p className="text-gray-400 text-sm">
                  Enter your email address and we'll send you an OTP to reset your password
                </p>

              </div>

              {/* OTP sent hint */}
              <div className="flex items-start gap-3 bg-purple-50 border border-purple-100 rounded-2xl px-4 py-3 mb-6">
                <div className="mt-0.5 w-7 h-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shrink-0">
                  <HiMail className="text-white" size={14} />
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We'll send a <span className="font-semibold text-purple-500">6-digit OTP</span> to your email. Check your inbox and spam folder after submitting.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/80 border border-gray-200
                      text-gray-700 placeholder:text-gray-300 outline-none
                      focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                  hover:opacity-90 transition shadow-lg shadow-purple-200
                  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Sending OTP...
                    </span>
                  ) : "Send OTP"}
                </button>

              </form>

              <p className="text-sm text-center text-gray-400 mt-8">
                Remembered your password?{" "}
                <Link
                  to="/signin"
                  className="font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition"
                >
                  Sign in
                </Link>
              </p>

            </div>

            {/* Right — Image Panel */}
            <div className="hidden md:flex relative flex-col justify-end overflow-hidden">

              <img
                src={LoginIMG}
                alt="Forgot Password"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-purple-900/40 to-transparent" />

              <div className="relative z-10 p-10 text-white">

                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-4 py-1.5 mb-6">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-xs font-medium tracking-wide">
                    Password Recovery
                  </span>
                </div>

                <h3 className="text-3xl font-bold leading-tight mb-3">
                  Recover access<br />to your account
                </h3>

                <p className="text-white/70 text-sm leading-relaxed">
                  Don't worry, it happens to the best of us. We'll help you get back in safely.
                </p>

              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;