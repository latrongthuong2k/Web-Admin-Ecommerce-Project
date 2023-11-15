"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import OAuth2LoginForm from "@/src/components/OAuth2LoginForm";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/src/components/Loading";

// Tạo một context mới
const AuthContext = createContext(null);

// Tạo một custom hook để tiêu thụ context một cách dễ dàng
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading />;
  } else {
    if (!isLoggedIn) return <OAuth2LoginForm />;
  }
  // Hoặc component loading

  const authContextValue = {
    isLoggedIn,
    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
