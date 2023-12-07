"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { DtoContext } from "@/app/context/DataProvider";

const DropdownRendered = ({ props, title, showTitle, defaultValue }) => {
  // const { replace } = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  const { updateState } = useContext(DtoContext);
  const [selectedValue, setSelectedValue] = useState(0);

  const validateSelection = (title, value) => {
    if (!value || value === "") {
      return `${title} selection cannot be empty.`;
    }
    return "";
  };

  useEffect(() => {
    if (props && props.length > 0) {
      setSelectedValue(props[0].id);
      updateState({ field: title, value: props[0].id });
    }
  }, [props]);
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
    const validationError = validateSelection(title, value);

    if (!validationError) {
      setSelectedValue(value);
      updateState({ field: title, value: value });
    } else {
      // Xử lý lỗi
    }
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
          value={defaultValue === 0 ? selectedValue : defaultValue}
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
