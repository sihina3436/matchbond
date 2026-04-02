import React, { useState } from "react";
import LoginIMG from "../../assets/Signin.jpg";
import { useSigninMutation } from "../../redux/userAuth/userAuthAPI";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userAuth/userAuthSlice";
import { useDispatch } from "react-redux";
import { HiPhone, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phone, setPhone] = useState<number | string>("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [signin, { isLoading, error }] = useSigninMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signin({ phone, password }).unwrap();
      dispatch(setUser(res.user));
      navigate("/feed");
    } catch (err: any) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center px-4 py-10">

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">

        {/* Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-purple-200/30 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Left — Image Panel */}
            <div className="hidden md:flex relative flex-col justify-end overflow-hidden">

              <img
                src={LoginIMG}
                alt="Login"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-pink-900/40 to-transparent" />

              {/* Text on image */}
              <div className="relative z-10 p-10 text-white">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-4 py-1.5 mb-6">
                  <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                  <span className="text-xs font-medium tracking-wide">Find Your Match</span>
                </div>
                <h3 className="text-3xl font-bold leading-tight mb-3">
                  Your perfect match<br />is waiting for you
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Join thousands of people who found their life partner through our platform.
                </p>
              </div>

            </div>

            {/* Right — Form Panel */}
            <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-center">

              {/* Logo / Brand */}
              <div className="mb-8">
                <span onClick={() => navigate("/admin/signin")}   className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Theeka
                </span>
                <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-1">
                  Welcome back 👋
                </h2>
                <p className="text-gray-400 text-sm">
                  Sign in to continue your journey
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <HiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
                    <input
                      type="tel"
                      placeholder="+94 7X XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/80 border border-gray-200
                      text-gray-700 placeholder:text-gray-300 outline-none
                      focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-11 pr-11 py-3 rounded-xl bg-white/80 border border-gray-200
                      text-gray-700 placeholder:text-gray-300 outline-none
                      focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition"
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

                {/* Forgot */}
                <div className="flex justify-end">
                  <a href="/forgot-password" className="text-sm text-purple-400 hover:text-pink-500 transition">
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
                  bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                  hover:opacity-90 transition shadow-lg shadow-purple-200
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

              {/* Footer */}
              <p className="text-sm text-center text-gray-400 mt-8">
                Don't have an account?{" "}
                <a href="/signup" className="font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition">
                  Create account
                </a>
              </p>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SignIn;