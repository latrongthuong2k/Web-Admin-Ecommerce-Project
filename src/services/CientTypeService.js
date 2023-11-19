"use server";
import { authCookieGetter } from "@/services/routeConfig";

export const listColor = async () => {
  const authCookie = authCookieGetter();
  if (!authCookie) {
    console.log("Can't Auth");
    return [];
  }
  const fetchConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `auth-token=${authCookie}`,
    },
    next: { revalidate: 120 },
  };
  const url = "http://localhost:8080/api/v1/category/list-client-type";
  return fetch(url, fetchConfig)
    .then((promise) => promise.json())
    .catch((err) => {
      console.log("Error fetching client-type data", err);
      return [];
    });
};
