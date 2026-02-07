import React from "react";
import LoginIMG from "../assets/Signin.jpg";

const ForgotPassword = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${LoginIMG})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/60 to-purple-900/70" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl overflow-hidden p-8 sm:p-10 text-white">

        <h2 className="text-3xl font-bold mb-2">Forgot Password 🔐</h2>
        <p className="text-white/70 mb-6 text-sm">
          Enter your email to receive OTP
        </p>

        <form className="space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          {/* Send OTP Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition shadow-lg"
          >
            Send OTP
          </button>
        </form>

        <p className="text-sm text-center text-white/70 mt-6">
          Remember password?{" "}
          <a href="#" className="text-purple-300 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
