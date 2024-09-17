"use client"
import BreadCrumbs from "@/components/BreadCrumbs";
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link"
import { useSelector } from "react-redux";

const Class = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
  const breadcrumbs = [
    {
      nameEn: "Ai Insights",
      nameAr: "رؤى الذكاء الاصطناعي",
      nameFr: "Perspectives de l'IA",
      href: "/",
    },
    {
      nameEn: "School Comparisons",
      nameAr: "مقارنات المدارس",
      nameFr: "Comparaisons des écoles",
      href: "/insight",
    },
  ];
  return ( 
    <>
    <BreadCrumbs breadcrumbs={breadcrumbs} />
    <div className="lg:ml-[270px]">
      <div className="justify-left mb-5 mt-10 ml-4 flex gap-5 text-[20px] font-semibold">
        <Link
          href="/insight"
          
        >
          {currentLanguage === "en"
            ? "Student Performance"
            : currentLanguage === "ar"
              ? "أداء الطالب"
              : currentLanguage === "fr"
                ? "Performance de l'étudiant"
                : "Student Performance"}
        </Link>
        <Link href="/insight/school">
          {currentLanguage === "en"
            ? "School Performance"
            : currentLanguage === "ar"
              ? "أداء المدرسة"
              : currentLanguage === "fr"
                ? "Performance de l'école"
                : "School Performance"}
        </Link>
        <Link href="/insight/class" className="text-blue-500 underline">
          {currentLanguage === "en"
            ? "Class Performance"
            : currentLanguage === "ar"
              ? "أداء الفصل"
              : currentLanguage === "fr"
                ? "Performance de la classe"
                : "Class Performance"}
        </Link>
        <Link href="/insight/ml-exam"
        >
          {currentLanguage === "en"
            ? "ML Exam Performance"
            : currentLanguage === "ar"
              ? "أداء اختبار تعلم الآلة"
              : currentLanguage === "fr"
                ? "Performance de l'examen ML"
                : "ML Exam Performance"}
        </Link>
      </div>
      </div>
    </>
   );
}
 
export default Class;
