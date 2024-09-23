'use client'

import Calendar from "@/components/calendar";
import CircleProgress from "@/components/circleProgress";
import BreadCrumbs from "@/components/BreadCrumbs";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import { FaMedal, FaTrophy, FaAward } from 'react-icons/fa';


interface ViewDriverProps {
  params: {
    classId: string;
  };
}
const classDetails: React.FC<ViewDriverProps> = ({ params }) => {
  const breadcrumbs = [
    {
      nameEn: "Dashboard",
      nameAr: "لوحة القيادة",
      nameFr: "Tableau de bord",
      href: "/",
    },
    {
      nameEn: "Classes",
      nameAr: "الفصل",
      nameFr: "Classe",
      href: "/classes",
    },
    {
      nameEn: `Class details`,
      nameAr: `إضافة فصل`,
      nameFr: `Ajouter une classe`,
      href: `/class-detials/${params.classId}`,
    },
  ];
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} justify-center mt-16 grid lg:ml-[290px] lg:mr-32`}
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 mb-5">
            <div className="flex h-[125px] w-full items-center justify-center rounded-xl bg-bgPrimary p-4 shadow-xl">
              <div className="flex justify-between">
                <div>
                  <p className="mb-4">
                    {currentLanguage === "ar"
                      ? "الطلاب"
                      : currentLanguage === "fr"
                        ? "Étudiants"
                        : "Students"}
                  </p>
                  <div className="flex justify-between">
                    <img src="/images/userr.png" alt="user" className="w-[25px] -mr-[10px]" />
                    <img src="/images/userr.png" alt="user" className="w-[25px] -mr-[10px]" />
                    <img src="/images/userr.png" alt="user" className="w-[25px] -mr-[10px]" />
                    <img src="/images/userr.png" alt="user" className="w-[25px] -mr-[10px]" />

                    <p className="text-primary mx-4">

                      {currentLanguage === "ar"
                        ? "25 المزيد"
                        : currentLanguage === "fr"
                          ? "25 de plus"
                          : "25 More"}
                    </p>
                  </div>
                </div>
                <img src="/images/avatar.png" alt="user" className="w-[40px] h-[40px]" />
              </div>
            </div>
            <div className="flex h-[125px] w-full items-center justify-center rounded-xl bg-bgPrimary p-4 shadow-xl">
              <div className="flex justify-between">
                <div>
                  <p className="mb-4">
                    {currentLanguage === "ar"
                      ? "المعلمين"
                      : currentLanguage === "fr"
                        ? "Enseignants"
                        : "Teachers"}
                  </p>
                  <div className="flex justify-between">
                    <img src="/images/userr.png" alt="user" className="w-[25px] -mr-[10px]" />
                    <img src="/images/userr.png" alt="user" className="w-[25px] -mr-[10px]" />
                    <img src="/images/userr.png" alt="user" className="w-[25px] -mr-[10px]" />
                    <img src="/images/userr.png" alt="user" className="w-[25px] -mr-[10px]" />

                    <p className="text-primary mx-4">
                      {currentLanguage === "ar"
                        ? "4 المزيد"
                        : currentLanguage === "fr"
                          ? "4 de plus"
                          : "4 More"}</p>
                  </div>
                </div>
                <img src="/images/studentphoto.png" alt="user" className="w-[40px] h-[40px]" />
              </div>
            </div>

            <div className="flex h-[350px] w-full items-center justify-center rounded-xl bg-bgPrimary p-4 pt-8 pb-8 shadow-xl">
              <div className="flex flex-col justify-center items-start">
                <p className="text-textPrimary text-lg font-bold mt-5">
                  {currentLanguage === "ar"
                    ? "الحضور"
                    : currentLanguage === "fr"
                      ? "Présence"
                      : "Attendance"}
                </p>
                <CircleProgress percentage={75} />
                <div className="flex mb-5 gap-5">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <p className="mx-2">
                      {currentLanguage === "ar"
                        ? "حاضر"
                        : currentLanguage === "fr"
                          ? "Présent"
                          : "Present"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    <p className="mx-2">
                      {currentLanguage === "ar"
                        ? "غائب"
                        : currentLanguage === "fr"
                          ? "Absent"
                          : "Absent"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-[350px] w-full items-center justify-center rounded-xl bg-bgPrimary p-4 pt-8 pb-8">
              <div className="flex flex-col items-start">
                <p className="text-textPrimary text-lg font-bold mt-5">
                  {currentLanguage === "ar"
                    ? "اختبارات اليوم"
                    : currentLanguage === "fr"
                      ? "Les quiz du jour"
                      : "Today's Quizzes"}
                </p>
                <div className="flex schedule-item rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="number-circle bg-[rgba(37,99,235,0.3)] text-primary rounded-full w-12 h-12 flex items-center justify-center mx-4 text-3xl font-bold">
                      1
                    </div>
                  </div>
                  <div className="item-details">
                    <p className="text-lg text-blackOrWhite font-medium">
                      {currentLanguage === "ar"
                        ? "الرياضيات"
                        : currentLanguage === "fr"
                          ? "Mathématiques"
                          : "Math"}
                    </p>
                    <p className="text-secondary">{currentLanguage === "ar"
                      ? "٠١٢:٣٠ م - ١:٠٠ م"
                      : currentLanguage === "fr"
                        ? "12h30 - 13h00"
                        : "12:30 pm - 1:00 pm"}</p>
                  </div>
                </div>
                <div className="flex schedule-item rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="number-circle bg-[rgba(26,200,119,0.3)] text-success rounded-full w-12 h-12 flex items-center justify-center mx-4 text-3xl font-bold">
                      2
                    </div>
                  </div>
                  <div className="item-details">
                    <p className="text-lg text-blackOrWhite font-medium">
                      {currentLanguage === "ar"
                        ? "الإنجليزية"
                        : currentLanguage === "fr"
                          ? "Anglais"
                          : "English"}
                    </p>
                    <p className="text-secondary">{currentLanguage === "ar"
                      ? "٠١٢:٣٠ م - ١:٠٠ م"
                      : currentLanguage === "fr"
                        ? "12h30 - 13h00"
                        : "12:30 pm - 1:00 pm"}</p>
                  </div>
                </div>
                <div className="flex schedule-item rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="number-circle bg-[rgba(248,155,34,0.3)] text-warning rounded-full w-12 h-12 flex items-center justify-center mx-4 text-3xl font-bold">
                      3
                    </div>
                  </div>
                  <div className="item-details">
                    <p className="text-lg text-blackOrWhite font-medium">
                      {currentLanguage === "ar"
                        ? "العربية"
                        : currentLanguage === "fr"
                          ? "Arabe"
                          : "Arabic"}
                    </p>
                    <p className="text-secondary">{currentLanguage === "ar"
                      ? "٠١٢:٣٠ م - ١:٠٠ م"
                      : currentLanguage === "fr"
                        ? "12h30 - 13h00"
                        : "12:30 pm - 1:00 pm"}</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex flex-col h-[270px] rounded-xl bg-bgPrimary pl-4 pt-2 shadow-xl col-span-1 sm:col-span-2 lg:col-span-2">
              <p className="text-textPrimary text-lg font-bold mt-1">

                {currentLanguage === "ar"
                  ? "أفضل الطلاب في الفصل"
                  : currentLanguage === "fr"
                    ? "Les meilleurs élèves de la classe"
                    : "Class Toppers"}
              </p>

              <div className="profile-card mt-3">
                <div className="flex justify-between mx-4">
                  <div>
                    <div className="flex gap-2">
                      <img src="/images/userr.png" alt="profile photo" className="rounded-full h-[40px] w-[40px] mt-1" />
                      <div className="flex flex-col">
                        <div className="flex gap-2">
                          <h3 className="text-lg">
                            {currentLanguage === "ar"
                              ? "الاسم الكامل"
                              : currentLanguage === "fr"
                                ? "Nom complet"
                                : "Full Name"}</h3>
                          <FaTrophy style={{ color: 'gold' }} size={20} className="mt-1" />
                        </div>
                        <p className="text-textSecondary">
                          {currentLanguage === "ar"
                            ? "سنة واحدة"
                            : currentLanguage === "fr"
                              ? "Un an"
                              : "One year"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-textSecondary">95%</p>
                </div>
              </div>
              <div className="profile-card my-3">
                <div className="flex justify-between mx-4">
                  <div>
                    <div className="flex gap-2">
                      <img src="/images/userr.png" alt="profile photo" className="rounded-full h-[40px] w-[40px] mt-1" />
                      <div className="flex flex-col">
                        <div className="flex gap-2">
                          <h3 className="text-lg">
                            {currentLanguage === "ar"
                              ? "الاسم الكامل"
                              : currentLanguage === "fr"
                                ? "Nom complet"
                                : "Full Name"}</h3>
                          <FaMedal style={{ color: 'silver' }} size={20} className="mt-1" />
                        </div>
                        <p className="text-textSecondary">
                          {currentLanguage === "ar"
                            ? "سنة واحدة"
                            : currentLanguage === "fr"
                              ? "Un an"
                              : "One year"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-textSecondary">93%</p>
                </div>
              </div>
              <div className="profile-card my-3">
                <div className="flex justify-between mx-4">
                  <div>
                    <div className="flex gap-2">
                      <img src="/images/userr.png" alt="profile photo" className="rounded-full h-[40px] w-[40px] mt-1" />
                      <div className="flex flex-col">
                        <div className="flex gap-2">
                          <h3 className="text-lg">
                            {currentLanguage === "ar"
                              ? "الاسم الكامل"
                              : currentLanguage === "fr"
                                ? "Nom complet"
                                : "Full Name"}</h3>
                          <FaAward style={{ color: 'bronze' }} size={20} className="mt-1" />
                        </div>
                        <p className="text-textSecondary">
                          {currentLanguage === "ar"
                            ? "سنة واحدة"
                            : currentLanguage === "fr"
                              ? "Un an"
                              : "One year"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-textSecondary">90%</p>
                </div>
              </div>

            </div>
            {/* <div className="flex flex-col h-[270px] rounded-xl bg-bgPrimary p-4 shadow-xl col-span-1 sm:col-span-2 lg:col-span-2">
              
              <div className="flex justify-between">
                <div>div</div>
              <p>text</p>
              </div>
            </div> */}
          </div>

          <div className="flex justify-center">
            <Calendar />
          </div>
        </div>
      </div>

    </>
  );
};

export default classDetails;
