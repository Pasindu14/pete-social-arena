import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "../globals.css";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/theme-provider";

import { Toaster } from "react-hot-toast";

import { Suspense } from "react";
import { LoaderFull } from "@/components/common/loader";
import { primaryColor } from "@/constants/colors";
import Ads from "./dashboard/_component/ads";
import MainSidebar from "@/components/common/main-sidebar";
import Header from "@/components/common/Header";

const heebo = Heebo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pete's Social Arena",
  description: "Pete's Social Arena",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <head />
        <body className={heebo.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header
              userId={user?.id!}
              email={user?.emailAddresses[0]?.emailAddress!}
              fullName={user?.firstName! + " " + user?.lastName!}
              profilePictureUrl={user?.imageUrl!}
              bio=""
            />
            <Suspense fallback={<LoaderFull size={20} color={primaryColor} />}>
              <div className="md:flex min-h-screen">
                <div className="hidden md:flex  basis-1/5 justify-center mt-4 px-2">
                  <MainSidebar />
                </div>
                <div className="flex-1/2 container mx-auto">{children}</div>
                <Ads />
              </div>
            </Suspense>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
