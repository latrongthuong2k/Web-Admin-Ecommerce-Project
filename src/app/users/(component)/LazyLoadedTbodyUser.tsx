import React from "react";
import Link from "next/link";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import { tdRender } from "@/app/products/(components)/Products";
import { User } from "@/Type/type";
import { usePathname } from "next/navigation";

export type LazyPropsCategory = {
  handle: (id: number) => Promise<void>;
  users: User[];
};

const LazyLoadedTableBody: React.FC<LazyPropsCategory> = ({
  handle,
  users,
}) => {
  const pathName = usePathname();
  return (
    <tbody className="divide-y divide-gray-100 text-sm">
      {users.map((user) => (
        <tr key={user.id}>
          {tdRender(user.id)}
          {tdRender(user.firstName)}
          {tdRender(user.lastName)}
          {tdRender(user.email)}
          {tdRender(user.createdAt)}
          {tdRender(user.updatedAt ? user.updatedAt : "No change")}
          <td className="flex justify-center whitespace-nowrap p-2">
            <Link
              className={
                "mr-2 rounded-[20px] border-4 px-4 py-2 text-violet-400 hover:border-violet-300 hover:text-violet-600"
              }
              href={`${pathName}/${user.id}/edit`}
            >
              <EditNoteTwoToneIcon />
              Edit
            </Link>
            <button
              onClick={() => handle(user.id)}
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
