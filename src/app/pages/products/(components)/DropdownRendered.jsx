"use client";
import React, { useState } from "react";
import Link from "next/link";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DropdownRendered = ({ props, title }) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    setSelectedValue(value);
    if (value !== "") {
      params.set(title + "Id", value);
    } else {
      params.delete(title + "Id");
    }
    replace(`${pathname}?${params}`);
  };
  return (
    <div className="w-full px-3 md:w-1/2">
      <FormControl variant="filled" fullWidth>
        <InputLabel className="text-xs font-bold uppercase tracking-wide text-gray-700">
          {title}
        </InputLabel>
        <Select
          color="secondary"
          value={selectedValue}
          onChange={handleChange} //setparams
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
          <MenuItem>
            <Link className={"pl-[15px]"} href={"/"} value={"Add new"}>
              + Add new
            </Link>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default DropdownRendered;
