import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import Link from "next/link";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {BE_URL} from "@/services/routeConfig";

const links = [
  {
    id: "1",
    title: "Dashboard",
    url: "/pages/dashboard",
    icon: <HomeOutlinedIcon />,
  },
  {
    id: "2",
    title: "Products",
    url: "/pages/products",
    icon: <Inventory2OutlinedIcon />,
  },
  {
    id: "3",
    title: "Categories",
    url: "/pages/categories",
    icon: <SegmentOutlinedIcon />,
  },
  {
    id: "4",
    title: "Orders",
    url: "/pages/orders",
    icon: <ReceiptLongOutlinedIcon />,
  },
  {
    id: "5",
    title: "Admins",
    url: "/pages/admins",
    icon: <ManageAccountsTwoToneIcon />,
  },
  {
    id: "6",
    title: "Users",
    url: "/pages/users",
    icon: <PeopleOutlineOutlinedIcon />,
  },
  {
    id: "7",
    title: "Settings",
    url: "/pages/settings",
    icon: <SettingsOutlinedIcon />,
  },
];
// const handleLogout = async () => {
//   try {
//     // Gửi yêu cầu đăng xuất đến server
//     const response = await fetch("/api/logout", {
//       method: "POST",
//       // Thêm headers nếu cần
//     });
//
//     if (response.ok) {
//       // Xử lý sau khi đăng xuất thành công
//       // Ví dụ: Chuyển hướng người dùng về trang đăng nhập
//     } else {
//       // Xử lý lỗi
//     }
//   } catch (error) {
//     console.error("Lỗi khi đăng xuất:", error);
//     // Xử lý lỗi
//   }
// };

const NavBar = () => {
  return (
    <div className=" mr-[30px] mt-[50px] flex h-full w-[300px] flex-col">
      {links.map((item) => (
        <Link key={item.id} href={item.url}>
          <div
            className={
              "ml-[15px] flex items-center gap-[10px] " +
              "rounded-[4px] p-[10px] text-[18px] hover:bg-violet-300 hover:shadow-md"
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </div>
        </Link>
      ))}
      <Link
        href={`${BE_URL}/api/v1/auth/logout`}
        className={
          "ml-[15px] flex items-center gap-[10px] rounded-[4px] " +
          "p-[10px] text-[18px] hover:bg-violet-300 hover:shadow-md"
        }
      >
        <LogoutOutlinedIcon />
        Log out
      </Link>
    </div>
  );
};

export default NavBar;
