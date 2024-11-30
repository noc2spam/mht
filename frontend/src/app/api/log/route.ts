import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const formData = await request.json();
  const cookie = cookieStore.get("token");
  if (!cookie) {
    return new Response(JSON.stringify({ status: "fail", loggedIn: false }));
  }

  const { NEXT_PUBLIC_BACKEND_URL = "http:/localhost:3001" } = process.env;
  const response = await fetch(NEXT_PUBLIC_BACKEND_URL + "/log", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookie.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).catch(() => {
    return new Response(JSON.stringify({ status: "fail", loggedIn: false }), {
      status: 500,
    });
  });

  const body = await response.json();
  if (!body.status || body.status !== "success") {
    return new Response(JSON.stringify({ status: "fail", loggedIn: false }));
  }
  return new Response(JSON.stringify({ status: "success", user: body.user }));
}
