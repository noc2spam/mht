import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const response = NextResponse.next();
  if (typeof token === "string") {
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
