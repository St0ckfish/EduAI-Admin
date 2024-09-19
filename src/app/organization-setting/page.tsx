"use client";
import Card from "@/components/card";
/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import { RiFileList2Line } from "react-icons/ri"; // Report
import { AiOutlineSafetyCertificate } from "react-icons/ai"; // Permission
import { FaCalendarAlt, FaUmbrellaBeach } from "react-icons/fa"; // Semester, Annual Leave
import { MdBusiness, MdWorkOutline } from "react-icons/md"; // Department, Position
import BreadCrumbs from "@/components/BreadCrumbs";

const OrganizationSettings = () => {
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Organization Settings",
      nameAr: "إعدادات المنظمة",
      nameFr: "Paramètres org",
      href: "/organization-setting",
    },
  ];
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  const settings = [
    {
      href: "/organization-setting/reports",
      icon: <RiFileList2Line size={40} />,
      title:
        currentLanguage === "en"
          ? "Reports"
          : currentLanguage === "ar"
            ? "التقارير"
            : currentLanguage === "fr"
              ? "Rapports"
              : "Reports", // Default to English
      description:
        currentLanguage === "en"
          ? "All user Reports"
          : currentLanguage === "ar"
            ? "جميع تقارير المستخدمين"
            : currentLanguage === "fr"
              ? "Tous les rapports des utilisateurs"
              : "All user Reports", // Default to English
    },
    {
      href: "/organization-setting/permissions/department-permission",
      icon: <AiOutlineSafetyCertificate size={40} />,
      title:
        currentLanguage === "en"
          ? "Permission"
          : currentLanguage === "ar"
            ? "الصلاحيات"
            : currentLanguage === "fr"
              ? "Permissions"
              : "Permission", // Default to English
      description:
        currentLanguage === "en"
          ? "All Permissions"
          : currentLanguage === "ar"
            ? "جميع الصلاحيات"
            : currentLanguage === "fr"
              ? "Toutes les permissions"
              : "All Permissions", // Default to English
    },
    {
      href: "/organization-setting/semester",
      icon: <FaCalendarAlt size={40} />,
      title:
        currentLanguage === "en"
          ? "Semester"
          : currentLanguage === "ar"
            ? "الفصل الدراسي"
            : currentLanguage === "fr"
              ? "Sessions"
              : "Semester", // Default to English
      description:
        currentLanguage === "en"
          ? "Enter semester information"
          : currentLanguage === "ar"
            ? "أدخل معلومات الفصل الدراسي"
            : currentLanguage === "fr"
              ? "Entrer les informations du semestre"
              : "Enter semester information", // Default to English
    },
    {
      href: "/organization-setting/department",
      icon: <MdBusiness size={40} />,
      title:
        currentLanguage === "en"
          ? "Department"
          : currentLanguage === "ar"
            ? "القسم"
            : currentLanguage === "fr"
              ? "Classes"
              : "Department", // Default to English
      description:
        currentLanguage === "en"
          ? "Enter Departments information"
          : currentLanguage === "ar"
            ? "أدخل معلومات الأقسام"
            : currentLanguage === "fr"
              ? "Entrer les informations des départements"
              : "Enter Departments information", // Default to English
    },
    {
      href: "/organization-setting/position",
      icon: <MdWorkOutline size={40} />,
      title:
        currentLanguage === "en"
          ? "Position"
          : currentLanguage === "ar"
            ? "المنصب"
            : currentLanguage === "fr"
              ? "Postes"
              : "Position", // Default to English
      description:
        currentLanguage === "en"
          ? "Enter Position information"
          : currentLanguage === "ar"
            ? "أدخل معلومات المنصب"
            : currentLanguage === "fr"
              ? "Entrer les informations de poste"
              : "Enter Position information", // Default to English
    },
    {
      href: "/organization-setting/annual",
      icon: <FaUmbrellaBeach size={40} />,
      title:
        currentLanguage === "en"
          ? "Annual Leave"
          : currentLanguage === "ar"
            ? "الإجازة السنوية"
            : currentLanguage === "fr"
              ? "Congés Annuels"
              : "Annual Leave", // Default to English
      description:
        currentLanguage === "en"
          ? "All Annual Leave"
          : currentLanguage === "ar"
            ? "كل الإجازات السنوية"
            : currentLanguage === "fr"
              ? "Tous les congés annuels"
              : "All Annual Leave", // Default to English
    },
  ];
  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 grid justify-center`}
      >
        <div className="grid grid-cols-2 gap-5 max-[577px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {settings.map((item, index) => (
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

export default OrganizationSettings;
