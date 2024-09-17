"use client";

import React, { ReactNode, useEffect } from "react";
import "./globals.css";
import NavBar from "./../components/navBar";
import { Providers } from "@/GlobalRedux/provider";
import Notification from "@/components/Notifications";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import ThemeProvider from "./providers/themeProvider";
import { initCometChat } from "@/components/cometchat";

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
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     initCometChat();
  //   }
  // }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Edu AI-Admin</title>
        <meta name="description" content="Edu AI-Admin" />
        <link rel="icon" type="image/x-icon" href="/images/Login.png" />
      </head>
      <body className="bg-bgSecondary">
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {!isLoginPage && <NavBar />}
            <Notification />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
