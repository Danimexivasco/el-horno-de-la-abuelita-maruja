import toast from "react-hot-toast";

export const showMsg = (message: string, type: "error" | "success") => {
  return type === "error" ? toast.error(message) : toast.success(message)
}