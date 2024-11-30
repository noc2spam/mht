"use server";
import LoginButton from "@/components/LoginButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "Health Tracker",
    description: "Login with google account.",
  };
}
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
        <h1 className="font-black">Health Tracker</h1>
        <p>Login with your Google account.</p>
        <div className="grid place-items-center">
          <LoginButton />
        </div>
      </div>
    </main>
  );
}
