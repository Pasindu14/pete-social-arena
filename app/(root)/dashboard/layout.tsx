import Header from "@/components/common/Header";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import LoaderFull from "./loader";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  return (
    <>
      <div className="mt-4">
        <Header
          userId={user?.id!}
          email={user?.emailAddresses[0]?.emailAddress!}
          fullName={user?.firstName! + " " + user?.lastName!}
          profilePictureUrl={user?.imageUrl!}
          bio=""
        />
        <Suspense fallback={<LoaderFull />}>
          <div className="container mx-auto">{children}</div>
        </Suspense>
      </div>
    </>
  );
}
