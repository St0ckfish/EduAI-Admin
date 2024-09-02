"use client";

import React, { ReactNode } from "react";
import "./globals.css";
import NavBar from "./../components/navBar";
import { Providers } from "@/GlobalRedux/provider";
import Notification from "@/components/Notifications";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/new-password" ||
    pathname === "/forget-password" ||
    pathname === "/otp" ||
    pathname === "/choose-account";

  return (
    <html lang="en">
      <head>
        <title>Edu AI-Admin</title>
        <meta name="description" content="Edu AI-Admin" />
        <link rel="icon" type="image/x-icon" href="/images/Login.png" />
      </head>
      <body>
        <Providers>
          {!isLoginPage && <NavBar />}
          <Notification />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
