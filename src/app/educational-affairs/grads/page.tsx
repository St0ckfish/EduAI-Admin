/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import { skipToken } from '@reduxjs/toolkit/query/react';
import BreadCrumbs from "@/components/BreadCrumbs";
import Spinner from "@/components/spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { useGetAllGradesQuery } from "@/features/Acadimic/courseApi";
import { useGetAllStudentsQuery } from "@/features/User-Management/studentApi";
import { useGetAllSemestersQuery } from "@/features/Organization-Setteings/semesterApi";

const Grads = () => {
  const breadcrumbs = [
    { nameEn: "Academic", nameAr: "أكاديمي", nameFr: "Académique", href: "/" },
    { nameEn: "Educational Affairs", nameAr: "الشئون التعليمية", nameFr: "Affaires éducatives", href: "/educational-affairs" },
    { nameEn: "Grades", nameAr: "الدرجات", nameFr: "Notes", href: "/educational-affairs/grads" },
  ];

  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const { language: currentLanguage, loading } = useSelector((state: RootState) => state.language);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const { data: students, isLoading: isStudents } = useGetAllStudentsQuery({
    archived: "false",
    page: 0,
    size: 1000000,
  });
  const { data: semesters, isLoading: isSemester } = useGetAllSemestersQuery(null);
  const { data: grades, isLoading: isGrades } = useGetAllGradesQuery(
    selectedStudent && selectedSemester ? { semesterId: selectedSemester, studentId: selectedStudent } : null
  );

  if (loading || isStudents || isSemester || isGrades)
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
              ? "lg:mr-[100px]"
              : "lg:mr-[270px]"
            : booleanValue
            ? "lg:ml-[100px]"
            : "lg:ml-[270px]"
        } relative mx-3 mt-10 h-screen overflow-x-auto bg-transparent sm:rounded-lg`}
      >
        <div className="flex justify-between mb-5 max-[1150px]:grid max-[1150px]:justify-center gap-5">
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="border h-full w-[400px] rounded-xl px-4 py-3 text-[18px] text-black outline-none max-[458px]:w-[350px]"
          >
            <option value="">
              {currentLanguage === "en"
                ? "Select Student"
                : currentLanguage === "ar"
                ? "اختر الطالب"
                : "Sélectionner Étudiant"}
            </option>
            {students?.data.content.map((student: { id: string | null | undefined; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
              <option key={student.id} value={student.id ?? ''}>
                {student.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="border h-full w-[400px] rounded-xl px-4 py-3 text-[18px] text-black outline-none max-[458px]:w-[350px]"
          >
            <option value="">
              {currentLanguage === "en"
                ? "Select Semester"
                : currentLanguage === "ar"
                ? "اختر الفصل الدراسي"
                : "Sélectionner Semestre"}
            </option>
            {semesters?.data.content.map((semester: { id:string | null | undefined; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
              <option key={semester.id} value={semester.id ?? ''}>
                {semester.name}
              </option>
            ))}
          </select>
        </div>

        {grades && (
          <div className="relative overflow-auto shadow-md sm:rounded-lg">
            <table className="w-full overflow-x-auto text-left text-sm text-textSecondary rtl:text-right">
              <thead className="bg-thead text-xs uppercase text-textPrimary">
                <tr>
                  <th className="px-6 py-3">
                    {currentLanguage === "en"
                      ? "Subject"
                      : currentLanguage === "ar"
                      ? "المادة"
                      : "Sujet"}
                  </th>
                  <th className="px-6 py-3">
                    {currentLanguage === "en"
                      ? "First Assignment"
                      : currentLanguage === "ar"
                      ? "التكليف الأول"
                      : "Première évaluation"}
                  </th>
                  <th className="px-6 py-3">
                    {currentLanguage === "en"
                      ? "Second Assignment"
                      : currentLanguage === "ar"
                      ? "التكليف الثاني"
                      : "Deuxième évaluation"}
                  </th>
                  <th className="px-6 py-3">
                    {currentLanguage === "en"
                      ? "Third Assignment"
                      : currentLanguage === "ar"
                      ? "التكليف الثالث"
                      : "Troisième évaluation"}
                  </th>
                  <th className="px-6 py-3">
                    {currentLanguage === "en"
                      ? "Fourth Assignment"
                      : currentLanguage === "ar"
                      ? "التكليف الرابع"
                      : "Quatrième évaluation"}
                  </th>
                  <th className="px-6 py-3">
                    {currentLanguage === "en"
                      ? "Integrated Activities"
                      : currentLanguage === "ar"
                      ? "الأنشطة المندمجة"
                      : "Activités Intégrées"}
                  </th>
                  <th className="px-6 py-3">
                    {currentLanguage === "en"
                      ? "Points"
                      : currentLanguage === "ar"
                      ? "النقاط"
                      : "Points"}
                  </th>
                  <th className="px-6 py-3">
                    {currentLanguage === "en"
                      ? "Coefficients"
                      : currentLanguage === "ar"
                      ? "معاملات"
                      : "Coefficients"}
                  </th>
                  <th className="px-6 py-3">
                    {currentLanguage === "en"
                      ? "GPA"
                      : currentLanguage === "ar"
                      ? "المعدل"
                      : "Moyenne"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {grades.courses.map((course: { courseName: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; firstExamScore: any; secondExamScore: any; thirdExamScore: any; fourthExamScore: any; integratedActivitiesScore: any; points: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; coefficient: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; gpa: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, index: Key | null | undefined) => (
                  <tr key={index} className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
                    <td className="px-6 py-4">{course.courseName}</td>
                    <td className="px-6 py-4">{course.firstExamScore ?? "-"}</td>
                    <td className="px-6 py-4">{course.secondExamScore ?? "-"}</td>
                    <td className="px-6 py-4">{course.thirdExamScore ?? "-"}</td>
                    <td className="px-6 py-4">{course.fourthExamScore ?? "-"}</td>
                    <td className="px-6 py-4">{course.integratedActivitiesScore ?? "-"}</td>
                    <td className="px-6 py-4">{course.points}</td>
                    <td className="px-6 py-4">{course.coefficient}</td>
                    <td className="px-6 py-4">{course.gpa}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold">
                  <td colSpan={6} className="px-6 py-4">
                    {currentLanguage === "en"
                      ? "Total Coefficient"
                      : currentLanguage === "ar"
                      ? "إجمالي المعامل"
                      : "Total des Coefficients"}
                  </td>
                  <td colSpan={2} className="px-6 py-4">
                    {grades.totalCoefficient}
                  </td>
                </tr>
                <tr className="font-semibold">
                  <td colSpan={6} className="px-6 py-4">
                    {currentLanguage === "en"
                      ? "Semester Average"
                      : currentLanguage === "ar"
                      ? "معدل الفصل"
                      : "Moyenne du Semestre"}
                  </td>
                  <td colSpan={2} className="px-6 py-4">
                    {grades.averageOfThisSemester == null ? grades.averageOfThisSemester : "-" }
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Grads;
