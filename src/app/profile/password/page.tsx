/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
const Password = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value); // sidebar
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
  return (
    <>
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
  } mt-7`}
      >
        <div className="grid h-full w-full rounded-xl bg-bgPrimary p-7">
          <div>
            <div className="justify-left mb-5 ml-4 flex gap-5 text-[18px] font-semibold">
              <Link href="/profile">
                {currentLanguage === "ar"
                  ? "ملفي الشخصي"
                  : currentLanguage === "fr"
                    ? "Mon profil"
                    : "My Profile"}
              </Link>
              <Link
                href="/profile/password"
                className="text-blue-500 underline"
              >
                {currentLanguage === "ar"
                  ? "كلمة المرور"
                  : currentLanguage === "fr"
                    ? "Mot de passe"
                    : "Password"}
              </Link>
            </div>
          </div>
          <div className="text-semibold mt-5 flex h-full w-full rounded-xl border-2 border-borderPrimary p-5">
            <div className="grid w-full gap-2">
              <div className="grid justify-center">
                <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                  <label
                    htmlFor="name"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    {currentLanguage === "ar"
                      ? "كلمة المرور الحالية"
                      : currentLanguage === "fr"
                        ? "Mot de passe actuel"
                        : "Current Password"}

                    <input
                      id="name"
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label
                    htmlFor="about"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    {currentLanguage === "ar"
                      ? "كلمة مرور جديدة"
                      : currentLanguage === "fr"
                        ? "Nouveau mot de passe"
                        : "New Password"}
                    <input
                      id="about"
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label
                    htmlFor="code"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    {currentLanguage === "ar"
                      ? "تأكيد كلمة المرور"
                      : currentLanguage === "fr"
                        ? "Confirmer le mot de passe"
                        : "Confirm Password"}
                    <input
                      id="code"
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                </div>
                <div className="mt-7 flex justify-between">
                  <button className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl">
                    {currentLanguage === "ar"
                      ? "حفظ"
                      : currentLanguage === "fr"
                        ? "Sauvegarder"
                        : "Save"}
                  </button>
                  <button className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl border border-primary px-4 py-2 text-[18px] font-semibold text-primary duration-300 ease-in hover:shadow-xl">
                    {currentLanguage === "ar"
                      ? "إلغاء"
                      : currentLanguage === "fr"
                        ? "Annuler"
                        : "Cancel"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Password;
