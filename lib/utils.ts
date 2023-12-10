import { type ClassValue, clsx } from "clsx"
import secureLocalStorage from "react-secure-storage";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setUserId = (userId: string) => {
  secureLocalStorage.setItem("_userId", userId);
}

export const getUserId = () => {
  return secureLocalStorage.getItem("_userId");
}

export const setCookie = (name: string, value: any) => {
  return secureLocalStorage.setItem(name, value);
}