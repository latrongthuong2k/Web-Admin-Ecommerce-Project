"use client";
import React, { createContext, useState } from "react";
import {
  sendCateToBackend,
  sendUpdateDataToBackend,
} from "@/services/CategoryService";
import { useNotification } from "@/app/context/NotificationContext";

export const CategoryContextData = createContext(undefined);
export const CateDataProvider = ({ children }) => {
  const [dto, setDto] = useState({
    categoryName: "",
    parentCategory: {},
    // Thêm các trạng thái khác ở đây
  });
  const [categories, setCategories] = useState([]);
  const [dropdownCategories, setDropdownCategories] = useState([]);
  const { showNotification } = useNotification();
  const [cateId, setCateId] = useState(0);

  /**
   * Returns an array of field names that have empty values in the given DTO object.
   *
   * @returns {string[]} An array containing the names of the fields with empty values.
   */
  const getEmptyFields = () => {
    return Object.entries(dto).reduce((emptyFields, [key, value]) => {
      if (Array.isArray(value) ? value.length === 0 : !value) {
        emptyFields.push(key);
      }
      return emptyFields;
    }, []);
  };
  const handleSubmit = async (e, action, categoryId) => {
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
      const response = await sendData(dto, categoryId);
      if (!response.success) {
        showNotification("error", "Failed to create category.");
        return;
      }
      showNotification("success", "Create new category successfully.");
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
        categories,
        setCategories,
        dropdownCategories,
        setDropdownCategories,
        handleSubmit,
        cateId,
        setCateId,
      }}
    >
      {children}
    </CategoryContextData.Provider>
  );
};
