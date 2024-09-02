"use client";
/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const Archive = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  const items = [
    { href: "/archive/driver", imgSrc: "/images/driver.png", key: "Driver" },
    {
      href: "/archive/employee",
      imgSrc: "/images/employee.png",
      key: "Employee",
    },
    { href: "/archive/parent", imgSrc: "/images/Vector.png", key: "Parent" },
    { href: "/archive/student", imgSrc: "/images/student.png", key: "Student" },
    { href: "/archive/teacher", imgSrc: "/images/Teacher.png", key: "Teacher" },
    { href: "/archive/worker", imgSrc: "/images/Worker.png", key: "Worker" },
    {
      href: "/bus",
      icon: (
        <svg
          className="h-12 w-12 text-[#000000]"
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
          <circle cx="6" cy="17" r="2" /> <circle cx="18" cy="17" r="2" />{" "}
          <path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" />{" "}
          <polyline points="16 5 17.5 12 22 12" />{" "}
          <line x1="2" y1="10" x2="17" y2="10" />{" "}
          <line x1="7" y1="5" x2="7" y2="10" />{" "}
          <line x1="12" y1="5" x2="12" y2="10" />
        </svg>
      ),
      key: "Bus",
    },
    {
      href: "/book",
      icon: (
        <svg
          className="h-11 w-11 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      key: "Library",
    },
    { href: "/rooms", imgSrc: "/images/Door.png", key: "Room" },
    {
      href: "/educational-affairs/grads",
      imgSrc: "/images/grads.png",
      key: "Grades",
    },
    {
      href: "/course/resource",
      imgSrc: "/images/mapping.png",
      key: "Resource",
    },
    {
      href: "/financial-management",
      imgSrc: "/images/dollar.png",
      key: "Fees",
    },
  ];

  const getTranslatedText = (key: string) => {
    switch (key) {
      case "Driver":
        return currentLanguage === "en"
          ? "Driver"
          : currentLanguage === "ar"
            ? "السائق"
            : currentLanguage === "fr"
              ? "Chauffeur"
              : "Driver";
      case "Employee":
        return currentLanguage === "en"
          ? "Employee"
          : currentLanguage === "ar"
            ? "الموظف"
            : currentLanguage === "fr"
              ? "Employé"
              : "Employee";
      case "Parent":
        return currentLanguage === "en"
          ? "Parent"
          : currentLanguage === "ar"
            ? "ولي الأمر"
            : currentLanguage === "fr"
              ? "Parent"
              : "Parent";
      case "Student":
        return currentLanguage === "en"
          ? "Student"
          : currentLanguage === "ar"
            ? "الطالب"
            : currentLanguage === "fr"
              ? "Étudiant"
              : "Student";
      case "Teacher":
        return currentLanguage === "en"
          ? "Teacher"
          : currentLanguage === "ar"
            ? "المعلم"
            : currentLanguage === "fr"
              ? "Enseignant"
              : "Teacher";
      case "Worker":
        return currentLanguage === "en"
          ? "Worker"
          : currentLanguage === "ar"
            ? "العامل"
            : currentLanguage === "fr"
              ? "Travailleur"
              : "Worker";
      case "Bus":
        return currentLanguage === "en"
          ? "Bus"
          : currentLanguage === "ar"
            ? "الحافلة"
            : currentLanguage === "fr"
              ? "Autobus"
              : "Bus";
      case "Library":
        return currentLanguage === "en"
          ? "Library"
          : currentLanguage === "ar"
            ? "المكتبة"
            : currentLanguage === "fr"
              ? "Bibliothèque"
              : "Library";
      case "Room":
        return currentLanguage === "en"
          ? "Room"
          : currentLanguage === "ar"
            ? "الغرفة"
            : currentLanguage === "fr"
              ? "Chambre"
              : "Room";
      case "Grades":
        return currentLanguage === "en"
          ? "Grades"
          : currentLanguage === "ar"
            ? "الدرجات"
            : currentLanguage === "fr"
              ? "Notes"
              : "Grades";
      case "Resource":
        return currentLanguage === "en"
          ? "Resource"
          : currentLanguage === "ar"
            ? "المصدر"
            : currentLanguage === "fr"
              ? "Ressource"
              : "Resource";
      case "Fees":
        return currentLanguage === "en"
          ? "Fees"
          : currentLanguage === "ar"
            ? "الرسوم"
            : currentLanguage === "fr"
              ? "Frais"
              : "Fees";
      default:
        return key; // Fallback to key if not found
    }
  };

  return (
    <>
      <div
        className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} ml-7 mt-12 flex-wrap text-[18px] max-[550px]:text-[15px]`}
      >
        <Link
          className="text-[18px] font-semibold text-[#526484] hover:text-blue-400 hover:underline"
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
          href="/archive"
        >
          {currentLanguage === "en"
            ? "Archive"
            : currentLanguage === "ar"
              ? "الأرشيف"
              : currentLanguage === "fr"
                ? "Archives"
                : "Archive"}{" "}
          {/* Default to English */}
        </Link>
      </div>
      <div
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 grid justify-center`}
      >
        <div className="grid grid-cols-2 gap-5 max-[577px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid h-[250px] w-[250px] items-center justify-center rounded-xl bg-white shadow-lg"
            >
              <Link
                href={item.href}
                className="grid items-center justify-center text-center"
              >
                <div className="grid h-[87px] w-[87px] items-center justify-center rounded-full bg-[#ebebeb]">
                  {item.imgSrc ? (
                    <img src={item.imgSrc} alt={item.key} />
                  ) : (
                    item.icon
                  )}
                </div>
                <p className="mt-2 text-[22px] font-semibold">
                  {getTranslatedText(item.key)}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Archive;
