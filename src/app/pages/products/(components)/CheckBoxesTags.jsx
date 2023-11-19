"use client";
import React, { useContext, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Chip } from "@mui/material";
import { DtoContext } from "@/app/pages/products/(components)/DataProvider";
import { target } from "@/app/pages/products/[actions]/PageBehavior";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ props, title }) {
  const { dataDto, updateState } = useContext(DtoContext);
  const [stage, editStage] = useState([]);
  const handleChange = (event, newValue) => {
    if (target.some((t) => title.toLowerCase().includes(t))) {
      editStage(newValue);
      updateState({ field: title, value: newValue });
    }
  };
  return (
    <div className=" px-3 md:w-1/2">
      <Autocomplete
        fullWidth
        multiple
        id="checkboxes-tags-demo"
        options={props}
        disableCloseOnSelect
        value={stage}
        onChange={handleChange}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => {
          // Tách key ra khỏi props
          const { key, ...rest } = props;
          return (
            <li key={key} {...rest}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              <span className="text-xs font-bold uppercase tracking-wide text-gray-700">
                {title}
              </span>
            }
            placeholder="Search..."
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const { key, ...rest } = getTagProps({ index });
            return <Chip key={key} {...rest} label={option.name} />;
          })
        }
      />
    </div>
  );
}
