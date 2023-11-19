"use client";
import React, { createContext, useState } from "react";

export const DtoContext = createContext(undefined);
export const DataProvider = ({ children }) => {
  const [dataDto, setDto] = useState({
    productName: "",
    price: 0,
    stockQuantity: 0,
    categoryId: 0,
    colors: [],
    sizes: [],
    tag: [],
    clientTypes: [],
    supplier: [],
    description: "",
    imageKeys: [],
    // Thêm các trạng thái khác ở đây
  });
  const updateState = ({ field, value }) => {
    setDto((prevState) => {
      // Nếu value là mảng, cập nhật như một mảng
      if (Array.isArray(value)) {
        return { ...prevState, [field]: [...value] };
      }
      // Nếu không phải mảng, cập nhật như một giá trị đơn lẻ
      return { ...prevState, [field]: value };
    });
  };

  return (
    <DtoContext.Provider value={{ dataDto, updateState }}>
      {children}
    </DtoContext.Provider>
  );
};
