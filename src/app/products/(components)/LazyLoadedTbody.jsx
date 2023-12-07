import React from "react";
import Link from "next/link";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import { tdRender, tdRender2 } from "./Products";
import { usePathname } from "next/navigation";

function formatDate(dateString) {
  return dateString?.split("T")[0];
}
const LazyLoadedTableBody = ({ handle, products }) => {
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
                handle(product.id);
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
