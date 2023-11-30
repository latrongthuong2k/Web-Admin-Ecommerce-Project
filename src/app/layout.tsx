import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import React from "react";
import Navbar from "@/components/Navbar";
import { NotificationProvider } from "@/app/context/NotificationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web Admin",
  description: "Ecommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          {/*<AuthProvider>*/}
          <main className={"flex"}>
            <Navbar />
            <NotificationProvider>
              <ClientWrapper Props={children} />
            </NotificationProvider>
          </main>
          {/*</AuthProvider>*/}
        </div>
      </body>
    </html>
  );
}
