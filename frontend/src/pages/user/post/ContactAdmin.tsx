import React, { useState } from "react";
import { CheckCircle, MessageCircle, Copy, Check, ExternalLink, Info } from "lucide-react";

const ADMIN_PHONE = "94766500567"; // no + for wa.me link
const ADMIN_DISPLAY = "+94 76 650 0567";

const WA_MESSAGE = encodeURIComponent(
  "Hello Admin, I have successfully created my post on the matrimony platform. Could you please review and verify my post? Thank you."
);

const WA_URL = `https://wa.me/${ADMIN_PHONE}?text=${WA_MESSAGE}`;

const ContactAdmin: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ADMIN_DISPLAY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    window.open(WA_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Success card */}
        <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-2xl rounded-3xl overflow-hidden">

          {/* Top gradient bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />

          <div className="p-8 flex flex-col items-center gap-6">

            {/* Success icon */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shadow-inner">
                <CheckCircle size={40} className="text-emerald-500" />
              </div>
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full animate-ping bg-emerald-300 opacity-20" />
            </div>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Post Created!
              </h1>
              <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
                Your post has been submitted successfully.<br />
                Contact the admin via WhatsApp to get it reviewed and verified.
              </p>
            </div>

            {/* Steps */}
            <div className="w-full space-y-3">
              {[
                { step: "1", label: "Post submitted", done: true },
                { step: "2", label: "Contact admin for review", done: false, active: true },
                { step: "3", label: "Post goes live after verification", done: false },
              ].map(({ step, label, done, active }) => (
                <div key={step} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all
                  ${done
                    ? "bg-emerald-50 border-emerald-200"
                    : active
                      ? "bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 border-purple-200"
                      : "bg-gray-50 border-gray-100"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0
                    ${done
                      ? "bg-emerald-500 text-white"
                      : active
                        ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {done ? <Check size={12} /> : step}
                  </div>
                  <span className={`text-sm font-medium
                    ${done ? "text-emerald-700" : active ? "text-purple-700" : "text-gray-400"}`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Admin number display */}
            <div className="w-full bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-4">
              <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Admin WhatsApp</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* WhatsApp green dot indicator */}
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-base font-bold text-gray-700 tracking-wide">{ADMIN_DISPLAY}</span>
                </div>
                <button
                  onClick={handleCopy}
                  title="Copy number"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
                    border-purple-200 text-purple-500 hover:bg-purple-100"
                >
                  {copied
                    ? <><Check size={12} className="text-emerald-500" /> Copied</>
                    : <><Copy size={12} /> Copy</>}
                </button>
              </div>
            </div>

            {/* WhatsApp CTA button */}
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-base
                bg-[#25D366] hover:bg-[#1ebe5d] active:scale-[0.98] transition-all shadow-lg shadow-green-200"
            >
              {/* WhatsApp SVG icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contact Admin on WhatsApp
              <ExternalLink size={15} className="opacity-70" />
            </button>

            {/* Info note */}
            <div className="w-full flex items-start gap-2 px-3 py-2.5 rounded-xl bg-blue-50 border border-blue-100">
              <Info size={14} className="text-blue-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-blue-500 leading-relaxed">
                A pre-filled message will open in WhatsApp. You can edit it before sending. Admin typically responds within 24 hours.
              </p>
            </div>

          </div>
        </div>

        {/* Back link */}
        <p className="text-center text-xs text-gray-400 mt-5">
          Already contacted?{" "}
          <a href="/" className="text-purple-500 hover:underline font-medium">
            Back to home
          </a>
        </p>

      </div>
    </div>
  );
};

export default ContactAdmin;
