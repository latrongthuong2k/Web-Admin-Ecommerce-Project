"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { DtoContext } from "@/app/context/DataProvider";
import { CategoryContextData } from "@/app/context/CategoryDataContext";

const DropdownCategory = ({ props, title, showTitle, defaultValue }) => {
  const [selectedValue, setSelectedValue] = useState(
    defaultValue.parentCategory?.id || "",
  );
  const { dto, setDto } = useContext(CategoryContextData);
  // const validateSelection = (title, value) => {
  //   if (!value || value === "") {
  //     return `${title} selection cannot be empty.`;
  //   }
  //   return "";
  // };
  useEffect(() => {
    if (selectedValue) {
      // Nếu selectedValue đã được set, cập nhật dto
      setDto((prev) => ({ ...prev, [title]: { id: selectedValue } }));
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    // const validationError = validateSelection(title, value);
    setSelectedValue(value);
    setDto((prev) => ({ ...prev, [title]: { id: value } })); // ...prev, [parentCategory] : {id}
  };
  return (
    <div className="p w-full px-3">
      <FormControl variant="filled" fullWidth>
        <InputLabel
          className="text-xs font-bold uppercase text-gray-700"
          id={title}
        >
          {showTitle}
        </InputLabel>
        <Select
          id={title}
          name={title}
          color="secondary"
          value={selectedValue}
          onChange={handleChange} //setparams
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.categoryName}
            </MenuItem>
          ))}
          <MenuItem>
            <Link
              className={"pl-[15px]"}
              href={"/categories"}
              value={"Add new"}
            >
              + Add new
            </Link>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default DropdownCategory;
