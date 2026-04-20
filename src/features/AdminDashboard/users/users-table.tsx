"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, Check, Ban, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { getUsersAction, approveUserAction, blockUserAction, deleteUserAction, unblockUserAction } from "./users.actions";
import { IUser } from "./users.types";

const ITEMS_PER_PAGE = 7;

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACTIVE: "bg-green-100 text-green-700",
  BLOCKED: "bg-red-100 text-red-700",
  DELETED: "bg-gray-100 text-gray-700",
};

export default function UsersTable() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  //  debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: () => getUsersAction(debouncedSearch),
  });

  const users: IUser[] = data?.data ?? [];
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const paginated = users.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

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

  if (isLoading) return <div className="p-8 text-center text-gray-400">Loading...</div>;


  return (
    <div className="p-6">
      <input
  type="text"
  placeholder="Search by name, email or branch ID..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full max-w-sm px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm mb-4"
/>
      {/* Table */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Branch ID</th>
              <th className="px-6 py-4 text-left">Institute</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                {/* User */}
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-800">{user.name ?? "—"}</div>
                  <div className="text-gray-400 text-xs">{user.email}</div>
                </td>

                {/* Branch ID */}
                <td className="px-6 py-4">
                  <span className="text-orange-500 font-semibold">
                    {user.branchId ?? "—"}
                  </span>
                </td>

                {/* Institute */}
                <td className="px-6 py-4">
                  <div className="text-gray-700">{user.instituteName ?? "—"}</div>
                  <div className="text-gray-400 text-xs">{user.district ?? "—"}</div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {/* View */}
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-500"
                    >
                      <Eye size={15} />
                    </button>

                    {/* Approve */}
                    {user.status === "PENDING" && (
                      <button
                        onClick={() => approve.mutate(user.id)}
                        className="p-2 rounded-lg border border-green-200 hover:bg-green-50 text-green-500"
                      >
                        <Check size={15} />
                      </button>
                    )}

                    {/* Block */}
                    {user.status === "ACTIVE" && (
                      <button
                        onClick={() => block.mutate(user.id)}
                        className="p-2 rounded-lg border border-red-200 hover:bg-red-50 text-red-400"
                      >
                        <Check size={15} />
                      </button>
                    )}
{user.status === "BLOCKED" && (
  <button
    onClick={() => unblock.mutate(user.id)}
    className="p-2 rounded-lg border border-green-200 hover:bg-green-50 text-green-500"
  >
    < Ban size={15} />
  </button>
)}
                    {/* Delete */}
                    <button
                      onClick={() => remove.mutate(user.id)}
                      className="p-2 rounded-lg border border-red-200 hover:bg-red-50 text-red-400"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <span>{users.length} জন user</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronLeft size={15} />
          </button>
          <span>{page} / {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">User Details</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
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
                <div key={label}>
                  <div className="text-gray-400 text-xs">{label}</div>
                  <div className="text-gray-700 font-medium">{value ?? "—"}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-6 w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}