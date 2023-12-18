"use client";
import React, { useContext, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Chip } from "@mui/material";
import { DtoContext } from "@/app/context/DataProvider";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({
  props,
  title,
  showTitle,
  isDataLoaded,
  defaultValue,
}) {
  const { updateState } = useContext(DtoContext);
  const [idData, editIdData] = useState([]);
  const handleChange = (event, array) => {
    editIdData(array);
    if (array.length > 0) {
      updateState({ field: title, value: array });
    }
  };
  useEffect(() => {
    updateState({ field: title, value: defaultValue });
    // setValue(defaultValue);
  }, [defaultValue, isDataLoaded]);
  return (
    <div className=" px-3 md:w-1/2">
      <Autocomplete
        fullWidth
        multiple
        id={props.id}
        options={props}
        disableCloseOnSelect
        onChange={handleChange}
        value={idData.length ? idData : defaultValue}
        isOptionEqualToValue={(option, value) => option.id === value.id}
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
        // input
        renderInput={(params) => (
          <TextField
            variant="filled"
            {...params}
            label={
              <span className="text-xs font-bold uppercase tracking-wide text-gray-700">
                {showTitle}
              </span>
            }
            placeholder="Search..."
          />
        )}
        // tags selected
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
