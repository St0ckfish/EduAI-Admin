"use client";
/* eslint-disable @next/next/no-img-element */
import Card from "@/components/card";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import {
  FaDollarSign,
  FaWallet,
  FaBuilding,
  FaMoneyBill,
} from "react-icons/fa";
import BreadCrumbs from "@/components/BreadCrumbs";

const FinancialManagement = () => {
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Financial Management",
      nameAr: "الإدارة المالية",
      nameFr: "Gestion financière",
      href: "/financial-management",
    },
  ];

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
      icon: <FaBuilding size={40} />,
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
    {
      href: "/financial-management/payment",
      icon: <FaMoneyBill size={40} />,
      title:
        currentLanguage === "en"
          ? "Payment"
          : currentLanguage === "ar"
            ? "الدفع"
            : currentLanguage === "fr"
              ? "Paiement"
              : "Paiement", // Default to English
      description:
        currentLanguage === "en"
          ? "Payment Request and Setting"
          : currentLanguage === "ar"
            ? "طلب الدفع والاعدادات"
            : currentLanguage === "fr"
              ? "Demande de paiement, Paramètre"
              : "Demande de paiement, Paramètre", // Default to English
    },
  ];
  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />

      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className={` ${booleanValue ? "lg:ml-[10px]" : "lg:ml-[290px]"} mt-12 grid justify-center`}
      >
        <div className="grid grid-cols-2 gap-5 max-[577px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
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
