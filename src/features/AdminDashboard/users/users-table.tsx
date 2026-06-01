"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Eye,
  Check,
  Ban,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
  RefreshCw,
  Plus,
  Shield,
  Users,
  HeartPulse,
  MapPin,
  Building,
} from "lucide-react";
import {
  getUsersAction,
  approveUserAction,
  blockUserAction,
  deleteUserAction,
  unblockUserAction,
} from "./users.actions";
import { IUser } from "./users.types";

const ITEMS_PER_PAGE = 10;

const statusBadge: Record<string, string> = {
  PENDING:
    "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  ACTIVE:
    "bg-green-50 text-green-700 border border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
  BLOCKED:
    "bg-red-50 text-red-700 border border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
  DELETED:
    "bg-gray-100 text-gray-500 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
};

export default function UsersTable() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: () => getUsersAction(debouncedSearch),
  });

  const users: IUser[] = data?.data ?? [];
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginated = users.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const approve = useMutation({
    mutationFn: (id: string) => approveUserAction(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
  const block = useMutation({
    mutationFn: (id: string) => blockUserAction(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
  const remove = useMutation({
    mutationFn: (id: string) => deleteUserAction(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
  const unblock = useMutation({
    mutationFn: (id: string) => unblockUserAction(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const totalUsers = users.length;
  const activeToday = users.filter((u) => u.status === "ACTIVE").length;
  const admins = users.filter((u) => u.role === "ADMIN").length;

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400 text-sm gap-2">
        <RefreshCw className="animate-spin text-blue-500" size={24} />
        <span className="font-bold tracking-widest uppercase text-xs">
          Loading Users Database... ⏳
        </span>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* ── 📊 Stat Cards (Grid auto-layout for mobile/desktop) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
            <Users className="text-purple-600 dark:text-purple-400" size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900 dark:text-gray-100">
              {totalUsers}
            </p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">
              Total Users
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center shrink-0">
            <HeartPulse
              className="text-pink-600 dark:text-pink-400"
              size={22}
            />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900 dark:text-gray-100">
              {activeToday}
            </p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">
              Active Today
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 flex items-center gap-4 shadow-xs sm:col-span-2 md:col-span-1">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
            <Shield size={22} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900 dark:text-gray-100">
              {admins}
            </p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">
              Admins
            </p>
          </div>
        </div>
      </div>

      {/* ── 🔔 Header Section ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            User Management 
          </h2>
          <p className="text-xs text-gray-500">
            Control application accessibility & roles
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition shadow-xs active:scale-98">
          <Plus size={16} /> Add New User
        </button>
      </div>

      {/* ── 🔍 Toolbar (Responsive spacing) ── */}
      <div className="flex flex-row items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
          />
        </div>
        <button
          onClick={() => refetch()}
          className="w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900 transition text-gray-500 shrink-0"
          aria-label="Refresh"
        >
          <RefreshCw size={15} />
        </button>
      </div>

      {/* ── 📱 Mobile Responsive Cards Grid (Hidden on Desktop) ── */}
      <div className="block lg:hidden space-y-4">
        {paginated.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-400 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 italic">
            কোনো user পাওয়া যায়নি। 🔍
          </div>
        ) : (
          paginated.map((user, i) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800/60 p-4 rounded-2xl shadow-xs space-y-4"
            >
              {/* Card Upper Top */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 block mb-1">
                    #
                    {String((page - 1) * itemsPerPage + i + 317).padStart(
                      6,
                      "0",
                    )}
                  </span>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 text-base leading-tight">
                    {user.name ?? "—"}
                  </h4>
                  <p className="text-xs text-gray-400 truncate max-w-50 sm:max-w-xs mt-0.5">
                    {user.email}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusBadge[user.status] ?? statusBadge.DELETED}`}
                >
                  {user.status}
                </span>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-gray-900 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                    Branch ID
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">
                    {user.branchId ?? "—"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                    Role
                  </span>
                  <span className="font-medium uppercase">{user.role}</span>
                </div>
                <div className="flex flex-col col-span-2 pt-1">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                    Institute
                  </span>
                  <span className="truncate font-medium flex items-center gap-1 mt-0.5">
                    <Building size={12} className="text-gray-400" />{" "}
                    {user.instituteName ?? "—"}
                  </span>
                  <span className="text-gray-400 text-[11px] flex items-center gap-1 mt-0.5">
                    <MapPin size={11} /> {user.district ?? "—"}
                  </span>
                </div>
              </div>

              {/* Action Operations */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-900 justify-end">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="px-3 py-2 flex items-center gap-1 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400 text-xs font-bold transition"
                >
                  <Eye size={14} /> View
                </button>

                {user.status === "PENDING" && (
                  <button
                    onClick={() => approve.mutate(user.id)}
                    className="p-2 rounded-xl border border-green-200 dark:border-green-900/40 bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 transition"
                  >
                    <Check size={14} />
                  </button>
                )}

                {user.status === "ACTIVE" && (
                  <button
                    onClick={() => block.mutate(user.id)}
                    className="p-2 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950 text-red-500 dark:text-red-400 transition"
                  >
                    <Ban size={14} />
                  </button>
                )}

                {user.status === "BLOCKED" && (
                  <button
                    onClick={() => unblock.mutate(user.id)}
                    className="p-2 rounded-xl border border-green-200 dark:border-green-900/40 bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 transition"
                  >
                    <Check size={14} />
                  </button>
                )}

                <button
                  onClick={() => remove.mutate(user.id)}
                  className="p-2 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950 text-red-500 dark:text-red-400 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── 🖥️ Desktop Classic Grid View (Hidden on Mobile) ── */}
      <div className="hidden lg:block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/70 border-b border-gray-200 dark:border-gray-800 font-bold">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-5 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-5 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                  Branch ID
                </th>
                <th className="px-5 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                  Institute
                </th>
                <th className="px-5 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-5 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-4 text-right text-xs font-black text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-sm text-gray-400 italic"
                  >
                    কোনো user পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                paginated.map((user, i) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="px-5 py-4 text-xs font-mono text-gray-400 dark:text-gray-500">
                      {String((page - 1) * itemsPerPage + i + 317).padStart(
                        6,
                        "0",
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold text-gray-900 dark:text-gray-100">
                        {user.name ?? "—"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate max-w-44">
                        {user.email}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-amber-600 dark:text-amber-400 font-bold text-xs bg-amber-500/5 px-2 py-1 rounded-md">
                        {user.branchId ?? "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-gray-700 dark:text-gray-300 text-xs font-medium">
                        {user.instituteName ?? "—"}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {user.district ?? "—"}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                      {user.role}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${statusBadge[user.status] ?? statusBadge.DELETED}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* View */}
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition hover:scale-105"
                          aria-label="View"
                        >
                          <Eye size={14} />
                        </button>

                        {/* Approve */}
                        {user.status === "PENDING" && (
                          <button
                            onClick={() => approve.mutate(user.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-xl border border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/30 text-green-600 transition hover:scale-105"
                            aria-label="Approve"
                          >
                            <Check size={14} />
                          </button>
                        )}

                        {/* Block */}
                        {user.status === "ACTIVE" && (
                          <button
                            onClick={() => block.mutate(user.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-xl border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 transition hover:scale-105"
                            aria-label="Block"
                          >
                            <Ban size={14} />
                          </button>
                        )}

                        {/* Unblock */}
                        {user.status === "BLOCKED" && (
                          <button
                            onClick={() => unblock.mutate(user.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-xl border border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/30 text-green-600 transition hover:scale-105"
                            aria-label="Unblock"
                          >
                            <Check size={14} />
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          onClick={() => remove.mutate(user.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-xl border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 transition hover:scale-105"
                          aria-label="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 🎛️ Responsive Footer Pagination ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 pt-2">
        <div className="flex items-center gap-2 order-2 sm:order-1">
          <span>Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="text-sm border border-gray-200 dark:border-gray-800 rounded-xl px-2 py-1 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <option value={7}>7</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span>entries · {users.length} জন user</span>
        </div>

        <div className="flex items-center gap-1.5 order-1 sm:order-2">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition"
          >
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(
            (p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 flex items-center justify-center rounded-xl border text-xs font-bold transition ${
                  page === p
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                {p}
              </button>
            ),
          )}
          {totalPages > 5 && <span className="px-1 text-gray-400">…</span>}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── 🪟 Detail Modal (Fully Responsive Content Grid) ── */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg shadow-2xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-5 border-b border-gray-100 dark:border-gray-800 pb-3">
              <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-gray-900 dark:text-gray-100">
                User Details Profile 🧑‍💻
              </h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 font-bold transition"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["Name", selectedUser.name],
                ["Email", selectedUser.email],
                ["Branch ID", selectedUser.branchId],
                ["Institute", selectedUser.instituteName],
                ["Director", selectedUser.directorName],
                ["Mobile", selectedUser.mobileNumber],
                ["Gender", selectedUser.gender],
                ["District", selectedUser.district],
                ["Course", selectedUser.courseName],
                ["Duration", selectedUser.duration],
                ["Status", selectedUser.status],
                ["Role", selectedUser.role],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-gray-50/50 dark:bg-gray-950 p-2.5 rounded-xl border border-gray-100 dark:border-gray-900"
                >
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 wrap-break-word">
                    {value ?? "—"}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-6 w-full py-3 text-xs uppercase font-bold tracking-wider rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition shadow-xs active:scale-98"
            >
              Close Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
