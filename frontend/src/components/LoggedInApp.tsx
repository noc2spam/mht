"use client";
import { useUserContext } from "@/context";
import AppLoader from "./AppLoader";
import Sidebar from "./Sidebar";

export default function LoggedInApp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading } = useUserContext();
  return (
    <div className="flex">
      {loading && (
        <main className="h-[90vh] grid w-full place-items-center">
          <AppLoader />
        </main>
      )}
      {!loading && (
        <>
          <Sidebar />
          <main className="min-h-svh">{children}</main>
        </>
      )}
    </div>
  );
}
