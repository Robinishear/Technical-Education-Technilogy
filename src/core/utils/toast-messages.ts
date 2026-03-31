import { toast } from "sonner";

export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  loading: (message: string) => toast.loading(message),
  dismiss: (id: string | number) => toast.dismiss(id),

  // Common messages
  added: () => toast.success("Successfully added!"),
  updated: () => toast.success("Successfully updated!"),
  deleted: () => toast.success("Successfully deleted!"),
  failed: () => toast.error("Something went wrong!"),
  uploading: () => toast.loading("Uploading..."),
  processing: () => toast.loading("Processing..."),
  copySuccess: () => toast.success("Link copied Successfully!"),

  
};