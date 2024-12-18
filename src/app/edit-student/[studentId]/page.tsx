"use client";
import { RootState } from "@/GlobalRedux/store";
import BreadCrumbs from "@/components/BreadCrumbs";
import SearchableSelect from "@/components/select";
import Spinner from "@/components/spinner";
import { useGetStudentByIdQuery, useGetStudentUpdateByIdQuery, useUpdateStudentsMutation } from "@/features/User-Management/studentApi";
import {
  useGetAllNationalitysQuery,
  useGetAllReginionIDQuery
} from "@/features/signupApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface Params {
  studentId: string;
}

const EditStudent = ({ params }: { params: Params }) => {
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Student",
      nameAr: "طالب",
      nameFr: "Élève",
      href: "/student",
    },
    {
      nameEn: "Edit Student",
      nameAr: "تعديل الغرفة",
      nameFr: "Modifier l'élève",
      href: `/edit-student/${params.studentId}`,
    },
  ];

  const { data: studentDataUpdate } = useGetStudentUpdateByIdQuery(params.studentId);
  const { data: studentData } = useGetStudentByIdQuery(params.studentId);
  const [email, setEmail] = useState<string | null>(null);
  const [nid, setNid] = useState<string | null>(null);
  const [name_en, setName_en] = useState<string | null>(null);
  const [name_ar, setName_ar] = useState<string | null>(null);
  const [name_fr, setName_fr] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [isGraduated, setIsGraduated] = useState<boolean | null>(null);
  const [about, setAbout] = useState<string | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);
  const [nationality, setNationality] = useState<string | null>(null);
  const [regionId, setRegionId] = useState<number | null>(null);
  
  console.log("👾 ~ EditStudent ~ studentDataUpdate:", studentDataUpdate)
  useEffect(() => {
    if (studentDataUpdate?.data) {
      const {
        email,
        nid,
        about,
        gender,
        nationality,
        religion,
        birthDate,
        regionId,
        graduated,
        name_en,
        name_ar,
        name_fr,
      } = studentDataUpdate.data;

      setEmail(email || null);
      setNid(nid || null);
      setAbout(about || null);
      setGender(gender || null);
      setNationality(nationality || null);
      setDateOfBirth(birthDate || null);
      setRegionId(regionId || null);
      setIsGraduated(graduated || null);
      setName_en(name_en || null);
      setName_ar(name_ar || null);
      setName_fr(name_fr || null);
    }
  }, [studentDataUpdate]);
  
  console.log("👾 ~ EditStudent ~ studentDataUpdate:", studentDataUpdate)

  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );
  const { data: nationalityData } =
    useGetAllNationalitysQuery(null);

  const { data: regionData } = useGetAllReginionIDQuery(null);
  const optionsRigon =
    regionData?.data?.map(
      (rigion: {
        cityName: any;
        countryName: any;
        regionName: any;
        regionId: any;
        name: any;
      }) => ({
        value: rigion.regionId,
        label: `${rigion.regionName} - ${rigion.cityName}`,
      }),
    ) || [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const [updateSudent, { isLoading }] = useUpdateStudentsMutation();
  const onSubmit = async (data: any) => {
    const formData = { ...data, religion: "OTHERS" }
    try {
      await updateSudent({ id: params.studentId, formData: formData }).unwrap();
      toast.success("Student Updated successfully");
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  if (loading)
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
        className={`${currentLanguage === "ar"
            ? booleanValue
              ? "lg:mr-[100px]"
              : "lg:mr-[270px]"
            : booleanValue
              ? "lg:ml-[100px]"
              : "lg:ml-[270px]"
          } mx-3 mt-5 grid h-[850px] items-center justify-center`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-10 grid items-center justify-center gap-5 rounded-xl bg-bgPrimary p-10 sm:w-[500px] md:w-[600px] lg:w-[750px] xl:w-[1000px]">
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              {/* Email */}
              <label
                htmlFor="email"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "البريد الإلكتروني"
                  : currentLanguage === "fr"
                    ? "Email"
                    : "Email"}
                <input
                  id="email"
                  type="email"
                  value={email || ""}
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* NID */}
              <label
                htmlFor="nid"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "الرقم الهوية"
                  : currentLanguage === "fr"
                    ? "NID"
                    : "NID"}
                <input
                  id="nid"
                  type="number"
                  value={nid || ""}
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("nid", { required: true })}
                />
                {errors.nid && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Gender */}
              <label
                htmlFor="gender"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "الجنس"
                  : currentLanguage === "fr"
                    ? "Sexe"
                    : "Gender"}
                <select
                  id="gender"
                  value={gender || ""}
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("gender", { required: true })}
                >
                  <option value="">
                    {currentLanguage === "en"
                      ? "Select gender"
                      : currentLanguage === "ar"
                        ? "اختر الجنس"
                        : "Sélectionner le genre"}
                  </option>
                  <option value="MALE">
                    {currentLanguage === "en" ? "Male" : "ذكر"}
                  </option>
                  <option value="FEMALE">
                    {currentLanguage === "en" ? "Female" : "أنثى"}
                  </option>
                </select>
                {errors.gender && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>
              <label
                htmlFor="graduated"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "خريج"
                  : currentLanguage === "fr"
                    ? "Diplômé"
                    : "Graduate"}
                <select
                  id="graduated"
                  // value={isGraduated || ""}
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("graduated", { required: true })}
                >
                  <option value="">
                    {currentLanguage === "en"
                      ? "Is Graduated ?"
                      : currentLanguage === "ar"
                        ? "هل هو خريج"
                        : "Est-ce que tu es diplômé ?"}
                  </option>
                  <option value="true">
                    {currentLanguage === "en" ? "Yes" : "نعم"}
                  </option>
                  <option value="false">
                    {currentLanguage === "en" ? "No" : "لا"}
                  </option>
                </select>
                {errors.gender && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Nationality */}
              <label
                htmlFor="nationality"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "جنسيتك"
                  : currentLanguage === "fr"
                    ? "Votre nationalité"
                    : "Your Nationality"}
                <select
                  value={nationality || ""}
                  id="nationality"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("nationality", { required: true })}
                >
                  <option value="">
                    {currentLanguage === "ar"
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
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Region */}
              <label
                htmlFor="regionId"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Region Id"
                  : currentLanguage === "ar"
                    ? "معرف المنطقة"
                    : currentLanguage === "fr"
                      ? "ID de la région"
                      : "Region Id"}{" "}
                {/* default */}
                <SearchableSelect
                  name="regionId"
                  control={control}
                  errors={errors}
                  options={optionsRigon}
                  currentLanguage={currentLanguage}
                  placeholder="Select Region"
                />
              </label>

              {/* Name (English) */}
              <label
                htmlFor="name_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "الاسم (إنجليزي)"
                  : currentLanguage === "fr"
                    ? "Nom (EN)"
                    : "Name (EN)"}
                <input
                  id="name_en"
                  type="text"
                  value={name_en || ""}
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("name_en", { required: true })}
                />
                {errors.name_en && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Name (Arabic) */}
              <label
                htmlFor="name_ar"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "الاسم (عربي)"
                  : currentLanguage === "fr"
                    ? "Nom (AR)"
                    : "Name (AR)"}
                <input
                  id="name_ar"
                  type="text"
                  value={name_ar || ""}
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("name_ar", { required: true })}
                />
                {errors.name_ar && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Name (French) */}
              <label
                htmlFor="name_fr"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "الاسم (فرنسي)"
                  : currentLanguage === "fr"
                    ? "Nom (FR)"
                    : "Name (FR)"}
                <input
                  id="name_fr"
                  type="text"
                  value={name_fr || ""}
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("name_fr", { required: true })}
                />
                {errors.name_fr && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* About */}
              <label
                htmlFor="about"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "About"
                  : currentLanguage === "ar"
                    ? "نبذة"
                    : "À propos"}
                <textarea
                  id="about"
                  value={about || ""}
                  className="h-[100px] w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("about")}
                />
                {errors.about && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : "هذا الحقل مطلوب"}
                  </span>
                )}
              </label>

              {/* Birth Date */}
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
                  value={dateOfBirth || ""}
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("birthDate", {
                    required: true,
                    validate: value => {
                      const today = new Date();
                      const birthDate = new Date(value);
                      const age = today.getFullYear() - birthDate.getFullYear();
                      const isOlderThanSix =
                        age > 6 ||
                        (age === 6 &&
                          today >=
                          new Date(
                            birthDate.setFullYear(today.getFullYear()),
                          ));
                      return isOlderThanSix;
                    },
                  })}
                />
                {errors.birthDate && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? errors.birthDate.type === "validate"
                        ? "The Student Must be older than 6"
                        : "This field is required"
                      : currentLanguage === "ar"
                        ? errors.birthDate.type === "validate"
                          ? "يجب أن يكون عمر الطالب أكبر من 6 سنوات"
                          : "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? errors.birthDate.type === "validate"
                            ? "L'étudiant doit avoir plus de 6 ans"
                            : "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
            </div>

            <div className="flex justify-center text-center">
              <button
                disabled={isLoading}
                type="submit"
                className="w-fit rounded-xl bg-primary px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
              >
                {isLoading
                  ? currentLanguage === "en"
                    ? "Adding..."
                    : currentLanguage === "ar"
                      ? "جارٍ الإضافة..."
                      : "Ajout en cours..."
                  : currentLanguage === "en"
                    ? "Update Student"
                    : currentLanguage === "ar"
                      ? "تعديل طالب"
                      : "Ajouter un étudiant"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditStudent;
