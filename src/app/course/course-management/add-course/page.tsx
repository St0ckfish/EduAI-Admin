"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/spinner";
import { useCreateCoursesMutation } from "@/features/Acadimic/courseApi";
import {
  useGetAllLevelsQuery,
  useGetAllRegistrationsQuery,
  useGetAllLanguagesQuery,
} from "@/features/signupApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { useGetAllCountrysQuery } from "@/features/dashboard/dashboardApi";
import BreadCrumbs from "@/components/BreadCrumbs";

const AddCourse = () => {
  const breadcrumbs = [
    {
      nameEn: "Academic",
      nameAr: "أكاديمي",
      nameFr: "Académique",
      href: "/",
    },
    {
      nameEn: "Course",
      nameAr: "الدورة",
      nameFr: "Cours",
      href: "/course",
    },
    {
      nameEn: "Course Management",
      nameAr: "إدارة الدورات",
      nameFr: "Gestion des cours",
      href: "/course/course-management",
    },
    {
      nameEn: "Add Course",
      nameAr: "إضافة دورة",
      nameFr: "Ajouter un cours",
      href: "/course/course-management/add-course",
    },

  ];
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: CountryData, isLoading: CountryLoading } =
    useGetAllCountrysQuery(null);
  const { data: LevelData, isLoading: LevelLoading } =
    useGetAllLevelsQuery(null);
  const { data: RegData, isLoading: RegLoading } =
    useGetAllRegistrationsQuery(null);
  const { data: LangData, isLoading: LangLoading } =
    useGetAllLanguagesQuery(null);

  useEffect(() => {
    if (CountryData) {
      console.log("CountryData Data:", CountryData);
    }
    if (LevelData) {
      console.log("LevelData Data:", LevelData);
    }
    if (RegData) {
      console.log("RegData Data:", RegData);
    }
    if (LangData) {
      console.log("LangData Data:", LangData);
    }
  }, [CountryData, LevelData, RegData, LangData]);

  const [createCourse, { isLoading }] = useCreateCoursesMutation();

  const onSubmit = async (data: any) => {
    try {
      await createCourse(data).unwrap();
      toast.success("Course created successfully");
    } catch (err) {
      toast.error("Failed to create Course");
    }
  };

  if (CountryLoading || LevelLoading || RegLoading || LangLoading)
    return (
      <div className="grid h-screen grid-cols-2 items-center justify-center bg-bgPrimary duration-300 ease-in max-[1040px]:grid-cols-1">
        <Spinner />
      </div>
    );
  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="mt-[40px] mr-[5px] grid h-[850px] items-center justify-center lg:ml-[270px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid items-center justify-center gap-5 rounded-xl bg-bgPrimary p-10 sm:w-[500px] md:w-[600px] lg:w-[750px] xl:w-[1000px]">
            <div className="flex items-center justify-start gap-2">
              <svg
                className="h-6 w-6 font-bold text-secondary group-hover:text-primary"
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
                <line x1="3" y1="21" x2="21" y2="21" />{" "}
                <line x1="3" y1="10" x2="21" y2="10" />{" "}
                <polyline points="5 6 12 3 19 6" />{" "}
                <line x1="4" y1="10" x2="4" y2="21" />{" "}
                <line x1="20" y1="10" x2="20" y2="21" />{" "}
                <line x1="8" y1="14" x2="8" y2="17" />{" "}
                <line x1="12" y1="14" x2="12" y2="17" />{" "}
                <line x1="16" y1="14" x2="16" y2="17" />
              </svg>
              <h1 className="font-sans text-[22px] font-semibold">
                Course Information
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="name"
                className="grid font-sans text-[18px] font-semibold"
              >
                Name (en)
                <input
                  id="name"
                  {...register("name_en", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.name_en && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="name"
                className="grid font-sans text-[18px] font-semibold"
              >
                Name (ar)
                <input
                  id="name"
                  {...register("name_ar", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.name_ar && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="name"
                className="grid font-sans text-[18px] font-semibold"
              >
                Name (fr)
                <input
                  id="name"
                  {...register("name_fr", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.name_fr && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="name"
                className="grid font-sans text-[18px] font-semibold"
              >
                Description (en)
                <input
                  id="name"
                  {...register("description_en", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.description_en && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="name"
                className="grid font-sans text-[18px] font-semibold"
              >
                Description (ar)
                <input
                  id="name"
                  {...register("description_ar", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.description_ar && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="name"
                className="grid font-sans text-[18px] font-semibold"
              >
                Description (fr)
                <input
                  id="name"
                  {...register("description_fr", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.description_fr && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="countryId"
                className="grid text-start font-sans text-[15px] font-semibold text-blackOrWhite"
              >
                Country
                <select
                  defaultValue=""
                  id="countryId"
                  {...register("countryId")}
                  className={`border ${errors.countryId ? "border-warning" : "border-borderPrimary"} h-full w-[400px] rounded-xl px-4 py-3 text-sm text-blackOrWhite outline-none max-[458px]:w-[350px]`}
                >
                  <option selected value="">
                    Select Country{" "}
                  </option>
                  {CountryData &&
                    Object.entries(CountryData.data).map(([key, value]) => (
                      <option key={String(value)} value={key}>
                        {String(value)}
                      </option>
                    ))}
                </select>
                {errors.countryId && (
                  <span className="text-[13px] text-error">
                    Country is Required
                  </span>
                )}
              </label>
              <label
                htmlFor="level"
                className="grid text-start font-sans text-[15px] font-semibold text-blackOrWhite"
              >
                Study Level
                <select
                  defaultValue=""
                  id="level"
                  {...register("level", { required: true })}
                  className={`border ${errors.level ? "border-warning" : "border-borderPrimary"} h-full w-[400px] rounded-xl px-4 py-3 text-sm text-blackOrWhite outline-none max-[458px]:w-[350px]`}
                >
                  <option selected value="">
                    Select Study Level{" "}
                  </option>
                  {LevelData &&
                    Object.entries(LevelData.data).map(([key, value]) => (
                      <option key={String(value)} value={key}>
                        {String(value)}
                      </option>
                    ))}
                </select>
                {errors.level && (
                  <span className="text-[13px] text-error">
                    Study Level is Required
                  </span>
                )}
              </label>
              <label
                htmlFor="registrationType"
                className="grid text-start font-sans text-[15px] font-semibold text-blackOrWhite"
              >
                Registration
                <select
                  defaultValue=""
                  id="registrationType"
                  {...register("registrationType", { required: true })}
                  className={`border ${errors.registrationType ? "border-warning" : "border-borderPrimary"} h-full w-[400px] rounded-xl px-4 py-3 text-sm text-blackOrWhite outline-none max-[458px]:w-[350px]`}
                >
                  <option selected value="">
                    Select Registration{" "}
                  </option>
                  {RegData &&
                    Object.entries(RegData.data).map(([key, value]) => (
                      <option key={String(value)} value={key}>
                        {String(value)}
                      </option>
                    ))}
                </select>
                {errors.registrationType && (
                  <span className="text-[13px] text-error">
                    Registration is Required
                  </span>
                )}
              </label>
              <label
                htmlFor="language"
                className="grid text-start font-sans text-[15px] font-semibold text-blackOrWhite"
              >
                Language
                <select
                  defaultValue=""
                  id="language"
                  {...register("language", { required: true })}
                  className={`border ${errors.language ? "border-warning" : "border-borderPrimary"} h-full w-[400px] rounded-xl px-4 py-3 text-sm text-blackOrWhite outline-none max-[458px]:w-[350px]`}
                >
                  <option selected value="">
                    Select Language{" "}
                  </option>
                  {LangData &&
                    Object.entries(LangData.data).map(([key, value]) => (
                      <option key={String(value)} value={key}>
                        {String(value)}
                      </option>
                    ))}
                </select>
                {errors.language && (
                  <span className="text-[13px] text-error">
                    Language is Required
                  </span>
                )}
              </label>
              <label
                htmlFor="code"
                className="grid font-sans text-[18px] font-semibold"
              >
                Code
                <input
                  id="code"
                  {...register("code", { required: true })}
                  type="number"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.code && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="code"
                className="grid font-sans text-[18px] font-semibold"
              >
                EDU System Id
                <input
                  id="eduSystemId"
                  {...register("eduSystemId", { required: true })}
                  type="number"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.eduSystemId && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
            </div>

            <div className="flex justify-center text-center">
              {isLoading ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="w-[140px] rounded-xl bg-primary px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
                >
                  Add Course
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCourse;
