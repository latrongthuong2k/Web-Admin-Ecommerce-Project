import React from "react";
import Products from "@/app/products/(components)/Products";
import { DataProvider } from "@/app/context/DataProvider";

const Page = ({ searchParams }) => {
  return (
    <DataProvider>
      <Products searchParams={searchParams} />
    </DataProvider>
  );
};

export default Page;
