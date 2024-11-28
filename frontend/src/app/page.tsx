import LoginButton from "@/components/LoginButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (session?.user) {
    redirect("/app/dashboard/");
  }
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
