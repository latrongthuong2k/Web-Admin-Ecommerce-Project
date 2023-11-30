import { cookies } from "next/headers";

export const authCookieGetter = () => cookies().get("auth-token").value;
