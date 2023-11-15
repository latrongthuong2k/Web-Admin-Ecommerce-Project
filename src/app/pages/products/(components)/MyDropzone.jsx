"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export default function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={
        "flex w-[150px] items-center justify-center border-[3px] border-gray-300 hover:border-violet-300 "
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
