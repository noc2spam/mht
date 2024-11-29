import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();
  if (!res.token) {
    return new Response("Missing token", { status: 400 });
  }
  const cookieStore = cookies();
  cookieStore.set("token", res.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return new Response("OK");
}
