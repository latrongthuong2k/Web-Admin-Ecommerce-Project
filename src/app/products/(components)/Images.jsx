"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import MyDropzone from "@/app/products/(components)/MyDropzone";

import { DtoContext } from "@/app/context/DataProvider";
import { fetchImages } from "@/services/serverFetch";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
const ImagesComponent = ({ productId }) => {
  const [oldImageObjects, setOldImageObjects] = useState({});
  const [reloadFlag, setReloadFlag] = useState(false);
  const { handleDeleteImageFromServer, filesInfo, deleteFileById } =
    useContext(DtoContext);

  const enhancedDeleteImagesFromServer = (productId, imageKey) => {
    handleDeleteImageFromServer(productId, imageKey);
    setReloadFlag((prev) => !prev);
  };

  useEffect(() => {
    const fetchImagesData = async () => {
      // oldImages [keys, urls]
      const oldImages = await fetchImages(productId);
      if (oldImages.status === 200) {
        // const keys = Object.keys(oldImages.data);
        // console.log(keys);
        // console.log(Object.values(oldImages.data));

        setOldImageObjects(oldImages.data);
      }
    };
    if (productId) {
      fetchImagesData();
    }
  }, [productId, reloadFlag]);
  return (
    <div className="mb-7 h-auto w-full rounded-[18px] bg-gray-600 p-[14px]">
      <div className="mb-2 block text-xs font-bold uppercase tracking-wide text-white">
        Photos
      </div>
      <div className="flex flex-wrap gap-3">
        {oldImageObjects &&
          Object.entries(oldImageObjects).map(([key, url], index) => {
            // console.log("server//" + key, url);
            return imageDiv(
              { key, url },
              index,
              "oldImage",
              deleteFileById,
              enhancedDeleteImagesFromServer,
              productId,
            );
          })}
        {filesInfo &&
          filesInfo.map((item, index) => {
            return imageDiv(
              item,
              index,
              "fileInfo",
              deleteFileById,
              enhancedDeleteImagesFromServer,
              productId,
            );
          })}
        {/* Thả ảnh */}
        <MyDropzone />
      </div>
    </div>
  );
};

export default ImagesComponent;

const imageDiv = (
  props,
  index,
  targetAction,
  deleteFileById,
  deleteImagesFromSever,
  productId,
) => {
  const url = targetAction === "fileInfo" ? props.url : props.url;
  // console.log(url);
  const key = targetAction === "fileInfo" ? props.id : props.key;
  // console.log(key);
  return (
    <div
      key={index}
      className="h-[13rem] w-[11rem] rounded-[10px] border-2 border-gray-300  bg-gray-300 p-2 hover:border-violet-300"
    >
      <button>
        <Image
          className="rounded-[8px]"
          src={url}
          alt={`Image ${index}`}
          layout="responsive"
          width={100}
          height={100}
        />
      </button>
      <div
        onClick={() => {
          targetAction === "fileInfo"
            ? deleteFileById(key)
            : deleteImagesFromSever(productId, key);
        }}
        className={
          " flex justify-center rounded-[10px] bg-red-300 py-[2px] text-gray-600 hover:cursor-pointer"
        }
      >
        <HighlightOffRoundedIcon />
      </div>
    </div>
  );
};
