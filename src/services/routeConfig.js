import { cookies } from "next/headers";

export const BE_URL = "http://localhost:8080";
export const authCookieGetter = () => cookies().get("auth-token").value;
