"use client";
import AttendCard from "@/components/AttendCard";
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FaUserTie } from "react-icons/fa"; // Driver Icon
import { FaBriefcase } from "react-icons/fa"; // Employee Icon
import { FaUserGraduate } from "react-icons/fa"; // Student Icon
import { FaChalkboardTeacher } from "react-icons/fa"; // Teacher Icon
import { FaHardHat } from "react-icons/fa";
import {
  useGetAllEmployeesQuery,
  useGetAllStudentsQuery,
  useGetAllTeachersQuery,
  useGetAllWorkersQuery,
  useGetEmployeeAttendenceQuery,
  useGetStudentAttendenceQuery,
  useGetTeacherAttendenceQuery,
  useGetWorkerAttendenceQuery,
} from "@/features/dashboard/dashboardApi";
import Spinner from "@/components/spinner";
import {
  useGetDriversAttendQuery,
  useGetDriversCountQuery,
} from "@/features/attendance/attendanceApi";
import BreadCrumbs from "@/components/BreadCrumbs";

const Attendance = () => {
  const breadcrumbs = [
    {
      nameEn: "Dashboard",
      nameAr: "لوحة القيادة",
      nameFr: "Tableau de bord",
      href: "/",
    },
    {
      nameEn: "Attendances",
      nameAr: "الحضور",
      nameFr: "Assiduité",
      href: "/attendances",
    },
  ];
  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  const { data: employeedata, isLoading: isLoadingE } =
    useGetEmployeeAttendenceQuery(null);
  const { data: driverCount, isLoading: isCount } =
    useGetDriversCountQuery(null);
  const { data: driverAttend, isLoading: isAttend } =
    useGetDriversAttendQuery(null);
  const { data: teacherdata, isLoading: isLoadingT } =
    useGetTeacherAttendenceQuery(null);
  const { data: workerdata, isLoading: isLoadingW } =
    useGetWorkerAttendenceQuery(null);
  const { data: employeeCount, isLoading: isECount } =
    useGetAllEmployeesQuery(null);
  const { data: studentCount, isLoading: isSCount } =
    useGetAllStudentsQuery(null);
  const { data: students, isLoading: isStudents } =
    useGetStudentAttendenceQuery(null);

  const { data: teachers, isLoading: isTeacher } = useGetAllTeachersQuery(null);
  const { data: workers, isLoading: isWorker } = useGetAllWorkersQuery(null);

  const UserManagments = [
    {
      href: "/driver-attendance",
      icon: <FaUserTie size={30} />,
      title:
        currentLanguage === "en"
          ? "Drivers"
          : currentLanguage === "ar"
            ? "السائقون"
            : currentLanguage === "fr"
              ? "Chauffeurs"
              : "Drivers", // Default to English
      description: driverCount?.data,
      number: driverAttend?.data,
    },
    {
      href: "/employee-attendance",
      icon: <FaBriefcase size={30} />,
      title:
        currentLanguage === "en"
          ? "Employees"
          : currentLanguage === "ar"
            ? "الموظفون"
            : currentLanguage === "fr"
              ? "Employés"
              : "Employees", // Default to English
      description: employeeCount?.data, // Default to English
      number: employeedata?.data,
    },
    {
      href: "/student-attendance",
      icon: <FaUserGraduate size={30} />,
      title:
        currentLanguage === "en"
          ? "Students"
          : currentLanguage === "ar"
            ? "الطلاب"
            : currentLanguage === "fr"
              ? "Étudiants"
              : "Students", // Default to English
      description: studentCount?.data, // Default to English
      number: students?.data,
    },
    {
      href: "/teacher-attendance",
      icon: <FaChalkboardTeacher size={30} />,
      title:
        currentLanguage === "en"
          ? "Teachers"
          : currentLanguage === "ar"
            ? "المعلمين"
            : currentLanguage === "fr"
              ? "Enseignants"
              : "Teachers", // Default to English
      description: teachers?.data, // Default to English
      number: teacherdata?.data,
    },
    {
      href: "/worker-attendance",
      icon: <FaHardHat size={30} />,
      title:
        currentLanguage === "en"
          ? "Workers"
          : currentLanguage === "ar"
            ? "العمال"
            : currentLanguage === "fr"
              ? "Travailleurs"
              : "Worker", // Default to English
      description: workers?.data, // Default to English
      number: workerdata?.data,
    },
  ];

  if (
    isLoadingE ||
    isLoadingT ||
    isLoadingW ||
    isCount ||
    isAttend ||
    isECount ||
    isSCount ||
    isStudents ||
    isTeacher ||
    isWorker ||
    loading
  )
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
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
        <div className="grid grid-cols-2 gap-5 max-[577px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {UserManagments.map((item, index) => (
            <AttendCard
              key={index}
              href={item.href}
              icon={item.icon}
              title={item.title}
              description={item.description}
              number={item.number}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Attendance;
