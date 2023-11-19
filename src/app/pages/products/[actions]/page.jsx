import React from "react";
import PageBehavior from "@/app/pages/products/[actions]/PageBehavior";
import { DataProvider } from "@/app/pages/products/(components)/DataProvider";

const Page = () => {
  return (
    <div>
      <DataProvider>
        <PageBehavior />
      </DataProvider>
    </div>
  );
};

export default Page;
