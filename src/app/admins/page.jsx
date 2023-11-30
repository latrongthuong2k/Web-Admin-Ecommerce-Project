import React from "react";
import UserPage from "@/app/users/UserPage";
import { AdminDataProvider } from "@/app/context/AdminDataContext";

const Page = ({ searchParams }) => {
  return (
    <section>
      <AdminDataProvider>
        <UserPage searchParams={searchParams} targetProps={"admin"} />
      </AdminDataProvider>
    </section>
  );
};

export default Page;
