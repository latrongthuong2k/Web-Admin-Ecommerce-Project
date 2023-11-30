"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import InputForUser from "@/app/admins/(component)/InputForUser";
import { ModalContext } from "@/app/context/ModalContext";
import InputForCategory from "@/app/categories/(component)/InputForCategory";
import { productConnectedEntities } from "@/services/ProductService";
import DropdownCategory from "@/app/categories/(component)/DropdownCategory";
import { CategoryContextData } from "@/app/context/CategoryDataContext";

export const categoriesContent = (categoryDropdownData, categoryDataById) => {
  return (
    <>
      <InputForCategory
        title={"category"}
        modeName={"add"}
        showTitle={"Category name"}
        defaultValue={categoryDataById}
      />
      <DropdownCategory
        props={categoryDropdownData}
        title={"parentCategory"}
        showTitle={"parent category"}
        defaultValue={categoryDataById}
      />
    </>
  );
};
export default function AddButton({ buttonName }) {
  const { handleOpen, setTitle, setContent, setDropdownCategories } =
    useContext(ModalContext);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    if (buttonName.toLowerCase() === "add category") {
      // console.log(buttonName);
      const fetchData = async () => {
        const response = await productConnectedEntities();
        // console.log(response.categories);
        setCategory(response?.categories);
        setDropdownCategories(response?.categories);
      };
      fetchData();
    }
  }, []);

  const adminCustomModal = () => {
    setTitle("Add new Admin");
    setContent(adminContent);
    handleOpen();
  };

  const categoryCustomModal = () => {
    setTitle("Add new Category");
    setContent(categoriesContent(category, ""));
    handleOpen();
  };
  const adminContent = () => {
    return (
      <>
        <InputForUser
          title={"firstName"}
          modeName={"add"}
          showTitle={"first name"}
        />
        <InputForUser
          title={"lastName"}
          modeName={"add"}
          showTitle={"last name"}
        />
        <InputForUser title={"email"} modeName={"add"} showTitle={"email"} />
        <InputForUser
          title={"password"}
          modeName={"add"}
          showTitle={"password"}
        />
      </>
    );
  };

  const btnDesign =
    "mb-4 w-[180px] rounded-[10px] bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700";
  return (
    <div className={"ml-[10px] h-[50px]"}>
      {/*<Button*/}
      {/*  variant="soft"*/}
      {/*  color="neutral"*/}
      {/*  onClick={() => {*/}
      {/*    setVariant("soft");*/}
      {/*  }}*/}
      {/*  className="mb-4 rounded-[10px] bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"*/}
      {/*>*/}
      {/*  Add new product*/}
      {/*</Button>*/}
      {/*<BasicModal variant={variant} setVariant={setVariant} />*/}
      {buttonName.toLowerCase() === "add product" ? (
        <Link className={btnDesign} href={"/products/add"}>
          {buttonName}
        </Link>
      ) : buttonName.toLowerCase() === "add category" ? (
        <div
          className={`cursor-pointer ${btnDesign}`}
          onClick={categoryCustomModal}
        >
          {buttonName}
        </div>
      ) : buttonName.toLowerCase() === "add new admin" ? (
        <div
          className={`cursor-pointer ${btnDesign}`}
          onClick={adminCustomModal}
        >
          {buttonName}
        </div>
      ) : buttonName.toLowerCase() === "add new user" ? (
        <div
          className={`cursor-pointer ${btnDesign}`}
          onClick={adminCustomModal}
        >
          {buttonName}
        </div>
      ) : null}
    </div>
  );
}
