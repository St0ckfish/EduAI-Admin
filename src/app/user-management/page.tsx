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
              ? "Conducteur"
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
              ? "Employé"
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
              ? "Parent"
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
              ? "Étudiant"
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
              ? "Enseignant"
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
              ? "Travailleur"
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

  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  return (
    <>
      <div
        className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} ml-7 mt-12 flex-wrap text-[18px] max-[550px]:text-[15px]`}
      >
        <Link
          className="text-[18px] font-semibold text-secondary hover:text-primary hover:underline"
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
          className="text-[18px] font-semibold text-[#526484] hover:text-blue-400 hover:underline"
          href="/user-management"
        >
          {currentLanguage === "en"
            ? "User Management"
            : currentLanguage === "ar"
              ? "إدارة المستخدمين"
              : currentLanguage === "fr"
                ? "Gestion des utilisateurs"
                : "User Management"}{" "}
          {/* Default to English */}
        </Link>
      </div>
      <div
        className={` ${booleanValue ? "lg:ml-[10px]" : "lg:ml-[290px]"} mt-12 grid justify-center`}
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
