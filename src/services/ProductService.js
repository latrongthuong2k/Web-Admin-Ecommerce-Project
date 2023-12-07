"use server";
import { authCookieGetter } from "@/services/routeConfig";

const BASE_URL = `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/product`;

const getAuthHeader = () => {
  const token = authCookieGetter();
  if (!token) {
    console.log("UnAuthenticated");
    return {};
  }
  return { Cookie: `auth-token=${token}` };
};

export const handleFetchError = (
  err,
  customMessage = "Error fetching data:",
) => {
  console.error(customMessage, err);
  throw err;
};

export const fetchPageProduct = async (q, page, size, sortField, sortDir) => {
  const url = `${BASE_URL}/page?page=${
    page - 1
  }&size=${size}&q=${q}&sortField=${sortField}&sortDir=${sortDir}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      cache: "no-store",
    });
    return await res.json();
  } catch (err) {
    return handleFetchError(err);
  }
};

export const productConnectedEntities = async () => {
  const url = `${BASE_URL}/product-connected-entities`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      next: { revalidate: 60 },
    });
    return await response.json();
  } catch (err) {
    return handleFetchError(err, "Error when sending data to backend:");
  }
};

export const sendDataToBackend = async (dto) => {
  try {
    const res = await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(dto),
    });
    if (res.status === 200) {
      return {
        successMessage: await res.text(),
        productId: res.text(),
        success: true,
        status: res.status,
      };
    } else {
      const errorResponse = await res.json();
      return {
        err: errorResponse.message,
        success: false,
        status: res.status,
        path: errorResponse.path,
        timestamp: errorResponse.timestamp,
      };
    }
  } catch (err) {
    return handleFetchError(err, "Error when sending data to backend:");
  }
};
export const sendUpdateDataToBackend = async (productId, dto) => {
  try {
    const res = await fetch(`${BASE_URL}/update?productId=${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(dto),
    });
    if (res.status === 200) {
      return {
        // successMessage: await res.text(),
        productId: res.text(),
        success: true,
        // status: res.status,
      };
    } else {
      const errorResponse = await res.json();
      return {
        err: errorResponse.message,
        success: false,
        status: res.status,
        path: errorResponse.path,
        timestamp: errorResponse.timestamp,
      };
    }
  } catch (err) {
    return handleFetchError(err, "Error when sending update data to backend:");
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/get?productId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return await response.json();
  } catch (err) {
    return handleFetchError(err, "Error fetching product data:");
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    if (response.status === 200) {
      // Trường hợp thành công
      return {
        successMessage: await response.text(),
        success: true,
        status: response.status,
      };
    } else {
      // Trường hợp lỗi, giả định phản hồi là JSON
      const errorResponse = await response.json();
      return {
        err: errorResponse.message,
        success: false,
        status: response.status,
        path: errorResponse.path,
        timestamp: errorResponse.timestamp,
      };
    }
  } catch (err) {
    return handleFetchError(err, "Error when sending data to backend:");
  }
};
