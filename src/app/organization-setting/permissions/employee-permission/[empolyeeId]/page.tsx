"use client";
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import BreadCrumbs from "@/components/BreadCrumbs";

interface employeeIdProps {
  params: {
    empolyeeId: string;
  };
}

const Permissions: React.FC<employeeIdProps> = ({ params }) => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
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
      nameEn: "Employee Permissions",
      nameAr: "صلاحيات العامل",
      nameFr: "Employee Permissions",
      href: "/organization-setting/permissions/employee-permission",
    },
    {
      nameEn: `${params.empolyeeId}`,
      nameAr: `${params.empolyeeId}`,
      nameFr: `${params.empolyeeId}`,
      href: `/organization-setting/permissions/employee-permission/${params.empolyeeId}`,
    },
  ];
  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />

      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className="relative mr-[5px] mt-5 flex h-[650px] items-center justify-center overflow-x-auto bg-transparent max-[1200px]:w-screen sm:rounded-lg lg:ml-[270px]"
      >
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
                    ? "ينطبق على"
                    : currentLanguage === "fr"
                      ? "Applicable pour"
                      : "Applicable For"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
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

                  <p className="mt-3 text-[14px] text-secondary">
                    {currentLanguage === "ar"
                      ? "تمكين أو تعطيل وحدة الحضور عالميًا أو لأدوار المستخدمين الفردية."
                      : currentLanguage === "fr"
                        ? "Activer ou désactiver le module de présence globalement ou pour les rôles d'utilisateur individuels."
                        : "Enable or disable Attendance Module globally or for individual user roles."}
                    <br />
                    {currentLanguage === "ar"
                      ? "يرجى ملاحظة أن تعطيل وحدة الحضور للمستخدمين الفرديين لن يؤدي إلى توقف إشعارات الغياب للطلاب أو أولياء الأمور."
                      : currentLanguage === "fr"
                        ? "Veuillez noter que la désactivation du module de présence pour les utilisateurs individuels ne mettra pas fin aux notifications d'absence aux étudiants ou aux parents."
                        : "Note that disabling the Attendance module for individual profile users will not stop absent notifications to students or parents."}
                    <br />
                    {currentLanguage === "ar"
                      ? "لن يوقف إشعارات الغياب للطلاب أو أولياء الأمور."
                      : currentLanguage === "fr"
                        ? "ne cessera pas les notifications d'absence aux étudiants ou aux parents."
                        : "not stop absent notifications to students or parents."}
                  </p>
                </th>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <span className="grid items-center gap-2 text-[18px] font-semibold text-textPrimary">
                      {currentLanguage === "ar"
                        ? "الأقسام"
                        : currentLanguage === "fr"
                          ? "Sections"
                          : "Sections"}
                      <select
                        id="countries"
                        className="border-borderPrimarylue-500 block w-full rounded-lg border border-borderPrimary bg-bgSecondary p-1.5 text-sm text-textPrimary focus:border-b focus:ring-blue-500"
                      >
                        <option selected>
                          {currentLanguage === "ar"
                            ? "اختر"
                            : currentLanguage === "fr"
                              ? "Choisir"
                              : "Choose"}{" "}
                        </option>
                        <option value="US">
                          {currentLanguage === "ar"
                            ? "معلم"
                            : currentLanguage === "fr"
                              ? "Professeur"
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

                  <p className="mt-3 text-[14px] text-secondary">
                    {currentLanguage === "ar"
                      ? "تمكين أو تعطيل التقييم والتقدير على مستوى عالمي أو لكل مستخدم فردي"
                      : currentLanguage === "fr"
                        ? "Activer ou désactiver l'évaluation et la notation globalement ou pour un utilisateur individuel"
                        : "Enable or disable Assessment & Grading globally or for individual user"}
                    <br />
                    {currentLanguage === "ar"
                      ? "الأدوار. لاحظ أن تعطيل وحدة التقييم والتقدير لكل مستخدم فردي"
                      : currentLanguage === "fr"
                        ? "rôles. Notez que désactiver le module d'évaluation et de notation pour un utilisateur individuel"
                        : "roles. Note that disabling Assessment & Grading module for individual"}
                    <br />
                    {currentLanguage === "ar"
                      ? "لن يتوقف إشعارات الغياب للطلاب أو أولياء الأمور عند تعطيل وحدة التقييم والتقدير للمستخدمين الفرديين"
                      : currentLanguage === "fr"
                        ? "les profils utilisateurs ne stopperont pas les notifications d'absence aux étudiants ou aux parents lorsque le module d'évaluation et de notation est désactivé"
                        : "profile users will not stop absent notifications to students or parents"}
                  </p>
                </th>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <span className="grid items-center gap-2 text-[18px] font-semibold text-textPrimary">
                      {currentLanguage === "ar"
                        ? "الأقسام"
                        : currentLanguage === "fr"
                          ? "Sections"
                          : "Sections"}
                      <select
                        id="countries"
                        className="border-borderPrimarylue-500 block w-full rounded-lg border border-borderPrimary bg-bgSecondary p-1.5 text-sm text-textPrimary focus:border-b focus:ring-blue-500"
                      >
                        <option selected>
                          {currentLanguage === "ar"
                            ? "اختر"
                            : currentLanguage === "fr"
                              ? "Choisir"
                              : "Choose"}{" "}
                        </option>
                        <option value="DE">
                          {currentLanguage === "ar"
                            ? "معلم"
                            : currentLanguage === "fr"
                              ? "Professeur"
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

                  <p className="mt-3 text-[14px] text-secondary">
                    {currentLanguage === "ar"
                      ? "تمكين أو تعطيل وحدة الفعاليات عالميًا أو لأدوار المستخدمين الفرديين"
                      : currentLanguage === "fr"
                        ? "Activer ou désactiver le module d'événements globalement ou pour des rôles d'utilisateur individuels"
                        : "Enable or disable Events Module globally or for individual user roles"}
                  </p>
                </th>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <span className="grid items-center gap-2 text-[18px] font-semibold text-textPrimary">
                      {currentLanguage === "ar"
                        ? "الأقسام"
                        : currentLanguage === "fr"
                          ? "Sections"
                          : "Sections"}
                      <select
                        id="countries"
                        className="border-borderPrimarylue-500 block w-full rounded-lg border border-borderPrimary bg-bgSecondary p-1.5 text-sm text-textPrimary focus:border-b focus:ring-blue-500"
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
                            ? "معلم"
                            : currentLanguage === "fr"
                              ? "Professeur"
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
                  <p className="mt-3 text-[14px] text-secondary">
                    {currentLanguage === "ar"
                      ? "تمكين أو تعطيل وحدة الرسوم والفوترة عالميًا أو لأدوار المستخدمين الفرديين"
                      : currentLanguage === "fr"
                        ? "Activer ou désactiver le module de frais et de facturation globalement ou pour des rôles d'utilisateur individuels"
                        : "Enable or disable Fee & Invoicing Module globally or for individual user roles"}
                    <br />
                    {currentLanguage === "ar"
                      ? "الأدوار. لاحظ أن أي إشعارات فاتورة تُرسل إلى المستخدمين المعطّلين"
                      : currentLanguage === "fr"
                        ? "rôles d'utilisateur. Notez que les notifications de facture envoyées aux utilisateurs désactivés"
                        : "user roles. Note that any invoice notifications sent to disabled users"}
                    <br />
                    {currentLanguage === "ar"
                      ? "الملفات الشخصية لا تتوقف عن إرسال الرسائل الإلكترونية أو الرسائل القصيرة أو إشعارات التطبيقات على الهواتف المحمولة"
                      : currentLanguage === "fr"
                        ? "les profils ne cessent pas d'envoyer des e-mails, des SMS ou des notifications push sur les applications mobiles"
                        : "profiles don't stop sending emails, SMS, or mobile app push notifications"}
                  </p>
                </th>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <span className="grid items-center gap-2 text-[18px] font-semibold text-textPrimary">
                      {currentLanguage === "ar"
                        ? "الأقسام"
                        : currentLanguage === "fr"
                          ? "Sections"
                          : "Sections"}
                      <select
                        id="countries"
                        className="border-borderPrimarylue-500 block w-full rounded-lg border border-borderPrimary bg-bgSecondary p-1.5 text-sm text-textPrimary focus:border-b focus:ring-blue-500"
                      >
                        <option selected>
                          {currentLanguage === "ar"
                            ? "اختر"
                            : currentLanguage === "fr"
                              ? "Choisir"
                              : "Choose"}{" "}
                        </option>
                        <option value="DE">
                          {currentLanguage === "ar"
                            ? "معلم"
                            : currentLanguage === "fr"
                              ? "Professeur"
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
