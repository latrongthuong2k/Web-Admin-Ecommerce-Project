"use server";
import { authCookieGetter } from "@/services/routeConfig";
const BASE_URL_USER = `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/user`;
const BASE_URL_ADMIN = `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/admin`;

const getAuthHeader = () => {
  const token = authCookieGetter();
  if (!token) {
    console.log("UnAuthenticated");
    return {};
  }
  return { Cookie: `auth-token=${token}` };
};

const handleFetchError = (err, customMessage = "Error fetching data:") => {
  console.error(customMessage, err);
  throw err;
};

export const sendUserToBackend = async (dto, target) => {
  try {
    const res = await fetch(
      `${target === "user" ? BASE_URL_USER : BASE_URL_ADMIN}/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(dto),
      },
    );
    return res.status === 200
      ? { data: await res.text(), success: true, status: res.status }
      : { success: false };
  } catch (err) {
    return handleFetchError(err, "Error when sending data to backend:");
  }
};

export const sendUpdateDataToBackend = async (userId, dto) => {
  try {
    const res = await fetch(
      `${
        target === "user" ? BASE_URL_USER : BASE_URL_ADMIN
      }/update?userId=${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(dto),
      },
    );
    return res.ok
      ? { data: await res.text(), success: true, status: res.status }
      : { success: false };
  } catch (err) {
    return handleFetchError(err, "Error when sending update data to backend:");
  }
};
