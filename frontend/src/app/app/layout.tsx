"use client";
import LoggedInApp from "@/components/LoggedInApp";
import { LoggedInProvider, useUserContext } from "@/context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading } = useUserContext();
  return (
    <LoggedInProvider>
      <LoggedInApp>{children}</LoggedInApp>
    </LoggedInProvider>
  );
}
