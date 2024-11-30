"use client";
import { useUserContext } from "@/context";
import Image from "next/image";
import Link from "next/link";
import ActivityPopup from "./ActivityPopup";

export default function Sidebar() {
  const { user } = useUserContext();
  return (
    <nav className="bg-gradient-to-bl from-gray-800 to-gray-900 text-white py-2 font-medium text-2xl w-64 px-4">
      {user && (
        <div className="w-full flex items-center gap-2">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name}
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          {user.name && <p> {user.name}</p>}
        </div>
      )}

      <ul className="my-12">
        <li>
          <Link href="/app/dashboard">Dashboard</Link>
        </li>
        <li>
          <ActivityPopup />
        </li>
        <li>
          <Link
            href="#"
            onClick={async (e) => {
              e.preventDefault();
              await fetch("/api/auth/logout", {
                method: "POST",
              });
              window.location.href = "/";
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}
