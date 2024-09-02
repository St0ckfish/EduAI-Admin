"use client";
import Card from "@/components/card";
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const EducationalAffairs = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  const Educations = [
    {
      href: "/educational-affairs/events",
      imgSrc: "/images/events.png",
      title:
        currentLanguage === "en"
          ? "Events"
          : currentLanguage === "ar"
            ? "الأحداث"
            : currentLanguage === "fr"
              ? "Événements"
              : "Events", // Default to English
      description:
        currentLanguage === "en"
          ? "All school events and you can add new event"
          : currentLanguage === "ar"
            ? "جميع أحداث المدرسة ويمكنك إضافة حدث جديد"
            : currentLanguage === "fr"
              ? "Tous les événements scolaires et vous pouvez ajouter un nouvel événement"
              : "All school events and you can add new event", // Default to English
    },
    {
      href: "/educational-affairs/exams",
      imgSrc: "/images/exams.png",
      title:
        currentLanguage === "en"
          ? "Exams"
          : currentLanguage === "ar"
            ? "الامتحانات"
            : currentLanguage === "fr"
              ? "Examens"
              : "Exams", // Default to English
      description:
        currentLanguage === "en"
          ? "All exams in all subjects"
          : currentLanguage === "ar"
            ? "جميع الامتحانات في جميع المواد"
            : currentLanguage === "fr"
              ? "Tous les examens dans toutes les matières"
              : "All exams in all subjects", // Default to English
    },
    {
      href: "/educational-affairs/grads",
      imgSrc: "/images/grads.png",
      title:
        currentLanguage === "en"
          ? "Grades"
          : currentLanguage === "ar"
            ? "الدرجات"
            : currentLanguage === "fr"
              ? "Notes"
              : "Grades", // Default to English
      description:
        currentLanguage === "en"
          ? "Grades in all exams"
          : currentLanguage === "ar"
            ? "الدرجات في جميع الامتحانات"
            : currentLanguage === "fr"
              ? "Notes dans tous les examens"
              : "Grades in all exams", // Default to English
    },
    {
      href: "/educational-affairs/schedule",
      imgSrc: "/images/schedual.png",
      title:
        currentLanguage === "en"
          ? "Schedule"
          : currentLanguage === "ar"
            ? "الجدول"
            : currentLanguage === "fr"
              ? "Emploi du temps"
              : "Schedule", // Default to English
      description:
        currentLanguage === "en"
          ? "All Schedules for both teachers and classes"
          : currentLanguage === "ar"
            ? "جميع الجداول لكل من المعلمين والفصول"
            : currentLanguage === "fr"
              ? "Tous les emplois du temps pour les enseignants et les classes"
              : "All Schedules for both teachers and classes", // Default to English
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
          href="/educational-affairs"
        >
          {currentLanguage === "en"
            ? "Educational Affairs"
            : currentLanguage === "ar"
              ? "الشؤون التعليمية"
              : currentLanguage === "fr"
                ? "Affaires éducatives"
                : "Educational Affairs"}{" "}
          {/* Default to English */}
        </Link>
      </div>
      <div
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 grid justify-center`}
      >
        <div className="grid grid-cols-2 gap-5 max-[577px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {Educations.map((item, index) => (
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

export default EducationalAffairs;
