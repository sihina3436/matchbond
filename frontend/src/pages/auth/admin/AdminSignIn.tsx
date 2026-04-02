import React, { useState } from "react";
import AdminLoginIMG from "../../../assets/Signin.jpg"; // Update with your admin image
import { useLoginAdminMutation } from "../../../redux/adminAuth/adminAuthApi";
import { useNavigate } from "react-router-dom";
import { setAdmin } from "../../../redux/adminAuth/adminAuthSlice";
import { useDispatch } from "react-redux";
import { HiMail , HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";

const AdminSignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loginAdmin, { isLoading, error }] = useLoginAdminMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginAdmin({ email, password }).unwrap();
      dispatch(setAdmin(res.admin));
      console.log("Admin login successful:", res);
      navigate("/admin");
    } catch (err: any) {
      console.error("Admin login failed:", err);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-10">

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-slate-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">

        {/* Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-blue-200/30 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Left — Image Panel */}
            <div className="hidden md:flex relative flex-col justify-end overflow-hidden">

              <img
                src={AdminLoginIMG}
                alt="Admin Login"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-indigo-900/40 to-transparent" />

              {/* Text on image */}
              <div className="relative z-10 p-10 text-white">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-4 py-1.5 mb-6">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-xs font-medium tracking-wide">Admin Portal</span>
                </div>
                <h3 className="text-3xl font-bold leading-tight mb-3">
                  Manage Your<br />Platform Effortlessly
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Access administrative controls to manage banners, profiles, and platform content.
                </p>
              </div>

            </div>

            {/* Right — Form Panel */}
            <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-center">

              {/* Logo / Brand */}
              <div className="mb-8">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-600 bg-clip-text text-transparent">
                  Theeka Admin
                </span>
                <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-1">
                  Admin Login 🔐
                </h2>
                <p className="text-gray-400 text-sm">
                  Sign in to access the admin dashboard
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <HiMail  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
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

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <a href="/admin/forgot-password" className="text-sm text-indigo-400 hover:text-blue-500 transition">
                    Forgot password?
                  </a>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <p className="text-red-400 text-sm">
                      Login failed. Please check your credentials.
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-600
                  hover:opacity-90 transition shadow-lg shadow-blue-200
                  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Signing In...
                    </span>
                  ) : "Sign In"}
                </button>

              </form>


            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminSignIn;
