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
    {
      nameEn: "Employee",
      nameAr: "موظف",
      nameFr: "Employé",
      href: "/organization-setting/permissions/add/employee",
    },
  ];
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className={`justify-left flex flex-wrap gap-5 text-[20px] max-[725px]:text-[15px] ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mb-[80px] ml-4 mt-[50px] font-semibold`}
      >
        <Link href="/organization-setting/permissions/add">
          {currentLanguage === "ar"
            ? "قسم"
            : currentLanguage === "fr"
              ? "Département"
              : "Department"}
        </Link>
        <Link
          href="/organization-setting/permissions/add/employee"
          className="text-blue-500 underline"
        >
          {currentLanguage === "ar"
            ? "موظف"
            : currentLanguage === "fr"
              ? "Employé"
              : "Employee"}
        </Link>
      </div>
      <div className="relative mr-[5px] mt-5 flex h-[650px] items-center justify-center overflow-x-auto bg-transparent max-[1200px]:w-screen sm:rounded-lg lg:ml-[270px]">
        <div className="relative overflow-auto shadow-md sm:rounded-lg">
          <table className="h-[600px] w-[1000px] overflow-x-auto text-left text-sm text-gray-500 rtl:text-right">
            <thead className="bg-thead text-xs uppercase text-textPrimary">
              <tr>
                <th
                  scope="col"
                  className="whitespace-nowrap px-6 py-6 text-[28px]"
                >
                  {currentLanguage === "ar"
                    ? "إذن"
                    : currentLanguage === "fr"
                      ? "Autorisation"
                      : "Permission"}
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-6 py-3 text-[28px]"
                >
                  {currentLanguage === "ar"
                    ? "المنطبق على"
                    : currentLanguage === "fr"
                      ? "Applicable Pour"
                      : "Applicable For"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-textSecondary"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-thead after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-borderPrimary after:bg-bgPrimary after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-borderPrimary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-textSecondary">
                      {currentLanguage === "ar"
                        ? "إذن جديد"
                        : currentLanguage === "fr"
                          ? "Nouvelle Autorisation"
                          : "New Permission"}
                    </span>
                  </label>

                  <p className="mt-3 text-[14px] text-secondary">
                    {currentLanguage === "ar"
                      ? "تفعيل أو تعطيل وحدة الحضور عالميًا أو لكل دور مستخدم فردي."
                      : currentLanguage === "fr"
                        ? "Activer ou désactiver le module de présence globalement ou pour les rôles d'utilisateur individuels."
                        : "Enable or disable Attendance Module globally or for individual user roles."}

                    <br />
                    {currentLanguage === "ar"
                      ? "يرجى ملاحظة أن تعطيل وحدة الحضور للمستخدمين الفرديين لن"
                      : currentLanguage === "fr"
                        ? "Veuillez noter que la désactivation du module de présence pour les profils individuels n'empêchera pas"
                        : "Note that disabling Attendance module for individual profile users will"}
                    <br />
                    {currentLanguage === "ar"
                      ? "يرجى ملاحظة أن تعطيل وحدة الحضور للمستخدمين الفرديين لن يوقف إشعارات الغياب للطلاب أو أولياء الأمور."
                      : currentLanguage === "fr"
                        ? "Veuillez noter que la désactivation du module de présence pour les profils individuels n'arrêtera pas les notifications d'absence aux élèves ou aux parents."
                        : "Note that disabling Attendance module for individual profile users will not stop absent notifications to students or parents."}
                  </p>
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
                        className="block w-full rounded-lg border border-borderPrimary bg-bgPrimary p-1.5 text-sm text-textSecondary outline-none focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option selected>
                          {currentLanguage === "ar"
                            ? "اختر"
                            : currentLanguage === "fr"
                              ? "Choisir"
                              : "Choose"}
                        </option>
                        <option value="US">
                          {currentLanguage === "ar"
                            ? "مدرس"
                            : currentLanguage === "fr"
                              ? "Enseignant"
                              : "Teacher"}
                        </option>
                      </select>
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-textSecondary"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-thead after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-borderPrimary after:bg-bgPrimary after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-borderPrimary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-textSecondary">
                      {currentLanguage === "ar"
                        ? "إذن جديد"
                        : currentLanguage === "fr"
                          ? "Nouvelle Autorisation"
                          : "New Permission"}
                    </span>
                  </label>

                  <p className="mt-3 text-[14px] text-secondary">
                    {currentLanguage === "ar"
                      ? "تمكين أو تعطيل التقييم والتقدير عالميًا أو للمستخدمين الأفراد"
                      : currentLanguage === "fr"
                        ? "Activer ou désactiver l'évaluation et la notation globalement ou pour un utilisateur individuel"
                        : "Enable or disable Assessment & Grading globally or for individual user"}
                    <br />
                    {currentLanguage === "ar"
                      ? "الأدوار. لاحظ أن تعطيل وحدة التقييم والتقدير للمستخدمين الأفراد"
                      : currentLanguage === "fr"
                        ? "rôles. Notez que la désactivation du module d'évaluation et de notation pour un utilisateur individuel"
                        : "roles. Note that disabling Assessment & Grading module for individual"}
                    <br />
                    {currentLanguage === "ar"
                      ? "ملفات المستخدمين الفرديين لن تمنع إشعارات الغياب للطلاب أو الآباء"
                      : currentLanguage === "fr"
                        ? "les profils des utilisateurs ne stopperont pas les notifications d'absences aux étudiants ou aux parents"
                        : "profile users will not stop absent notifications to students or parents"}
                  </p>
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
                        className="block w-full rounded-lg border border-borderPrimary bg-bgPrimary p-1.5 text-sm text-textSecondary outline-none focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option selected>
                          {currentLanguage === "ar"
                            ? "اختر"
                            : currentLanguage === "fr"
                              ? "Choisir"
                              : "Choose"}
                        </option>
                        <option value="DE">
                          {currentLanguage === "ar"
                            ? "مدرس"
                            : currentLanguage === "fr"
                              ? "Enseignant"
                              : "Teacher"}
                        </option>
                      </select>
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-textSecondary"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-thead after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-borderPrimary after:bg-bgPrimary after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-borderPrimary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-textSecondary">
                      {currentLanguage === "ar"
                        ? "إذن جديد"
                        : currentLanguage === "fr"
                          ? "Nouvelle Autorisation"
                          : "New Permission"}
                    </span>
                  </label>

                  <p className="mt-3 text-[14px] text-secondary">
                    {currentLanguage === "ar"
                      ? "تفعيل أو تعطيل وحدة الفعاليات على مستوى العالم أو لأدوار المستخدمين الفرديين."
                      : currentLanguage === "fr"
                        ? "Activer ou désactiver le module Événements globalement ou pour des rôles d'utilisateur individuels."
                        : "Enable or disable Events Module globally or for individual user roles."}
                  </p>
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
                        className="block w-full rounded-lg border border-borderPrimary bg-bgPrimary p-1.5 text-sm text-textSecondary outline-none focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option selected>
                          {currentLanguage === "ar"
                            ? "اختر"
                            : currentLanguage === "fr"
                              ? "Choisir"
                              : "Choose"}
                        </option>
                        <option value="DE">
                          {currentLanguage === "ar"
                            ? "مدرس"
                            : currentLanguage === "fr"
                              ? "Enseignant"
                              : "Teacher"}
                        </option>
                      </select>
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-textSecondary"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-thead after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-borderPrimary after:bg-bgPrimary after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-borderPrimary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-textSecondary">
                      {currentLanguage === "ar"
                        ? "إذن جديد"
                        : currentLanguage === "fr"
                          ? "Nouvelle Autorisation"
                          : "New Permission"}
                    </span>
                  </label>
                  <p className="mt-3 text-[14px] text-secondary">
                    {currentLanguage === "ar"
                      ? "تفعيل أو تعطيل وحدة الرسوم والفوترة على مستوى العالم أو للمستخدمين الفرديين."
                      : currentLanguage === "fr"
                        ? "Activer ou désactiver le module Frais & Facturation globalement ou pour des utilisateurs individuels."
                        : "Enable or disable Fee & Invoicing Module globally or for individual user roles."}
                    <br />
                    {currentLanguage === "ar"
                      ? "الأدوار. يرجى ملاحظة أن أي إشعارات بالفواتير المرسلة للمستخدمين المعطلين"
                      : currentLanguage === "fr"
                        ? "rôles. Notez que toutes les notifications de facturation envoyées aux utilisateurs désactivés"
                        : "roles. Note that any invoice notifications sent to disabled user"}

                    <br />
                    {currentLanguage === "ar"
                      ? "الملفات الشخصية لا تتوقف عن إرسال رسائل البريد الإلكتروني، الرسائل القصيرة، أو إشعارات تطبيق الهاتف المحمول"
                      : currentLanguage === "fr"
                        ? "les profils n'arrêtent pas d'envoyer des e-mails, des SMS ou des notifications push d'application mobile"
                        : "profiles don't stop sending emails, SMS, or mobile app push notifications"}
                  </p>
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
                        className="block w-full rounded-lg border border-borderPrimary bg-bgPrimary p-1.5 text-sm text-textSecondary outline-none focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option selected>
                          {currentLanguage === "ar"
                            ? "اختر"
                            : currentLanguage === "fr"
                              ? "Choisir"
                              : "Choose"}
                        </option>
                        <option value="DE">
                          {currentLanguage === "ar"
                            ? "مدرس"
                            : currentLanguage === "fr"
                              ? "Enseignant"
                              : "Teacher"}
                        </option>
                      </select>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Permissions;
