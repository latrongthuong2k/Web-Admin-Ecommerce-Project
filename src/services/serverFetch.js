"use server";
import { cookies } from "next/headers";
import { authCookieGetter } from "./routeConfig";

// DASHBOARD SERVICE
//--------------------------------------------
//   add
//   edit
//   delete todo: nhớ cho hiện modal hỏi lại
//   update
//--------------------------------------------

// PRODUCT SERVICE

// };
//   edit
//   delete todo: nhớ cho hiện modal hỏi lại
//   update
//--------------------------------------------

// CATEGORY SERVICE
//--------------------------------------------
//   add
//   edit
//   delete todo: nhớ cho hiện modal hỏi lại
//   update
//--------------------------------------------

// USER SERVICE
//--------------------------------------------
//   add
//   edit
//   delete todo: nhớ cho hiện modal hỏi lại
//   update
//--------------------------------------------

// ADMIN SERVICE
//--------------------------------------------
//   add
//   edit
//   delete todo: nhớ cho hiện modal hỏi lại
//   update
//--------------------------------------------

// SETTING SERVICE
//--------------------------------------------
//   add
//   edit
//   delete todo: nhớ cho hiện modal hỏi lại
//   update
//--------------------------------------------

// AUTHENTICATION vs COOKIE SERVICE
export const getAuthConfig = (authCookie) => ({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Cookie: `auth-token=${authCookie}`,
  },
});

export const validateToken = async () => {
  const authCookie = cookies().get("auth-token")?.value;
  if (!authCookie) {
    return { isValid: false };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/api/v2/auth/check-authentication`,
      getAuthConfig(authCookie),
    );
    if (response.status !== 200) {
      return { isValid: false };
    }
    return { isValid: true };
  } catch (error) {
    console.log(error);
    return { isValid: false, error };
  }
};
// export const uploadMultipleFilesNoId = async (formData) => {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/product/product-images`,
//       {
//         method: "POST",
//         headers: {
//           Cookie: `auth-token=${
//             authCookieGetter() ? authCookieGetter() : "UnAuthenticated"
//           }`,
//         },
//         body: formData,
//         // next: { revalidate: 60 },
//       },
//     );
//     if (!response.ok) {
//       throw new Error(`Upload failed with status ${response.status}`);
//     }
//
//     // Chỉ trả về thông tin cần thiết
//     return { success: true, status: response.status };
//   } catch (e) {
//     console.log("Có lỗi: " + e.message);
//     // Trả về đối tượng lỗi đơn giản hơn
//     throw { message: e.message, type: "uploadError" };
//   }
// };
const getDefaultOptions = (method, body = null) => {
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
  console.log(productId, formData);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/product/product-images/${productId}`,
      getDefaultOptions("POST", formData),
    );
    return { success: true, status: response.status };
  } catch (e) {
    console.log("Có lỗi: " + e.message);
    // Trả về đối tượng lỗi đơn giản hơn
    throw { message: e.message, type: "uploadError" };
  }
};

export const fetchImages = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/product/product-images/${id}`,
      getDefaultOptions("GET"),
    );
    if (response.ok) {
      const data = await response.json();
      return { success: true, status: response.status, data: data };
    } else {
      return { success: false, status: response.status };
    }
  } catch (e) {
    console.log("Có lỗi: " + e.message);
    throw { message: e.message, type: "fetchError" };
  }
};
export const deleteImagesFromServer = async ({ id, imageKey }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/product/product-images?productId=${id}&imageKey=${imageKey}`,
      getDefaultOptions("DELETE"),
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
