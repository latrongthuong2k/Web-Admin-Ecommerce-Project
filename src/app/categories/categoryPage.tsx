"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/joy";
import { Category } from "@/Type/type";
import { TableProps } from "@/app/products/(components)/Products";
import { fetchCategories } from "@/services/CategoryService";
import PaginationTable from "@/app/products/(components)/PaginationTable";
import Search from "@/app/products/(components)/Search";
import SortBar from "@/app/products/(components)/SortButtons";
import { MenuItem } from "@mui/material";
import AddButton from "@/components/AddButton";
import { CategoryModalProvider } from "@/app/context/ModalContext";

const LazyLoadedTableBody = dynamic(
  () => import("./(component)/LazyLoadedTbodyCategory"),
  {
    loading: () => (
      <tbody>
        <tr>
          <td className={"flex justify-center p-5"}>
            <CircularProgress />
          </td>
        </tr>
      </tbody>
    ),
  },
);

const thRender = (attribute: string) => (
  <th className="whitespace-nowrap p-2">
    <div className="p-2">{attribute}</div>
  </th>
);

const CategoryPage: React.FC<TableProps> = ({ searchParams }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const sortField = searchParams?.sortField || "categoryName";
  const sortDir = searchParams?.sortDir || "asc";
  const [isDelete, setIsDelete] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Thực hiện gọi API để lấy danh sách các danh mục
        const categoryPage = await fetchCategories(
          q,
          page,
          10,
          sortField,
          sortDir,
        );
        if (categoryPage) {
          setTotalPage(categoryPage.totalPages);
          setCategories(categoryPage.categories);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [isDelete, page, q, sortDir, sortField]);

  // handle delete
  const handleDelete = async (productId: number) => {
    // try {
    //   await deleteProduct(productId);
    //   setIsDelete((prev) => !prev);
    //   console.log("Product deleted successfully");
    // } catch (error) {
    //   console.error("Error deleting product:", error);
    // }
  };
  return (
    <div className="container mx-auto mt-14">
      <CategoryModalProvider>
        <AddButton buttonName={"Add Category"} />
      </CategoryModalProvider>
      <div className="flex justify-between">
        <Search />
        <SortBar
          optionProps={[
            <MenuItem value="categoryName" key="categoryName">
              Category Name
            </MenuItem>,
          ]}
          defaultSortField={"categoryName"}
        />
      </div>
      {/*Khung table */}
      <div className="overflow-x-auto rounded-[20px] border-4 bg-gray-50 pb-6 shadow-lg">
        {/*Table */}
        <table className="w-full table-auto">
          <thead>
            <tr className="mb-[5px] rounded bg-teal-800 text-center text-lg font-semibold uppercase text-white">
              {thRender("ID")}
              {thRender("Name")}
              {thRender("Parent Category")}
              {thRender("Actions")}
            </tr>
          </thead>
          {/*T-Body*/}
          <CategoryModalProvider>
            <LazyLoadedTableBody
              handle={handleDelete}
              categoriesTableData={categories}
            />
          </CategoryModalProvider>
        </table>
      </div>
      <div className={"ml-2 mt-6"}>
        <PaginationTable totalPage={totalPage} />
      </div>
    </div>
  );
};

export default CategoryPage;
