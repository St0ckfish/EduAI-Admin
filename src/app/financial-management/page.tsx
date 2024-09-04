"use client";
/* eslint-disable @next/next/no-img-element */
import Card from "@/components/card";
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FaDollarSign, FaWallet, FaBuilding } from 'react-icons/fa';



const FinancialManagement = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  const financials = [
    {
      href: "/fees-management",
      icon: <FaDollarSign size={40} />,
      title:
        currentLanguage === "en"
          ? "Fees"
          : currentLanguage === "ar"
            ? "الرسوم"
            : currentLanguage === "fr"
              ? "Frais"
              : "Fees",
      description:
        currentLanguage === "en"
          ? "All invoices and scholarship"
          : currentLanguage === "ar"
            ? "جميع الفواتير والمنح الدراسية"
            : currentLanguage === "fr"
              ? "Toutes les factures et bourses"
              : "All invoices and scholarship",
    },
    {
      href: "/financial-management/budget",
      icon: <FaWallet size={40} />,
      title:
        currentLanguage === "en"
          ? "Budget"
          : currentLanguage === "ar"
            ? "الميزانية"
            : currentLanguage === "fr"
              ? "Budget"
              : "Budget", // Default to English
      description:
        currentLanguage === "en"
          ? "All information about budgeting"
          : currentLanguage === "ar"
            ? "كل المعلومات عن إعداد الميزانية"
            : currentLanguage === "fr"
              ? "Toutes les informations sur la budgétisation"
              : "All information about budgeting", // Default to English
    },
    {
      href: "/financial-management/bank",
      icon: <FaBuilding  size={40} />,
      title:
        currentLanguage === "en"
          ? "Bank"
          : currentLanguage === "ar"
            ? "البنك"
            : currentLanguage === "fr"
              ? "Banque"
              : "Bank", // Default to English
      description:
        currentLanguage === "en"
          ? "All information about Bank Account"
          : currentLanguage === "ar"
            ? "كل المعلومات عن حساب البنك"
            : currentLanguage === "fr"
              ? "Toutes les informations sur le compte bancaire"
              : "All information about Bank Account", // Default to English
    },
  ];
  return (
    <>
      <div
        className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} ml-7 mt-12 flex-wrap`}
      >
        <Link
          className="font-semibold text-secondary hover:text-primary hover:underline"
          href="/"
        >
          {currentLanguage === "en"
            ? "Administration"
            : currentLanguage === "ar"
              ? "الإدارة"
              : currentLanguage === "fr"
                ? "Administration"
                : "Administration"}{" "}
          {/* Default to English */}
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: "rgba(82, 100, 132, 1)" }}
        >
          <path d="M10.707 17.707L16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
        <Link
          className="font-semibold text-secondary hover:text-primary hover:underline"
          href="/financial-management"
        >
          {currentLanguage === "en"
            ? "Financial Management"
            : currentLanguage === "ar"
              ? "الإدارة المالية"
              : currentLanguage === "fr"
                ? "Gestion financière"
                : "Financial Management"}{" "}
          {/* Default to English */}
        </Link>
      </div>
      <div
        className={` ${booleanValue ? "lg:ml-[10px]" : "lg:ml-[290px]"} mt-12 grid justify-center`}
      >
        <div className="grid grid-cols-2 gap-5 max-[577px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
          {financials.map((item, index) => (
            <Card
              key={index}
              href={item.href}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FinancialManagement;
