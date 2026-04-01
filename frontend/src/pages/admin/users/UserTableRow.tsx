import React from "react";
import StatusBadge from "./StatusBadge";

const GRADIENT = "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500";
const GRADIENT_TEXT = `${GRADIENT} bg-clip-text text-transparent`;

export interface User {
  _id: string;
  nic?: string;
  phone?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role: string;
  status: "Pending" | "verify";
  gender?: string;
  district?: string;
  ProfilePicture?: string;
  createdAt?: string;
}

interface UserTableRowProps {
  user: User;
  index: number;
  onDeleteClick: (id: string) => void;
  onStatusUpdated: () => void;
  onStatusError: () => void;
}

const initials = (u: User) =>
  u.first_name && u.last_name
    ? `${u.first_name[0]}${u.last_name[0]}`.toUpperCase()
    : (u.email?.[0] ?? "U").toUpperCase();

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  index,
  onDeleteClick,
  onStatusUpdated,
  onStatusError,
}) => {
  return (
    <tr
      className={`border-b border-purple-50 transition-colors hover:bg-purple-50/30 ${
        index % 2 === 0 ? "bg-white/60" : "bg-purple-50/20"
      }`}
    >
      {/* User */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className={`p-[2px] rounded-full ${GRADIENT} shrink-0`}>
            {user.ProfilePicture ? (
              <img
                src={user.ProfilePicture}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover bg-white block"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <span className={`text-xs font-bold ${GRADIENT_TEXT}`}>
                  {initials(user)}
                </span>
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {user.first_name && user.last_name
                ? `${user.first_name} ${user.last_name}`
                : <span className="text-gray-300 italic text-xs">No name</span>}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{user.email ?? "—"}</p>
          </div>
        </div>
      </td>

      {/* NIC */}
      <td className="px-4 py-3.5 text-xs text-gray-500 font-mono">{user.nic ?? "—"}</td>

      {/* Phone */}
      <td className="px-4 py-3.5 text-xs text-gray-500 font-mono">{user.phone ?? "—"}</td>

      {/* District */}
      <td className="px-4 py-3.5 text-xs text-gray-600">{user.district ?? "—"}</td>

      {/* Gender */}
      <td className="px-4 py-3.5 text-xs text-gray-600">{user.gender ?? "—"}</td>

      {/* Role */}
      <td className="px-4 py-3.5">
        {user.role === "admin" ? (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${GRADIENT} text-white shadow-sm shadow-purple-200`}>
            <i className="ri-shield-star-line" />
            admin
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-purple-50 text-purple-400 border border-purple-100">
            <i className="ri-user-line" />
            user
          </span>
        )}
      </td>

      {/* Status — clickable toggle */}
      <td className="px-4 py-3.5">
        <StatusBadge
          userId={user._id}
          status={user.status}
          onSuccess={onStatusUpdated}
          onError={onStatusError}
        />
      </td>

      {/* Joined */}
      <td className="px-4 py-3.5 text-xs text-gray-400 font-mono">
        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
      </td>

      {/* Delete */}
      <td className="px-4 py-3.5">
        <button
          onClick={() => onDeleteClick(user._id)}
          className="w-8 h-8 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 text-red-400 flex items-center justify-center transition-colors shadow-sm"
          title="Delete user"
        >
          <i className="ri-delete-bin-6-line text-sm" />
        </button>
      </td>
    </tr>
  );
};

export default UserTableRow;
