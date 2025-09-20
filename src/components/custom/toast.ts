import { toast } from "react-hot-toast";

export function successToast(message: string) {
  console.log("inside toast");
  toast.success(message, {
    style: {
      border: "1px solid #4BB543",
      padding: "16px",
      color: "#4BB543",
      backgroundColor: "#f0fff0",
    },
  });
}

export function errorToast(message: string) {
  toast.error(message, {
    style: {
      border: "1px solid #ff0033",
      padding: "16px",
      color: "#ff0033",
      backgroundColor: "#fff0f0",
    },
  });
}
