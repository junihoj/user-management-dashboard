import { AlertError, AlertSuccess } from "@/components/globals/alert";
import { toast, ToasterProps } from "sonner";

export const showAlert = (
  alertType: "success" | "error" | "warning" | "info",
  message: string,
  toastProps?: ToasterProps
) => {
  switch (alertType) {
    case "warning":
    case "info":
    case "success":
      toast(<AlertSuccess message={message} />, {
        style: {
          backgroundColor: "#2ECC71",
          fontWeight: 300,
        },
        ...toastProps,
      });

      break;
    case "error":
      toast(<AlertError message={message} />, {
        style: {
          backgroundColor: "#FDEDED",
          fontWeight: 300,
        },
        ...toastProps,
      });
      break;
  }
};

export const Alert = {
  error: (message: string, toastProps?: ToasterProps) =>
    showAlert("error", message, { ...toastProps }),
  success: (message: string, toastProps?: ToasterProps) =>
    showAlert("success", message, { ...toastProps }),
};
