"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AddProductButton from "@/app/pages/products/(components)/AddProdcutButton";
import Search from "@/app/pages/products/(components)/Search";
import PaginationTable from "@/app/pages/products/(components)/PaginationTable";
import { CircularProgress } from "@mui/joy";
import dynamic from "next/dynamic";
import { fetchPageProduct } from "@/services/ProductService";

export type Product = {
  id: number;
  productName: string;
  quantity: number;
  createdAt: string; // Sử dụng string cho ngày tháng để đơn giản hóa
  price: number;
  status: number;
};
export type LazyProps = {
  products: Product[];
  pathName: String;
};

export type ProductsProps = {
  searchParams?: {
    q?: string;
    page?: number;
  };
};
// th
export const thRender = (attribute: string) => (
  <th className="whitespace-nowrap p-2 first:rounded-bl-[15px] last:rounded-br-[15px]">
    <div className="p-2">{attribute}</div>
  </th>
);
// td
export const tdRender = (attribute: string | number) => (
  <td className="whitespace-nowrap p-5">
    <div className="flex items-center justify-center">
      <div className="font-medium text-gray-800">{attribute}</div>
    </div>
  </td>
);
// lazy load table

const LazyLoadedTableBody = dynamic(() => import("./LazyLoadedTbody"), {
  loading: () => (
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td className={"flex justify-center p-5"}>
          <CircularProgress />
        </td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  ),
  ssr: false,
});

const statusMappings: { [key: number]: string } = {
  0: "Active",
  1: "Inactive",
  2: "Discontinued",
};

const Products: React.FC<ProductsProps> = ({ searchParams }) => {
  const pathName = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { totalPage, products } = await fetchPageProduct(q, page, 12);
        if (totalPage && products) {
          setTotalPage(totalPage);
          const formattedProducts = products?.map((item: Product) => {
            // const dateOnly = item.createdAt.substring(0, 7);
            const dateOnlyUsingSplit = item.createdAt.split("T")[0];
            const statusText = statusMappings[item.status] || "Unknown";
            return {
              ...item,
              status: statusText,
              createdAt: dateOnlyUsingSplit,
            };
          });
          setProducts(formattedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [page, q]);

  return (
    <div className="container mx-auto mr-14 mt-14">
      <AddProductButton />
      <Search />

      {/*Khung table */}
      <div className="overflow-x-auto rounded-[20px] border-4 bg-gray-50 pb-6 shadow-lg">
        {/*Table */}
        <table className="w-full table-auto">
          <thead>
            <tr className="mb-[5px] rounded bg-teal-800 text-center text-lg font-semibold uppercase text-white">
              {thRender("Product Name")}
              {thRender("Create at")}
              {thRender("Quantity")}
              {thRender("Price")}
              {thRender("Status")}
              {thRender("Actions")}
            </tr>
          </thead>

          <LazyLoadedTableBody products={products} pathName={pathName} />
        </table>
      </div>
      <div className={"ml-2 mt-6"}>
        <PaginationTable totalPage={totalPage} />
      </div>
    </div>
  );
};

export default Products;
