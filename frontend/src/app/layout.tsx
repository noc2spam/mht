import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import Link from "next/link";

import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

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
  title: "Mental Health Tracker",
  description: "Track your mental health with this simple app.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-[#20403b] text-white text-center py-2 font-medium text-2xl">
          <Link href="/">Mental Health Tracker</Link>
        </header>

        <SessionProvider session={session}>{children}</SessionProvider>
        <footer className="bg-[#20403b] text-white text-center py-2">
          <p>© {new Date().getFullYear()} Mental Health Tracker</p>
        </footer>
      </body>
    </html>
  );
}
