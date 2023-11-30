import React, { useContext, useState } from "react";
import { FilledInput, FormControl, InputLabel } from "@mui/material";
import { AdminDataContext } from "@/app/context/AdminDataContext";

const InputForUser = ({ modeName, title, showTitle }) => {
  const { dto, updateState } = useContext(AdminDataContext);
  const [error, setError] = useState("");
  const validateInput = (field, value) => {
    switch (field.toLowerCase()) {
      case "userName":
        if (!value || value.length > 50) {
          return "User name cannot be empty and must be less than 50 characters.";
        }
        break;
      case "email":
        if (isNaN(value) || value < 0) {
          return "Price must be a positive number.";
        }
        break;
      case "password":
        if (!Number.isInteger(Number(value)) || value < 0) {
          return "Stock quantity must be a positive integer.";
        }
        break;
      default:
        return "";
    }
    return "";
  };

  const handInput = (e) => {
    const value = e.target.value;
    const fieldError = validateInput(title, value);
    setError(fieldError);

    if (!fieldError) {
      updateState({ field: title, value: value });
    }
  };

  return (
    <div className="w-full px-3 md:mb-0">
      <FormControl fullWidth variant="filled" error={!!error}>
        <InputLabel
          htmlFor={title}
          className="text-xs font-bold uppercase text-gray-700"
        >
          {showTitle}
        </InputLabel>
        <FilledInput
          label={showTitle}
          id={title}
          color="secondary"
          type="text"
          readOnly={modeName === "edit"}
          onChange={handInput}
          value={dto[title.replace(/\s+/g, "")]}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </FormControl>
    </div>
  );
};

export default InputForUser;
