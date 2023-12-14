"use client";
import React from "react";
import Link from "next/link";

export default function AddButton({ buttonName }) {
  return (
    <div className={"ml-[10px] h-[50px]"}>
      {
        <Link href={"/products/add"}>
          <div
            className={
              "mb-4 w-[180px] rounded-[10px] bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            }
          >
            {buttonName}
          </div>
        </Link>
      }
    </div>
  );
}
