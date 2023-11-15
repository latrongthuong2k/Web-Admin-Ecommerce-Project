import {NextResponse} from "next/server";
import {validateToken} from "@/services/serverFetch";
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.png|.jpg|next.svg).*)"],
};
const protectPath = ["/pages/dashboard",
    "/pages/products", "/pages/admins", "pages/users",
    "/pages/categories", "/pages/orders"]
const loginPath = "/auth/login";

export async function middleware(request) {
    const {pathname} = request.nextUrl;
    const isLoginPath = pathname === loginPath;
    const {isValid} = await validateToken(); // trả về true nếu ok từ phía sever, và ngược lại là false
    if (isValid === true) {
        if (isLoginPath) {
            return NextResponse.redirect(new URL("/pages/dashboard", request.url));
        } else if (protectPath.includes(pathname)) {
            return NextResponse.next();
        }
    } else {
        if (protectPath.includes(pathname)) {
            return NextResponse.redirect(new URL(loginPath, request.url));
        } else if (loginPath) {
            return NextResponse.next();
        }
    }
}
