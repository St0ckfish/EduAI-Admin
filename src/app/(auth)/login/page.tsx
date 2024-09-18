"use client";
/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form";
import { useLoginDashboardMutation } from "@/features/loginApi";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";

const Login = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
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
        currentLanguage === "ar"
          ? "تسجيل الدخول ناجح"
          : currentLanguage === "fr"
            ? "Connexion réussie"
            : "Login success",
      );
      router.replace("/");
    } catch (err) {
      toast.error(
        currentLanguage === "ar"
          ? "فشل في تسجيل الدخول"
          : currentLanguage === "fr"
            ? "Échec de la connexion"
            : "Failed to login",
      );
      console.error("Failed to login:", err);
    }
  };

  return (
    <>
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
              {currentLanguage === "ar"
                ? "تسجيل الدخول"
                : currentLanguage === "fr"
                  ? "Connexion"
                  : "Log in"}
            </h1>
            <p className="font-sans text-[20px] font-semibold text-secondary">
              {currentLanguage === "ar"
                ? "للوصول إلى حسابك"
                : currentLanguage === "fr"
                  ? "Pour accéder à votre compte"
                  : "To access your account"}
            </p>
          </div>
          <div className="grid items-center justify-center">
            <form className="grid gap-10" onSubmit={handleSubmit(onSubmit)}>
              <label
                htmlFor="email"
                className="grid text-start font-sans text-[18px] font-semibold text-[#041631] text-primary"
              >
                {currentLanguage === "ar"
                  ? "بريدك الإلكتروني"
                  : currentLanguage === "fr"
                    ? "Votre Email"
                    : "Your Email"}
                <input
                  id="email"
                  {...register("username", { required: true })}
                  placeholder={
                    currentLanguage === "ar"
                      ? "أدخل بريدك الإلكتروني"
                      : currentLanguage === "fr"
                        ? "Entrez votre email"
                        : "Enter Your Email"
                  }
                  className={`w-[450px] rounded-xl border px-4 py-3 text-textPrimary ${errors.username ? "border-warning" : "border-borderPrimary"} outline-none max-[471px]:w-[350px]`}
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
              <label
                htmlFor="password"
                className="grid text-start font-sans text-[18px] font-semibold text-[#041631] text-primary"
              >
                {currentLanguage === "ar"
                  ? "كلمة المرور الخاصة بك"
                  : currentLanguage === "fr"
                    ? "Votre mot de passe"
                    : "Your Password"}
                <input
                  id="password"
                  {...register("password", { required: true })}
                  placeholder={
                    currentLanguage === "ar"
                      ? "أدخل كلمة المرور الخاصة بك"
                      : currentLanguage === "fr"
                        ? "Entrez votre mot de passe"
                        : "Enter Your Password"
                  }
                  className={`w-[450px] rounded-xl border px-4 py-3 text-textPrimary ${errors.password ? "border-warning" : "border-borderPrimary"} outline-none max-[471px]:w-[350px]`}
                  type="password"
                />
                {errors.password && (
                  <span className="text-[13px] text-error">
                    {currentLanguage === "ar"
                      ? "كلمة المرور مطلوبة"
                      : currentLanguage === "fr"
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
                  {currentLanguage === "ar"
                    ? "نسيت كلمة المرور؟"
                    : currentLanguage === "fr"
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
                    ? currentLanguage === "ar"
                      ? "جاري التحميل..."
                      : currentLanguage === "fr"
                        ? "Chargement..."
                        : "Loading..."
                    : currentLanguage === "ar"
                      ? "تسجيل الدخول"
                      : currentLanguage === "fr"
                        ? "Connexion"
                        : "Login"}
                </button>
              </div>
              {error && (
                <p className="font-semibold text-error">
                  {currentLanguage === "ar"
                    ? "اسم المستخدم أو كلمة المرور غير صالحين!"
                    : currentLanguage === "fr"
                      ? "Le nom d'utilisateur ou le mot de passe ne sont pas valides !"
                      : "Username or Password are not valid!"}
                </p>
              )}
              <div className="flex items-center justify-center gap-2 text-center">
                <p className="font-sans font-medium text-secondary">
                  {currentLanguage === "ar"
                    ? "تحتاج إلى حساب؟"
                    : currentLanguage === "fr"
                      ? "Besoin d'un compte ?"
                      : "Need an account?"}
                </p>
                <a
                  href="/signup"
                  className="flex font-sans font-medium text-primary hover:underline"
                >
                  {currentLanguage === "ar"
                    ? "إنشاء حساب"
                    : currentLanguage === "fr"
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
