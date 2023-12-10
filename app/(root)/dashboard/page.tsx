import Header from "@/components/ui/dashboard/Header";
import React from "react";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
  const user = await currentUser();

  return (
    <div className="mt-4">
      <Header
        userId={user?.id!}
        email={user?.emailAddresses[0]?.emailAddress!}
        fullName={user?.firstName! + " " + user?.lastName!}
        profilePictureUrl={user?.imageUrl!}
        bio=""
      />
    </div>
  );
};

export default Page;
