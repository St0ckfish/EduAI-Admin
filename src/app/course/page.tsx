"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import Card from "@/components/card";
import { FiBook } from "react-icons/fi";
import { AiOutlineFileText } from "react-icons/ai";
import BreadCrumbs from "@/components/BreadCrumbs";

const Course = () => {
  const breadcrumbs = [
    {
      nameEn: "Academic",
      nameAr: "أكاديمي",
      nameFr: "Académique",
      href: "/",
    },
    {
      nameEn: "Course",
      nameAr: "الدورة",
      nameFr: "Cours",
      href: "/course",
    },
  ];
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  const Courses = [
    {
      href: "/course/course-management",
      icon: <FiBook size={40} />,
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
      icon: <AiOutlineFileText size={40} />,
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
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      
      <div
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 grid justify-center`}
      >
        <div className="md:grid-cols2 grid grid-cols-2 gap-5 max-[577px]:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
          {Courses.map((item, index) => (
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

export default Course;
