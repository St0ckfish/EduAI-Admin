/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import SearchableSelect from "@/components/select";
import Spinner from "@/components/spinner";
import { useGetAllSchoolsQuery } from "@/features/attendance/attendanceApi";
import {
  useGetAllNationalitysQuery,
  useGetAllReginionIDQuery,
  useSignupApiDashboardMutation,
  useGetValidUsernameQuery,
} from "@/features/signupApi";
import { RootState } from "@/GlobalRedux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";
import {
  initializeLanguage,
  setLanguage,
} from "@/features/language/languageSlice";

// Define the validation schema using Zod
const signupSchema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  nid: z.string().nonempty("NID is required"),
  regionId: z.string().nonempty("Region ID is required"),
  gender: z.string().nonempty("Gender is required"),
  religion: z.string().nonempty("Religion is required"),
  number: z.string().nonempty("Number is required"),
  nationality: z.string().nonempty("Nationality is required"),
  employeeType: z.string().nonempty("Employee type is required"),
  qualification: z.string().nonempty("Qualification is required"),
  birthDate: z.string().nonempty("Birthdate is required"),
  name_en: z.string().nonempty("English name is required"),
  name_ar: z.string().nonempty("Arabic name is required"),
  name_fr: z.string().nonempty("French name is required"),
  schoolId: z.string().nonempty("School ID is required"),
  about: z.string().nonempty("About ID is required"),
});

const Signup = () => {
  const { language, loading } = useSelector((state: RootState) => state.language);

  const dispatchLang = useDispatch();
  useEffect(() => {
    dispatchLang(initializeLanguage());
  }, [dispatchLang]);

  const [errorMessage, setErrorMessage] = useState<any[]>([]);
  const dispatch2 = useDispatch();
  const handleLanguageChange = (language: any) => {
    dispatch2(setLanguage(language));
  };
  const router = useRouter();
  const [step, setStep] = useState(1);
  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);
  const { data: schoolData, isLoading: isSchool } = useGetAllSchoolsQuery(null);
  const options =
    schoolData?.data?.map(
      (school: {
        cityName: any;
        countryName: any;
        regionName: any;
        id: any;
        name: any;
      }) => ({
        value: school.id,
        label: `${school.name} - ${school.regionName}, ${school.cityName}, ${school.countryName}`,
      }),
    ) || [];
  const {
    control,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const [loginDashboard, { isLoading, error }] =
    useSignupApiDashboardMutation();
  const {
    data: nationalityData,
    error: nationalityError,
    isLoading: nationalityLoading,
  } = useGetAllNationalitysQuery(null);
  const { data: rigiond } = useGetAllReginionIDQuery(null);

  useEffect(() => {
    if (nationalityData) {
      console.log("Response Data:", nationalityData);
    }
    if (nationalityError) {
      console.log("Error:", nationalityError);
    }
  }, [nationalityData, nationalityError]);

  const onSubmit = async (data: any) => {
    try {
      const result = await loginDashboard(data).unwrap();
      console.log("Account created successfully:", result);
      toast.success(
        language === "ar"
          ? "تم إنشاء الحساب بنجاح"
          : language === "fr"
            ? "Compte créé avec succès"
            : "Account created successfully",
      );
      router.replace("/login");
    } catch (err: any) {
      setErrorMessage(err.data.data);
      console.log(errorMessage);

      toast.error(
        (err as any).data?.message || language === "ar"
          ? "فشل في إنشاء الحساب"
          : language === "fr"
            ? "Échec de la création du compte"
            : "Failed to create account",
      );
      console.error("Failed to create account:", err);
    }
  };
  const [username, setUsername] = useState<string>("");
  const [debouncedUsername, setDebouncedUsername] = useState<string>(username);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // Debounce logic to delay API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUsername(username);
    }, 300); // 300ms delay for debounce

    return () => {
      clearTimeout(handler);
    };
  }, [username]);

  // Query to check the username validity
  const { data } = useGetValidUsernameQuery(debouncedUsername, {
    skip: !debouncedUsername, // Skip the query if debouncedUsername is empty
  });
  useEffect(() => {
    if (data && data.data) {
      setError("username", {
        type: "manual",
        message:
          language === "ar"
            ? "اسم المستخدم غير متاح"
            : language === "fr"
              ? "Nom d'utilisateur indisponible"
              : "Username is not available",
      });
      setIsValid(false);
    } else if (data && !data.data) {
      clearErrors("username");
      setIsValid(true);
    }
  }, [data, setError, clearErrors, language]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.warn(
        language === "ar"
          ? "يرجى إكمال جميع الحقول المطلوبة"
          : language === "fr"
            ? "Veuillez compléter tous les champs requis"
            : "Please complete all required inputs",
      );
    }
  }, [language, errors]);

  if (nationalityLoading || isSchool)
    return (
      <div className="grid h-screen grid-cols-2 items-center justify-center bg-bgSecondary duration-300 ease-in max-[1040px]:grid-cols-1">
        <Spinner />
      </div>
    );

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
      <div className="grid h-screen grid-cols-2 items-center justify-center bg-bgSecondary pl-4 duration-300 ease-in max-[1040px]:grid-cols-1">
        <div className="gird items-center justify-center text-center">
          <div className="mb-20">
            <img
              className="absolute left-5 top-5 w-[300px]"
              src="images/logo.png"
              alt="#"
            />
          </div>
          <div className="mb-5 grid">
            <h1 className="font-sans text-[28px] font-bold text-primary">
              {language === "ar"
                ? "التسجيل"
                : language === "fr"
                  ? "S'inscrire"
                  : "Sign Up"}
            </h1>
            <p className="font-sans text-[20px] font-semibold text-secondary">
              {language === "ar"
                ? "سجل للاستمتاع بالتطبيق"
                : language === "fr"
                  ? "Inscrivez-vous pour profiter de l'application"
                  : "Sign up to enjoy the application"}
            </p>
          </div>
          <div className="grid items-center justify-center">
            <form
              dir={language === "ar" ? "rtl" : "ltr"}
              className="grid gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              {step === 1 && (
                <div className="grid w-full grid-cols-1 gap-3">
                  <label
                    htmlFor="username"
                    className="grid w-full text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="username"
                      {...register("username", { required: true })}
                      placeholder={
                        language === "ar"
                          ? "اسم المستخدم"
                          : language === "fr"
                            ? "Nom d'utilisateur"
                            : "username"
                      }
                      className={`rounded-xl border px-4 py-3 ${errors.username ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                    {errors.username ? (
                      <span className="mt-2 text-warning">
                        {errors.username.message?.toString()}
                      </span>
                    ) : isValid && debouncedUsername ? (
                      <span className="mt-2 text-green-500">
                        {language === "ar"
                          ? "اسم المستخدم متاح"
                          : language === "fr"
                            ? "Nom d'utilisateur disponible"
                            : "Username is available"}
                      </span>
                    ) : null}
                    {errors.username && (
                      <span className="text-[13px] text-error">
                        {language === "ar"
                          ? "اسم المستخدم مطلوب"
                          : language === "fr"
                            ? "Le nom d'utilisateur est requis"
                            : "Username is Required"}
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="email"
                    className="grid w-full text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="email"
                      {...register("email", { required: true })}
                      placeholder={
                        language === "ar"
                          ? "البريد الإلكتروني"
                          : language === "fr"
                            ? "Email"
                            : "email"
                      }
                      className={`rounded-xl border px-4 py-3 ${errors.email ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                      type="email"
                    />
                    {errors.email && (
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
                    className="grid w-full text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="password"
                      {...register("password", { required: true })}
                      placeholder={
                        language === "ar"
                          ? "كلمة المرور"
                          : language === "fr"
                            ? "Mot de passe"
                            : "Password"
                      }
                      className={`rounded-xl border px-4 py-3 ${errors.password ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                      type="password"
                    />
                    {errors.password && (
                      <span className="text-[13px] text-error">
                        {language === "ar"
                          ? "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل 123 (@_#*&). تشمل الأحرف الكبيرة والصغيرة A-Z a-z"
                          : language === "fr"
                            ? "Le mot de passe doit comporter au moins 8 caractères 123 (@_#*&). Inclut les majuscules et les minuscules A-Z a-z"
                            : "Password must be at least 8 characters long 123 (@_#*&). Includes uppercase and lowercase letters A-Z a-z"}
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="nid"
                    className="grid w-full text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="nid"
                      {...register("nid", { required: true })}
                      placeholder={
                        language === "ar"
                          ? "الرقم القومي"
                          : language === "fr"
                            ? "Numéro d'identification nationale"
                            : "NID"
                      }
                      className={`rounded-xl border px-4 py-3 ${errors.nid ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                      type="number"
                    />
                    {errors.nid && (
                      <span className="text-[13px] text-error">
                        {language === "ar"
                          ? "الرقم القومي مطلوب"
                          : language === "fr"
                            ? "NID est requis"
                            : "NID is Required"}
                      </span>
                    )}
                  </label>
                  <div
                    dir="ltr"
                    className="mt-12 flex w-full justify-end gap-3"
                  >
                    <p className="flex w-[120px] cursor-no-drop items-center justify-center gap-2 rounded-xl border border-[#e6e8e7] bg-white px-3 py-2 font-semibold text-primary">
                      <svg
                        className="h-5 w-5"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <polyline points="15 6 9 12 15 18" />
                      </svg>
                      {language === "ar"
                        ? "السابق"
                        : language === "fr"
                          ? "Précédent"
                          : "Previous"}
                    </p>
                    <button
                      className="flex w-[120px] items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2 font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
                      onClick={handleNext}
                    >
                      {language === "ar"
                        ? "التالي"
                        : language === "fr"
                          ? "Suivant"
                          : "Next"}
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="grid grid-cols-1 gap-3">
                  <label
                    htmlFor="regionId"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <select
                      defaultValue=""
                      id="regionId"
                      {...register("regionId", { required: true })}
                      className={`rounded-xl border px-4 py-3 ${errors.regionId ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                    >
                      <option selected value="">
                        {language === "ar"
                          ? "اختر معرف المنطقة"
                          : language === "fr"
                            ? "Sélectionnez l'ID de région"
                            : "Select Region Id"}
                      </option>
                      {rigiond &&
                        rigiond.data.map(
                          (
                            rigion: {
                              id:
                                | string
                                | number
                                | readonly string[]
                                | undefined;
                              name:
                                | string
                                | number
                                | bigint
                                | boolean
                                | React.ReactElement<
                                    any,
                                    string | React.JSXElementConstructor<any>
                                  >
                                | Iterable<React.ReactNode>
                                | React.ReactPortal
                                | Promise<React.AwaitedReactNode>
                                | null
                                | undefined;
                            },
                            index: React.Key | null | undefined,
                          ) => (
                            <option key={index} value={rigion.id}>
                              {rigion.name}
                            </option>
                          ),
                        )}
                    </select>
                    {errors.regionId && (
                      <span className="text-[13px] text-error">
                        {language === "ar"
                          ? "معرف المنطقة مطلوب"
                          : language === "fr"
                            ? "L'ID de région est requis"
                            : "regionId is Required"}
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="gender"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <select
                      defaultValue=""
                      id="gender"
                      {...register("gender", { required: true })}
                      className={`rounded-xl border px-4 py-3 ${errors.gender ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                    >
                      <option selected value="">
                        {language === "ar"
                          ? "اختر الجنس"
                          : language === "fr"
                            ? "Sélectionnez le sexe"
                            : "Select gender"}
                      </option>
                      <option value="MALE">
                        {language === "ar"
                          ? "ذكر"
                          : language === "fr"
                            ? "Homme"
                            : "Male"}
                      </option>

                      <option value="FEMALE">
                        {language === "ar"
                          ? "أنثى"
                          : language === "fr"
                            ? "Femme"
                            : "Female"}
                      </option>
                    </select>
                    {errors.gender && (
                      <span className="text-[13px] text-error">
                        {language === "ar"
                          ? "الجنس مطلوب"
                          : language === "fr"
                            ? "Le sexe est requis"
                            : "Gender is Required"}
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="religion"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <select
                      defaultValue=""
                      id="religion"
                      {...register("religion", { required: true })}
                      className={`rounded-xl border px-4 py-3 ${errors.religion ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                    >
                      <option selected value="">
                        {language === "ar"
                          ? "اختر الدين"
                          : language === "fr"
                            ? "Sélectionnez la religion"
                            : "Select religion"}
                      </option>
                      <option value="MUSLIM">
                        {language === "ar"
                          ? "مسلم"
                          : language === "fr"
                            ? "Musulman"
                            : "Muslim"}
                      </option>
                      <option value="CHRISTIAN">
                        {language === "ar"
                          ? "مسيحي"
                          : language === "fr"
                            ? "Chrétien"
                            : "Christian"}
                      </option>
                      <option value="OTHERS">
                        {language === "ar"
                          ? "أخرى"
                          : language === "fr"
                            ? "Autres"
                            : "Others"}
                      </option>
                    </select>
                    {errors.religion && (
                      <span className="text-[13px] text-error">
                        {language === "ar"
                          ? "الدين مطلوب"
                          : language === "fr"
                            ? "La religion est requise"
                            : "Religion is Required"}
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="number"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="number"
                      {...register("number", { required: true })}
                      placeholder={
                        language === "ar"
                          ? "رقم"
                          : language === "fr"
                            ? "Numéro"
                            : "Number"
                      }
                      className={`rounded-xl border px-4 py-3 ${errors.number ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                      type="number"
                    />
                    {errors.number && (
                      <span className="text-[13px] text-error">
                        {language === "ar"
                          ? "الرقم مطلوب"
                          : language === "fr"
                            ? "Le numéro est requis"
                            : "number is Required"}
                      </span>
                    )}
                  </label>
                  <div
                    dir="ltr"
                    className="mt-12 flex w-full justify-end gap-3"
                  >
                    <button
                      className="flex w-[120px] items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2 font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
                      onClick={handlePrevious}
                    >
                      <svg
                        className="h-5 w-5"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <polyline points="15 6 9 12 15 18" />
                      </svg>
                      {language === "ar"
                        ? "السابق"
                        : language === "fr"
                          ? "Précédent"
                          : "Previous"}
                    </button>
                    <button
                      className="flex w-[120px] items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2 font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
                      onClick={handleNext}
                    >
                      {language === "ar"
                        ? "التالي"
                        : language === "fr"
                          ? "Suivant"
                          : "Next"}
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="grid grid-cols-1 gap-3">
                  <label
                    htmlFor="nationality"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <select
                      defaultValue=""
                      id="nationality"
                      {...register("nationality", { required: true })}
                      className={`rounded-xl border px-4 py-3 ${errors.nationality ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                    >
                      <option selected value="">
                        {language === "ar"
                          ? "اختر الجنسية"
                          : language === "fr"
                            ? "Sélectionnez la nationalité"
                            : "Select Nationality"}
                      </option>
                      {nationalityData &&
                        Object.entries(nationalityData.data).map(
                          ([key, value]) => (
                            <option key={String(value)} value={key}>
                              {String(value)}
                            </option>
                          ),
                        )}
                    </select>
                    {errors.nationality && (
                      <span className="text-[13px] text-error">
                        {language === "ar"
                          ? "الجنسية مطلوبة"
                          : language === "fr"
                            ? "La nationalité est requise"
                            : "Nationality is Required"}
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="employeeType"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <select
                      defaultValue=""
                      id="religion"
                      {...register("employeeType", { required: true })}
                      className={`rounded-xl border px-4 py-3 ${errors.employeeType ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                    >
                      <option selected value="">
                        {language === "ar"
                          ? "اختر الدين"
                          : language === "fr"
                            ? "Sélectionnez la religion"
                            : "Select religion"}
                      </option>
                      <option value="EMPLOYEE">
                        {language === "ar"
                          ? "موظف"
                          : language === "fr"
                            ? "Employé"
                            : "Employee"}
                      </option>
                      <option value="DRIVER">
                        {language === "ar"
                          ? "سائق"
                          : language === "fr"
                            ? "Chauffeur"
                            : "Driver"}
                      </option>
                      <option value="WORKER">
                        {language === "ar"
                          ? "عامل"
                          : language === "fr"
                            ? "Travailleur"
                            : "Worker"}
                      </option>
                    </select>
                    {errors.employeeType && (
                      <span className="text-[13px] text-error">
                        {language === "ar"
                          ? "نوع الموظف مطلوب"
                          : language === "fr"
                            ? "Le type d'employé est requis"
                            : "Employee Type is Required"}
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="qualification"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <select
                      defaultValue=""
                      id="qualification"
                      {...register("qualification", { required: true })}
                      className={`rounded-xl border px-4 py-3 ${errors.qualification ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                    >
                      <option selected value="">
                        {language === "ar"
                          ? "اختر الدين"
                          : language === "fr"
                            ? "Sélectionnez la religion"
                            : "Select religion"}
                      </option>
                      <option value="HIGH_SCHOOL_DIPLOMA">
                        {language === "ar"
                          ? "شهادة الثانوية العامة"
                          : language === "fr"
                            ? "Diplôme de baccalauréat"
                            : "High School Diploma"}
                      </option>
                      <option value="MASTER_DEGREE">
                        {language === "ar"
                          ? "درجة الماجستير"
                          : language === "fr"
                            ? "Master"
                            : "Master Degree"}
                      </option>
                      <option value="BACHELOR_DEGREE">
                        {language === "ar"
                          ? "درجة البكالوريوس"
                          : language === "fr"
                            ? "Licence"
                            : "Bachelor Degree"}
                      </option>
                      <option value="DOCTORATE_DEGREE">
                        {language === "ar"
                          ? "درجة الدكتوراه"
                          : language === "fr"
                            ? "Doctorat"
                            : "Doctorate Degree"}
                      </option>
                    </select>
                    {errors.qualification && (
                      <span className="text-[13px] text-error">
                        {language === "ar"
                          ? "المؤهل مطلوب"
                          : language === "fr"
                            ? "La qualification est requise"
                            : "Qualification is Required"}
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="birthDate"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    {language === "ar"
                      ? "تاريخ الميلاد"
                      : language === "fr"
                        ? "Date de naissance"
                        : "Birthday"}
                    <input
                      id="birthDate"
                      {...register("birthDate", { required: true })}
                      placeholder={
                        language === "ar"
                          ? "رقم الهوية الوطنية"
                          : language === "fr"
                            ? "N° de pièce d'identité"
                            : "NID"
                      }
                      className={`rounded-xl border px-4 py-3 ${errors.birthDate ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                      type="date"
                    />
                    {errors.birthDate && (
                      <span className="text-[13px] text-error">
                        {language === "ar"
                          ? "تاريخ الميلاد مطلوب"
                          : language === "fr"
                            ? "La date de naissance est requise"
                            : "birthDate is Required"}
                      </span>
                    )}
                  </label>
                  <div
                    dir="ltr"
                    className="mt-12 flex w-full justify-end gap-3"
                  >
                    <button
                      className="flex w-[120px] items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2 font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
                      onClick={handlePrevious}
                    >
                      <svg
                        className="h-5 w-5"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <polyline points="15 6 9 12 15 18" />
                      </svg>
                      {language === "ar"
                        ? "السابق"
                        : language === "fr"
                          ? "Précédent"
                          : "Previous"}
                    </button>
                    <button
                      className="flex w-[120px] items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2 font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
                      onClick={handleNext}
                    >
                      {language === "ar"
                        ? "التالي"
                        : language === "fr"
                          ? "Suivant"
                          : "Next"}
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="grid grid-cols-1 gap-3">
                  <label
                    htmlFor="name_en"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="name_en"
                      {...register("name_en", { required: true })}
                      placeholder={
                        language === "ar"
                          ? "الاسم بالإنجليزية"
                          : language === "fr"
                            ? "Nom en anglais"
                            : "English Name"
                      }
                      className={`rounded-xl border px-4 py-3 ${errors.name_en ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                      type="text"
                    />
                    {errors.name_en && (
                      <span className="text-[13px] text-error">
                        {language === "ar"
                          ? "الاسم بالإنجليزية مطلوب"
                          : language === "fr"
                            ? "Le nom en anglais est requis"
                            : "English Name is Required"}
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="name_ar"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="name_ar"
                      {...register("name_ar", { required: true })}
                      placeholder={
                        language === "ar"
                          ? "الاسم بالعربية"
                          : language === "fr"
                            ? "Nom en arabe"
                            : "Arabic Name"
                      }
                      className={`rounded-xl border px-4 py-3 ${errors.name_ar ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                      type="text"
                    />
                    {errors.name_ar && (
                      <span className="text-[13px] text-error">
                        {language === "ar"
                          ? "الاسم بالعربية مطلوب"
                          : language === "fr"
                            ? "Le nom en arabe est requis"
                            : "Arabic Name is Required"}
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="name_fr"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <input
                      id="name_fr"
                      {...register("name_fr", { required: true })}
                      placeholder={
                        language === "ar"
                          ? "الاسم بالفرنسية"
                          : language === "fr"
                            ? "Nom en français"
                            : "French Name"
                      }
                      className={`rounded-xl border px-4 py-3 ${errors.name_fr ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                      type="text"
                    />
                    {errors.name_fr && (
                      <span className="text-[13px] text-error">
                        {language === "ar"
                          ? "الاسم بالفرنسية مطلوب"
                          : language === "fr"
                            ? "Le nom en français est requis"
                            : "French Name is Required"}
                      </span>
                    )}
                  </label>
                  <label
                    htmlFor="schoolId"
                    className="grid text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <SearchableSelect
                      name="schoolId"
                      control={control}
                      errors={errors}
                      options={options}
                      currentLanguage={language}
                      placeholder="Select School"
                    />
                  </label>
                  <label
                    htmlFor="about"
                    className="grid w-full text-start font-sans text-[15px] font-semibold text-[#9a9a9a]"
                  >
                    <textarea
                      id="about"
                      {...register("about", { required: true })}
                      placeholder={
                        language === "ar"
                          ? "حول"
                          : language === "fr"
                            ? "À propos"
                            : "about"
                      }
                      className={`rounded-xl border px-4 py-3 ${errors.about ? "border-warning" : "border-borderPrimary"} w-[400px] outline-none max-[458px]:w-[350px]`}
                    />
                    {errors.about && (
                      <span className="text-[13px] text-error">
                        {language === "ar"
                          ? "حول مطلوب"
                          : language === "fr"
                            ? "À propos est requis"
                            : "about is Required"}
                      </span>
                    )}
                  </label>
                  <div
                    dir="ltr"
                    className="mt-12 flex w-full justify-end gap-3"
                  >
                    <button
                      className="flex w-[120px] items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2 font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
                      onClick={handlePrevious}
                    >
                      <svg
                        className="h-5 w-5"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <polyline points="15 6 9 12 15 18" />
                      </svg>
                      {language === "ar"
                        ? "السابق"
                        : language === "fr"
                          ? "Précédent"
                          : "Previous"}
                    </button>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="flex w-[120px] items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2 font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
                    >
                      {isLoading
                        ? language === "ar"
                          ? "جاري التحميل..."
                          : language === "fr"
                            ? "Chargement..."
                            : "Loading..."
                        : language === "ar"
                          ? "تسجيل"
                          : language === "fr"
                            ? "S'inscrire"
                            : "SignUp"}
                    </button>
                  </div>
                </div>
              )}
              {error && (
                <p className="font-semibold text-error">
                  {language === "ar"
                    ? "قد تكون قد أكملت البيانات أو أدخلتها بشكل غير صحيح!"
                    : language === "fr"
                      ? "Vous n'avez peut-être pas complété les données ou les avez saisies incorrectement !"
                      : "You may not have completed the data or entered it correctly!"}
                </p>
              )}
              <div className="mt-4 flex items-center justify-center gap-2 text-center">
                <p className="font-sans font-medium text-secondary">
                  {language === "ar"
                    ? "هل لديك حساب بالفعل؟"
                    : language === "fr"
                      ? "Vous avez déjà un compte ?"
                      : "Already have an account?"}
                </p>
                <a
                  href="/login"
                  className="flex font-sans font-medium text-primary hover:underline"
                >
                  {language === "ar"
                    ? "تسجيل الدخول"
                    : language === "fr"
                      ? "Se connecter"
                      : "Login"}
                </a>
              </div>
            </form>
            <div className="text-red-500">
              {Array.isArray(errorMessage) &&
                errorMessage.map((err: string, index: number) => (
                  <div key={index}>
                    <p>{err}</p>
                  </div>
                ))}
            </div>
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

export default Signup;
