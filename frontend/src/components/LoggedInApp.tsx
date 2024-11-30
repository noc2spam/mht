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

          <main className="min-h-svh">
            <ToggleButton />
            {children}
          </main>
        </>
      )}
    </div>
  );
}
function ToggleButton() {
  return (
    <button
      data-drawer-target="default-sidebar"
      data-drawer-toggle="default-sidebar"
      aria-controls="default-sidebar"
      type="button"
      className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
    >
      <span className="sr-only">Open sidebar</span>
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>
  );
}
