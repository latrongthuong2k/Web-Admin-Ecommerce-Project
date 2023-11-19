"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import MyDropzone from "@/app/pages/products/(components)/MyDropzone";
import DropdownRendered from "@/app/pages/products/(components)/DropdownRendered";
import InputRendered from "@/app/pages/products/(components)/InputRendered";
import CheckboxesTags from "@/app/pages/products/(components)/CheckBoxesTags";
import { productConnectedEntities } from "@/services/ProductService";
import { DtoContext } from "@/app/pages/products/(components)/DataProvider";

export type PropsT = {
  id: number;
  name: string;
};
type DataState = {
  categories: CategoryT[];
  colors: ColorT[];
  sizes: SizeT[];
  tags: TagT[];
  clientTypes: ClientTypeT[];
  suppliers: SupplierT[];
};
type CategoryT = {
  id: number;
  categoryName: string;
};
type ColorT = {
  id: number;
  colorName: string;
};
type SizeT = {
  id: number;
  sizeValue: string;
};
type TagT = {
  id: number;
  tagName: string;
};
type ClientTypeT = {
  id: number;
  typeName: string;
};
type SupplierT = {
  id: number;
  supplierName: string;
};
// const categories = [{ id: 1, name: "123" }];
const images = [
  { id: 1, key: "123" },
  { id: 2, key: "123" },
  { id: 3, key: "123" },
  { id: 4, key: "123" },
  { id: 5, key: "123" },
  { id: 6, key: "123" },
  { id: 7, key: "123" },
  { id: 8, key: "123" },
  { id: 9, key: "123" },
  { id: 10, key: "123" },
];

export const target = [
  "product_name",
  "price",
  "category",
  "stock_quantity",
  "color",
  "size",
  "tag",
  "client_type",
  "supplier",
];

const PageBehavior = () => {
  // route
  const { replace } = useRouter();
  const pathname = usePathname();
  const [descriptionInput, setDescriptionInput] = useState("");
  // Context
  // @ts-ignore
  const { dataDto, updateState } = useContext(DtoContext);
  // Data fetched from server
  const [data, setData] = useState<DataState>({
    categories: [],
    colors: [],
    sizes: [],
    tags: [],
    clientTypes: [],
    suppliers: [],
  });

  // @ts-ignore
  const descriptionHandlerChanged = (e) => {
    const value = e.target.value;
    setDescriptionInput(value);
    updateState({ field: "description", value: value });
  };

  const [categories, setCategories] = useState([]);
  // reset
  useEffect(() => {
    replace(`${pathname}`);
    const fetchData = async () => {
      const response = await productConnectedEntities();
      try {
        setData({
          categories: response?.categories.map((item: CategoryT) => ({
            id: item.id,
            name: item.categoryName,
          })),
          colors: response?.colors.map((item: ColorT) => ({
            id: item.id,
            name: item.colorName,
          })),
          sizes: response?.sizes.map((item: SizeT) => ({
            id: item.id,
            name: item.sizeValue,
          })),
          tags: response?.tags.map((item: TagT) => ({
            id: item.id,
            name: item.tagName,
          })),
          clientTypes: response?.clientTypes.map((item: ClientTypeT) => ({
            id: item.id,
            name: item.typeName,
          })),
          suppliers: response?.suppliers.map((item: SupplierT) => ({
            id: item.id,
            name: item.supplierName,
          })),
        });
        // setCategories(resCategory);
      } catch (err) {
        console.log(err);
        // Xử lý lỗi tại đây
      }
    };
    fetchData();
  }, []);

  const pathSegments = pathname.split("/");
  const modeName = pathSegments.pop();
  return (
    <div className="container mx-auto px-4 sm:px-8">
      {dataDto.description}
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">
            {modeName === "edit" ? "Edit Product" : "Add Product"}
          </h2>
        </div>
        <div className="my-5">
          {/*Form*/}
          <form>
            <div className="-mx-3 mb-6 flex flex-wrap gap-y-3">
              {/*Product name*/}
              <InputRendered title={"product_name"} modeName={modeName} />

              {/*price*/}
              <InputRendered title={"price"} modeName={modeName} />

              {/*Stock quantity*/}
              <InputRendered title={"stock_quantity"} modeName={modeName} />

              {/* categories */}
              <DropdownRendered props={data?.categories} title={"category"} />

              {/* colors */}
              <CheckboxesTags props={data?.colors} title={"color"} />

              {/* sizes */}
              <CheckboxesTags props={data?.sizes} title={"size"} />

              {/* tags */}
              <CheckboxesTags props={data?.tags} title={"tag"} />

              {/* client type */}
              <CheckboxesTags props={data?.clientTypes} title={"client_type"} />

              {/* supplier */}
              <CheckboxesTags props={data?.suppliers} title={"supplier"} />
            </div>

            {/*Images*/}
            <div className=" mb-7 h-auto w-full rounded-[18px] bg-gray-500 p-[14px] ">
              <div className="mb-2 block text-xs font-bold uppercase tracking-wide text-white">
                Photos
              </div>
              <div className={"flex flex-wrap gap-3"}>
                {images &&
                  images.length > 0 &&
                  images.map((item) => (
                    <button
                      // Todo : làm việc với s3
                      key={item.id}
                      className={
                        "border- h-auto w-auto rounded-[10px] border-2 border-gray-300 hover:border-violet-300"
                      }
                    >
                      <Image
                        className={"rounded-[8px]"}
                        src={"/loginBG.jpg"}
                        alt={"productImg"}
                        width={100}
                        height={100}
                      />
                    </button>
                  ))}
                {/*Thả ảnh */}
                <MyDropzone />
              </div>
            </div>
            {/*Description*/}
            <div className="-mx-3 mb-2 flex flex-wrap">
              <div className="w-full px-3">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="no-resize mb-3 block h-48 w-full resize-none rounded-[10px]
                  border-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500
                  focus:bg-white focus:outline-none"
                  id="description"
                  value={descriptionInput}
                  onChange={descriptionHandlerChanged}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-start">
              <button
                className="focus:shadow-outline rounded bg-purple-500  px-4 py-2 font-bold text-white
                shadow hover:bg-purple-400 focus:outline-none"
                type="submit"
              >
                {modeName === "edit" ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageBehavior;
