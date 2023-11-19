import React, { useContext } from "react";
import { FilledInput, FormControl, InputLabel, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { DtoContext } from "@/app/pages/products/(components)/DataProvider";
import { target } from "@/app/pages/products/[actions]/PageBehavior";

const InputRendered = ({ modeName, title }) => {
  const { dataDto, updateState } = useContext(DtoContext);
  const handInput = (e) => {
    const value = e.target.value;
    if (title.toLowerCase() === "product_name") {
      updateState({ field: "productName", value: value });
    }
    if (title.toLowerCase() === "price") {
      updateState({ field: "price", value: value });
    }
    if (title.toLowerCase() === "stock_quantity") {
      updateState({ field: "stockQuantity", value: value });
    }
  };

  return (
    <div className="w-full px-3 md:mb-0 md:w-1/2">
      <FormControl fullWidth variant="filled">
        <InputLabel className="text-xs font-bold uppercase  text-gray-700">
          {title}
        </InputLabel>
        <FilledInput
          label={`${title}`}
          variant="filled"
          color="secondary"
          type="text"
          readOnly={modeName === "edit"}
          onChange={handInput}
        />
      </FormControl>
    </div>
  );
};

export default InputRendered;
