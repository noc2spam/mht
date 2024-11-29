import parseJwt from "@/utils/parseJwt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const cookie = cookieStore.get("token");
  if (cookie) {
    return new Response(
      JSON.stringify({ status: "success", user: parseJwt(cookie.value) })
    );
  }
  return new Response(JSON.stringify({ status: "fail", loggedIn: false }));
}
