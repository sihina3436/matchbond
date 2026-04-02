import React, { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown, Check } from "lucide-react";

export const SL_DISTRICTS = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
  "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
  "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
  "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
  "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya",
];

interface DistrictDropdownProps {
  value: string;
  onChange: (v: string) => void;
}

const DistrictDropdown: React.FC<DistrictDropdownProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between border rounded-xl py-3 pl-4 pr-4 text-sm bg-white outline-none transition
          focus:ring-2 focus:ring-pink-400
          ${value ? "border-pink-300 text-gray-700" : "border-gray-200 text-gray-400"}`}
      >
        <span className="flex items-center gap-2">
          <MapPin size={17} className="text-pink-400 shrink-0" />
          {value || "Select a district…"}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute z-30 mt-1 w-full bg-white border border-purple-100 rounded-xl shadow-xl max-h-56 overflow-y-auto py-1">
          {SL_DISTRICTS.map((district) => {
            const selected = value === district;
            return (
              <li key={district}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange(district);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors
                    ${selected
                      ? "bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 text-purple-600 font-semibold"
                      : "text-gray-600 hover:bg-purple-50"
                    }`}
                >
                  {district}
                  {selected && <Check size={13} className="text-purple-500" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DistrictDropdown;
