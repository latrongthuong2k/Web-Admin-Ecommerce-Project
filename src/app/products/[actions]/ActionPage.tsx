"use client";
import React, { useContext, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DropdownRendered from "@/app/products/(components)/DropdownRendered";
import InputRendered from "@/app/products/(components)/InputRendered";
import CheckboxesTags from "@/app/products/(components)/CheckBoxesTags";
import {
  getProductById,
  productConnectedEntities,
} from "@/services/ProductService";
import ImagesComponent from "@/app/products/(components)/Images";
import { DtoContext } from "@/app/context/DataProvider";
import {
  CategoryT,
  ClientTypeT,
  ColorT,
  DataState,
  Product,
  SizeT,
  SupplierT,
  TagT,
} from "@/Type/type";

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

const ActionPage = () => {
  const pathname = usePathname();
  const [descriptionInput, setDescriptionInput] = useState("");
  const params = useSearchParams();
  // @ts-ignore
  const { dto, setDto, updateState, handleSubmit } = useContext(DtoContext);
  // Data fetched from server
  const [productById, setDataProduct] = useState<Product>({
    productId: 0,
    productName: "",
    price: 0,
    stockQuantity: 0,
    category: 0,
    colors: [],
    sizes: [],
    tags: [],
    clientTypes: [],
    supplier: 0,
    description: "",
  });
  const [data, setData] = useState<DataState>({
    categories: [],
    colors: [],
    sizes: [],
    tags: [],
    clientTypes: [],
    suppliers: [],
  });
  // console.log(dto);
  // @ts-ignore
  const descriptionHandlerChanged = (e) => {
    const value = e.target.value;
    if (value.length > 1) {
      updateState({ field: "description", value: value });
    }
    setDescriptionInput(value);
  };
  // reset
  useEffect(() => {
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
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    if (pathname === "/products/edit") {
      const productId = params.get("productId");
      const fetchData = async () => {
        const response = await getProductById(productId);

        setDto(response);
        setDataProduct(response);
      };
      fetchData();
    }
  }, [params, pathname, setDto]);
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
          <form
            onSubmit={
              modeName === "edit"
                ? (e) => {
                    handleSubmit(e, "update", params.get("productId"));
                  }
                : (e) => {
                    handleSubmit(e, "create");
                    // route.push("/products");
                  }
            }
          >
            <div className="-mx-3 mb-6 flex flex-wrap gap-y-3">
              {/*Product name*/}
              <InputRendered
                title={"productName"}
                modeName={"add"}
                showTitle={"product name"}
                defaultValue={productById.productName}
              />
              {/*price*/}
              <InputRendered
                title={"price"}
                modeName={"add"}
                showTitle={"price"}
                defaultValue={productById.price}
              />
              {/*Stock quantity*/}
              <InputRendered
                title={"stockQuantity"}
                modeName={"add"}
                showTitle={"stock quantity"}
                defaultValue={productById.stockQuantity}
              />

              {/* categories */}
              <DropdownRendered
                props={data?.categories}
                title={"category"}
                showTitle={"category"}
                defaultValue={productById.category}
              />
              {/* supplier */}
              <DropdownRendered
                props={data?.suppliers}
                title={"supplier"}
                showTitle={"supplier"}
                defaultValue={productById.supplier}
              />

              {/*colors */}
              <CheckboxesTags
                props={data?.colors}
                title={"colors"}
                showTitle={"colors"}
                defaultValue={productById.colors.map((color) => ({
                  id: color.id,
                  name: color.colorName,
                }))}
              />

              {/*/!* sizes *!/*/}

              <CheckboxesTags
                props={data?.sizes}
                title={"sizes"}
                showTitle={"sizes"}
                defaultValue={productById.sizes.map((size) => ({
                  id: size.id,
                  name: size.sizeValue,
                }))}
              />

              {/*/!* tags *!/*/}
              <CheckboxesTags
                props={data?.tags}
                title={"tags"}
                showTitle={"tags"}
                defaultValue={productById.tags.map((tag) => ({
                  id: tag.id,
                  name: tag.tagName,
                }))}
              />

              {/*/!* client type *!/*/}
              <CheckboxesTags
                props={data?.clientTypes}
                title={"clientTypes"}
                showTitle={"client Types"}
                defaultValue={productById.clientTypes.map((clientT) => ({
                  id: clientT.id,
                  name: clientT.typeName,
                }))}
              />
            </div>

            {/*Images.jsx*/}
            <ImagesComponent productId={params.get("productId")} />

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
                  value={
                    descriptionInput
                      ? descriptionInput
                      : productById.description
                  }
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

export default ActionPage;
