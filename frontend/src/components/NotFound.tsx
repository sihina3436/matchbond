import React from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft, HiHome } from "react-icons/hi";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-md">
        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg 
            bg-white/80 border border-gray-200 text-gray-700 font-medium
            hover:bg-white hover:border-gray-300 transition"
          >
            <HiArrowLeft size={20} />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg 
            bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium
            hover:opacity-90 transition shadow-lg shadow-blue-200"
          >
            <HiHome size={20} />
            Go Home
          </button>
        </div>

        {/* Illustration */}
        <div className="mt-12">
          <div className="inline-block text-6xl">🔍</div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
