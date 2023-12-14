"use client";
import React, { useContext, useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DtoContext } from "@/app/context/DataProvider";

const DropdownRendered = ({ props, title, showTitle, defaultValue }) => {
  const { setDto } = useContext(DtoContext);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    setSelectedValue(defaultValue);
    if (selectedValue) {
      setDto((prev) => ({
        ...prev,
        [title]: { id: selectedValue },
      }));
    }
  }, [defaultValue, selectedValue, setDto, title]);
  // const handleChange = (e) => {
  //   // const params = new URLSearchParams(searchParams);
  //   const value = e.target.value;
  //   // if (value !== "") {
  //   //   params.set(title + "Id", value);
  //   // } else {
  //   //   params.delete(title + "Id");
  //   // }
  //   // replace(`${pathname}?${params}`);
  //   setSelectedValue(value);
  //   updateState({ field: title, value: value });
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
