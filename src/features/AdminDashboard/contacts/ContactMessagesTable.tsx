/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { Bell, Mail, Phone, BookOpen } from "lucide-react";
import { getContactMessagesAction, getUnreadCountAction } from "./admin-contact.actions";

export default function ContactMessagesTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["contact-messages"],
    queryFn: getContactMessagesAction,
  });

  const { data: unreadData } = useQuery({
    queryKey: ["unread-count"],
    queryFn: getUnreadCountAction,
    refetchInterval: 30000, 
  });

  // const messages = data?.data?.data ?? [];
  // const unreadCount = unreadData?.data?.data?.count ?? 0;
const messages = (data?.data as any)?.data ?? [];
const unreadCount = (unreadData?.data as any)?.data?.count ?? 0;

  if (isLoading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <div className="relative">
          <Bell size={24} className="text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Contact</th>
              <th className="px-6 py-4 text-left">Subject</th>
              <th className="px-6 py-4 text-left">Message</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {messages.map((msg: any) => (
              <tr key={msg.id} className={`hover:bg-gray-50 transition-colors ${!msg.isRead ? "bg-yellow-50" : ""}`}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-800">{msg.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Mail size={12} /> {msg.email}
                  </div>
                  {msg.phone && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Phone size={12} /> {msg.phone}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <BookOpen size={12} /> {msg.subject ?? "—"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-600 text-xs max-w-xs truncate">{msg.message}</p>
                </td>
                <td className="px-6 py-4 text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${msg.isRead ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {msg.isRead ? "Read" : "Unread"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}