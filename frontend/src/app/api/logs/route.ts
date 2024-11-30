import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("token");
  if (!cookie) {
    return new Response(JSON.stringify({ status: "fail", loggedIn: false }));
  }

  const { NEXT_PUBLIC_BACKEND_URL = "http:/localhost:3001" } = process.env;
  console.log(NEXT_PUBLIC_BACKEND_URL + "/logs");
  const response = await fetch(NEXT_PUBLIC_BACKEND_URL + "/logs", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookie.value}`,
    },
  }).catch(() => {
    cookieStore.delete("token");
    return new Response(JSON.stringify({ status: "fail", loggedIn: false }), {
      status: 500,
    });
  });
  const body = await response.json();

  if (!body.status || body.status !== "success") {
    return new Response(JSON.stringify({ status: "fail" }));
  }
  return new Response(JSON.stringify({ status: "success", logs: body.logs }));
}
