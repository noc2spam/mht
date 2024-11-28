"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function AuthLink() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Link
        href={`#`}
        onClick={() =>
          signOut({
            callbackUrl: "/",
          })
        }
      >
        Sign Out
      </Link>
    );
  }
  return (
    <Link href={`#`} onClick={() => signIn()}>
      Sign In
    </Link>
  );
}

export default function Sidebar() {
  const { data: session } = useSession();
  return (
    <nav className="bg-[#2d2040] text-white py-2 font-medium text-2xl w-[400px] px-4">
      {session && session.user && (
        <div className="w-full flex items-center gap-2">
          {session.user.image && session.user.name && (
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          {session.user.name && <p> {session.user.name}</p>}
        </div>
      )}

      <ul className="my-12">
        <li>
          <Link href="/">Dashboard</Link>
        </li>
        <li>
          <Link href="/">Create Log</Link>
        </li>
        <li>
          <AuthLink />
        </li>
      </ul>
    </nav>
  );
}
