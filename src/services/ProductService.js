"use server";
import { authCookieGetter } from "@/services/routeConfig";

// Get page product
// export const fetchPageProduct = async (q, page, size = 20) => {
//   const authCookie = cookies().get("auth-token").value;
//   if (!authCookie) {
//     console.log("Can't Auth");
//     return { totalProduct: 0, products: [] };
//   }
//
//   const url = `http://localhost:8080/api/v1/product/page?page=${
//     page - 1
//   }&size=${size}&q=${q}`;
//   const url2 = `http://localhost:8080/api/v1/product/total?size=${size}&q=${q}`;
//   try {
//     const fetchConfig = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: `auth-token=${authCookie}`,
//       },
//       next: { revalidate: 3600 },
//     };
//     const productsPromise = fetch(url, fetchConfig);
//     const totalPagePromise = fetch(url2, fetchConfig);
//     const [totalProductResponse, productsResponse] = await Promise.all([
//       totalPagePromise,
//       productsPromise,
//     ]);
//     const totalPage = await totalProductResponse.json();
//     const products = await productsResponse.json();
//     return { totalPage: totalPage, products };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return { totalPage: 0, products: [] };
//   }
// };
const getConfig = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Cookie: `auth-token=${
      authCookieGetter() ? authCookieGetter() : console.log("UnAuthenticated")
    }`,
  },
  next: { revalidate: 60 },
};

export const fetchPageProduct = async (q, page, size = 20) => {
  const baseURL = `http://localhost:8080/api/v1/product`;
  try {
    const [totalPage, products] = await Promise.all([
      fetch(`${baseURL}/total?size=${size}&q=${q}`, getConfig).then((res) =>
        res.json(),
      ),
      fetch(
        `${baseURL}/page?page=${page - 1}&size=${size}&q=${q}`,
        getConfig,
      ).then((res) => res.json()),
    ]);
    return { totalPage, products };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { totalPage: 0, products: [] };
  }
};

export const productConnectedEntities = async () => {
  const url = "http://localhost:8080/api/v1/product/product-connected-entities";
  return fetch(url, getConfig)
    .then((promise) => promise.json())
    .catch((err) => {
      console.log("Error fetching category data", err);
      return [];
    });
};
