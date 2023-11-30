"use server";
import { authCookieGetter } from "@/services/routeConfig";
import { handleFetchError } from "@/services/ProductService";
const BASE_URL = `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/category`;

const getAuthHeader = () => {
  const token = authCookieGetter();
  if (!token) {
    console.log("UnAuthenticated");
    return {};
  }
  return { Cookie: `auth-token=${token}` };
};

export const fetchCategories = async (q, page, size, sortField, sortDir) => {
  try {
    console.log(q, page, size, sortField, sortDir);
    const response = await fetch(
      `${BASE_URL}/page?page=${
        page - 1
      }&size=${size}&q=${q}&sortField=${sortField}&sortDir=${sortDir}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `auth-token=${
            authCookieGetter()
              ? authCookieGetter()
              : console.log("UnAuthenticated")
          }`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return {
      categories: responseData.categories,
      totalPages: responseData.totalPages,
    };
  } catch (err) {
    handleFetchError(err, "Error fetching product data:");
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/get?categoryId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      next: { revalidate: 60 },
    });
    return await response.json();
  } catch (err) {
    return handleFetchError(err, "Error fetching product data:");
  }
};

export const sendCateToBackend = async (dto) => {
  try {
    const res = await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(dto),
    });
    return res.status === 200
      ? { data: await res.text(), success: true, status: res.status }
      : { success: false };
  } catch (err) {
    return handleFetchError(err, "Error when sending data to backend:");
  }
};

export const sendUpdateDataToBackend = async (categoryId, dto) => {
  try {
    const res = await fetch(`${BASE_URL}/update?categoryId=${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(dto),
    });
    return res.ok
      ? { data: await res.text(), success: true, status: res.status }
      : { success: false };
  } catch (err) {
    return handleFetchError(err, "Error when sending update data to backend:");
  }
};
