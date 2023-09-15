import { type NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/",
  "/api/pies",
  "/api/trpc/auth.getAppInfo",
  "/api/trpc/auth.getUser",
];

export function middleware(request: NextRequest) {
  const code = request.cookies.get("code");
  const isPublic = publicRoutes.some((x) => request.nextUrl.pathname === x);

  if (!code && !isPublic) return NextResponse.redirect(request.nextUrl.origin);
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
