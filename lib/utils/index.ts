import { AxiosError, isAxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Alert } from "../helpers/alert";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: Error | AxiosError) => {
  if (isAxiosError(error)) {
    if (error.response?.data?.message) {
      Alert.error(error.response?.data?.message);
      return;
    } else if (error?.message) {
      if (error?.status == 500) {
        Alert.error("Internal Server Error");
        return;
      }
      Alert.error(error?.message);
    }
    return;
  }

  Alert.error("An Error Occurred");
};
