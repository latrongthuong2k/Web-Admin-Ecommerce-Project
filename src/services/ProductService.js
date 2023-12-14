"use server";
import { authCookieGetter } from "@/services/routeConfig";
import axios from "axios";
import sharp from "sharp";

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
    if (response.ok) {
      return { data: await response.json() };
    } else {
      const errResponse = await response.json();
      return {
        ...errResponse,
        err: errResponse.message,
        success: false,
      };
    }
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

const defaultOptions = (method, body = null) => {
  const authCookie = authCookieGetter()
    ? authCookieGetter()
    : "UnAuthenticated";
  const headers = {
    "Content-Type": "application/json",
    Cookie: `auth-token=${authCookie}`,
  };

  // Không set Content-Type là application/json nếu body là FormData
  if (body instanceof FormData) {
    delete headers["Content-Type"];
  }

  const options = {
    method: method,
    headers: headers,
    credentials: "include",
  };

  if (body) {
    options.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  return options;
};
export const uploadMultipleFiles = async (productId, formData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/product/product-images/${productId}`,
      defaultOptions("POST", formData),
    );
    return { success: true, status: response.status };
  } catch (e) {
    console.log("Error: " + e.message);
    throw { message: e.message, type: "fetchError" };
  }
};

export const fetchImages = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/product/get-product-images/${id}`,
      defaultOptions("GET"),
    );
    if (response.ok) {
      const res = await response.json();
      return {
        success: true,
        data: res,
      };
    } else {
      return { success: false, status: response.status };
    }
  } catch (e) {
    console.log("Có lỗi: " + e.message);
    throw { message: e.message, type: "fetchError" };
  }
};

export async function fetchAndResizeImage(url) {
  try {
    const response = await axios({ url, responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");

    const image = sharp(imageBuffer);
    const metadata = await image.metadata();

    let resizedBuffer;
    if (metadata.format === "jpeg") {
      resizedBuffer = await image
        .resize(300, 300)
        .jpeg({ quality: 20 })
        .toBuffer();
    } else if (metadata.format === "png") {
      resizedBuffer = await image
        .resize(300, 300)
        .png({ compressionLevel: 9, palette: true })
        .toBuffer();
    } else {
      // các định dạng khác
      resizedBuffer = await image.resize(300, 300).toBuffer();
    }

    return {
      base64: resizedBuffer.toString("base64"),
      format: metadata.format,
    };
  } catch (error) {
    console.error("Lỗi khi tải hoặc xử lý ảnh:", error);
    throw error;
  }
}

export const deleteImagesFromServer = async ({ id, imageKey }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/product/product-images?productId=${id}&imageKey=${imageKey}`,
      defaultOptions("DELETE"),
    );
    if (!response.ok) {
      throw new Error(`Deletion failed with status ${response.status}`);
    }
    return { success: true, status: response.status };
  } catch (e) {
    console.log("Có lỗi: " + e.message);
    throw { message: e.message, type: "deleteError" };
  }
};
