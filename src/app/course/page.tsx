"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import Card from "@/components/card";

const Course = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  const Courses = [
    {
      href: "/course/course-management",
      imgSrc: "/images/Semester.png",
      title:
        currentLanguage === "en"
          ? "Course"
          : currentLanguage === "ar"
            ? "الدورة"
            : currentLanguage === "fr"
              ? "Cours"
              : "Course", // Default to English
      description:
        currentLanguage === "en"
          ? "All Courses in School"
          : currentLanguage === "ar"
            ? "جميع الدورات في المدرسة"
            : currentLanguage === "fr"
              ? "Tous les cours à l'école"
              : "All Courses in School", // Default to English
    },
    {
      href: "/course/resource",
      imgSrc: "/images/mapping.png",
      title:
        currentLanguage === "en"
          ? "Resource"
          : currentLanguage === "ar"
            ? "المصدر"
            : currentLanguage === "fr"
              ? "Ressource"
              : "Resource", // Default to English
      description:
        currentLanguage === "en"
          ? "Create Course"
          : currentLanguage === "ar"
            ? "إنشاء دورة"
            : currentLanguage === "fr"
              ? "Créer un cours"
              : "Create Course", // Default to English
    },
  ];
  return (
    <>
      <div
        className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} ml-7 mt-12 flex-wrap`}
      >
        <Link
          className="text-[18px] font-semibold text-[#526484] hover:text-blue-400 hover:underline"
          href="/"
        >
          {currentLanguage === "en"
            ? "Academic"
            : currentLanguage === "ar"
              ? "أكاديمي"
              : currentLanguage === "fr"
                ? "Académique"
                : "Academic"}{" "}
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
          href="/course"
        >
          {currentLanguage === "en"
            ? "Course"
            : currentLanguage === "ar"
              ? "الدورة"
              : currentLanguage === "fr"
                ? "Cours"
                : "Course"}{" "}
          {/* Default to English */}
        </Link>
      </div>
      <div
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 grid justify-center`}
      >
        <div className="md:grid-cols2 grid grid-cols-2 gap-5 max-[577px]:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
          {Courses.map((item, index) => (
            <Card
              key={index}
              href={item.href}
              imgSrc={item.imgSrc}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Course;
