
import React, { useState } from "react";
import LoginIMG from "../../assets/Signin.jpg";
import { useSignupMutation } from "../../redux/userAuth/userAuthAPI";
import { useNavigate, Link } from "react-router-dom";
import { HiIdentification, HiPhone, HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";

const SignUp: React.FC = () => {

  const [nic, setNic] = useState<number | string>("");
  const [phone, setPhone] = useState<number | string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const [signup, { isLoading, error }] = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await signup({ nic, phone, email, password }).unwrap();
      console.log("Signup success:", res);
      navigate("/signin");
    } catch (err: any) {
      console.error("Signup failed:", err);
    }
  };

  const fields = [
    {
      icon: <HiIdentification className="text-pink-400" size={18} />,
      type: "text", placeholder: "NIC Number",
      value: nic, onChange: (e: any) => setNic(e.target.value),
    },
    {
      icon: <HiPhone className="text-purple-400" size={18} />,
      type: "tel", placeholder: "WhatsApp Number",
      value: phone, onChange: (e: any) => setPhone(e.target.value),
    },
    {
      icon: <HiMail className="text-indigo-400" size={18} />,
      type: "email", placeholder: "Email Address",
      value: email, onChange: (e: any) => setEmail(e.target.value),
    },
  ];

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
            <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-center order-2 md:order-1">

              <div className="mb-8">
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Theeka
                </span>
                <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-1">
                  Create account ✨
                </h2>
                <p className="text-gray-400 text-sm">
                  Start your journey to find the one
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>

                {/* Regular fields */}
                {fields.map((field, i) => (
                  <div key={i} className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      {field.icon}
                    </div>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={field.onChange}
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/80 border border-gray-200
                      text-gray-700 placeholder:text-gray-300 outline-none
                      focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition"
                    />
                  </div>
                ))}

                {/* Password */}
                <div className="relative">
                  <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-11 py-3 rounded-xl bg-white/80 border border-gray-200
                    text-gray-700 placeholder:text-gray-300 outline-none
                    focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition">
                    {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-11 py-3 rounded-xl bg-white/80 border border-gray-200
                    text-gray-700 placeholder:text-gray-300 outline-none
                    focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition">
                    {showConfirm ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <p className="text-red-400 text-sm">
                      {(error as any)?.data?.message || "Signup failed"}
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
                      Creating Account...
                    </span>
                  ) : "Create Account"}
                </button>

              </form>

              <p className="text-sm text-center text-gray-400 mt-6">
                Already have an account?{" "}
                <Link to="/signin" className="font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition">
                  Sign in
                </Link>
              </p>

            </div>

            {/* Right — Image Panel */}
            <div className="hidden md:flex relative flex-col justify-end overflow-hidden order-1 md:order-2">

              <img
                src={LoginIMG}
                alt="Signup"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-purple-900/40 to-transparent" />

              <div className="relative z-10 p-10 text-white">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-4 py-1.5 mb-6">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-xs font-medium tracking-wide">Join Today</span>
                </div>
                <h3 className="text-3xl font-bold leading-tight mb-3">
                  Begin your story<br />with us today
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Create your profile and let your perfect match find you.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUp;