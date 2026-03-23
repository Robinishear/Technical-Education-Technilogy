import { toast } from "sonner";
import { authClient } from "./auth-client";

export const handleLogout = async () => {
  try {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে লগআউট হয়েছে! 🚪");
          window.location.href = "/login"; 
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "লগআউট করতে সমস্যা হয়েছে");
        }
      }
    });
  } catch (error) {
    console.error("Logout Error:", error);
  }
};