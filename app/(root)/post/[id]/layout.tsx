import Header from "@/components/common/Header";
import { LoaderFull } from "@/components/common/loader";
import { primaryColor } from "@/constants/colors";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<LoaderFull size={20} color={primaryColor} />}>
        <div className="container mx-auto">{children}</div>
      </Suspense>
    </>
  );
}
