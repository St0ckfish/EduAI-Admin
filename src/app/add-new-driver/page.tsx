"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/spinner";
import { useCreateDriversMutation } from "@/features/User-Management/driverApi";
import {
  useGetAllNationalitysQuery,
  useGetAllReginionIDQuery,
} from "@/features/signupApi";
import { toast } from "react-toastify";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";

const AddNewDriver = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  const { data: nationalityData, isLoading: nationalityLoading } =
    useGetAllNationalitysQuery(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createDriver, { isLoading }] = useCreateDriversMutation();
  const { data: rigiond } = useGetAllReginionIDQuery(null);

  const onSubmit = async (data: any) => {
    try {
      await createDriver(data).unwrap();
      toast.success("Driver created successfully");
    } catch (err) {
      toast.error(
        "Failed to create Driver: you may enter the password incorrectly ",
      );
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
      <div
        className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} ml-7 mt-12 flex-wrap text-[18px] max-[550px]:text-[15px]`}
      >
        <Link
          className="font-semibold text-[#526484] hover:text-blue-400 hover:underline"
          href="/"
        >
          {currentLanguage === "en"
            ? "Administration"
            : currentLanguage === "ar"
              ? "الإدارة"
              : currentLanguage === "fr"
                ? "Administration"
                : "Administration"}{" "}
          {/* Default to English */}
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: "rgba(82, 100, 132, 1)" }}
        >
          <path d="M10.707 17.707L16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
        <Link
          className="font-semibold text-[#526484] hover:text-blue-400 hover:underline"
          href="/user-management"
        >
          {currentLanguage === "en"
            ? "User Management"
            : currentLanguage === "ar"
              ? "إدارة المستخدمين"
              : currentLanguage === "fr"
                ? "Gestion des utilisateurs"
                : "User Management"}{" "}
          {/* Default to English */}
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: "rgba(82, 100, 132, 1)" }}
        >
          <path d="M10.707 17.707L16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
        <Link
          className="font-semibold text-[#526484] hover:text-blue-400 hover:underline"
          href="/driver"
        >
          {currentLanguage === "en"
            ? "Driver"
            : currentLanguage === "ar"
              ? "السائق"
              : currentLanguage === "fr"
                ? "Chauffeur"
                : "Driver"}{" "}
          {/* Default to English */}
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: "rgba(82, 100, 132, 1)" }}
        >
          <path d="M10.707 17.707L16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
        <Link
          className="font-semibold text-[#526484] hover:text-blue-400 hover:underline"
          href="/add-new-driver"
        >
          {currentLanguage === "en"
            ? "Add Driver"
            : currentLanguage === "ar"
              ? "إضافة سائق"
              : currentLanguage === "fr"
                ? "Ajouter un chauffeur"
                : "Add Driver"}{" "}
          {/* Default to English */}
        </Link>
      </div>
      <div
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mr-[5px] grid h-[850px] items-center justify-center`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-10 grid items-center justify-center gap-5 rounded-xl bg-white p-10 sm:w-[500px] md:w-[600px] lg:w-[750px] xl:w-[1000px]">
            <div className="flex items-center justify-start gap-2">
              <svg
                className="h-6 w-6 font-bold text-[#526484] group-hover:text-[#3e5af0]"
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
                Driver Information
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="username"
                className="grid font-sans text-[18px] font-semibold"
              >
                Username
                <input
                  id="username"
                  type="text"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="email"
                className="grid font-sans text-[18px] font-semibold"
              >
                Email
                <input
                  id="email"
                  type="email"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="password"
                className="grid font-sans text-[18px] font-semibold"
              >
                Password
                <input
                  id="password"
                  type="password"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="nid"
                className="grid font-sans text-[18px] font-semibold"
              >
                NID
                <input
                  id="nid"
                  type="number"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("nid", { required: true })}
                />
                {errors.nid && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="gender"
                className="grid font-sans text-[18px] font-semibold"
              >
                Gender
                <select
                  id="gender"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("gender", { required: true })}
                >
                  <option selected value="">
                    Select gender{" "}
                  </option>
                  <option value="MALE">Male </option>
                  <option value="FEMALE">Female </option>
                </select>
                {errors.gender && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="religion"
                className="grid font-sans text-[18px] font-semibold"
              >
                Religion
                <select
                  id="religion"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("religion", { required: true })}
                >
                  <option selected value="">
                    Select religion{" "}
                  </option>
                  <option value="MUSLIM">Muslim </option>
                  <option value="CHRISTIAN">Christian </option>
                  <option value="OTHERS">Others </option>
                </select>
                {errors.religion && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="nationality"
                className="grid font-sans text-[18px] font-semibold"
              >
                Your Nationality
                <select
                  id="nationality"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("nationality", { required: true })}
                >
                  <option value="">Select Nationality</option>
                  {nationalityData &&
                    Object.entries(nationalityData.data).map(([key, value]) => (
                      <option key={key} value={key}>
                        {String(value)}
                      </option>
                    ))}
                </select>
                {errors.nationality && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="regionId"
                className="grid font-sans text-[18px] font-semibold"
              >
                RegionId
                <select
                  defaultValue=""
                  id="regionId"
                  {...register("regionId", { required: true })}
                  className={`border ${errors.regionId ? "border-[#d74f41]" : "border-zinc-300"} h-full w-[400px] rounded-xl px-4 py-3 text-[18px] text-[#000000] outline-none max-[458px]:w-[350px]`}
                >
                  <option selected value="">
                    Select Region Id{" "}
                  </option>
                  {rigiond &&
                    rigiond.data.map(
                      (
                        rigion: {
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
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="name_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                Name (EN)
                <input
                  id="name_en"
                  type="text"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("name_en", { required: true })}
                />
                {errors.name_en && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="name_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                Name (AR)
                <input
                  id="name_ar"
                  type="text"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("name_ar", { required: true })}
                />
                {errors.name_ar && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="name_fr"
                className="grid font-sans text-[18px] font-semibold"
              >
                Name (FR)
                <input
                  id="name_fr"
                  type="text"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("name_fr", { required: true })}
                />
                {errors.name_fr && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="about"
                className="grid font-sans text-[18px] font-semibold"
              >
                About
                <input
                  id="about"
                  type="text"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("about", { required: true })}
                />
                {errors.about && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="birthDate"
                className="grid font-sans text-[18px] font-semibold"
              >
                Date Of Birth
                <input
                  id="birthDate"
                  type="date"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("birthDate", { required: true })}
                />
                {errors.birthDate && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="qualification"
                className="mt-4 grid items-center font-sans text-[18px] font-semibold"
              >
                <select
                  defaultValue=""
                  id="qualification"
                  {...register("qualification", { required: true })}
                  className="h-[55px] w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                >
                  <option selected value="">
                    Select religion{" "}
                  </option>
                  <option value="HIGH_SCHOOL_DIPLOMA">
                    High School Diploma{" "}
                  </option>
                  <option value="MASTER_DEGREE">Master Degree </option>
                  <option value="BACHELOR_DEGREE">Bachelor Degree </option>
                  <option value="DOCTORATE_DEGREE">Doctorate Degree </option>
                </select>
                {errors.qualification && (
                  <span className="text-[18px] text-[#e81123]">
                    Qualification is Required
                  </span>
                )}
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="hireDate"
                className="grid font-sans text-[18px] font-semibold"
              >
                hireDate
                <input
                  id="hireDate"
                  type="date"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("hireDate", { required: true })}
                />
                {errors.hireDate && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="number"
                className="grid font-sans text-[18px] font-semibold"
              >
                Mobile
                <input
                  id="number"
                  type="number"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("number", { required: true })}
                />
                {errors.number && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="positionId"
                className="grid font-sans text-[18px] font-semibold"
              >
                Position Id
                <input
                  id="positionId"
                  type="number"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("positionId", { required: true })}
                />
                {errors.positionId && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="salary"
                className="grid font-sans text-[18px] font-semibold"
              >
                Salary
                <input
                  id="salary"
                  type="number"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                  {...register("salary", { required: true })}
                />
                {errors.salary && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
            </div>
            <div className="flex justify-center text-center">
              <button
                disabled={isLoading}
                type="submit"
                className="w-[180px] rounded-xl bg-[#3E5AF0] px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
              >
                {isLoading ? " Adding..." : "Add Driver"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewDriver;
