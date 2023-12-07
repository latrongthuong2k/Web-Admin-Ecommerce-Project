"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import InputDataForAdmin from "@/app/admins/(component)/InputDataForAdmin";
import { ModalContext } from "@/app/context/ModalContext";
import InputForCategory from "@/app/categories/(component)/InputForCategory";
import { productConnectedEntities } from "@/services/ProductService";
import DropdownCategory from "@/app/categories/(component)/DropdownCategory";

// for add new
export const categoriesContent = (categoryDropdownData, categoryDataById) => {
  return (
    <>
      <InputForCategory
        title={"categoryName"}
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
export const adminAddContent = () => {
  return (
    <>
      <InputDataForAdmin
        title={"firstName"}
        modeName={"add"}
        showTitle={"first name"}
      />
      <InputDataForAdmin
        title={"lastName"}
        modeName={"add"}
        showTitle={"last name"}
      />
      <InputDataForAdmin title={"email"} modeName={"add"} showTitle={"email"} />
      <InputDataForAdmin
        title={"password"}
        modeName={"add"}
        showTitle={"password"}
      />
    </>
  );
};
export const adminUpdateContent = (prevData) => {
  return (
    <>
      <InputDataForAdmin
        title={"firstName"}
        modeName={"update"}
        showTitle={"first name"}
        defaultValue={prevData.firstName}
      />
      <InputDataForAdmin
        title={"lastName"}
        modeName={"update"}
        showTitle={"last name"}
        defaultValue={prevData.lastName}
      />
      <InputDataForAdmin
        title={"email"}
        modeName={"update"}
        showTitle={"email"}
        defaultValue={prevData.email}
      />
      <InputDataForAdmin
        title={"currentPassword"}
        modeName={"update"}
        showTitle={"current Password"}
      />
      <InputDataForAdmin
        title={"newPassword"}
        modeName={"update"}
        showTitle={"new Password"}
      />
      <InputDataForAdmin
        title={"confirmationPassword"}
        modeName={"update"}
        showTitle={"confirmation Password"}
      />
    </>
  );
};
export default function AddButton({ buttonName }) {
  const { handleOpen, setTitle, setContent, setDropdownCategories } =
    useContext(ModalContext);
  const [category, setCategory] = useState();
  useEffect(() => {
    if (buttonName.toLowerCase() === "add new category") {
      // console.log(buttonName);
      const fetchData = async () => {
        const response = await productConnectedEntities();
        // console.log(response.categories);
        setCategory(response?.categories);
        setDropdownCategories(response?.categories);
      };
      fetchData();
    }
  }, [buttonName, setDropdownCategories]);

  // add new
  const adminCustomModal = () => {
    setTitle("Add new Admin");
    setContent(adminAddContent);
    handleOpen();
  };
  const categoryCustomModal = () => {
    setTitle("Add new Category");
    setContent(categoriesContent(category, ""));
    handleOpen();
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
      {buttonName.toLowerCase() === "add new product" ? (
        <Link href={"/products/add"}>
          <div className={btnDesign}>{buttonName}</div>
        </Link>
      ) : buttonName.toLowerCase() === "add new category" ? (
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
      ) : null}
    </div>
  );
}
