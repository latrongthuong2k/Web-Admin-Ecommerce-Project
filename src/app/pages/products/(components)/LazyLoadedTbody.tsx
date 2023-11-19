import React from "react";
import Link from "next/link";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import { LazyProps, tdRender } from "./Products";
const LazyLoadedTableBody: React.FC<LazyProps> = ({ products, pathName }) => (
  <tbody className="divide-y divide-gray-100 text-sm">
    {products.map((product) => (
      <tr key={product.id}>
        {tdRender(product.productName)}
        {tdRender(product.createdAt)}
        {tdRender(product.quantity)}
        {tdRender(product.price)}
        {tdRender(product.status)}
        <td className="flex justify-center whitespace-nowrap p-2">
          <Link
            className={
              "mr-2 rounded-[20px] border-4 px-4 py-2 text-violet-400 hover:border-violet-300 hover:text-violet-600"
            }
            href={`${pathName}/add`}
          >
            <EditNoteTwoToneIcon />
            Edit
          </Link>
          <Link
            className="rounded-[20px] border-4 px-4 py-2 text-red-400 hover:border-red-300 hover:text-red-600"
            href={`${pathName}/delete`}
          >
            Delete
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
);
export default LazyLoadedTableBody;
