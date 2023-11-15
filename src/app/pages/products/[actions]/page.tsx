"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import PropsRender from "@/app/pages/products/(components)/propsRender";
import MyDropzone from "@/app/pages/products/(components)/MyDropzone";


const categories = [
  {
    id: 1,
    name: "cat 1",
  },
  {
    id: 2,
    name: "cat 2",
  },
];
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
const AddOrEditProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const modeName = pathSegments.pop();
  return (
    <div className="container mx-auto px-4 sm:px-8">
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
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="product-name"
                >
                  Product name
                </label>
                <input
                  className={`block w-full appearance-none rounded border 
                  ${
                    modeName === "edit"
                      ? "border-gray-200 bg-gray-200 text-gray-700"
                      : "border-gray-200 bg-white focus:border-gray-500 focus:bg-white"
                  } 
                      px-4 py-3 leading-tight focus:outline-none ${
                        modeName === "edit" ? "pointer-events-none" : ""
                      }`}
                  id="product-name"
                  type="text"
                  value={productName}
                  readOnly={modeName === "edit"}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              {/* categories */}
              <PropsRender props={categories} title={"category"} />
              {/* cho tạo thêm category */}

              {/* colors */}
              <PropsRender props={categories} title={"color"} />
              {/* cho tạo thêm color */}

              {/* cho tạo thêm tag */}
              <PropsRender props={categories} title={"tag"} />
              {/* tags : cho chọn nhiều tag */}

              {/* images */}
              {/* Tiếp tục thêm các trường khác tương tự */}
            </div>

            {/*Images*/}
            <div className=" mb-7 h-auto w-full ">
              <div className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
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
                        " w-[150px] border-[3px]  border-gray-300 hover:border-violet-300"
                      }
                    >
                      <Image
                        src={"/loginBG.jpg"}
                        alt={"productImg"}
                        width={200}
                        height={200}
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
                  className="no-resize mb-3 block h-48 w-full resize-none appearance-none rounded border
                  border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500
                  focus:bg-white focus:outline-none"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-start">
              <button
                className="focus:shadow-outline rounded bg-purple-500 px-4 py-2 font-bold text-white
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

export default AddOrEditProduct;
