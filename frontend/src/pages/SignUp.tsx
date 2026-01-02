import React from "react";
import LoginIMG from "../assets/Signin.jpg";

const SignUp = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${LoginIMG})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/60 to-purple-900/70" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-4xl rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl overflow-hidden">

        <div className="grid grid-cols-1 md:grid-cols-2">

          <div className="hidden md:block">
            <img src={LoginIMG} className="w-full h-full object-cover" />
          </div>

          <div className="p-8 sm:p-10 text-white">
            <h2 className="text-3xl font-bold mb-2">Create Account ✨</h2>
            <p className="text-white/70 mb-6 text-sm">
              Sign up to get started
            </p>

            <form className="space-y-4">

              {/* INC */}
              <input
                type="text"
                placeholder="INC Number"
                className="auth-input"
              />

              {/* Phone */}
              <input
                type="tel"
                placeholder="WhatsApp Number"
                className="auth-input"
              />

              {/* Password */}
              <input
                type="password"
                placeholder="Password"
                className="auth-input"
              />

              {/* Confirm Password */}
              <input
                type="password"
                placeholder="Confirm Password"
                className="auth-input"
              />

              <button className="auth-btn">
                Sign Up
              </button>
            </form>

            <p className="text-sm text-center text-white/70 mt-6">
              Already have an account?{" "}
              <a href="#" className="text-purple-300 hover:underline">
                Login
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
