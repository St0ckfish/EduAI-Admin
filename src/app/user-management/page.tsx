"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import Card from "@/components/card";
import {
  FaUserGraduate,
  FaCar,
  FaBriefcase,
  FaUserFriends,
  FaChalkboardTeacher,
  FaHardHat,
} from "react-icons/fa";
import BreadCrumbs from "@/components/BreadCrumbs";

const UserManagment = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  const UserManagments = [
    {
      href: "/driver",
      icon: <FaCar size={40} />,
      title:
        currentLanguage === "en"
          ? "Driver"
          : currentLanguage === "ar"
            ? "سائق"
            : currentLanguage === "fr"
              ? "Conducteurs"
              : "Driver",
      description:
        currentLanguage === "en"
          ? "Number of Drivers"
          : currentLanguage === "ar"
            ? "عدد السائقين"
            : currentLanguage === "fr"
              ? "Nombre de conducteurs"
              : "Number of Drivers",
    },
    {
      href: "/employee",
      icon: <FaBriefcase size={40} />,
      title:
        currentLanguage === "en"
          ? "Employee"
          : currentLanguage === "ar"
            ? "موظف"
            : currentLanguage === "fr"
              ? "Employés"
              : "Employee",
      description:
        currentLanguage === "en"
          ? "Number of Employees"
          : currentLanguage === "ar"
            ? "عدد الموظفين"
            : currentLanguage === "fr"
              ? "Nombre d'employés"
              : "Number of Employees",
    },
    {
      href: "/parent",
      icon: <FaUserFriends size={40} />,

      title:
        currentLanguage === "en"
          ? "Parent"
          : currentLanguage === "ar"
            ? "ولي الأمر"
            : currentLanguage === "fr"
              ? "Parents"
              : "Parent",
      description:
        currentLanguage === "en"
          ? "Number of Parents"
          : currentLanguage === "ar"
            ? "عدد أولياء الأمور"
            : currentLanguage === "fr"
              ? "Nombre de parents"
              : "Number of Parents",
    },
    {
      href: "/student",
      icon: <FaUserGraduate size={40} />,
      title:
        currentLanguage === "en"
          ? "Student"
          : currentLanguage === "ar"
            ? "طالب"
            : currentLanguage === "fr"
              ? "Étudiants"
              : "Student",
      description:
        currentLanguage === "en"
          ? "Number of Students"
          : currentLanguage === "ar"
            ? "عدد الطلاب"
            : currentLanguage === "fr"
              ? "Nombre d'étudiants"
              : "Number of Students",
    },
    {
      href: "/teacher",
      icon: <FaChalkboardTeacher size={40} />,
      title:
        currentLanguage === "en"
          ? "Teacher"
          : currentLanguage === "ar"
            ? "معلم"
            : currentLanguage === "fr"
              ? "Enseignants"
              : "Teacher",
      description:
        currentLanguage === "en"
          ? "All Teachers"
          : currentLanguage === "ar"
            ? "جميع المعلمين"
            : currentLanguage === "fr"
              ? "Tous les enseignants"
              : "All Teachers",
    },
    {
      href: "/worker",
      icon: <FaHardHat size={40} />,
      title:
        currentLanguage === "en"
          ? "Worker"
          : currentLanguage === "ar"
            ? "عامل"
            : currentLanguage === "fr"
              ? "Travailleurs"
              : "Worker",
      description:
        currentLanguage === "en"
          ? "All Workers"
          : currentLanguage === "ar"
            ? "جميع العمال"
            : currentLanguage === "fr"
              ? "Tous les travailleurs"
              : "All Workers",
    },
  ];

  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "User Management",
      nameAr: "إدارة المستخدمين",
      nameFr: "Gestion des utilisateurs",
      href: "/user-management",
    },
  ];

  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className={`${
          currentLanguage === "ar"
            ? booleanValue
              ? "lg:mr-[40px]"
              : "lg:mr-[290px]"
            : booleanValue
              ? "lg:ml-[40px]"
              : "lg:ml-[290px]"
        } mt-12 grid justify-center`}  
        >
        <div className="grid grid-cols-2 gap-5 max-[577px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {UserManagments.map((item, index) => (
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

export default UserManagment;
