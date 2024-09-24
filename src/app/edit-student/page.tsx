"use client";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import BreadCrumbs from "@/components/BreadCrumbs";

const EditStudent = () => {
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Student",
      nameAr: "طالب",
      nameFr: "Élève",
      href: "/student",
    },
    {
      nameEn: "Edit Student",
      nameAr: "تعديل الغرفة",
      nameFr: "Modifier l'élève",
      href: "/edit-student",
    },
  ];
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />

      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className="mr-[5px] mt-5 grid h-[850px] items-center justify-center lg:ml-[270px]"
      >
        <form>
          <div className="grid h-[900px] items-center justify-center gap-5 rounded-xl bg-bgPrimary p-10 sm:w-[500px] md:w-[600px] lg:w-[750px] xl:h-[800px] xl:w-[1000px]">
            <div className="flex items-center justify-start gap-2">
              <svg
                className="h-6 w-6 font-bold text-secondary group-hover:text-primary"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <line x1="3" y1="21" x2="21" y2="21" />{" "}
                <line x1="3" y1="10" x2="21" y2="10" />{" "}
                <polyline points="5 6 12 3 19 6" />{" "}
                <line x1="4" y1="10" x2="4" y2="21" />{" "}
                <line x1="20" y1="10" x2="20" y2="21" />{" "}
                <line x1="8" y1="14" x2="8" y2="17" />{" "}
                <line x1="12" y1="14" x2="12" y2="17" />{" "}
                <line x1="16" y1="14" x2="16" y2="17" />
              </svg>
              <h1 className="font-sans text-[22px] font-semibold">
                {currentLanguage === "ar"
                  ? "معلومات الطالب"
                  : currentLanguage === "fr"
                    ? "Informations sur l'élève"
                    : "Student Information"}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="name"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "اسم الطالب"
                  : currentLanguage === "fr"
                    ? "Nom de l'élève"
                    : "Student Name"}
                <input
                  id="name"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
              <label
                htmlFor="code"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "الرقم التعريفي"
                  : currentLanguage === "fr"
                    ? "ID"
                    : "ID"}
                <input
                  id="code"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
              <label
                htmlFor="about"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "العمر"
                  : currentLanguage === "fr"
                    ? "Âge"
                    : "Age"}
                <input
                  id="about"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
              <label
                htmlFor="about"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "الجنس"
                  : currentLanguage === "fr"
                    ? "Sexe"
                    : "Gender"}
                <input
                  id="about"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="Version"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "الصف"
                  : currentLanguage === "fr"
                    ? "Classe"
                    : "Class"}
                <input
                  id="Version"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
              <label
                htmlFor="Version"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "اسم الأب"
                  : currentLanguage === "fr"
                    ? "Nom du père"
                    : "Father Name"}
                <input
                  id="Version"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
              <label
                htmlFor="Initial"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "اسم الأم"
                  : currentLanguage === "fr"
                    ? "Nom de la mère"
                    : "Mother Name"}

                <input
                  id="Initial"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
              <label
                htmlFor="Expiration"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "تاريخ الميلاد"
                  : currentLanguage === "fr"
                    ? "Date de naissance"
                    : "Date Of Birth"}
                <input
                  id="Expiration"
                  type="date"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="name"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "الدين"
                  : currentLanguage === "fr"
                    ? "Religion"
                    : "Religion"}
                <input
                  id="name"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
              <label
                htmlFor="code"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "العنوان"
                  : currentLanguage === "fr"
                    ? "Adresse"
                    : "Address"}
                <input
                  id="code"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
              <label
                htmlFor="about"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "البريد الإلكتروني"
                  : currentLanguage === "fr"
                    ? "Email"
                    : "Email"}
                <input
                  id="about"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
              <label
                htmlFor="about"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "الهاتف المحمول"
                  : currentLanguage === "fr"
                    ? "Mobile"
                    : "Mobile"}
                <input
                  id="about"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
            </div>
            <div className="flex justify-center text-center">
              <button
                type="submit"
                className="w-[140px] rounded-xl bg-primary px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
              >
                {currentLanguage === "ar"
                  ? "تعديل الطالب"
                  : currentLanguage === "fr"
                    ? "Modifier l'élève"
                    : "Edit Student"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditStudent;
