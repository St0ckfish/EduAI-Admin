"use client";
/* eslint-disable @next/next/no-img-element */
import Card from "@/components/card";
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const Infrastructure = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  const infrastructureItems = [
    {
      href: "/bus",
      icon: (
        <svg
          className="h-12 w-12 text-[#000000] group-hover:text-[#3e5af0]"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <circle cx="6" cy="17" r="2" />
          <circle cx="18" cy="17" r="2" />
          <path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" />
          <polyline points="16 5 17.5 12 22 12" />
          <line x1="2" y1="10" x2="17" y2="10" />
          <line x1="7" y1="5" x2="7" y2="10" />
          <line x1="12" y1="5" x2="12" y2="10" />
        </svg>
      ),
      title:
        currentLanguage === "en"
          ? "Bus"
          : currentLanguage === "ar"
            ? "الحافلة"
            : currentLanguage === "fr"
              ? "Autobus"
              : "Bus", // Default to English
      description:
        currentLanguage === "en"
          ? "Number Of Bus, Add New Bus And Edit a Bus"
          : currentLanguage === "ar"
            ? "عدد الحافلات، إضافة حافلة جديدة وتعديل حافلة"
            : currentLanguage === "fr"
              ? "Nombre d'autobus, ajouter un nouvel autobus et modifier un autobus"
              : "Number Of Bus, Add New Bus And Edit a Bus", // Default to English
    },
    {
      href: "/classes",
      icon: (
        <svg
          className="h-11 w-11 text-black"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <circle cx="5" cy="5" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="19" cy="5" r="1" />
          <circle cx="5" cy="12" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="19" r="1" />
          <circle cx="12" cy="19" r="1" />
          <circle cx="19" cy="19" r="1" />
        </svg>
      ),
      title:
        currentLanguage === "en"
          ? "Class"
          : currentLanguage === "ar"
            ? "الفصل"
            : currentLanguage === "fr"
              ? "Classe"
              : "Class", // Default to English
      description:
        currentLanguage === "en"
          ? "Number of class, add new class and edit a class"
          : currentLanguage === "ar"
            ? "عدد الفصول، إضافة فصل جديد وتعديل فصل"
            : currentLanguage === "fr"
              ? "Nombre de classes, ajouter une nouvelle classe et modifier une classe"
              : "Number of class, add new class and edit a class", // Default to English
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
      title:
        currentLanguage === "en"
          ? "Library"
          : currentLanguage === "ar"
            ? "المكتبة"
            : currentLanguage === "fr"
              ? "Bibliothèque"
              : "Library", // Default to English
      description:
        currentLanguage === "en"
          ? "Number of book, add new book and edit a book"
          : currentLanguage === "ar"
            ? "عدد الكتب، إضافة كتاب جديد وتعديل كتاب"
            : currentLanguage === "fr"
              ? "Nombre de livres, ajouter un nouveau livre et modifier un livre"
              : "Number of book, add new book and edit a book", // Default to English
    },
    {
      href: "/rooms",
      imgSrc: "/images/Door.png",
      title:
        currentLanguage === "en"
          ? "Room"
          : currentLanguage === "ar"
            ? "الغرفة"
            : currentLanguage === "fr"
              ? "Chambre"
              : "Room", // Default to English
      description:
        currentLanguage === "en"
          ? "Number of class room, add new class room and edit a class room"
          : currentLanguage === "ar"
            ? "عدد الغرف الصفية، إضافة غرفة صفية جديدة وتعديل غرفة صفية"
            : currentLanguage === "fr"
              ? "Nombre de salles de classe, ajouter une nouvelle salle de classe et modifier une salle de classe"
              : "Number of class room, add new class room and edit a class room", // Default to English
    },
    {
      href: "/camera",
      imgSrc: "/images/camera.png",
      title:
        currentLanguage === "en"
          ? "Cameras"
          : currentLanguage === "ar"
            ? "الكاميرات"
            : currentLanguage === "fr"
              ? "Caméras"
              : "Cameras", // Default to English
      description:
        currentLanguage === "en"
          ? "Security cameras"
          : currentLanguage === "ar"
            ? "كاميرات المراقبة"
            : currentLanguage === "fr"
              ? "Caméras de sécurité"
              : "Security cameras", // Default to English
    },
    {
      href: "/infrastructure/store",
      icon: (
        <svg
          className="h-10 w-10"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="3" y1="21" x2="21" y2="21" />
          <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
          <path d="M5 21v-10.15" />
          <path d="M19 21v-10.15" />
          <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
        </svg>
      ),
      title:
        currentLanguage === "en"
          ? "Store"
          : currentLanguage === "ar"
            ? "المخزن"
            : currentLanguage === "fr"
              ? "Magasin"
              : "Store", // Default to English
      description:
        currentLanguage === "en"
          ? "All information about digital resource, equipment"
          : currentLanguage === "ar"
            ? "كل المعلومات عن الموارد الرقمية، المعدات"
            : currentLanguage === "fr"
              ? "Toutes les informations sur les ressources numériques, l'équipement"
              : "All information about digital resource, equipment", // Default to English
    },
    {
      href: "/infrastructure/office",
      icon: (
        <svg
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      title:
        currentLanguage === "en"
          ? "Office"
          : currentLanguage === "ar"
            ? "المكتب"
            : currentLanguage === "fr"
              ? "Bureau"
              : "Office", // Default to English
      description:
        currentLanguage === "en"
          ? "Number of office, add new office and edit an office"
          : currentLanguage === "ar"
            ? "عدد المكاتب، إضافة مكتب جديد وتعديل مكتب"
            : currentLanguage === "fr"
              ? "Nombre de bureaux, ajouter un nouveau bureau et modifier un bureau"
              : "Number of office, add new office and edit an office", // Default to English
    },
    {
      href: "/infrastructure/lab",
      icon: (
        <svg
          className="h-10 w-10"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path
            d="M16.3 5h.7a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h5l-2.82 -2.82m0 5.64l2.82 -2.82"
            transform="rotate(-45 12 12)"
          />
        </svg>
      ),
      title:
        currentLanguage === "en"
          ? "Lab"
          : currentLanguage === "ar"
            ? "المختبر"
            : currentLanguage === "fr"
              ? "Laboratoire"
              : "Lab", // Default to English
      description:
        currentLanguage === "en"
          ? "Number of lab, add new lab and edit a lab"
          : currentLanguage === "ar"
            ? "عدد المختبرات، إضافة مختبر جديد وتعديل مختبر"
            : currentLanguage === "fr"
              ? "Nombre de laboratoires, ajouter un nouveau laboratoire et modifier un laboratoire"
              : "Number of lab, add new lab and edit a lab", // Default to English
    },
  ];

  return (
    <>
      <div
        className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} ml-7 mt-12`}
      >
        <Link
          className="text-[18px] font-semibold text-[#526484] hover:text-blue-400 hover:underline"
          href="/"
        >
          {currentLanguage === "en"
            ? "Operations"
            : currentLanguage === "ar"
              ? "العمليات"
              : currentLanguage === "fr"
                ? "Opérations"
                : "Operations"}{" "}
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
          href="/infrastructure"
        >
          {currentLanguage === "en"
            ? "Infrastructure"
            : currentLanguage === "ar"
              ? "البنية التحتية"
              : currentLanguage === "fr"
                ? "Infrastructure"
                : "Infrastructure"}{" "}
          {/* Default to English */}
        </Link>
      </div>
      <div
        className={` ${booleanValue ? "lg:ml-[10px]" : "lg:ml-[290px]"} mt-12 grid justify-center`}
      >
        <div className="grid grid-cols-2 gap-5 max-[577px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {infrastructureItems.map((item, index) => (
            <Card
              key={index}
              href={item.href}
              imgSrc={item.imgSrc}
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

export default Infrastructure;
