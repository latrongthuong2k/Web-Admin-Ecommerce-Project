"use server";
import {cookies} from "next/headers";
import axios from "axios";
import {BE_URL} from "./routeConfig";


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
export const getCategoryPage = (pageNum) => {
    const url = new URL(
        `http://localhost:8080/api/v1/category/page?page=${pageNum - 1}\``,
    );

    fetch(url, {
        method: "GET",
        credentials: "include",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            // Xử lý dữ liệu phân trang nhận được từ server
            console.log(data); // Hoặc cập nhật state trong framework của bạn
        })
        .catch((error) => {
            // Xử lý lỗi ở đây
            console.error("There was a problem with the fetch operation:", error);
        });
};
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
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Cookie": `auth-token=${authCookie}`,
    },
});

export const validateToken = async () => {
    const authCookie = cookies().get("auth-token")?.value;
    if (!authCookie) {
        return {isValid: false};
    }
    try {
        const response = await fetch(
            `${BE_URL}/api/v2/auth/check-authentication`,
            getAuthConfig(authCookie)
        );
        if (response.status !== 200) {
            return {isValid: false};
        }
        return {isValid : true};
    } catch (error) {
        console.log(error);
        return {isValid: false, error};
    }
};


export const uploadCustomerProfilePicture = async (id, formData) => {
    try {
        return axios.post(
            `${BE_URL}/api/v1/customers/${id}/profile-image`,
            formData,
            {
                ...getAuthConfig(),
                "Content-Type": "multipart/form-data",
            },
        );
    } catch (e) {
        throw e;
    }
};

export const customerProfilePictureUrl = (id) =>
    `${BE_URL}/api/v1/customers/${id}/profile-image`;
