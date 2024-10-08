"use client";
/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form";
import { useLoginDashboardMutation } from "@/features/loginApi";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useDispatch } from "react-redux";
import {
  initializeLanguage,
  setLanguage,
} from "@/features/language/languageSlice";
import { useEffect } from "react";
import Spinner from "@/components/spinner";

const Login = () => {
  const { language, loading } = useSelector((state: RootState) => state.language);

  const dispatchLang = useDispatch();
  useEffect(() => {
    dispatchLang(initializeLanguage());
  }, [dispatchLang]);

  const dispatch2 = useDispatch();
  const handleLanguageChange = (language: any) => {
    dispatch2(setLanguage(language));
  };
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginDashboard, { isLoading, error }] = useLoginDashboardMutation();

  const onSubmit = async (data: any) => {
    try {
      const result = await loginDashboard(data).unwrap();
      console.log("Login success:", result);
      Cookie.set("token", result.data);
      toast.success(
        language === "ar"
          ? "تسجيل الدخول ناجح"
          : language === "fr"
            ? "Connexion réussie"
            : "Login success",
      );
      router.replace("/");
    } catch (err) {
      toast.error(
        language === "ar"
          ? "فشل في تسجيل الدخول"
          : language === "fr"
            ? "Échec de la connexion"
            : "Failed to login",
      );
      console.error("Failed to login:", err);
    }
  };

  if (loading) {
    return (
      <div className="grid h-screen grid-cols-2 items-center justify-center bg-bgSecondary duration-300 ease-in max-[1040px]:grid-cols-1">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="absolute right-5 top-5">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="text-violet11 hover:bg-violet3 inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-bgPrimary outline-none"
              aria-label="Customise options"
            >
              {language === "en" ? (
                <img src="/images/en.png" alt="#" />
              ) : language === "ar" ? (
                <img src="/images/ar.png" alt="#" />
              ) : language === "fr" ? (
                <img src="/images/fr.png" alt="#" />
              ) : (
                <img src="/images/fr.png" alt="#" />
              )}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-50 mr-2 mt-5 grid min-w-[150px] justify-center gap-5 rounded-md bg-bgPrimary p-[5px] font-semibold shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
              sideOffset={5}
            >
              <DropdownMenu.Item className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 group relative mt-2 flex h-[25px] select-none items-center rounded-[3px] px-[5px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none">
                <button
                  onClick={() => handleLanguageChange("ar")}
                  className="rounded-lg px-4 py-2 text-[20px] hover:bg-bgSecondary"
                >
                  {language === "en"
                    ? "Arabic"
                    : language === "ar"
                      ? "العربية"
                      : language === "fr"
                        ? "Arabe"
                        : "Arabic"}
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className="rounded-lg px-4 py-2 text-[20px] hover:bg-bgSecondary"
                >
                  {language === "en"
                    ? "English"
                    : language === "ar"
                      ? "الإنجليزية"
                      : language === "fr"
                        ? "Anglais"
                        : "English"}
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 group relative mb-2 flex h-[25px] select-none items-center rounded-[3px] px-[5px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none">
                <button
                  onClick={() => handleLanguageChange("fr")}
                  className="rounded-lg px-4 py-2 text-[20px] hover:bg-bgSecondary"
                >
                  {language === "en"
                    ? "French"
                    : language === "ar"
                      ? "الفرنسية"
                      : language === "fr"
                        ? "Français"
                        : "French"}
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      <div className="grid h-screen grid-cols-2 items-center justify-center bg-bgSecondary duration-300 ease-in max-[1040px]:grid-cols-1">
        <div className="gird items-center justify-center text-center">
          <div className="mb-20">
            <img
              className="absolute left-5 top-5 w-[300px]"
              src="images/logo.png"
              alt="#"
            />
          </div>
          <div className="mb-10 grid">
            <h1 className="font-sans text-[28px] font-bold text-primary">
              {language === "ar"
                ? "تسجيل الدخول"
                : language === "fr"
                  ? "Connexion"
                  : "Log in"}
            </h1>
            <p className="font-sans text-[20px] font-semibold text-secondary">
              {language === "ar"
                ? "للوصول إلى حسابك"
                : language === "fr"
                  ? "Pour accéder à votre compte"
                  : "To access your account"}
            </p>
          </div>
          <div className="grid items-center justify-center">
            <form
              dir={language === "ar" ? "rtl" : "ltr"}
              className="grid gap-10"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label
                htmlFor="email"
                className="grid text-start font-sans text-[18px] font-semibold text-[#041631] text-primary"
              >
                {language === "ar"
                  ? "بريدك الإلكتروني"
                  : language === "fr"
                    ? "Votre Email"
                    : "Your Email"}
                <input
                  id="email"
                  {...register("username", { required: true })}
                  placeholder={
                    language === "ar"
                      ? "أدخل بريدك الإلكتروني"
                      : language === "fr"
                        ? "Entrez votre email"
                        : "Enter Your Email"
                  }
                  className={`w-[450px] rounded-xl border px-4 py-3 text-textPrimary ${errors.username ? "border-warning" : "border-borderPrimary"} outline-none max-[471px]:w-[350px]`}
                />
                {errors.username && (
                  <span className="text-[13px] text-error">
                    {language === "ar"
                      ? "البريد الإلكتروني مطلوب"
                      : language === "fr"
                        ? "L'email est requis"
                        : "Email is Required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="password"
                className="grid text-start font-sans text-[18px] font-semibold text-[#041631] text-primary"
              >
                {language === "ar"
                  ? "كلمة المرور الخاصة بك"
                  : language === "fr"
                    ? "Votre mot de passe"
                    : "Your Password"}
                <input
                  id="password"
                  {...register("password", { required: true })}
                  placeholder={
                    language === "ar"
                      ? "أدخل كلمة المرور الخاصة بك"
                      : language === "fr"
                        ? "Entrez votre mot de passe"
                        : "Enter Your Password"
                  }
                  className={`w-[450px] rounded-xl border px-4 py-3 text-textPrimary ${errors.password ? "border-warning" : "border-borderPrimary"} outline-none max-[471px]:w-[350px]`}
                  type="password"
                />
                {errors.password && (
                  <span className="text-[13px] text-error">
                    {language === "ar"
                      ? "كلمة المرور مطلوبة"
                      : language === "fr"
                        ? "Le mot de passe est requis"
                        : "Password is Required"}
                  </span>
                )}
              </label>
              <div className="flex justify-end text-end">
                <a
                  href="/forget-password"
                  className="flex font-sans text-[12px] font-medium text-secondary hover:underline"
                >
                  {language === "ar"
                    ? "نسيت كلمة المرور؟"
                    : language === "fr"
                      ? "Mot de passe oublié ?"
                      : "Forgot password ?"}
                </a>
              </div>

              {/* <Spinner/> */}
              <div className="flex justify-center text-center">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-[450px] rounded-xl bg-primary px-4 py-2 text-[18px] font-bold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl max-[471px]:w-[350px]"
                >
                  {isLoading
                    ? language === "ar"
                      ? "جاري التحميل..."
                      : language === "fr"
                        ? "Chargement..."
                        : "Loading..."
                    : language === "ar"
                      ? "تسجيل الدخول"
                      : language === "fr"
                        ? "Connexion"
                        : "Login"}
                </button>
              </div>
              {error && (
                <p className="font-semibold text-error">
                  {language === "ar"
                    ? "اسم المستخدم أو كلمة المرور غير صالحين!"
                    : language === "fr"
                      ? "Le nom d'utilisateur ou le mot de passe ne sont pas valides !"
                      : "Username or Password are not valid!"}
                </p>
              )}
              <div className="flex items-center justify-center gap-2 text-center">
                <p className="font-sans font-medium text-secondary">
                  {language === "ar"
                    ? "تحتاج إلى حساب؟"
                    : language === "fr"
                      ? "Besoin d'un compte ?"
                      : "Need an account?"}
                </p>
                <a
                  href="/signup"
                  className="flex font-sans font-medium text-primary hover:underline"
                >
                  {language === "ar"
                    ? "إنشاء حساب"
                    : language === "fr"
                      ? "Créer un compte"
                      : "Create Account"}
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="flex h-full w-full justify-end">
          <div className="flex h-full w-[600px] items-center justify-end bg-[#2a3469] max-[1040px]:hidden">
            <img
              className="h-[530px] w-[500px] -translate-x-[260px]"
              src="images/labtop.png"
              alt="#"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
