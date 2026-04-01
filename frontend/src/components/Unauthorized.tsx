import React from "react";
import { Link } from "react-router-dom";
import { HiLockClosed, HiArrowRight } from "react-icons/hi";

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center px-6">

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-purple-200/30 p-10 text-center">

          {/* Lock icon */}
          <div className="flex justify-center mb-6">

            <div className="p-[3px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg shadow-purple-200">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                <HiLockClosed
                  size={34}
                  className="text-transparent"
                  style={{
                    stroke: "url(#lockGrad)",
                    fill: "url(#lockGrad)",
                  }}
                />
                {/* SVG gradient def */}
                <svg width="0" height="0" className="absolute">
                  <defs>
                    <linearGradient id="lockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

          </div>

          {/* Brand */}
          <span className="text-sm font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-wide">
            Theeka
          </span>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-3">
            Access Denied
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
            You need to sign in to access this page. Please login or create an account to continue.
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
            <span className="text-xs text-gray-300">continue with</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">

            <Link to="/signin" className="flex-1">
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl
              font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
              hover:opacity-90 transition shadow-lg shadow-purple-200">
                Login
                <HiArrowRight size={16} />
              </button>
            </Link>

            <div className="flex-1 p-[2px] rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              <Link to="/signup" className="block w-full">
                <button className="w-full px-6 py-[11px] rounded-[10px] bg-white hover:bg-pink-50
                font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition">
                  Register
                </button>
              </Link>
            </div>

          </div>

          {/* Footer hint */}
          <p className="text-xs text-gray-300 mt-6">
            Protected page — authentication required
          </p>

        </div>

      </div>

    </div>
  );
};

export default Unauthorized;