import React from "react";
import LoginIMG from "../../assets/Signin.jpg";

const VerifyOTP: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
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

        <h2 className="text-3xl font-bold mb-2">Verify OTP 🔑</h2>
        <p className="text-white/70 mb-6 text-sm">
          Enter the 6-digit OTP sent to your email
        </p>

        <form className="space-y-4">
          {/* OTP Input */}
          <input
            type="text"
            placeholder="6-digit OTP"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition shadow-lg"
          >
            Verify OTP
          </button>
        </form>

        <p className="text-sm text-center text-white/70 mt-6">
          Didn’t receive OTP?{" "}
          <a href="#" className="text-purple-300 hover:underline">
            Resend OTP
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
