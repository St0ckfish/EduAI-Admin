"use client";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import BreadCrumbs from "@/components/BreadCrumbs";

interface departmentIdProps {
  params: {
    departmentId: string;
  };
}

const Permissions: React.FC<departmentIdProps> = ({ params }) => {
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
      nameEn: "Department Permissions",
      nameAr: "صلاحيات المنظمة",
      nameFr: "Autorisations du département",
      href: "/organization-setting/permissions/department-permission",
    },
    {
      nameEn: `${params.departmentId}`,
      nameAr: `${params.departmentId}`,
      nameFr: `${params.departmentId}`,
      href: `/organization-setting/permissions/department-permission/${params.departmentId}`,
    },
  ];
  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="relative mr-[5px] mt-4 mt-5 flex h-[650px] items-center justify-center overflow-x-auto bg-transparent max-[1200px]:w-screen sm:rounded-lg lg:ml-[270px]">
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
                      ? "تفعيل أو تعطيل وحدة الحضور على مستوى العالم أو لأدوار المستخدمين الفردية."
                      : currentLanguage === "fr"
                        ? "Activer ou désactiver le module de présence globalement ou pour des rôles d'utilisateur individuels."
                        : "Enable or disable Attendance Module globally or for individual user roles."}
                    <br />
                    {currentLanguage === "ar"
                      ? "يرجى ملاحظة أن تعطيل وحدة الحضور للمستخدمين الفرديين لن"
                      : currentLanguage === "fr"
                        ? "Veuillez noter que la désactivation du module de présence pour les utilisateurs individuels ne"
                        : "Note that disabling Attendance module for individual profile users will"}
                    <br />
                    {currentLanguage === "ar"
                      ? "يوقف إشعارات الغياب للطلاب أو أولياء الأمور."
                      : currentLanguage === "fr"
                        ? "arrêtera les notifications d'absence aux étudiants ou aux parents."
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
                        className="block w-full rounded-lg border border-borderPrimary bg-bgSecondary p-1.5 text-sm text-textPrimary focus:border-blue-500 focus:ring-blue-500"
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
                      ? "تفعيل أو تعطيل التقييم والتقدير على مستوى النظام أو للمستخدمين الفرديين"
                      : currentLanguage === "fr"
                        ? "Activer ou désactiver l'évaluation et la notation globalement ou pour un utilisateur individuel"
                        : "Enable or disable Assessment & Grading globally or for individual user"}
                    <br />
                    {currentLanguage === "ar"
                      ? "الأدوار. لاحظ أن تعطيل وحدة التقييم والتقدير للمستخدمين الفرديين"
                      : currentLanguage === "fr"
                        ? "rôles. Notez que la désactivation du module d'évaluation et de notation pour les utilisateurs individuels"
                        : "roles. Note that disabling Assessment & Grading module for individual"}
                    <br />
                    {currentLanguage === "ar"
                      ? "لن يتوقف إشعارات الغياب للطلاب أو أولياء الأمور"
                      : currentLanguage === "fr"
                        ? "les utilisateurs de profil ne stopperont pas les notifications d'absence aux étudiants ou aux parents"
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
                        className="block w-full rounded-lg border border-borderPrimary bg-bgSecondary p-1.5 text-sm text-textPrimary focus:border-blue-500 focus:ring-blue-500"
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
                      ? "تفعيل أو تعطيل وحدة الفعاليات على مستوى العالم أو لأدوار المستخدمين الفردية."
                      : currentLanguage === "fr"
                        ? "Activer ou désactiver le module des événements globalement ou pour des rôles d'utilisateur individuels."
                        : "Enable or disable Events Module globally or for individual user roles."}
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
                        className="block w-full rounded-lg border border-borderPrimary bg-bgSecondary p-1.5 text-sm text-textPrimary focus:border-blue-500 focus:ring-blue-500"
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
                      ? "تفعيل أو تعطيل وحدة الرسوم والفوترة على مستوى العالم أو لأدوار المستخدمين الفردية."
                      : currentLanguage === "fr"
                        ? "Activer ou désactiver le module des frais et de la facturation globalement ou pour des rôles d'utilisateur individuels."
                        : "Enable or disable Fee & Invoicing Module globally or for individual user roles."}
                    <br />
                    {currentLanguage === "ar"
                      ? "أدوار المستخدمين. لاحظ أن أي إشعارات بالفواتير تُرسل إلى المستخدمين المعطلة حساباتهم ستظل مُعالجة."
                      : currentLanguage === "fr"
                        ? "Rôles des utilisateurs. Notez que toutes les notifications de factures envoyées aux utilisateurs désactivés seront toujours traitées."
                        : "User roles. Note that any invoice notifications sent to disabled users will still be processed."}
                    <br />
                    {currentLanguage === "ar"
                      ? "الملفات الشخصية لا تتوقف عن إرسال الرسائل الإلكترونية، الرسائل النصية، أو إشعارات الدفع عبر تطبيقات الهاتف المحمول."
                      : currentLanguage === "fr"
                        ? "Les profils ne cessent pas d'envoyer des e-mails, des SMS ou des notifications push sur les applications mobiles."
                        : "Profiles don't stop sending emails, SMS, or mobile app push notifications."}
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
                        className="block w-full rounded-lg border border-borderPrimary bg-bgSecondary p-1.5 text-sm text-textPrimary focus:border-blue-500 focus:ring-blue-500"
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
