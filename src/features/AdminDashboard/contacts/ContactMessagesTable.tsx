/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell, Mail, Phone, BookOpen, Trash2 } from "lucide-react";
import { deleteContactMessageAction, getContactMessagesAction, getUnreadCountAction } from "./admin-contact.actions";

export default function ContactMessagesTable() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["contact-messages"],
    queryFn: getContactMessagesAction,
  });

  const { data: unreadData } = useQuery({
    queryKey: ["unread-count"],
    queryFn: getUnreadCountAction,
    refetchInterval: 90000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteContactMessageAction(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact-messages"] }),
  });

  const messages = (data?.data as any)?.data ?? [];
  const unreadCount = (unreadData?.data as any)?.data?.count ?? 0;

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Contact Messages</h1>
        <div className="relative">
          <Bell size={24} className="text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Contact</th>
              <th className="px-6 py-4 text-left">Subject</th>
              <th className="px-6 py-4 text-left">Message</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {messages.map((msg: any) => (
              <tr key={msg.id} className={`transition-colors hover:bg-accent ${!msg.isRead ? "bg-yellow-500/10" : ""}`}>
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">{msg.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Mail size={12} /> {msg.email}
                  </div>
                  {msg.phone && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Phone size={12} /> {msg.phone}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <BookOpen size={12} /> {msg.subject ?? "—"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-muted-foreground text-xs max-w-xs truncate">{msg.message}</p>
                </td>
                <td className="px-6 py-4 text-xs text-muted-foreground">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${msg.isRead ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"}`}>
                    {msg.isRead ? "Read" : "Unread"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteMutation.mutate(msg.id)}
                    className="p-2 rounded-lg border border-red-500/20 hover:bg-red-500/10 text-red-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}