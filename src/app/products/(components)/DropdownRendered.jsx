"use client";
import React, { useContext, useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DtoContext } from "@/app/context/DataProvider";

const DropdownRendered = ({ props, field, showTitle, defaultValue }) => {
  const { setDto, dto } = useContext(DtoContext);
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    if (defaultValue && selectedValue === "") setSelectedValue(defaultValue);
    if (selectedValue) {
      setDto((prev) => ({
        ...prev,
        [field]: selectedValue,
      }));
    }
  }, [defaultValue, selectedValue, setDto, field]);
  // const handleChange = (e) => {
  //   // const params = new URLSearchParams(searchParams);
  //   const value = e.target.value;
  //   // if (value !== "") {
  //   //   params.set(field + "Id", value);
  //   // } else {
  //   //   params.delete(field + "Id");
  //   // }
  //   // replace(`${pathname}?${params}`);
  //   setSelectedValue(value);
  //   updateState({ field: field, value: value });
  // };
  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
  };
  return (
    <div className="w-full px-3 md:w-1/2">
      <FormControl variant="filled" fullWidth>
        <InputLabel
          className="text-xs font-bold uppercase text-gray-700"
          id={field}
        >
          {showTitle}
        </InputLabel>
        <Select
          id={field}
          name={field}
          color="secondary"
          value={selectedValue}
          onChange={handleChange} //setparams
        >
          <MenuItem value={""}>None</MenuItem>
          {props.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DropdownRendered;
