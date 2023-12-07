"use client";
import React, { createContext, useState } from "react";
import {
  sendCateToBackend,
  sendUpdateDataToBackend,
} from "@/services/CategoryService";
import { useNotification } from "@/app/context/NotificationContext";
import { useSearchParams } from "next/navigation";

export const CategoryContextData = createContext(undefined);
export const CateDataProvider = ({ children }) => {
  const [dto, setDto] = useState({
    categoryName: "",
    parentCategory: null,
    // Thêm các trạng thái khác ở đây
  });
  const [categories, setCategories] = useState([]);
  const [dropdownCategories, setDropdownCategories] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const { showNotification } = useNotification();
  const params = useSearchParams();
  /**
   * Returns an array of field names that have empty values in the given DTO object.
   *
   * @returns {string[]} An array containing the names of the fields with empty values.
   */
  const getEmptyFields = () => {
    return Object.entries(dto).reduce((emptyFields, [key, value]) => {
      if (
        Array.isArray(value)
          ? value.length === 0
          : !value && key !== "parentCategory"
      ) {
        emptyFields.push(key);
      }
      return emptyFields;
    }, []);
  };
  const handleSubmit = async (e, action) => {
    e.preventDefault();
    // check Dto
    const emptyFields = getEmptyFields();
    if (emptyFields.length > 0) {
      const fieldsList = emptyFields.join("\n");
      showNotification(
        "error",
        `Please fill in the following fields:\n${fieldsList}`,
      );
      return;
    }
    const sendData = (dto, categoryId) => {
      switch (action) {
        case "create":
          return sendCateToBackend(dto);
        case "update":
          return sendUpdateDataToBackend(categoryId, dto);
        default:
          throw new Error("Invalid action");
      }
    };
    try {
      const response = await sendData(dto, params.get("cateId")); // nơi id vào
      if (!response.success) {
        showNotification("error", response.err); // err: text
        return;
      }
      showNotification("success", response.successMessage);
      setIsSubmit((prevState) => !prevState);
    } catch (error) {
      console.error("Error:", error);
      showNotification("error", error.message);
    }
  };
  return (
    <CategoryContextData.Provider
      value={{
        dto,
        setDto,
        isSubmit,
        categories,
        setCategories,
        dropdownCategories,
        setDropdownCategories,
        handleSubmit,
      }}
    >
      {children}
    </CategoryContextData.Provider>
  );
};
