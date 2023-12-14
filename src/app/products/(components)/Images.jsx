import React, { useContext } from "react";
import Image from "next/image";
import MyDropzone from "@/app/products/(components)/MyDropzone";

import { DtoContext } from "@/app/context/DataProvider";
import { fetchAndResizeImage } from "@/services/ProductService";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { CircularProgress } from "@mui/joy";

const ImagesComponent = ({
  imageLoading,
  productId,
  resizedImage,
  setReloadFlag,
}) => {
  const { handleDeleteImageFromServer, filesInfo, deleteFileById } =
    useContext(DtoContext);

  const enhancedDeleteImagesFromServer = (productId, imageKey) => {
    handleDeleteImageFromServer(productId, imageKey);
    setReloadFlag((prev) => !prev);
  };

  return (
    <div className="mb-7 h-auto w-full rounded-[18px] bg-gray-600 p-[14px]">
      <div className="mb-2 block text-xs font-bold uppercase tracking-wide text-white">
        Photos
      </div>
      <div className="flex flex-wrap gap-3">
        {imageLoading ? (
          <div
            className={
              "flex h-[13rem] w-[11rem] items-center justify-center rounded-[10px] border-2 border-gray-300  bg-gray-300 p-2"
            }
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            {resizedImage.length > 0 &&
              resizedImage.map((image, index) => {
                return ImageDiv(
                  image,
                  index,
                  "oldImage",
                  deleteFileById,
                  enhancedDeleteImagesFromServer,
                  productId,
                );
              })}
            {filesInfo &&
              filesInfo.map((image, index) => {
                return ImageDiv(
                  image,
                  index,
                  "fileInfo",
                  deleteFileById,
                  enhancedDeleteImagesFromServer, // not delete from server
                  productId,
                );
              })}
          </>
        )}

        <MyDropzone />
      </div>
    </div>
  );
};

export default ImagesComponent;

export const ImageDiv = (
  image,
  index,
  targetAction,
  deleteFileById,
  deleteImagesFromSever,
  productId,
) => {
  // console.log(url);
  // console.log(key);
  let clientGenerateImageUrl = "";
  let clientGenerateKey = "";
  if (targetAction === "fileInfo") {
    clientGenerateImageUrl = image.url;
    clientGenerateKey = image.key;
  }
  return (
    <div
      key={index}
      className="h-[13rem] w-[11rem] rounded-[10px] border-2 border-gray-300  bg-gray-300 p-2 hover:border-violet-300"
    >
      <button>
        <Image
          className="rounded-[8px]"
          src={
            targetAction !== "fileInfo"
              ? `data:image/${image.format};base64,${image.base64}`
              : clientGenerateImageUrl
          }
          alt={`Image ${index}`}
          layout="responsive"
          width={100}
          height={100}
        />
      </button>
      <div
        onClick={() => {
          targetAction === "fileInfo"
            ? deleteFileById(clientGenerateKey)
            : deleteImagesFromSever(productId, image.url);
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

export const handleFetchAndResizeImage = async (
  imageUrl,
  setResizedImage,
  setImageLoading,
) => {
  setImageLoading(true);
  try {
    const resizedImageBase64 = await fetchAndResizeImage(imageUrl);
    setResizedImage((prevImages) => [
      ...prevImages,
      {
        base64: resizedImageBase64.base64,
        url: imageUrl,
        format: resizedImageBase64.format,
      },
    ]);
    setImageLoading(false);
  } catch (error) {
    console.error("Lỗi khi tải ảnh:", error);
  }
};
