"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Eye, Check, Ban, Trash2,
  ChevronLeft, ChevronRight, Search, RefreshCw, Plus, Shield
} from "lucide-react";
import { getUsersAction, approveUserAction, blockUserAction, deleteUserAction, unblockUserAction } from "./users.actions";
import { IUser } from "./users.types";

const ITEMS_PER_PAGE = 10;

const statusBadge: Record<string, string> = {
  PENDING:  "bg-amber-50 text-amber-700 border border-amber-200",
  ACTIVE:   "bg-green-50 text-green-700 border border-green-200",
  BLOCKED:  "bg-red-50 text-red-700 border border-red-200",
  DELETED:  "bg-gray-100 text-gray-500 border border-gray-200",
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

  const totalUsers  = users.length;
  const activeToday = users.filter((u) => u.status === "ACTIVE").length;
  const admins      = users.filter((u) => u.role === "ADMIN").length;

  if (isLoading) return (
    <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
      Loading...
    </div>
  );

  return (
    <div className="p-6 space-y-5">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <p className="text-2xl font-medium text-gray-900 dark:text-gray-100">{totalUsers}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Total users</p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-pink-50 dark:bg-pink-900/30 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4537E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <div>
            <p className="text-2xl font-medium text-gray-900 dark:text-gray-100">{activeToday}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Active today</p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
            <Shield size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-medium text-gray-900 dark:text-gray-100">{admins}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Admins</p>
          </div>
        </div>
      </div>

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-gray-900 dark:text-gray-100">User management</h2>
        <button className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition">
          <Plus size={15} /> Add new
        </button>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => refetch()}
          className="w-9 h-9 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-500"
          aria-label="Refresh"
        >
          <RefreshCw size={15} />
        </button>
      </div>

      {/* ── Table ── */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Branch ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Institute</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400 italic">
                  কোনো user পাওয়া যায়নি।
                </td>
              </tr>
            ) : (
              paginated.map((user, i) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-gray-400 dark:text-gray-500">
                    {String((page - 1) * itemsPerPage + i + 317).padStart(6, "0")}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 dark:text-gray-100">{user.name ?? "—"}</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate max-w-40">{user.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-amber-600 dark:text-amber-400 font-medium text-xs">
                      {user.branchId ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-700 dark:text-gray-300 text-xs">{user.instituteName ?? "—"}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{user.district ?? "—"}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                    {user.role}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[user.status] ?? statusBadge.DELETED}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {/* View */}
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition"
                        aria-label="View"
                      >
                        <Eye size={13} />
                      </button>

                      {/* Approve */}
                      {user.status === "PENDING" && (
                        <button
                          onClick={() => approve.mutate(user.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/30 text-green-600 transition"
                          aria-label="Approve"
                        >
                          <Check size={13} />
                        </button>
                      )}

                      {/* Block */}
                      {user.status === "ACTIVE" && (
                        <button
                          onClick={() => block.mutate(user.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 transition"
                          aria-label="Block"
                        >
                          <Ban size={13} />
                        </button>
                      )}

                      {/* Unblock */}
                      {user.status === "BLOCKED" && (
                        <button
                          onClick={() => unblock.mutate(user.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/30 text-green-600 transition"
                          aria-label="Unblock"
                        >
                          <Check size={13} />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => remove.mutate(user.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 transition"
                        aria-label="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setPage(1); }}
            className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <option value={7}>7</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span>entries · {users.length} জন user</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition"
          >
            <ChevronLeft size={13} />
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-medium transition ${
                page === p
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              {p}
            </button>
          ))}
          {totalPages > 5 && <span>…</span>}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* ── Detail Modal ── */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-medium text-gray-900 dark:text-gray-100">User details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Name",      selectedUser.name],
                ["Email",     selectedUser.email],
                ["Branch ID", selectedUser.branchId],
                ["Institute", selectedUser.instituteName],
                ["Director",  selectedUser.directorName],
                ["Mobile",    selectedUser.mobileNumber],
                ["Gender",    selectedUser.gender],
                ["District",  selectedUser.district],
                ["Course",    selectedUser.courseName],
                ["Duration",  selectedUser.duration],
                ["Status",    selectedUser.status],
                ["Role",      selectedUser.role],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{value ?? "—"}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-6 w-full py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}