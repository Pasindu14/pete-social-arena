"use client";
import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import AddPost from "../ui/dashboard/add-post";
import { loaderColor } from "@/constants/colors";
import { updateUser } from "@/lib/server-actions/user-actions";
import toast from "react-hot-toast";
import { getUserInitialLogin, setUserInitialLogin } from "@/lib/utils";
import { Loader } from "./loader";
import { BellRing } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleUserUpdate = async () => {
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

        if (data?.success === false) {
          toast.error("Oops! Something went wrong. Please try again !");
        } else {
          setUserInitialLogin();
        }
      } catch (error) {
        toast.error("Oops! Something went wrong. Please try again !");
      }
    };

    handleUserUpdate();
  }, [userId, email, fullName, profilePictureUrl, bio]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        router.push("/search?p=" + inputRef.current?.value);
      }
    };

    inputRef.current?.addEventListener("keydown", handleKeyDown);

    return () => {
      inputRef.current?.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex gap-4 items-center justify-center">
      <Link
        href="/dashboard"
        className="font-bold text-xl hover:bg-white/10 rounded-full p-3"
      >
        ARENA
      </Link>
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
        <Input
          type="text"
          placeholder="Search"
          className="pl-12 pr-4"
          ref={inputRef}
        />
      </div>

      <div className="flex flex-row justify-between items-center">
        <AddPost />
      </div>

      <ClerkLoading>
        <Loader size={15} color={loaderColor} />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton />
      </ClerkLoaded>

      <Link href={`/notifications`}>
        <div className="hover:bg-slate-200/10 p-4 rounded-full">
          <BellRing />
        </div>
      </Link>
    </div>
  );
};

export default Header;
