"use server";
import LoginButton from "@/components/LoginButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function redirectIfLoggedIn() {
  const cookie = cookies().get("token");
  if (cookie && cookie.value.length > 0) {
    redirect("/app/dashboard");
  }
}

export default async function Home() {
  await redirectIfLoggedIn();
  return (
    <main className="min-h-svh container mx-auto grid place-items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-[700px] mt-12 text-center">
        <p>
          Login with your Google Account to get started with health tracking
          app.
        </p>
        <div className="grid place-items-center">
          <LoginButton />
        </div>
      </div>
    </main>
  );
}
