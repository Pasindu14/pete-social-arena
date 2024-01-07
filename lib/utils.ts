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

export const getUserInitialLogin = (): string | null => {
  return secureLocalStorage.getItem("isUserSetInDB")?.toString() ?? null;
};

export const setUserInitialLogin = () => {
  return secureLocalStorage.setItem("isUserSetInDB", true);
};

export const getInitials = (fullName: string) => {
  // Check if the full name is not empty
  if (fullName) {
    const nameParts = fullName.split(" ");
    if (nameParts.length >= 1) {
      // Take the first two letters of the first name
      const firstName = nameParts[0];

      // If there is a last name, take the first letter of the last name too
      if (nameParts.length >= 2) {
        const lastName = nameParts[1];
        return firstName.charAt(0) + lastName.charAt(0);
      } else {
        return firstName.slice(0, 2);
      }
    } else {
      // Handle the case when the full name doesn't have any valid name parts
      return "Invalid name format";
    }
  } else {
    // Handle the case when the full name is empty
    return "Name is empty";
  }
}


export const getFormattedDateTime = (datePara: Date) => {
  const date = new Date(datePara);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = date.getHours() % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
};



export const createFetch =
  (options: Pick<RequestInit, "next" | "cache">) =>
    (url: RequestInfo | URL, init?: RequestInit) => {
      return fetch(url, {
        ...init,
        ...options,
      });
    };

export const getNotificationType = (type: string) => {
  if (type === "like") {
    return "liked your post";
  } else if (type === "comment") {
    return "commented on your post";
  } else {
    return "unknown notification type";
  }
};
