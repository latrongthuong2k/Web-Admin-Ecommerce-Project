import React, { Suspense } from "react";
import Products from "@/app/pages/products/(components)/Products";

const Page = ({ searchParams }) => {
  return <Products searchParams={searchParams} />;
};

export default Page;
