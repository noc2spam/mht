"use client";
import AppIcon from "@/components/AppIcon";
import { signIn } from "next-auth/react";
export default function LoginButton() {
  "use client";
  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-4 flex items-center gap-4"
    >
      <AppIcon name="google" className="w-6" />
      <span>Sign In</span>
    </button>
  );
}
