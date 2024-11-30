"use client";
import LoggedInApp from "@/components/LoggedInApp";
import { LoggedInProvider } from "@/context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LoggedInProvider>
      <LoggedInApp>{children}</LoggedInApp>
    </LoggedInProvider>
  );
}
