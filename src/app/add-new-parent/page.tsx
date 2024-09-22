"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/spinner";
import { useCreateParentsMutation } from "@/features/User-Management/parentApi";
import {
  useGetAllNationalitysQuery,
  useGetAllReginionIDQuery,
} from "@/features/signupApi";
import { toast } from "react-toastify";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import BreadCrumbs from "@/components/BreadCrumbs";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddNewParent = () => {
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "User Management",
      nameAr: "إدارة المستخدمين",
      nameFr: "Gestion des utilisateurs",
      href: "/user-management",
    },
    {
      nameEn: "Parent",
      nameAr: "الأب",
      nameFr: "Parent",
      href: "/parent",
    },
    {
      nameEn: "Add New Parent",
      nameAr: "إضافة أب جديد",
      nameFr: "Ajouter un nouvel parent",
      href: "/add-new-parent",
    },
  ];
  const [parentIdPhotoName, setParentIdPhotoName] = useState("");
  const [studentIdPhotoName, setStudentIdPhotoName] = useState("");
  const [studentProfilePhotoName, setStudentProfilePhotoName] = useState("");
  const [studentCertificatesOfAchievementName, setStudentCertificatesOfAchievementName] = useState("");

  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const { data: nationalityData, isLoading: nationalityLoading } =
    useGetAllNationalitysQuery(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createEmployee, { isLoading }] = useCreateParentsMutation();
  const { data: rigiond } = useGetAllReginionIDQuery(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: any, setFileName: (name: string) => void) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append(
      "request",
      JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        nid: data.nid,
        gender: data.gender,
        religion: data.religion,
        nationality: data.nationality,
        regionId: data.regionId,
        name_en: data.name_en,
        name_ar: data.name_ar,
        name_fr: data.name_fr,
        about: data.about,
        occupation_en: data.occupation_en,
        occupation_ar: data.occupation_ar,
        occupation_fr: data.occupation_fr,
        birthDate: data.birthDate,
        number: data.number,
        // qualification: data.qualification,
        schoolId: data.schoolId, // Assuming default values, replace with actual form data if needed
        student: {
          username: data.student_username,
          email: data.student_email,
          password: data.student_password,
          nid: data.student_nid,
          gender: data.student_gender,
          birthDate: data.student_birthDate,
          name_en: data.student_name_en,
          name_ar: data.student_name_ar,
          name_fr: data.student_name_fr,
          about: data.student_about,
          relationshipToStudent: data.relationshipToStudent,
          studyLevel: data.studyLevel,
          eduSystemId: data.eduSystemId,
        },
      }),
    );

    // Append file inputs
    if (data.parentIdPhoto[0])
      formData.append("parentIdPhoto", data.parentIdPhoto[0]);
    if (data.studentIdPhoto[0])
      formData.append("studentIdPhoto", data.studentIdPhoto[0]);
    if (data.studentProfilePhoto[0])
      formData.append("studentProfilePhoto", data.studentProfilePhoto[0]);
    if (data.studentCertificatesOfAchievement[0])
      formData.append(
        "studentCertificatesOfAchievement",
        data.studentCertificatesOfAchievement[0],
      );

    try {
      await createEmployee(formData).unwrap();
      toast.success("Parent created successfully");
    } catch {
      toast.error("Failed to create parent");
    }
  };

  if (nationalityLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />

      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className={` ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mr-[5px] grid items-center justify-center`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-10 grid items-center justify-center gap-5 rounded-xl bg-bgPrimary p-10 sm:w-[500px] md:w-[600px] lg:w-[750px] xl:w-[1000px]">
            <div className="flex items-center justify-start gap-2">
              <svg
                className="h-6 w-6 font-bold text-secondary group-hover:text-hover"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="3" y1="21" x2="21" y2="21" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <polyline points="5 6 12 3 19 6" />
                <line x1="4" y1="10" x2="4" y2="21" />
                <line x1="20" y1="10" x2="20" y2="21" />
                <line x1="8" y1="14" x2="8" y2="17" />
                <line x1="12" y1="14" x2="12" y2="17" />
                <line x1="16" y1="14" x2="16" y2="17" />
              </svg>
              <h1 className="font-sans text-[22px] font-semibold">
                {currentLanguage === "en"
                  ? "Parent Information"
                  : currentLanguage === "ar"
                    ? "معلومات الوالدين"
                    : currentLanguage === "fr"
                      ? "Informations sur les parents"
                      : "Parent Information"}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              {/* Input fields for parent information */}
              <label
                htmlFor="username"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Username"
                  : currentLanguage === "ar"
                    ? "اسم المستخدم"
                    : currentLanguage === "fr"
                      ? "Nom d'utilisateur"
                      : "Username"}
                <input
                  id="username"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="email"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Email"
                  : currentLanguage === "ar"
                    ? "البريد الإلكتروني"
                    : currentLanguage === "fr"
                      ? "E-mail"
                      : "Email"}
                <input
                  id="email"
                  type="email"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="password"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Password"
                  : currentLanguage === "ar"
                    ? "كلمة المرور"
                    : currentLanguage === "fr"
                      ? "Mot de passe"
                      : "Password"}
                <input
                  id="password"
                  type="password"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="nid"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "NID"
                  : currentLanguage === "ar"
                    ? "رقم الهوية"
                    : currentLanguage === "fr"
                      ? "NID"
                      : "NID"}
                <input
                  id="nid"
                  type="number"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("nid", { required: true })}
                />
                {errors.nid && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="gender"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Gender"
                  : currentLanguage === "ar"
                    ? "الجنس"
                    : currentLanguage === "fr"
                      ? "Genre"
                      : "Gender"}
                <select
                  id="gender"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("gender", { required: true })}
                >
                  <option value="">
                    {currentLanguage === "en"
                      ? "Select gender"
                      : currentLanguage === "ar"
                        ? "اختر الجنس"
                        : currentLanguage === "fr"
                          ? "Sélectionner le genre"
                          : "Select gender"}
                  </option>
                  <option value="MALE">
                    {currentLanguage === "en"
                      ? "Male"
                      : currentLanguage === "ar"
                        ? "ذكر"
                        : currentLanguage === "fr"
                          ? "Homme"
                          : "Male"}
                  </option>
                  <option value="FEMALE">
                    {currentLanguage === "en"
                      ? "Female"
                      : currentLanguage === "ar"
                        ? "أنثى"
                        : currentLanguage === "fr"
                          ? "Femme"
                          : "Female"}
                  </option>
                </select>
                {errors.gender && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="religion"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Religion"
                  : currentLanguage === "ar"
                    ? "الدين"
                    : currentLanguage === "fr"
                      ? "Religion"
                      : "Religion"}
                <select
                  id="religion"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("religion", { required: true })}
                >
                  <option value="">
                    {currentLanguage === "en"
                      ? "Select religion"
                      : currentLanguage === "ar"
                        ? "اختر الدين"
                        : currentLanguage === "fr"
                          ? "Sélectionner la religion"
                          : "Select religion"}
                  </option>
                  <option value="MUSLIM">
                    {currentLanguage === "en"
                      ? "Muslim"
                      : currentLanguage === "ar"
                        ? "مسلم"
                        : currentLanguage === "fr"
                          ? "Musulman"
                          : "Muslim"}
                  </option>
                  <option value="CHRISTIAN">
                    {currentLanguage === "en"
                      ? "Christian"
                      : currentLanguage === "ar"
                        ? "مسيحي"
                        : currentLanguage === "fr"
                          ? "Chrétien"
                          : "Christian"}
                  </option>
                  <option value="OTHERS">
                    {currentLanguage === "en"
                      ? "Others"
                      : currentLanguage === "ar"
                        ? "أخرى"
                        : currentLanguage === "fr"
                          ? "Autres"
                          : "Others"}
                  </option>
                </select>
                {errors.religion && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>

              <label
                htmlFor="nationality"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Your Nationality"
                  : currentLanguage === "ar"
                    ? "جنسيتك"
                    : currentLanguage === "fr"
                      ? "Votre Nationalité"
                      : "Your Nationality"}
                <select
                  id="nationality"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("nationality", { required: true })}
                >
                  <option value="">
                    {currentLanguage === "en"
                      ? "Select Nationality"
                      : currentLanguage === "ar"
                        ? "اختر الجنسية"
                        : currentLanguage === "fr"
                          ? "Sélectionner la nationalité"
                          : "Select Nationality"}
                  </option>
                  {nationalityData &&
                    Object.entries(nationalityData.data).map(([key, value]) => (
                      <option key={key} value={key}>
                        {String(value)}
                      </option>
                    ))}
                </select>
                {errors.nationality && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="regionId"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "RegionId"
                  : currentLanguage === "ar"
                    ? "رقم المنطقة"
                    : currentLanguage === "fr"
                      ? "ID de la région"
                      : "RegionId"}
                <select
                  defaultValue=""
                  id="regionId"
                  {...register("regionId", { required: true })}
                  className="h-full w-[400px] rounded-xl border border-borderPrimary px-4 py-3 text-[18px] text-[#000000] outline-none max-[458px]:w-[350px]"
                >
                  <option value="">
                    {currentLanguage === "en"
                      ? "Select Region Id"
                      : currentLanguage === "ar"
                        ? "اختر رقم المنطقة"
                        : currentLanguage === "fr"
                          ? "Sélectionner l'ID de la région"
                          : "Select Region Id"}
                  </option>
                  {rigiond &&
                    rigiond.data.map((region: any, index: number) => (
                      <option key={index} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                </select>
                {errors.regionId && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="name_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Name EN"
                  : currentLanguage === "ar"
                    ? "الاسم بالإنجليزية"
                    : currentLanguage === "fr"
                      ? "Nom EN"
                      : "Name EN"}
                <input
                  id="name_en"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("name_en", { required: true })}
                />
                {errors.name_en && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="name_ar"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Name AR"
                  : currentLanguage === "ar"
                    ? "الاسم بالعربية"
                    : currentLanguage === "fr"
                      ? "Nom AR"
                      : "Name AR"}
                <input
                  id="name_ar"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("name_ar", { required: true })}
                />
                {errors.name_ar && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="name_fr"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Name FR"
                  : currentLanguage === "ar"
                    ? "الاسم بالفرنسية"
                    : currentLanguage === "fr"
                      ? "Nom FR"
                      : "Name FR"}
                <input
                  id="name_fr"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("name_fr", { required: true })}
                />
                {errors.name_fr && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="about"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "About"
                  : currentLanguage === "ar"
                    ? "عن"
                    : currentLanguage === "fr"
                      ? "À propos"
                      : "About"}
                <input
                  id="about"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("about", { required: true })}
                />
                {errors.about && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="occupation_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Occupation EN"
                  : currentLanguage === "ar"
                    ? "الوظيفة بالإنجليزية"
                    : currentLanguage === "fr"
                      ? "Occupation EN"
                      : "Occupation EN"}
                <input
                  id="occupation_en"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("occupation_en", { required: true })}
                />
                {errors.occupation_en && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>

              <label
                htmlFor="occupation_ar"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Occupation AR"
                  : currentLanguage === "ar"
                    ? "الوظيفة بالعربية"
                    : currentLanguage === "fr"
                      ? "Occupation AR"
                      : "Occupation AR"}
                <input
                  id="occupation_ar"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("occupation_ar", { required: true })}
                />
                {errors.occupation_ar && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="occupation_fr"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Occupation FR"
                  : currentLanguage === "ar"
                    ? "الوظيفة بالفرنسية"
                    : currentLanguage === "fr"
                      ? "Occupation FR"
                      : "Occupation FR"}
                <input
                  id="occupation_fr"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("occupation_fr", { required: true })}
                />
                {errors.occupation_fr && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="birthDate"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Date Of Birth"
                  : currentLanguage === "ar"
                    ? "تاريخ الميلاد"
                    : currentLanguage === "fr"
                      ? "Date de naissance"
                      : "Date Of Birth"}
                <input
                  id="birthDate"
                  type="date"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("birthDate", { required: true })}
                />
                {errors.birthDate && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="number"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Mobile"
                  : currentLanguage === "ar"
                    ? "رقم الهاتف"
                    : currentLanguage === "fr"
                      ? "Mobile"
                      : "Mobile"}
                <input
                  id="number"
                  type="number"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("number", { required: true })}
                />
                {errors.number && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="schoolId"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "School Id"
                  : currentLanguage === "ar"
                    ? "رقم المدرسة"
                    : currentLanguage === "fr"
                      ? "ID de l'école"
                      : "School Id"}
                <input
                  id="schoolId"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("schoolId", { required: true })}
                />
                {errors.schoolId && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              {/* Input fields for student information */}
              <label
                htmlFor="student_username"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Student Username"
                  : currentLanguage === "ar"
                    ? "اسم المستخدم للطالب"
                    : currentLanguage === "fr"
                      ? "Nom d'utilisateur étudiant"
                      : "Student Username"}
                <input
                  id="student_username"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("student_username", { required: true })}
                />
                {errors.student_username && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="student_email"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Student Email"
                  : currentLanguage === "ar"
                    ? "بريد الطالب الإلكتروني"
                    : currentLanguage === "fr"
                      ? "Email étudiant"
                      : "Student Email"}
                <input
                  id="student_email"
                  type="email"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("student_email", { required: true })}
                />
                {errors.student_email && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="student_password"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Student Password"
                  : currentLanguage === "ar"
                    ? "كلمة مرور الطالب"
                    : currentLanguage === "fr"
                      ? "Mot de passe étudiant"
                      : "Student Password"}
                <input
                  id="student_password"
                  type="password"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("student_password", { required: true })}
                />
                {errors.student_password && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="student_nid"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Student NID"
                  : currentLanguage === "ar"
                    ? "رقم الهوية الطالب"
                    : currentLanguage === "fr"
                      ? "NID étudiant"
                      : "Student NID"}
                <input
                  id="student_nid"
                  type="number"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("student_nid", { required: true })}
                />
                {errors.student_nid && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="student_gender"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Student Gender"
                  : currentLanguage === "ar"
                    ? "جنس الطالب"
                    : currentLanguage === "fr"
                      ? "Genre étudiant"
                      : "Student Gender"}
                <select
                  id="student_gender"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("student_gender", { required: true })}
                >
                  <option value="">
                    {currentLanguage === "en"
                      ? "Select gender"
                      : currentLanguage === "ar"
                        ? "اختر الجنس"
                        : currentLanguage === "fr"
                          ? "Sélectionner le sexe"
                          : "Select gender"}
                  </option>
                  <option value="MALE">
                    {currentLanguage === "en"
                      ? "Male"
                      : currentLanguage === "ar"
                        ? "ذكر"
                        : currentLanguage === "fr"
                          ? "Homme"
                          : "Male"}
                  </option>
                  <option value="FEMALE">
                    {currentLanguage === "en"
                      ? "Female"
                      : currentLanguage === "ar"
                        ? "أنثى"
                        : currentLanguage === "fr"
                          ? "Femme"
                          : "Female"}
                  </option>
                </select>
                {errors.student_gender && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="student_birthDate"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Student Date Of Birth"
                  : currentLanguage === "ar"
                    ? "تاريخ ميلاد الطالب"
                    : currentLanguage === "fr"
                      ? "Date de naissance étudiant"
                      : "Student Date Of Birth"}
                <input
                  id="student_birthDate"
                  type="date"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("student_birthDate", { required: true })}
                />
                {errors.student_birthDate && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="student_name_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Student Name EN"
                  : currentLanguage === "ar"
                    ? "اسم الطالب بالإنجليزية"
                    : currentLanguage === "fr"
                      ? "Nom de l'étudiant EN"
                      : "Student Name EN"}
                <input
                  id="student_name_en"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("student_name_en", { required: true })}
                />
                {errors.student_name_en && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>

              <label
                htmlFor="student_name_ar"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Student Name AR"
                  : currentLanguage === "ar"
                    ? "اسم الطالب بالعربية"
                    : currentLanguage === "fr"
                      ? "Nom de l'étudiant AR"
                      : "Student Name AR"}
                <input
                  id="student_name_ar"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("student_name_ar", { required: true })}
                />
                {errors.student_name_ar && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="student_name_fr"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Student Name FR"
                  : currentLanguage === "ar"
                    ? "اسم الطالب بالفرنسية"
                    : currentLanguage === "fr"
                      ? "Nom de l'étudiant FR"
                      : "Student Name FR"}
                <input
                  id="student_name_fr"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("student_name_fr", { required: true })}
                />
                {errors.student_name_fr && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="student_about"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Student About"
                  : currentLanguage === "ar"
                    ? "معلومات عن الطالب"
                    : currentLanguage === "fr"
                      ? "À propos de l'étudiant"
                      : "Student About"}
                <input
                  id="student_about"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("student_about", { required: true })}
                />
                {errors.student_about && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="relationshipToStudent"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Relationship To Student"
                  : currentLanguage === "ar"
                    ? "العلاقة بالطالب"
                    : currentLanguage === "fr"
                      ? "Relation avec l'étudiant"
                      : "Relationship To Student"}
                <input
                  id="relationshipToStudent"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("relationshipToStudent", { required: true })}
                />
                {errors.relationshipToStudent && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="studyLevel"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Study Level"
                  : currentLanguage === "ar"
                    ? "مستوى الدراسة"
                    : currentLanguage === "fr"
                      ? "Niveau d'étude"
                      : "Study Level"}
                <input
                  id="studyLevel"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("studyLevel", { required: true })}
                />
                {errors.studyLevel && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="eduSystemId"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Edu System Id"
                  : currentLanguage === "ar"
                    ? "رقم نظام التعليم"
                    : currentLanguage === "fr"
                      ? "ID du système éducatif"
                      : "Edu System Id"}
                <input
                  id="eduSystemId"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("eduSystemId", { required: true })}
                />
                {errors.eduSystemId && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>

              <label htmlFor="parentIdPhoto" className="grid font-sans text-[18px] font-semibold">
                {currentLanguage === "en"
                  ? "Parent ID Photo"
                  : currentLanguage === "ar"
                    ? "صورة هوية الوالد"
                    : currentLanguage === "fr"
                      ? "Photo d'identité des parents"
                      : "Parent ID Photo"}
                <input
                  id="parentIdPhoto"
                  type="file"
                  className="hidden"
                  {...register("parentIdPhoto")}
                  onChange={(e) => handleFileChange(e, setParentIdPhotoName)}
                />
                <span className="w-[400px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]">
                  <div className="flex">
                    <FaCloudUploadAlt className="mx-2 mt-1" />
                    {parentIdPhotoName
                      ? parentIdPhotoName
                      : currentLanguage === "en"
                        ? "Choose a file"
                        : currentLanguage === "ar"
                          ? "اختر ملف"
                          : currentLanguage === "fr"
                            ? "Choisir un fichier"
                            : "Choose a file"}
                  </div>
                </span>
              </label>
            </div>
            {/* File input fields */}
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label htmlFor="studentIdPhoto" className="grid font-sans text-[18px] font-semibold">
                {currentLanguage === "en"
                  ? "Student ID Photo"
                  : currentLanguage === "ar"
                    ? "صورة هوية الطالب"
                    : currentLanguage === "fr"
                      ? "Photo d'identité de l'étudiant"
                      : "Student ID Photo"}
                <input
                  id="studentIdPhoto"
                  type="file"
                  className="hidden"
                  {...register("studentIdPhoto")}
                  onChange={(e) => handleFileChange(e, setStudentIdPhotoName)}
                />
                <span className="w-[400px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]">
                  <div className="flex">
                    <FaCloudUploadAlt className="mx-2 mt-1" />
                    {studentIdPhotoName
                      ? studentIdPhotoName
                      : currentLanguage === "en"
                        ? "Choose a file"
                        : currentLanguage === "ar"
                          ? "اختر ملف"
                          : currentLanguage === "fr"
                            ? "Choisir un fichier"
                            : "Choose a file"}
                  </div>
                </span>
              </label>

              <label htmlFor="studentProfilePhoto" className="grid font-sans text-[18px] font-semibold">
                {currentLanguage === "en"
                  ? "Student Profile Photo"
                  : currentLanguage === "ar"
                    ? "صورة الملف الشخصي للطالب"
                    : currentLanguage === "fr"
                      ? "Photo de profil de l'étudiant"
                      : "Student Profile Photo"}
                <input
                  id="studentProfilePhoto"
                  type="file"
                  className="hidden"
                  {...register("studentProfilePhoto")}
                  onChange={(e) => handleFileChange(e, setStudentProfilePhotoName)}
                />
                <span className="w-[400px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]">
                  <div className="flex">
                    <FaCloudUploadAlt className="mx-2 mt-1" />
                    {studentProfilePhotoName
                      ? studentProfilePhotoName
                      : currentLanguage === "en"
                        ? "Choose a file"
                        : currentLanguage === "ar"
                          ? "اختر ملف"
                          : currentLanguage === "fr"
                            ? "Choisir un fichier"
                            : "Choose a file"}
                  </div>
                </span>
              </label>
              <label htmlFor="studentCertificatesOfAchievement" className="grid font-sans text-[18px] font-semibold">
                {currentLanguage === "en"
                  ? "Student Certificates Of Achievement"
                  : currentLanguage === "ar"
                    ? "شهادات إنجاز الطالب"
                    : currentLanguage === "fr"
                      ? "Certificats de réussite de l'étudiant"
                      : "Student Certificates Of Achievement"}
                <input
                  id="studentCertificatesOfAchievement"
                  type="file"
                  className="hidden"
                  {...register("studentCertificatesOfAchievement")}
                  onChange={(e) => handleFileChange(e, setStudentCertificatesOfAchievementName)}
                />
                <span className="w-[400px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]">
                  <div className="flex">
                    <FaCloudUploadAlt className="mx-2 mt-1" />
                    {studentCertificatesOfAchievementName
                      ? studentCertificatesOfAchievementName
                      : currentLanguage === "en"
                        ? "Choose a file"
                        : currentLanguage === "ar"
                          ? "اختر ملف"
                          : currentLanguage === "fr"
                            ? "Choisir un fichier"
                            : "Choose a file"}
                  </div>
                </span>
              </label>

            </div>
            <div className="flex justify-center text-center">
              <button
                disabled={isLoading}
                type="submit"
                className="w-[180px] rounded-xl bg-primary px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
              >
                {isLoading
                  ? currentLanguage === "en"
                    ? "Adding..."
                    : currentLanguage === "ar"
                      ? "جارٍ الإضافة..."
                      : currentLanguage === "fr"
                        ? "Ajout en cours..."
                        : "Adding..."
                  : currentLanguage === "en"
                    ? "Add Parent"
                    : currentLanguage === "ar"
                      ? "إضافة ولي الأمر"
                      : currentLanguage === "fr"
                        ? "Ajouter un parent"
                        : "Add Parent"}{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewParent;
