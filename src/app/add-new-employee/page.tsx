"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/spinner";
import { useCreateEmployeesMutation } from "@/features/User-Management/employeeApi";
import {
  useGetAllCountryCodeQuery,
  useGetAllNationalitysQuery,
  useGetAllReginionIDQuery,
} from "@/features/signupApi";
import { toast } from "react-toastify";
import BreadCrumbs from "@/components/BreadCrumbs";
import { useGetAllPositionsQuery } from "@/features/User-Management/driverApi";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import SearchableSelect from "@/components/select";
import PhoneNumberInput from "@/components/PhoneNumberInput";

const AddNewEmployee = () => {
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
      nameEn: "Employee",
      nameAr: "الموظفين",
      nameFr: "employés",
      href: "/employee",
    },
    {
      nameEn: "Add New Employee",
      nameAr: "إضافة موظف جديد",
      nameFr: "Ajouter un nouvel employé",
      href: "/add-new-employee",
    },
  ];
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const { data: nationalityData, isLoading: nationalityLoading } =
    useGetAllNationalitysQuery(null);
  const { data: countryCode, isLoading: isCountryCode } =
    useGetAllCountryCodeQuery(null);
  const { data: positionData, isLoading: isPosition } =
    useGetAllPositionsQuery(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [createEmployee, { isLoading }] = useCreateEmployeesMutation();
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
  const onSubmit = async (data: any) => {
    const formData = { ...data, religion: "OTHERS" };
    try {
      await createEmployee(formData).unwrap();
      toast.success("Employee created successfully");
    } catch {
      toast.error("Failed to create employee: ");
    }
  };

  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );

  if (loading || isCountryCode)
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
        } mx-[5px] grid h-[850px] items-center justify-center`}
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
                {currentLanguage === "ar"
                  ? "معلومات الموظف"
                  : currentLanguage === "fr"
                    ? "Informations sur l'employé"
                    : "Employee Information"}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="username"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
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
                    {currentLanguage === "ar"
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
                htmlFor="password"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
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
                    {currentLanguage === "ar"
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
                {currentLanguage === "ar"
                  ? "الرقم الهوية"
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
                    {currentLanguage === "ar"
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
                {currentLanguage === "ar"
                  ? "الجنس"
                  : currentLanguage === "fr"
                    ? "Sexe"
                    : "Gender"}

                <select
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
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
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
              <label
                htmlFor="about"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "حول"
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
                    {currentLanguage === "ar"
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
                {currentLanguage === "ar"
                  ? "تاريخ الميلاد"
                  : currentLanguage === "fr"
                    ? "Date de naissance"
                    : "Date Of Birth"}
                <input
                  id="birthDate"
                  type="date"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("birthDate", {
                    required: true,
                    validate: value => {
                      const today = new Date();
                      const birthDate = new Date(value);
                      const age = today.getFullYear() - birthDate.getFullYear();
                      const monthDiff = today.getMonth() - birthDate.getMonth();

                      // Adjust age if the birth date hasn't been reached yet this year
                      if (
                        monthDiff < 0 ||
                        (monthDiff === 0 &&
                          today.getDate() < birthDate.getDate())
                      ) {
                        return age > 20;
                      }

                      return age >= 20;
                    },
                  })}
                />
                {errors.birthDate && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? errors.birthDate.type === "validate"
                        ? "The Employee Must be older than 20"
                        : "This field is required"
                      : currentLanguage === "ar"
                        ? errors.birthDate.type === "validate"
                          ? "يجب أن يكون عمر الموظف أكبر من 20 عامًا"
                          : "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? errors.birthDate.type === "validate"
                            ? "L'employé doit avoir plus de 20 ans"
                            : "Ce champ est requis"
                          : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="qualification"
                className="mt-4 grid items-center font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "المؤهل"
                  : currentLanguage === "fr"
                    ? "Qualification"
                    : "Qualification"}
                <select
                  defaultValue=""
                  id="qualification"
                  {...register("qualification", { required: true })}
                  className="h-[55px] w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                >
                  <option selected value="">
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
                {errors.qualification && (
                  <span className="text-[18px] text-error">
                    {currentLanguage === "ar"
                      ? "هذا الحقل مطلوب"
                      : currentLanguage === "fr"
                        ? "Ce champ est requis"
                        : "This field is required"}
                  </span>
                )}
              </label>
              <label
                htmlFor="hireDate"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "تاريخ التوظيف"
                  : currentLanguage === "fr"
                    ? "Date d'embauche"
                    : "hireDate"}
                <input
                  id="hireDate"
                  type="date"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("hireDate", { required: true })}
                />
                {errors.hireDate && (
                  <span className="text-error">
                    {currentLanguage === "ar"
                      ? "هذا الحقل مطلوب"
                      : currentLanguage === "fr"
                        ? "Ce champ est requis"
                        : "This field is required"}
                  </span>
                )}
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <PhoneNumberInput
                countryCodeData={countryCode.data}
                currentLanguage="en"
                label="Your Phone Number"
                register={register}
                errors={errors}
                control={control}
              />
              <label
                htmlFor="positionId"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "رقم الوظيفة"
                  : currentLanguage === "fr"
                    ? "ID de poste"
                    : "positionId"}
                <select
                  defaultValue=""
                  id="positionId"
                  {...register("positionId", { required: true })}
                  className={`border ${errors.positionId ? "border-borderPrimary" : "border-borderPrimary"} h-full w-[400px] rounded-xl px-4 py-3 text-[18px] text-blackOrWhite outline-none max-[458px]:w-[350px]`}
                >
                  <option value="">
                    {currentLanguage === "en"
                      ? "Select Position Id"
                      : currentLanguage === "ar"
                        ? "اختر معرف الوظيفة"
                        : currentLanguage === "fr"
                          ? "Sélectionner l'ID de la position"
                          : "Select Region Id"}{" "}
                    {/* default */}
                  </option>
                  {positionData &&
                    positionData.data.content.map(
                      (
                        rigion: {
                          title: string;
                          id: string | number | readonly string[] | undefined;
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
                            | null
                            | undefined;
                        },
                        index: React.Key | null | undefined,
                      ) => (
                        <option key={index} value={rigion.id}>
                          {rigion.title}
                        </option>
                      ),
                    )}
                </select>
                {errors.positionId && (
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
                htmlFor="salary"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "ar"
                  ? "الراتب"
                  : currentLanguage === "fr"
                    ? "Salaire"
                    : "salary"}
                <input
                  id="salary"
                  type="number"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("salary", { required: true })}
                />
                {errors.salary && (
                  <span className="text-error">
                    {currentLanguage === "ar"
                      ? "هذا الحقل مطلوب"
                      : currentLanguage === "fr"
                        ? "Ce champ est requis"
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
                  ? currentLanguage === "ar"
                    ? "جاري الإضافة..."
                    : currentLanguage === "fr"
                      ? "Ajout en cours..."
                      : "Adding..."
                  : currentLanguage === "ar"
                    ? "إضافة موظف"
                    : currentLanguage === "fr"
                      ? "Ajouter un employé"
                      : "Add Employee"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewEmployee;
