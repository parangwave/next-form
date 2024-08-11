import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (request.nextUrl.pathname === "/" && !session.id) {
    return NextResponse.redirect(new URL("/log-in", request.url));
  }
}
