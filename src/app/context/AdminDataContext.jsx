"use client";
import React, { createContext, useState } from "react";
import {
  sendDataToBackend,
  sendUpdateDataToBackend,
} from "@/services/ProductService";

export const AdminDataContext = createContext(undefined);
export const AdminDataProvider = ({ children }) => {
  const [dto, setDto] = useState({
    firstName: "",
    lastName: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    role: "",
    // Thêm các trạng thái khác ở đây
  });
  const updateState = ({ field, value }) => {
    setDto((prevState) => {
      if (Array.isArray(value)) {
        return { ...prevState, [field]: [...value] };
      }
      return { ...prevState, [field]: value };
    });
  };
  const handleSubmit = async (e, action) => {
    e.preventDefault();
    if (action === "update") {
      try {
        const response = await sendUpdateDataToBackend(dto);
        console.log("Data sent successfully:", response);
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      try {
        const response = await sendDataToBackend(dto);
        console.log("Data sent successfully:", response);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  return (
    <AdminDataContext.Provider value={{ dto, updateState, handleSubmit }}>
      {children}
    </AdminDataContext.Provider>
  );
};
