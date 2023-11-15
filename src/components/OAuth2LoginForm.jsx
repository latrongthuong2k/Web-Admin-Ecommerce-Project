"use client";
import React from "react";
import LoginForm from "@/src/components/loginForm";
import { BE_URL } from "@/src/services/routeConfig";
import Image from "next/image";

const OAuth2LoginForm = () => {
  return (
    <div className={"relative"}>
      <Image
        src="/upload_i.png"
        alt="Background"
        fill={true}
        className="absolute -z-10" // Ensure the image is in the background
        priority={true}
      />
      <div className="mx-auto flex h-screen items-center justify-center">
        <div className={"rounded-xl bg-white p-8 shadow-2xl"}>
          <div className="w-full max-w-md space-y-8">
            <div className="">
              <LoginForm />
              <div className="mt-6 space-y-4 px-[30px] py-[35px] ">
                <p className={"text-center text-gray-500"}>Or Sign Up Using</p>
                <a
                  href={`${BE_URL}/oauth2/authorization/google`}
                  className="block rounded bg-red-500 px-4 py-2 text-center text-white hover:bg-red-600"
                >
                  Sign in with Google
                </a>
                <a
                  href={"http://localhost:8080/oauth2/authorization/google"}
                  className="block rounded bg-gray-800 px-4 py-2 text-center text-white hover:bg-gray-900"
                >
                  Sign in with GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuth2LoginForm;
