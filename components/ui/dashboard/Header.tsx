"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  ClerkLoaded,
  ClerkLoading,
  UserButton,
  clerkClient,
} from "@clerk/nextjs";
import AddPost from "./AddPost";
import Loader from "@/components/common/Loader";
import { loaderColor } from "@/constants/colors";
import { updateUser } from "@/lib/server-actions/user-actions";
import toast from "react-hot-toast";
import { getUserInitialLogin, setCookie } from "@/lib/utils";
import secureLocalStorage from "react-secure-storage";

interface HeaderProps {
  userId: string;
  email: string;
  fullName: string;
  profilePictureUrl: string;
  bio: string;
}

const Header = ({
  userId,
  email,
  fullName,
  profilePictureUrl,
  bio,
}: HeaderProps) => {
  /// handle signin to DB
  useEffect(() => {
    const handleUserUpdate = async () => {
      //secureLocalStorage.clear();
      let userInitialLogin = getUserInitialLogin();

      if (userInitialLogin !== null) {
        return;
      }

      try {
        const data = await updateUser(
          userId,
          email,
          fullName,
          profilePictureUrl,
          bio
        );
        if (data?.status === "error") {
          toast.error("Oops! Something went wrong. Please try again !");
        } else {
          ///setCookie("isUserSetInDB", true);
          //console.log(data.data);
        }
      } catch (error) {
        toast.error("Oops! Something went wrong. Please try again !");
      }
    };

    // Call the async function
    handleUserUpdate();
  }, [userId, email, fullName, profilePictureUrl, bio]);

  return (
    <div className="flex gap-2 items-center justify-center">
      <div className="relative lg:w-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <Input type="text" placeholder="Search" className="pl-12 pr-4" />
      </div>

      <div className="flex flex-row justify-between items-center">
        <AddPost />
      </div>

      <ClerkLoading>
        <Loader size={25} color={loaderColor} />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton />
      </ClerkLoaded>
    </div>
  );
};

export default Header;
