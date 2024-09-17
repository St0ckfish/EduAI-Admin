"use client";
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import BreadCrumbs from "@/components/BreadCrumbs";

const Permissions = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Organization Settings",
      nameAr: "إعدادات المنظمة",
      nameFr: "Paramètres org",
      href: "/organization-setting",
    },
    {
      nameEn: "Add Permissions",
      nameAr: "إضافة صلاحيات",
      nameFr: "Ajouter des autorisations",
      href: "/organization-setting/permissions/add",
    },
  ];
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div
        className={`justify-left flex flex-wrap gap-5 text-[20px] max-[725px]:text-[15px] ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mb-[20px] ml-4 mt-[50px] font-semibold`}
      >
        <Link
          href="/organization-setting/permissions/add"
          className="text-blue-500 underline"
        >
          {currentLanguage === "ar"
            ? "قسم"
            : currentLanguage === "fr"
              ? "Département"
              : "Department"}
        </Link>
        <Link href="/organization-setting/permissions/add/employee">
          {currentLanguage === "ar"
            ? "موظف"
            : currentLanguage === "fr"
              ? "Employé"
              : "Employee"}
        </Link>
      </div>
      <div className="relative mr-[5px] mt-5 flex h-[650px] items-center justify-center overflow-x-auto bg-transparent max-[1200px]:w-screen sm:rounded-lg lg:ml-[270px]">
        <div className="relative overflow-auto shadow-md sm:rounded-lg">
          <table className="text-bgSecondary0 h-[600px] w-[1000px] overflow-x-auto text-left text-sm rtl:text-right">
            <thead className="bg-thead text-[18px] uppercase text-textPrimary">
              <tr>
                <th scope="col" className="whitespace-nowrap px-6 py-6">
                  {currentLanguage === "ar"
                    ? "إذن"
                    : currentLanguage === "fr"
                      ? "Autorisation"
                      : "Permission"}
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  {currentLanguage === "ar"
                    ? "المنطبق على"
                    : currentLanguage === "fr"
                      ? "Applicable Pour"
                      : "Applicable For"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-bgPrimary hover:bg-bgSecondary">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-textPrimary"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-thead after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-borderPrimary after:bg-bgPrimary after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-borderPrimary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-textPrimary">
                      {currentLanguage === "ar"
                        ? "إذن جديد"
                        : currentLanguage === "fr"
                          ? "Nouvelle Autorisation"
                          : "New Permission"}
                    </span>
                  </label>
                </th>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <span className="grid items-center gap-2 text-[18px] font-semibold text-blackOrWhite">
                      {currentLanguage === "ar"
                        ? "الأقسام"
                        : currentLanguage === "fr"
                          ? "Sections"
                          : "Sections"}
                      <select
                        id="countries"
                        className="block w-full rounded-lg border border-borderPrimary bg-bgPrimary p-1.5 text-sm text-textPrimary outline-none focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option selected>
                          {currentLanguage === "ar"
                            ? "اختر القسم"
                            : currentLanguage === "fr"
                              ? "Choisir la section"
                              : "Choose Section"}
                        </option>
                        <option value="US">
                          {currentLanguage === "ar"
                            ? "معلم"
                            : currentLanguage === "fr"
                              ? "Enseignant"
                              : "Teacher"}
                        </option>
                      </select>
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="bg-bgPrimary hover:bg-bgSecondary">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-textPrimary"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-thead after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-borderPrimary after:bg-bgPrimary after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-borderPrimary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-textPrimary">
                      {currentLanguage === "ar"
                        ? "إذن جديد"
                        : currentLanguage === "fr"
                          ? "Nouvelle Autorisation"
                          : "New Permission"}
                    </span>
                  </label>
                </th>
                <td className="whitespace-nowrap px-6 py-4"></td>
              </tr>
              <tr className="bg-bgPrimary hover:bg-bgSecondary">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-textPrimary"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-thead after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-borderPrimary after:bg-bgPrimary after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-borderPrimary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-textPrimary">
                      {currentLanguage === "ar"
                        ? "إذن جديد"
                        : currentLanguage === "fr"
                          ? "Nouvelle Autorisation"
                          : "New Permission"}
                    </span>
                  </label>
                </th>
                <td className="whitespace-nowrap px-6 py-4"></td>
              </tr>
              <tr className="bg-bgPrimary hover:bg-bgSecondary">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-textPrimary"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-thead after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-borderPrimary after:bg-bgPrimary after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-borderPrimary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-textPrimary">
                      {currentLanguage === "ar"
                        ? "إذن جديد"
                        : currentLanguage === "fr"
                          ? "Nouvelle Autorisation"
                          : "New Permission"}
                    </span>
                  </label>
                </th>
                <td className="whitespace-nowrap px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Permissions;
