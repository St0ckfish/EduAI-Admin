/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef, ChangeEvent, RefObject, useEffect } from "react";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import {
  useSendOtpConfirmMutation,
  useSelectAccoutConfirmMutation,
} from "@/features/loginApi";
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

const OTP = () => {
  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );

  const ID = useSelector((state: RootState) => state.user.id);
  const EMAIL = useSelector((state: RootState) => state.user.email);

  const dispatchLang = useDispatch();
  useEffect(() => {
    dispatchLang(initializeLanguage());
  }, [dispatchLang]);

  const dispatch2 = useDispatch();
  const handleLanguageChange = (language: any) => {
    dispatch2(setLanguage(language));
  };
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(180);
  const inputRefs: RefObject<HTMLInputElement>[] = Array.from(
    { length: 6 },
    () => useRef<HTMLInputElement>(null),
  );
  const [sendOtp, { isLoading }] = useSendOtpConfirmMutation();

  useEffect(() => {
    const emailFromCookie = Cookie.get("email") || "";
    setEmail(emailFromCookie);

    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInput = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (!value && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");

    try {
      await sendOtp({ code, email: EMAIL }).unwrap();
      Cookie.set("otp", code);
      toast.success(
        currentLanguage === "ar"
          ? "تم التحقق من OTP بنجاح!"
          : currentLanguage === "fr"
            ? "OTP vérifié avec succès !"
            : "OTP verified successfully!",
      );
      router.replace("/login");
    } catch (error) {
      toast.error(
        currentLanguage === "ar"
          ? "فشل في التحقق من OTP. يرجى المحاولة مرة أخرى."
          : currentLanguage === "fr"
            ? "Échec de la vérification de l'OTP. Veuillez réessayer."
            : "Failed to verify OTP. Please try again.",
      );
    }
  };
  const [selectAccount] = useSelectAccoutConfirmMutation();
  const SendOtpAgian = async () => {
    await selectAccount({ id: ID, email: EMAIL }).unwrap();
    toast.success(
      currentLanguage === "ar"
        ? "تم إنشاء وإرسال بريد إعادة تعيين كلمة المرور بنجاح"
        : currentLanguage === "fr"
          ? "Email de réinitialisation du mot de passe généré et envoyé avec succès"
          : "Reset password email generated and sent successfully",
    );
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-bgSecondary duration-300 ease-in">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <div className="absolute right-5 top-5 z-30">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="text-violet11 hover:bg-violet3 inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-bgPrimary outline-none"
              aria-label="Customise options"
            >
              {currentLanguage === "en" ? (
                <img src="/images/en.png" alt="#" />
              ) : currentLanguage === "ar" ? (
                <img src="/images/ar.png" alt="#" />
              ) : currentLanguage === "fr" ? (
                <img src="/images/fr.png" alt="#" />
              ) : (
                <img src="/images/fr.png" alt="#" />
              )}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-50 mx-2 mt-5 grid min-w-[150px] justify-center gap-5 rounded-md bg-bgPrimary p-[5px] font-semibold shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
              sideOffset={5}
            >
              <DropdownMenu.Item className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 group relative mt-2 flex h-[25px] select-none items-center rounded-[3px] px-[5px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none">
                <button
                  onClick={() => handleLanguageChange("ar")}
                  className="rounded-lg px-4 py-2 text-[20px] hover:bg-bgSecondary"
                >
                  {currentLanguage === "en"
                    ? "Arabic"
                    : currentLanguage === "ar"
                      ? "العربية"
                      : currentLanguage === "fr"
                        ? "Arabe"
                        : "Arabic"}
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className="rounded-lg px-4 py-2 text-[20px] hover:bg-bgSecondary"
                >
                  {currentLanguage === "en"
                    ? "English"
                    : currentLanguage === "ar"
                      ? "الإنجليزية"
                      : currentLanguage === "fr"
                        ? "Anglais"
                        : "English"}
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 group relative mb-2 flex h-[25px] select-none items-center rounded-[3px] px-[5px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none">
                <button
                  onClick={() => handleLanguageChange("fr")}
                  className="rounded-lg px-4 py-2 text-[20px] hover:bg-bgSecondary"
                >
                  {currentLanguage === "en"
                    ? "French"
                    : currentLanguage === "ar"
                      ? "الفرنسية"
                      : currentLanguage === "fr"
                        ? "Français"
                        : "French"}
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      <div className="relative flex h-screen items-center justify-center overflow-hidden bg-bgSecondary duration-300 ease-in md:justify-around">
        <div className="grid z-20 items-center justify-center text-center">
          <div className="mb-10 grid">
            <h1 className="font-sans text-3xl font-bold text-textPrimary">
              {currentLanguage === "ar"
                ? "رمز التحقق"
                : currentLanguage === "fr"
                  ? "Vérification"
                  : "Verification"}
            </h1>
            <p className="font-sans text-[20px] font-semibold text-secondary">
              {currentLanguage === "ar"
                ? `تم إرسال رمز التحقق إلى ${email}`
                : currentLanguage === "fr"
                  ? `Le code OTP a été envoyé à ${email}`
                  : `OTP code has been sent to ${email}`}
            </p>
          </div>
          <div className="grid items-center justify-center">
            <form
              dir={currentLanguage === "ar" ? "rtl" : "ltr"}
              id="otp-form"
              onSubmit={handleSubmit}
            >
              <div className="mb-12 flex items-center justify-center gap-3">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    className="h-14 w-14 appearance-none rounded-lg border-2 border-borderPrimary p-4 text-center text-2xl font-extrabold text-textPrimary outline-none focus:border-indigo-400 focus:bg-bgPrimary focus:ring-indigo-100"
                    pattern="\d*"
                    maxLength={1}
                    value={value}
                    onChange={e => handleInput(index, e)}
                    required
                  />
                ))}
              </div>
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="grid justify-center gap-3 text-center">
                  <button
                    type="submit"
                    className="w-[140px] rounded-xl bg-primary px-4 py-2 text-[18px] font-bold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
                  >
                    {currentLanguage === "ar"
                      ? "تحقق"
                      : currentLanguage === "fr"
                        ? "Vérifier"
                        : "Verify"}
                  </button>
                  <p className="font-sans text-[17px] font-semibold text-warning">{`${formatTime(timer)}`}</p>
                  <button
                    onClick={() => {
                      SendOtpAgian();
                      setTimer(180);
                    }}
                    type="button"
                    className="w-[140px] rounded-xl border-2 border-primary px-4 py-2 text-[18px] font-bold text-primary duration-300 ease-in hover:shadow-xl"
                  >
                    {currentLanguage === "ar"
                      ? "أرسل مرة أخرى"
                      : currentLanguage === "fr"
                        ? "Envoyer à nouveau"
                        : "Send Again"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
        <div></div>
        <div
          className={`absolute ${currentLanguage === "ar" ? "-left-20 scale-x-[-1] lg:-left-6" : "-right-20 lg:-right-6"} top-0 z-10 hidden w-[400px] md:block md:w-[450px]`}
        >
          <img
            src="/images/topright-signup.png"
            alt="Logo"
            className="h-auto w-full object-contain"
          />
        </div>
        <div
          className={`absolute ${currentLanguage === "ar" ? "left-10 scale-x-[-1]" : "right-10"} z-10 hidden max-h-[80vh] max-w-[30vw] md:bottom-[450px] md:block lg:bottom-96 lg:max-w-[35vw] xl:bottom-80 2xl:bottom-[250px]`}
        >
          <img
            src="images/forget.png"
            alt="Logo"
            className="h-auto w-full object-contain"
          />
        </div>
        {/* <div className="flex h-full justify-end">
          <div className="h-full w-[250px] lg:w-[600px] items-center justify-end hidden md:flex">
            <img
              className="h-[150px] -translate-x-[40px] xl:-translate-x-[260px] lg:h-[300px] lg:w-[500px]"
              src="images/forget.png"
              alt="#"
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default OTP;
