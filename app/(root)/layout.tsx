import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "../globals.css";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "@/components/common/Footer";
import { Toaster } from "react-hot-toast";
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
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={heebo.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="mt-4">
              <Header
                userId={user?.id!}
                email={user?.emailAddresses[0]?.emailAddress!}
                fullName={user?.firstName! + " " + user?.lastName!}
                profilePictureUrl={user?.imageUrl!}
                bio=""
              />
              {children}
              {/*  <Footer /> */}
            </div>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
