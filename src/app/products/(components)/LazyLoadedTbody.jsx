import React, { useContext } from "react";
import Link from "next/link";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import { tdRender, tdRender2 } from "./ProductPage";
import { usePathname } from "next/navigation";
import { CiWarning } from "react-icons/ci";
import { ModalContext } from "@/app/context/ModalContext";

function formatDate(dateString) {
  return dateString?.split("T")[0];
}

const LazyLoadedTableBody = ({ handle, products }) => {
  const { handleOpen, setTitle, setContent, setHandleDelete, setMode } =
    useContext(ModalContext);

  const AnnounceModal = (callback) => {
    handleOpen();
    setTitle("Announce");
    setContent(
      <div className={"text-center"}>
        <p className={"mb-4 text-3xl font-bold caret-amber-600"}>Important</p>
        <div className={"mb-3 flex justify-center"}>
          <CiWarning className={"text-5xl"} />
        </div>
        <p className={"font-bold"}>
          This action will delete this product forever, are you sure to delete ?
        </p>
      </div>,
    );
    setMode("announce");
    setHandleDelete(() => callback);
  };

  const pathName = usePathname();
  return (
    <tbody className="divide-y divide-gray-100 text-sm">
      {products.map((product) => (
        <tr key={product.id}>
          {tdRender(product.productName)}
          {tdRender(product.createdAt)}
          {tdRender(
            product.updatedAt ? formatDate(product.updatedAt) : "no change",
          )}
          {tdRender(product.quantity)}
          {tdRender(product.price)}
          {tdRender2(product.status)}
          <td className="flex justify-center whitespace-nowrap p-2">
            <Link
              className={
                "mr-2 rounded-[20px] border-4 px-4 py-2 text-violet-400 hover:border-violet-300 hover:text-violet-600"
              }
              href={`${pathName}/edit?productId=${product.id}`}
            >
              <EditNoteTwoToneIcon />
              Edit
            </Link>
            <button
              onClick={() => {
                AnnounceModal(() => {
                  handle(product.id);
                });
              }}
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
