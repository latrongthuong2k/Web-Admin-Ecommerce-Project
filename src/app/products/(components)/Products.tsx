"use client";
import React, { useEffect, useState } from "react";
import Search from "@/app/products/(components)/Search";
import PaginationTable from "@/app/products/(components)/PaginationTable";
import { CircularProgress } from "@mui/joy";
import dynamic from "next/dynamic";
import { deleteProduct, fetchPageProduct } from "@/services/ProductService";
import SortBar from "@/app/products/(components)/SortButtons";
import { MenuItem } from "@mui/material";
import AddButton from "@/components/AddButton";
import { useNotification } from "@/app/context/NotificationContext";

export type Product = {
  id: number;
  productName: string;
  quantity: number;
  createdAt: string; // Sử dụng string cho ngày tháng để đơn giản hóa
  price: number;
  status: number;
};
export type LazyPropsProduct = {
  handle: (id: number) => Promise<void>;
  products: Product[];
};

export type TableProps = {
  searchParams?: {
    q?: string;
    page?: number;
    sortField?: string;
    sortDir?: string;
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
export const tdRender2 = (attribute: string | number) => (
  <td className="whitespace-nowrap p-5">
    <div
      className={`flex items-center justify-center rounded-[20px] border p-1 text-gray-700 ${
        attribute === "Active" ? "bg-blue-300" : "bg-gray-300"
      }`}
    >
      <div className="font-medium ">{attribute}</div>
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

const Products: React.FC<TableProps> = ({ searchParams }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const sortField = searchParams?.sortField || "productName";
  const sortDir = searchParams?.sortDir || "asc";
  const [isDelete, setIsDelete] = useState<boolean>(false);
  // @ts-ignore
  const { showNotification } = useNotification();
  const handleDelete = async (productId: number) => {
    try {
      const res = await deleteProduct(productId);
      setIsDelete((prev) => !prev);
      if (res.success) showNotification("success", res.successMessage);
      else showNotification("error", res.err);
    } catch (error) {
      showNotification("error", "Product failed to delete");
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    // console.log("ok");
    const fetchData = async () => {
      try {
        const productPage = await fetchPageProduct(
          q,
          page,
          10,
          sortField,
          sortDir,
        );
        if (productPage) {
          setTotalPage(productPage.totalPages);
          const formattedProducts = productPage.products.map(
            (item: Product) => {
              const dateOnlyUsingSplit = item.createdAt.split("T")[0];
              const statusText = statusMappings[item.status] || "Unknown";
              return {
                ...item,
                status: statusText,
                createdAt: dateOnlyUsingSplit,
              };
            },
          );
          setProducts(formattedProducts);
        }
      } catch (error) {
        showNotification("error", "Error fetching products : " + error);
      }
    };
    fetchData();
  }, [page, q, sortDir, sortField, isDelete, showNotification]);
  return (
    <div className="container mx-auto mr-14 mt-14">
      <AddButton buttonName={"Add new product"} />
      <div className="flex justify-between">
        <Search />
        <SortBar
          optionProps={[
            <MenuItem value="productName" key="productName">
              Product name
            </MenuItem>,
            <MenuItem value="createdAt" key="createdAt">
              Time
            </MenuItem>,
            <MenuItem value="price" key="price">
              Price
            </MenuItem>,
          ]}
          defaultSortField={"productName"}
        />
      </div>

      {/*Khung table */}
      <div className="overflow-x-auto rounded-[20px] border-4 bg-gray-50 pb-6 shadow-lg">
        {/*Table */}
        <table className="w-full table-auto">
          <thead>
            <tr className="mb-[5px] rounded bg-teal-800 text-center text-lg font-semibold uppercase text-white">
              {thRender("Product Name")}
              {thRender("Create at")}
              {thRender("Update at")}
              {thRender("Quantity")}
              {thRender("Price")}
              {thRender("Status")}
              {thRender("Actions")}
            </tr>
          </thead>
          {/*T-Body*/}
          <LazyLoadedTableBody handle={handleDelete} products={products} />
        </table>
      </div>
      <div className={"ml-2 mt-6"}>
        <PaginationTable totalPage={totalPage} />
      </div>
    </div>
  );
};

export default Products;
