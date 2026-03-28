/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/core/lib/api";
import { toast } from "sonner";

export const handleLogout = async (router?: any) => {
  try {
    await api("/auth/logout", {
      method: "POST",
      credentials: "include", 
    });

    toast.success("Logged out successfully!");

    if (router) {
      router.push("/login");
      router.refresh();
    } else {
      window.location.href = "/login";
    }
  } catch (error: any) {
    console.error("Logout Error:", error);
    toast.error("There was a problem logging out.");
  }
};