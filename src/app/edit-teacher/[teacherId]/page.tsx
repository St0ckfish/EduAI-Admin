"use client";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import BreadCrumbs from "@/components/BreadCrumbs";
import Spinner from "@/components/spinner";
import { useGetTeacherByIdQuery, useUpdateTeachersMutation } from "@/features/User-Management/teacherApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetAllNationalitysQuery, useGetAllReginionIDQuery } from "@/features/signupApi";
import SearchableSelect from "@/components/select";

interface ViewTeacherProps {
  params: {
    teacherId: string;
  };
}

const EditTeacher: React.FC<ViewTeacherProps> = ({ params }) => {
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Teacher",
      nameAr: "معلم",
      nameFr: "Enseignant",
      href: "/teacher",
    },
    {
      nameEn: "Edit Teacher",
      nameAr: "تعديل المعلم",
      nameFr: "Modifier l'enseignant",
      href: `/edit-teacher/${params.teacherId}`,
    },
  ];

  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language
  );
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const { data, isLoading } = useGetTeacherByIdQuery(params.teacherId);
  const [updateTeacher, { isLoading: isUpdating }] = useUpdateTeachersMutation();
  const { data: nationalityData, isLoading: nationalityLoading } =
    useGetAllNationalitysQuery(null);
    const { data: rigiond } = useGetAllReginionIDQuery(null);
  const optionsRigon =
  rigiond?.data?.map(
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
    setValue,
    formState: { isSubmitting },
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      nid: "",
      about: "",
      gender: "",
      nationality: "",
      religion: "",
      birthDate: "",
      regionId: 0,
      name_en: "",
      name_ar: "",
      name_fr: "",
      number: "",
      qualification: "",
      subject: "",
    },
  });

  useEffect(() => {
    if (data && data.success) {
      const teacher = data.data;
      setValue("email", teacher.email || "");
      setValue("nid", teacher.nid || "");
      setValue("about", teacher.about || "");
      setValue("gender", teacher.gender || "");
      setValue("nationality", teacher.nationality || "");
      setValue("religion", teacher.religion || "");
      setValue("birthDate", teacher.birthDate || "");
      setValue("regionId", teacher.regionId || 0);
      setValue("name_en", teacher.name || "");
      setValue("name_ar", "");
      setValue("name_fr", ""); 
      setValue("number", teacher.number || "");
      setValue("qualification", teacher.qualification || "");
      setValue("subject", "");
    }
  }, [data, setValue]);

  const onSubmit = async (formData: any) => {
    const data = {...formData, religion: "OTHER"};
    try {
      await updateTeacher({ id: params.teacherId, formData: data }).unwrap();
      toast.success(
        currentLanguage === "ar"
          ? "تم تحديث المعلم بنجاح"
          : currentLanguage === "fr"
          ? "Enseignant mis à jour avec succès"
          : "Teacher updated successfully"
      );
    } catch (err) {
      toast.error(
        currentLanguage === "ar"
          ? "فشل في تحديث المعلم"
          : currentLanguage === "fr"
          ? "Échec de la mise à jour de l'enseignant"
          : "Failed to update teacher"
      );
    }
  };

  if (loading || isLoading || isUpdating || isSubmitting || nationalityLoading)
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
        className={`${
          currentLanguage === "ar"
            ? booleanValue
              ? "lg:mr-[100px]"
              : "lg:mr-[270px]"
            : booleanValue
            ? "lg:ml-[100px]"
            : "lg:ml-[270px]"
        } mx-3 mt-5 grid h-[850px] items-center justify-center`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid  items-center justify-center gap-5 rounded-xl bg-bgPrimary p-10 sm:w-[500px] md:w-[600px] lg:w-[750px]  xl:w-[1000px]">
            <div className="flex items-center justify-start gap-2">
              <h1 className="font-sans text-[22px] font-semibold">
                {currentLanguage === "ar"
                  ? "معلومات المعلم"
                  : currentLanguage === "fr"
                  ? "Informations sur l'enseignant"
                  : "Teacher Information"}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
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
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-error">
                    {currentLanguage === "ar"
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
                {currentLanguage === "ar"
                  ? "الاسم (إنجليزي)"
                  : currentLanguage === "fr"
                    ? "Nom (EN)"
                    : "Name (EN)"}
                <input
                  id="name_en"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("name_en", { required: true })}
                />
                {errors.name_en && (
                  <span className="text-error">
                    {currentLanguage === "ar"
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
                {currentLanguage === "ar"
                  ? "الاسم (عربي)"
                  : currentLanguage === "fr"
                    ? "Nom (AR)"
                    : "Name (AR)"}
                <input
                  id="name_ar"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("name_ar", { required: true })}
                />
                {errors.name_ar && (
                  <span className="text-error">
                    {currentLanguage === "ar"
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
                {currentLanguage === "ar"
                  ? "الاسم (فرنسي)"
                  : currentLanguage === "fr"
                    ? "Nom (FR)"
                    : "Name (FR)"}
                <input
                  id="name_fr"
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("name_fr", { required: true })}
                />
                {errors.name_fr && (
                  <span className="text-error">
                    {currentLanguage === "ar"
                      ? "هذا الحقل مطلوب"
                      : currentLanguage === "fr"
                        ? "Ce champ est requis"
                        : "This field is required"}
                  </span>
                )}
              </label>
              <label htmlFor="nid" className="grid font-sans text-[18px] font-semibold">
                {currentLanguage === "ar" ? "الرقم التعريفي" : currentLanguage === "fr" ? "NID" : "NID"}
                <input
                  id="nid"
                  type="text"
                  {...register("nid")}
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
              <label htmlFor="about" className="grid font-sans text-[18px] font-semibold">
                {currentLanguage === "ar" ? "عن" : currentLanguage === "fr" ? "À propos" : "About"}
                <input
                  id="about"
                  type="text"
                  {...register("about")}
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
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
                defaultValue=""
                  id="gender"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("gender", { required: true })}
                >
                  <option selected value="">
                    {currentLanguage === "ar"
                      ? "اختر الجنس"
                      : currentLanguage === "fr"
                        ? "Sélectionner le sexe"
                        : "Select gender"}
                  </option>
                  <option value="MALE">
                    {currentLanguage === "ar"
                      ? "ذكر"
                      : currentLanguage === "fr"
                        ? "Homme"
                        : "Male"}
                  </option>
                  <option value="FEMALE">
                    {currentLanguage === "ar"
                      ? "أنثى"
                      : currentLanguage === "fr"
                        ? "Femme"
                        : "Female"}
                  </option>
                </select>
                {errors.gender && (
                  <span className="text-error">
                    {currentLanguage === "ar"
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
                {currentLanguage === "ar"
                  ? "جنسيتك"
                  : currentLanguage === "fr"
                    ? "Votre nationalité"
                    : "Your Nationality"}
                <select
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
                    {currentLanguage === "ar"
                      ? "هذا الحقل مطلوب"
                      : currentLanguage === "fr"
                        ? "Ce champ est requis"
                        : "This field is required"}
                  </span>
                )}
              </label>
              <label htmlFor="birthDate" className="grid font-sans text-[18px] font-semibold">
                {currentLanguage === "ar" ? "تاريخ الميلاد" : currentLanguage === "fr" ? "Date de naissance" : "Birth Date"}
                <input
                  id="birthDate"
                  type="date"
                  {...register("birthDate")}
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
              <label htmlFor="number" className="grid font-sans text-[18px] font-semibold">
                {currentLanguage === "ar" ? "رقم الهاتف" : currentLanguage === "fr" ? "Numéro de téléphone" : "Phone Number"}
                <input
                  id="number"
                  type="text"
                  {...register("number")}
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
              <label htmlFor="qualification" className="grid font-sans text-[18px] font-semibold">
                {currentLanguage === "ar" ? "المؤهلات" : currentLanguage === "fr" ? "Qualifications" : "Qualifications"}
                <select
                  defaultValue=""
                  id="qualification"
                  {...register("qualification", { required: true })}
                  className="h-[55px] w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                >
                  <option value="">
                    {currentLanguage === "ar"
                      ? "اختر المؤهل"
                      : currentLanguage === "fr"
                      ? "Sélectionner la qualification"
                      : "Select qualification"}
                  </option>
                  <option value="HIGH_SCHOOL_DIPLOMA">
                    {currentLanguage === "ar"
                      ? "دبلوم المدرسة الثانوية"
                      : currentLanguage === "fr"
                      ? "Diplôme de lycée"
                      : "High School Diploma"}
                  </option>
                  <option value="MASTER_DEGREE">
                    {currentLanguage === "ar"
                      ? "درجة الماجستير"
                      : currentLanguage === "fr"
                      ? "Master"
                      : "Master Degree"}
                  </option>
                  <option value="BACHELOR_DEGREE">
                    {currentLanguage === "ar"
                      ? "درجة البكالوريوس"
                      : currentLanguage === "fr"
                      ? "Licence"
                      : "Bachelor Degree"}
                  </option>
                  <option value="DOCTORATE_DEGREE">
                    {currentLanguage === "ar"
                      ? "درجة الدكتوراه"
                      : currentLanguage === "fr"
                      ? "Doctorat"
                      : "Doctorate Degree"}
                  </option>
                </select>
              </label>
              <label htmlFor="subject" className="grid font-sans text-[18px] font-semibold">
                {currentLanguage === "ar" ? "المادة" : currentLanguage === "fr" ? "Sujet" : "Subject"}
                <input
                  id="subject"
                  type="text"
                  {...register("subject")}
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
              </label>
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
            </div>
            <div className="flex justify-center text-center">
              <button
                type="submit"
                className="w-[140px] rounded-xl bg-primary px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
              >
                {currentLanguage === "ar"
                  ? "تعديل المعلم"
                  : currentLanguage === "fr"
                  ? "Modifier l'enseignant"
                  : "Edit Teacher"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditTeacher;
