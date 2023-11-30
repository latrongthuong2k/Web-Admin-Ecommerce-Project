import React from "react";
import CategoryPage from "@/app/categories/categoryPage";
import { CateDataProvider } from "@/app/context/CategoryDataContext";

const Page = ({ searchParams }) => {
  return (
    <CateDataProvider>
      <CategoryPage searchParams={searchParams} />
    </CateDataProvider>
  );
};

export default Page;
