import React, { useContext, useEffect, useState } from "react";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import { tdRender } from "@/app/products/(components)/Products";
import { ModalContext } from "@/app/context/ModalContext";
import { categoriesContent } from "@/components/AddButton";
import { CategoryContextData } from "@/app/context/CategoryDataContext";
import { getCategoryById } from "@/services/CategoryService";
const LazyLoadedTableBody = ({ handle, categoriesTableData }) => {
  const { handleOpen, setTitle, setContent, setMode } =
    useContext(ModalContext);
  const { dropdownCategories } = useContext(CategoryContextData);

  // const { replace } = useRouter();
  // const pathName = usePathname();
  // const searchParams = new useSearchParams();
  // const params = new URLSearchParams(searchParams);;
  const getCategory = async (id) => {
    const categoryDataById = await getCategoryById(id);
    categoryCustomModal(categoryDataById);
  };
  const categoryCustomModal = (categoryDataById) => {
    setTitle("Edit new Category");
    setContent(categoriesContent(dropdownCategories, categoryDataById));
    handleOpen();
    setMode("update");
  };
  return (
    <tbody className="divide-y divide-gray-100 text-sm">
      {categoriesTableData.map((category) => (
        <tr key={category.id}>
          {tdRender(category.id)}
          {tdRender(category.categoryName)}
          {tdRender(category.parentCategory?.categoryName || "No Parent")}
          <td className="flex justify-center whitespace-nowrap p-2">
            <button
              className={
                "mr-2 rounded-[20px] border-4 px-4 py-2 text-violet-400 hover:border-violet-300 hover:text-violet-600"
              }
              onClick={
                () => getCategory(category.id)
                // params.set("cateId", category.id);
                // replace(`${pathName}?${params}`);
              }
            >
              <EditNoteTwoToneIcon />
              Edit
            </button>
            <button
              onClick={() => handle(category.id)}
              className="rounded-[20px] border-4 px-4 py-2 text-red-400 hover:border-red-300 hover:text-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default LazyLoadedTableBody;
