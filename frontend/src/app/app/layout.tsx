import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";

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
  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="flex">
      <Sidebar />
      <main className="min-h-svh">{children}</main>
    </div>
  );
}
