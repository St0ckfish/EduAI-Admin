"use client";
/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/spinner";
import {
  useFindAccountMutation,
  useSelectAccoutMutation,
} from "@/features/loginApi";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";

const ForgetPassword = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [forgetPassword, { isLoading }] = useFindAccountMutation();
  const [selectAccount] = useSelectAccoutMutation();

  const onSubmit = async (data: any) => {
    try {
      const username = data.username;
      const result = await forgetPassword(username).unwrap();
      Cookie.set("userId", result.data.userId);
      Cookie.set("email", result.data.emails);
      const Email = Cookie.get("email");
      const UserId = Cookie.get("userId");
      await selectAccount({ id: UserId, email: Email }).unwrap();
      toast.success(
        currentLanguage === "ar"
          ? "تم إنشاء وإرسال بريد إعادة تعيين كلمة المرور بنجاح"
          : currentLanguage === "fr"
            ? "Email de réinitialisation du mot de passe généré et envoyé avec succès"
            : "Reset password email generated and sent successfully",
      );
      router.replace("/otp");
    } catch (err) {
      toast.error(
        currentLanguage === "ar"
          ? "فشل في العثور على اسم المستخدم أو البريد الإلكتروني"
          : currentLanguage === "fr"
            ? "Échec de la recherche de ce nom d'utilisateur ou de cet e-mail"
            : "Failed to find this username or email",
      );
    }
  };
  return (
    <>
      <div className="grid h-screen grid-cols-2 items-center justify-center bg-bgSecondary duration-300 ease-in max-[1040px]:grid-cols-1">
        <div className="gird items-center justify-center text-center">
          <div className="mb-10 grid">
            <h1 className="font-sans text-[28px] font-bold text-primary">
              {currentLanguage === "ar"
                ? "نسيت كلمة المرور"
                : currentLanguage === "fr"
                  ? "Mot de passe oublié"
                  : "Forgot Password"}
            </h1>
            <p className="font-sans text-[20px] font-semibold text-secondary">
              {currentLanguage === "ar"
                ? "أدخل رقم هاتفك للحصول على رمز OTP."
                : currentLanguage === "fr"
                  ? "Entrez votre téléphone pour obtenir un OTP."
                  : "Enter your phone to get OTP."}
            </p>
          </div>
          <div className="grid items-center justify-center">
            <form className="grid gap-10" onSubmit={handleSubmit(onSubmit)}>
              <label
                htmlFor="text"
                className="grid text-start font-sans text-[18px] font-semibold text-textSecondary"
              >
                {currentLanguage === "ar"
                  ? "اسم المستخدم | البريد الإلكتروني"
                  : currentLanguage === "fr"
                    ? "Nom d'utilisateur | Email"
                    : "Username | Email"}
                <input
                  id="text"
                  {...register("username", { required: true })}
                  placeholder={
                    currentLanguage === "ar"
                      ? "اسم المستخدم | البريد الإلكتروني"
                      : currentLanguage === "fr"
                        ? "Nom d'utilisateur | Email"
                        : "Username | Email"
                  }
                  className={`w-[450px] rounded-xl border px-4 py-3 ${errors.username ? "border-warning" : "border-borderPrimary"} outline-none max-[471px]:w-[350px]`}
                  type="text"
                />
                {errors.username && (
                  <span className="text-[13px] text-error">
                    {currentLanguage === "ar"
                      ? "البريد الإلكتروني مطلوب"
                      : currentLanguage === "fr"
                        ? "L'email est requis"
                        : "Email is Required"}
                  </span>
                )}
              </label>
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="flex justify-center text-center">
                  <button
                    type="submit"
                    className="w-[170px] rounded-xl bg-primary px-4 py-2 text-[18px] font-bold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
                  >
                    {currentLanguage === "ar"
                      ? "رمز الاسترداد"
                      : currentLanguage === "fr"
                        ? "Code de récupération"
                        : "Recovery Code"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="flex h-full w-full justify-end">
          <div className="flex h-full w-[600px] items-center justify-end bg-[#2a3469] max-[1040px]:hidden">
            <img
              className="h-[300px] w-[500px] -translate-x-[260px]"
              src="images/forget.png"
              alt="#"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
