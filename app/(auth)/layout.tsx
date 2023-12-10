import { ClerkProvider } from "@clerk/nextjs";
import { Bebas_Neue, Heebo } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { primaryColor } from "@/constants/colors";
import Image from "next/image";
import { bebas, heebo } from "@/constants/fonts";

export const metadata = {
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
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
