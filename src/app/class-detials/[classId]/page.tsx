"use client";

import Calendar from "@/components/calendar";
import CircleProgress from "@/components/circleProgress";
import BreadCrumbs from "@/components/BreadCrumbs";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import { FaMedal, FaTrophy, FaAward } from "react-icons/fa";
import Spinner from "@/components/spinner";

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

  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );

  if (loading)
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
        className={` ${
          currentLanguage === "ar"
            ? booleanValue
              ? "lg:mr-[100px]"
              : "lg:mr-[270px]"
            : booleanValue
              ? "lg:ml-[100px]"
              : "lg:ml-[270px]"
        } mt-16 grid justify-center lg:ml-[290px] lg:mr-32`}
      >
        <div className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
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
                    <img
                      src="/images/userr.png"
                      alt="user"
                      className="-mr-[10px] w-[25px]"
                    />
                    <img
                      src="/images/userr.png"
                      alt="user"
                      className="-mr-[10px] w-[25px]"
                    />
                    <img
                      src="/images/userr.png"
                      alt="user"
                      className="-mr-[10px] w-[25px]"
                    />
                    <img
                      src="/images/userr.png"
                      alt="user"
                      className="-mr-[10px] w-[25px]"
                    />

                    <p className="mx-4 text-primary">
                      {currentLanguage === "ar"
                        ? "25 المزيد"
                        : currentLanguage === "fr"
                          ? "25 de plus"
                          : "25 More"}
                    </p>
                  </div>
                </div>
                <img
                  src="/images/avatar.png"
                  alt="user"
                  className="h-[40px] w-[40px]"
                />
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
                    <img
                      src="/images/userr.png"
                      alt="user"
                      className="-mr-[10px] w-[25px]"
                    />
                    <img
                      src="/images/userr.png"
                      alt="user"
                      className="-mr-[10px] w-[25px]"
                    />
                    <img
                      src="/images/userr.png"
                      alt="user"
                      className="-mr-[10px] w-[25px]"
                    />
                    <img
                      src="/images/userr.png"
                      alt="user"
                      className="-mr-[10px] w-[25px]"
                    />

                    <p className="mx-4 text-primary">
                      {currentLanguage === "ar"
                        ? "4 المزيد"
                        : currentLanguage === "fr"
                          ? "4 de plus"
                          : "4 More"}
                    </p>
                  </div>
                </div>
                <img
                  src="/images/studentphoto.png"
                  alt="user"
                  className="h-[40px] w-[40px]"
                />
              </div>
            </div>

            <div className="flex h-[350px] w-full items-center justify-center rounded-xl bg-bgPrimary p-4 pb-8 pt-8 shadow-xl">
              <div className="flex flex-col items-start justify-center">
                <p className="mt-5 text-lg font-bold text-textPrimary">
                  {currentLanguage === "ar"
                    ? "الحضور"
                    : currentLanguage === "fr"
                      ? "Présence"
                      : "Attendance"}
                </p>
                <CircleProgress percentage={75} />
                <div className="mb-5 flex gap-5">
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <p className="mx-2">
                      {currentLanguage === "ar"
                        ? "حاضر"
                        : currentLanguage === "fr"
                          ? "Présent"
                          : "Present"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-secondary"></span>
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
            <div className="flex h-[350px] w-full items-center justify-center rounded-xl bg-bgPrimary p-4 pb-8 pt-8">
              <div className="flex flex-col items-start">
                <p className="mt-5 text-lg font-bold text-textPrimary">
                  {currentLanguage === "ar"
                    ? "اختبارات اليوم"
                    : currentLanguage === "fr"
                      ? "Les quiz du jour"
                      : "Today's Quizzes"}
                </p>
                <div className="schedule-item flex rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="number-circle mx-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(37,99,235,0.3)] text-3xl font-bold text-primary">
                      1
                    </div>
                  </div>
                  <div className="item-details">
                    <p className="text-lg font-medium text-blackOrWhite">
                      {currentLanguage === "ar"
                        ? "الرياضيات"
                        : currentLanguage === "fr"
                          ? "Mathématiques"
                          : "Math"}
                    </p>
                    <p className="text-secondary">
                      {currentLanguage === "ar"
                        ? "٠١٢:٣٠ م - ١:٠٠ م"
                        : currentLanguage === "fr"
                          ? "12h30 - 13h00"
                          : "12:30 pm - 1:00 pm"}
                    </p>
                  </div>
                </div>
                <div className="schedule-item flex rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="number-circle mx-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(26,200,119,0.3)] text-3xl font-bold text-success">
                      2
                    </div>
                  </div>
                  <div className="item-details">
                    <p className="text-lg font-medium text-blackOrWhite">
                      {currentLanguage === "ar"
                        ? "الإنجليزية"
                        : currentLanguage === "fr"
                          ? "Anglais"
                          : "English"}
                    </p>
                    <p className="text-secondary">
                      {currentLanguage === "ar"
                        ? "٠١٢:٣٠ م - ١:٠٠ م"
                        : currentLanguage === "fr"
                          ? "12h30 - 13h00"
                          : "12:30 pm - 1:00 pm"}
                    </p>
                  </div>
                </div>
                <div className="schedule-item flex rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="number-circle mx-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(248,155,34,0.3)] text-3xl font-bold text-warning">
                      3
                    </div>
                  </div>
                  <div className="item-details">
                    <p className="text-lg font-medium text-blackOrWhite">
                      {currentLanguage === "ar"
                        ? "العربية"
                        : currentLanguage === "fr"
                          ? "Arabe"
                          : "Arabic"}
                    </p>
                    <p className="text-secondary">
                      {currentLanguage === "ar"
                        ? "٠١٢:٣٠ م - ١:٠٠ م"
                        : currentLanguage === "fr"
                          ? "12h30 - 13h00"
                          : "12:30 pm - 1:00 pm"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 flex h-[270px] flex-col rounded-xl bg-bgPrimary pl-4 pt-2 shadow-xl sm:col-span-2 lg:col-span-2">
              <p className="mt-1 text-lg font-bold text-textPrimary">
                {currentLanguage === "ar"
                  ? "أفضل الطلاب في الفصل"
                  : currentLanguage === "fr"
                    ? "Les meilleurs élèves de la classe"
                    : "Class Toppers"}
              </p>

              <div className="profile-card mt-3">
                <div className="mx-4 flex justify-between">
                  <div>
                    <div className="flex gap-2">
                      <img
                        src="/images/userr.png"
                        alt="profile photo"
                        className="mt-1 h-[40px] w-[40px] rounded-full"
                      />
                      <div className="flex flex-col">
                        <div className="flex gap-2">
                          <h3 className="text-lg">
                            {currentLanguage === "ar"
                              ? "الاسم الكامل"
                              : currentLanguage === "fr"
                                ? "Nom complet"
                                : "Full Name"}
                          </h3>
                          <FaTrophy
                            style={{ color: "gold" }}
                            size={20}
                            className="mt-1"
                          />
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
                <div className="mx-4 flex justify-between">
                  <div>
                    <div className="flex gap-2">
                      <img
                        src="/images/userr.png"
                        alt="profile photo"
                        className="mt-1 h-[40px] w-[40px] rounded-full"
                      />
                      <div className="flex flex-col">
                        <div className="flex gap-2">
                          <h3 className="text-lg">
                            {currentLanguage === "ar"
                              ? "الاسم الكامل"
                              : currentLanguage === "fr"
                                ? "Nom complet"
                                : "Full Name"}
                          </h3>
                          <FaMedal
                            style={{ color: "silver" }}
                            size={20}
                            className="mt-1"
                          />
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
                <div className="mx-4 flex justify-between">
                  <div>
                    <div className="flex gap-2">
                      <img
                        src="/images/userr.png"
                        alt="profile photo"
                        className="mt-1 h-[40px] w-[40px] rounded-full"
                      />
                      <div className="flex flex-col">
                        <div className="flex gap-2">
                          <h3 className="text-lg">
                            {currentLanguage === "ar"
                              ? "الاسم الكامل"
                              : currentLanguage === "fr"
                                ? "Nom complet"
                                : "Full Name"}
                          </h3>
                          <FaAward
                            style={{ color: "bronze" }}
                            size={20}
                            className="mt-1"
                          />
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
