import { type ClassValue, clsx } from "clsx"
import secureLocalStorage from "react-secure-storage";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setUserId = (userId: string) => {
  secureLocalStorage.setItem("_userId", userId);
}

export const getUserId = (): string | null => {
  return secureLocalStorage.getItem("_userId")?.toString() ?? null;
};

export const setCookie = (name: string, value: any) => {
  return secureLocalStorage.setItem(name, value);
}