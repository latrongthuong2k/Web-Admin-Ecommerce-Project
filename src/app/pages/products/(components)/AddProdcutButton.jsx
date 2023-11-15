"use client";
import React, { useState } from "react";
import Button from "@mui/joy/Button";
import BasicModal from "@/app/pages/products/(components)/ProdcutModal";

export default function AddProductButton() {
  const [variant, setVariant] = useState(undefined);
  return (
    <div className={"ml-[20px]"}>
      <Button
        variant="soft"
        color="neutral"
        onClick={() => {
          setVariant("soft");
        }}
        className="mb-4 rounded-[10px] bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Add new product
      </Button>
      <BasicModal variant={variant} setVariant={setVariant} />
    </div>
  );
}
