import { NextResponse } from "next/server";
import { validateToken } from "@/services/serverFetch";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.png|.jpg|next.svg).*)",
  ],
};
const protectPathRegex = [
  /^\/dashboard(\/.*)?$/,
  /^\/dashboard(\/.*)?$/,
  /^\/products(\/.*)?$/,
  /^\/admins(\/.*)?$/,
  /^\/users(\/.*)?$/,
  /^\/categories(\/.*)?$/,
  /^\/orders(\/.*)?$/,
];
const loginPath = "/auth/login";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const isLoginPath = pathname === loginPath;
  const { isValid } = await validateToken(); // trả về true nếu ok từ phía sever, và ngược lại là false
  const isProtectedPath = protectPathRegex.some((regex) =>
    regex.test(pathname),
  );

  if (isValid === true) {
    if (isLoginPath) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (isProtectedPath) {
      return NextResponse.next();
    }
  } else {
    if (isProtectedPath) {
      return NextResponse.redirect(new URL(loginPath, request.url));
    } else if (loginPath) {
      return NextResponse.next();
    }
  }
}
