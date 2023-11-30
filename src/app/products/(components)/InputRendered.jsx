"use client";
import React, { useContext, useEffect, useState } from "react";
import { FilledInput, FormControl, InputLabel } from "@mui/material";
import { DtoContext } from "@/app/context/DataProvider";

const InputRendered = ({ modeName, title, showTitle, defaultValue }) => {
  const [value, setValue] = useState(defaultValue || "");
  const { updateState } = useContext(DtoContext);
  const [error, setError] = useState("");
  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  const validateInput = (field, value) => {
    if (!value || value.trim().length === 0) {
      return "This field cannot be empty.";
    }

    switch (field) {
      case "productName":
        if (value.length > 50) {
          return "Product name must be less than 50 characters.";
        }
        break;
      case "price":
        const priceValue = parseFloat(value);
        if (isNaN(priceValue) || priceValue < 0) {
          return "Price must be a positive number.";
        }
        break;
      case "stockQuantity":
        const quantityValue = parseInt(value, 10);
        if (
          isNaN(quantityValue) ||
          quantityValue < 0 ||
          quantityValue.toString() !== value
        ) {
          return "Stock quantity must be a positive integer.";
        }
        break;
    }
    return "";
  };

  const handInput = (e) => {
    const inputValue = e.target.value;
    const fieldError = validateInput(title, inputValue);
    setError(fieldError);
    setValue(inputValue);
    if (!fieldError) {
      const fieldName = title.replace(/\s+/g, "");
      updateState({ field: fieldName, value: inputValue });
    }
  };

  return (
    <div className="w-full px-3 md:mb-0 md:w-1/2">
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
          value={value}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </FormControl>
    </div>
  );
};

export default InputRendered;
