"use client";
import AppIcon from "@/components/AppIcon";
import { useEffect, useState } from "react";
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
export default function LoginButton() {
  "use client";
  const [googleUrl, setGoogleUrl] = useState("");
  useEffect(() => {
    fetch(NEXT_PUBLIC_BACKEND_URL + "/auth/google/url")
      .then((res) => res.json())
      .then((data) => {
        setGoogleUrl(data.url);
      });
  }, []);
  return (
    <button
      type="button"
      onClick={() => {
        window.location.href = googleUrl;
      }}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-4 flex items-center gap-4"
    >
      <AppIcon name="google" className="w-6" />
      <span>Sign In</span>
    </button>
  );
}
