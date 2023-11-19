"use client";
import React, { useState } from "react";
import Button from "@mui/joy/Button";
import BasicModal from "@/app/pages/products/(components)/ProdcutModal";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AddProductButton() {
  // const [variant, setVariant] = useState(undefined);
  return (
    <div className={"ml-[10px]"}>
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
      <div className="mb-4 w-[180px] rounded-[10px] bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        <Link href={"/pages/products/add"}>Add new product</Link>
      </div>
    </div>
  );
}
