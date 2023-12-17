import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "@/components/common/Footer";
import { Toaster } from "react-hot-toast";

const heebo = Heebo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pete's Social Arena",
  description: "Pete's Social Arena",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            {children}
            {/*  <Footer /> */}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
