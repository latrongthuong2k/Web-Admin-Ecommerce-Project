"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // Chuyển hướng người dùng đến trang /dashboard ngay khi trang được tải
    router.push("/products");
  }, [router]); // Phụ thuộc vào `router` để đảm bảo chuyển hướng một cách chính xác

  return <main></main>;
}
