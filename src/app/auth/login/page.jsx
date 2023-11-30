"use client";
import React from "react";
import Image from "next/image";
import LoginForm from "@/components/loginForm";
const Login = () => {
  return (
    <div>
      <Image
        src="/login-bg.jpg"
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
              {/*<div className="mt-6 space-y-4 px-[30px] py-[35px] ">*/}
              {/*  <p className={"text-center text-gray-500"}>Or Sign Up Using</p>*/}
              {/*  <a*/}
              {/*    href={`${baseURL}/oauth2/authorization/google`}*/}
              {/*    className="block rounded-[20px] border-gray-500 bg-red-500 px-4 py-2 text-center text-white hover:bg-red-600"*/}
              {/*  >*/}
              {/*    Login with Google*/}
              {/*  </a>*/}
              {/*  <a*/}
              {/*    href={"http://localhost:8081/oauth2/authorization/google"}*/}
              {/*    className="block rounded-[20px] border-gray-500 bg-gray-700 px-4 py-2 text-center text-white hover:bg-gray-900"*/}
              {/*  >*/}
              {/*    Login with GitHub*/}
              {/*  </a>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
