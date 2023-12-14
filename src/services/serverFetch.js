"use server";
import { cookies } from "next/headers";

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
