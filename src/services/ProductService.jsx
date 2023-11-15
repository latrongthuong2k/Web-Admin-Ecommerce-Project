"use server";
import {cookies} from "next/headers";
import {getAuthConfig} from "@/services/serverFetch";


// product page
export const fetchProducts = async (q, page, size = 20) => {
    const authCookie = cookies().get("auth-token").value;
    if (!authCookie) {
        console.log("Can't Auth");
        return []; // Trả về mảng rỗng nếu không có auth
    }
    const url = `http://localhost:8080/api/v1/product/page?page=${
        page - 1
    }&size=${size}`;
    try {
        return await fetch(url,
            getAuthConfig(authCookie));
    } catch (error) {
        console.error("error", error);
        return []; // Trả về mảng rỗng nếu có lỗi
    }
};

// Get total product
export const fetchPageProduct = async (q, page, size = 20) => {
    const authCookie = cookies().get("auth-token").value;
    if (!authCookie) {
        console.log("Can't Auth");
        return {totalProduct: 0, products: []};
    }
    const url = `http://localhost:8080/api/v1/product/page?page=${page - 1}&size=${size}&q=${q}`;
    const url2 = `http://localhost:8080/api/v1/product/total?size=${size}&q=${q}`;

    try {
        const productsPromise = fetch(url, getAuthConfig(authCookie));
        const totalPagePromise = fetch(url2, getAuthConfig(authCookie));

        const [totalProductResponse, productsResponse] = await
            Promise.all([totalPagePromise, productsPromise]);
        const totalPage = await totalProductResponse.json();
        const products = await productsResponse.json();
        return {totalPage: totalPage, products};
    } catch (error) {
        console.error("Error fetching data:", error);
        return {totalPage: 0, products: []};
    }
};