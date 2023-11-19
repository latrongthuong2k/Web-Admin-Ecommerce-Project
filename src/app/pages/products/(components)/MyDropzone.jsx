"use client";
import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import {
  errorNotification,
  successNotification,
} from "@/components/Notification";
import { uploadMultipleFilesNoId } from "@/services/serverFetch";
import { DtoContext } from "@/app/pages/products/(components)/DataProvider";

export default function MyDropzone() {
  const { dataDto, updateState } = useContext(DtoContext);
  const onDrop = useCallback((acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file, index) => {
      formData.append(`file`, file);
    });
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    // gọi Api đẩy key về db , mấy cái này phải thưc hiện sau khi mà nhấn nút add
    // post
    uploadMultipleFilesNoId(formData)
      .then(() => {
        successNotification("Upload successful");
        // updateState({ field: "imageKeys", value: newImageKeys });
        // console.log(dataDto);
        // fetchCustomers(); // load lại
      })
      .catch(() => {
        errorNotification("Error", "Failed to upload files");
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={
        "flex w-[105px] items-center justify-center rounded-[8px] border-2 " +
        "border-dashed border-gray-300 hover:border-violet-300 "
      }
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image
          className={"items-center"}
          src={"/upload_Drag.png"}
          alt={"upload"}
          width={50}
          height={50}
        />
      ) : (
        <Image src={"/upload_i.png"} alt={"upload"} width={50} height={50} />
      )}
    </div>
  );
}
