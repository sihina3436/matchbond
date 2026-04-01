import React, { useState } from "react";
import {
  useGetAllUserQuery,
  useDeleteUserByIdMutation,
} from "../../../redux/userAuth/userAuthAPI";
import "remixicon/fonts/remixicon.css";
import UserTableRow, { User } from "./UserTableRow";
import ConfirmModal from "./ConfirmModal";

const GRADIENT = "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500";
const GRADIENT_TEXT = `${GRADIENT} bg-clip-text text-transparent`;

const ManageUsers = () => {
  const { data: users = [], isLoading, isError, refetch } = useGetAllUserQuery(undefined);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserByIdMutation();

  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      showToast("User deleted successfully", "success");
      refetch();
    } catch {
      showToast("Failed to delete user", "error");
    } finally {
      setConfirmId(null);
    }
  };

  const filtered: User[] = users.filter((u: User) => {
    const q = search.toLowerCase();
    return (
      u.email?.toLowerCase().includes(q) ||
      u.phone?.includes(q) ||
      u.first_name?.toLowerCase().includes(q) ||
      u.last_name?.toLowerCase().includes(q) ||
      u.nic?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4 md:p-8">

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl
            text-sm font-semibold text-white shadow-2xl
            ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}
        >
          <i className={`${toast.type === "success" ? "ri-checkbox-circle-line" : "ri-close-circle-line"} text-base`} />
          {toast.msg}
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!confirmId}
        isLoading={isDeleting}
        onConfirm={() => confirmId && handleDelete(confirmId)}
        onCancel={() => setConfirmId(null)}
      />

      <div className="max-w-7xl mx-auto space-y-6">

        {/* Page Header */}
        <div className={`p-[2px] rounded-2xl ${GRADIENT} shadow-lg`}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className={`p-[2px] rounded-xl ${GRADIENT}`}>
                <div className="bg-white rounded-[10px] p-2">
                  <i className={`ri-group-line text-xl ${GRADIENT_TEXT}`} />
                </div>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${GRADIENT_TEXT}`}>Manage Users</h2>
                <p className="text-xs text-gray-400 mt-0.5">View, search and manage all registered users</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-50 to-indigo-50 border border-purple-100 rounded-xl text-xs font-semibold text-purple-500">
                <i className="ri-group-line" />
                {filtered.length} users
              </div>
              <button
                onClick={() => refetch()}
                className="w-9 h-9 rounded-xl border border-purple-100 bg-white flex items-center justify-center text-purple-400 hover:bg-purple-50 transition-colors shadow-sm"
              >
                <i className="ri-refresh-line text-base" />
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-md p-4">
          <div className="relative">
            <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-300 text-base" />
            <input
              type="text"
              placeholder="Search by name, email, phone, NIC…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gradient-to-r from-pink-50/50 via-purple-50/50 to-indigo-50/50 border border-purple-100 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <EmptyState icon="ri-loader-4-line" msg="Loading users…" spin />
        ) : isError ? (
          <EmptyState icon="ri-wifi-off-line" msg="Failed to load users." />
        ) : filtered.length === 0 ? (
          <EmptyState icon="ri-user-search-line" msg="No users found." />
        ) : (
          <div className={`p-[2px] rounded-2xl ${GRADIENT} shadow-lg`}>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50">
                    {["User", "NIC", "Phone", "District", "Gender", "Role", "Status", "Joined", ""].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3.5 text-left text-[10px] font-bold tracking-widest text-purple-400 uppercase border-b border-purple-100"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user: User, idx: number) => (
                    <UserTableRow
                      key={user._id}
                      user={user}
                      index={idx}
                      onDeleteClick={setConfirmId}
                      onStatusUpdated={() => {
                        showToast("Status updated successfully", "success");
                        refetch();
                      }}
                      onStatusError={() => showToast("Failed to update status", "error")}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

/* Empty / Loading State */
const EmptyState = ({ icon, msg, spin }: { icon: string; msg: string; spin?: boolean }) => (
  <div className="flex flex-col items-center justify-center py-20 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/40 shadow-md gap-4">
    <div className="p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-40">
      <div className="bg-white rounded-full p-4">
        <i className={`${icon} text-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent ${spin ? "animate-spin" : ""}`} />
      </div>
    </div>
    <p className="text-sm text-gray-400">{msg}</p>
  </div>
);

export default ManageUsers;
