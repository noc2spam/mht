import parseJwt from "@/utils/parseJwt";
import { cookies } from "next/headers";
export async function GET() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("token");
  if (cookie) {
    const user = parseJwt(cookie.value);
    if (user === null) {
      //remove token cookie as it is invalid
      cookieStore.delete("token");
    }
    return new Response(
      JSON.stringify({ status: user !== null ? "success" : "fail", user: user })
    );
  }
  return new Response(JSON.stringify({ status: "fail", user: null }));
}
