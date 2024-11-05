import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./NavBar";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import AuthProvider from "./auth/Provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Issues tracker",
  description: "Try it is awesome",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <Theme accentColor="pink" radius="large" scaling="110%">
          <NavBar />
          <main className="p-5">{children}</main>
        </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
