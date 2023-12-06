import Header from "@/components/ui/dashboard/Header";
import React from "react";
import { currentUser } from "@clerk/nextjs";
import { updateUser } from "@/lib/server-actions/user-actions";
import { cookies } from "next/headers";

const Page = async () => {
  const user = await currentUser();
  const cookieStore = cookies();

  const userCookie = cookieStore.get("user");

  if (!userCookie) {
    const result = await updateUser(
      user!.id,
      user?.id!,
      user?.firstName!,
      "",
      user?.imageUrl!,
      "/"
    );
  }

  return (
    <div className="mt-4">
      <Header />
    </div>
  );
};

export default Page;
