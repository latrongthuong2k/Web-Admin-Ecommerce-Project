"use client";
import React, { useEffect, useState } from "react";
import {getCategoryPage} from "@/services/serverFetch";

const Category = () => {
  const num = useState();
  useEffect(() => {
    getCategoryPage(1);
  }, []);
  return <div></div>;
};

export default Category;
