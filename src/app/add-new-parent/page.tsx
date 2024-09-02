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

const AddNewParent = () => {
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
    } catch (err) {
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
    <div
      className={` ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mr-[5px] grid items-center justify-center`}
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
              Parent Information
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
            {/* Input fields for parent information */}
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
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
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
                <option value="">Select religion</option>
                <option value="MUSLIM">Muslim</option>
                <option value="CHRISTIAN">Christian</option>
                <option value="OTHERS">Others</option>
              </select>
              {errors.religion && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
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
                <option value="">Select Region Id</option>
                {rigiond &&
                  rigiond.data.map((region: any, index: number) => (
                    <option key={index} value={region.id}>
                      {region.name}
                    </option>
                  ))}
              </select>
              {errors.regionId && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="name_en"
              className="grid font-sans text-[18px] font-semibold"
            >
              Name EN
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
              htmlFor="name_ar"
              className="grid font-sans text-[18px] font-semibold"
            >
              Name AR
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
              Name FR
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
              htmlFor="occupation_en"
              className="grid font-sans text-[18px] font-semibold"
            >
              Occupation EN
              <input
                id="occupation_en"
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("occupation_en", { required: true })}
              />
              {errors.occupation_en && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="occupation_ar"
              className="grid font-sans text-[18px] font-semibold"
            >
              Occupation AR
              <input
                id="occupation_ar"
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("occupation_ar", { required: true })}
              />
              {errors.occupation_ar && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="occupation_fr"
              className="grid font-sans text-[18px] font-semibold"
            >
              Occupation FR
              <input
                id="occupation_fr"
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("occupation_fr", { required: true })}
              />
              {errors.occupation_fr && (
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
              htmlFor="schoolId"
              className="grid font-sans text-[18px] font-semibold"
            >
              school Id
              <input
                id="schoolId"
                type="schoolId"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("schoolId", { required: true })}
              />
              {errors.schoolId && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
            {/* Input fields for student information */}
            <label
              htmlFor="student_username"
              className="grid font-sans text-[18px] font-semibold"
            >
              Student Username
              <input
                id="student_username"
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("student_username", { required: true })}
              />
              {errors.student_username && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="student_email"
              className="grid font-sans text-[18px] font-semibold"
            >
              Student Email
              <input
                id="student_email"
                type="email"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("student_email", { required: true })}
              />
              {errors.student_email && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="student_password"
              className="grid font-sans text-[18px] font-semibold"
            >
              Student Password
              <input
                id="student_password"
                type="password"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("student_password", { required: true })}
              />
              {errors.student_password && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="student_nid"
              className="grid font-sans text-[18px] font-semibold"
            >
              Student NID
              <input
                id="student_nid"
                type="number"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("student_nid", { required: true })}
              />
              {errors.student_nid && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="student_gender"
              className="grid font-sans text-[18px] font-semibold"
            >
              Student Gender
              <select
                id="student_gender"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("student_gender", { required: true })}
              >
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              {errors.student_gender && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="student_birthDate"
              className="grid font-sans text-[18px] font-semibold"
            >
              Student Date Of Birth
              <input
                id="student_birthDate"
                type="date"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("student_birthDate", { required: true })}
              />
              {errors.student_birthDate && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="student_name_en"
              className="grid font-sans text-[18px] font-semibold"
            >
              Student Name EN
              <input
                id="student_name_en"
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("student_name_en", { required: true })}
              />
              {errors.student_name_en && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="student_name_ar"
              className="grid font-sans text-[18px] font-semibold"
            >
              Student Name AR
              <input
                id="student_name_ar"
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("student_name_ar", { required: true })}
              />
              {errors.student_name_ar && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="student_name_fr"
              className="grid font-sans text-[18px] font-semibold"
            >
              Student Name FR
              <input
                id="student_name_fr"
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("student_name_fr", { required: true })}
              />
              {errors.student_name_fr && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="student_about"
              className="grid font-sans text-[18px] font-semibold"
            >
              Student About
              <input
                id="student_about"
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("student_about", { required: true })}
              />
              {errors.student_about && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="relationshipToStudent"
              className="grid font-sans text-[18px] font-semibold"
            >
              Relationship To Student
              <input
                id="relationshipToStudent"
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("relationshipToStudent", { required: true })}
              />
              {errors.relationshipToStudent && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="studyLevel"
              className="grid font-sans text-[18px] font-semibold"
            >
              Study Level
              <input
                id="studyLevel"
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("studyLevel", { required: true })}
              />
              {errors.studyLevel && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="eduSystemId"
              className="grid font-sans text-[18px] font-semibold"
            >
              edu System Id
              <input
                id="eduSystemId"
                type="eduSystemId"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("eduSystemId", { required: true })}
              />
              {errors.eduSystemId && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label
              htmlFor="parentIdPhoto"
              className="grid font-sans text-[18px] font-semibold"
            >
              Parent ID Photo
              <input
                id="parentIdPhoto"
                type="file"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("parentIdPhoto")}
              />
            </label>
          </div>
          {/* File input fields */}
          <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
            <label
              htmlFor="studentIdPhoto"
              className="grid font-sans text-[18px] font-semibold"
            >
              Student ID Photo
              <input
                id="studentIdPhoto"
                type="file"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("studentIdPhoto")}
              />
            </label>
            <label
              htmlFor="studentProfilePhoto"
              className="grid font-sans text-[18px] font-semibold"
            >
              Student Profile Photo
              <input
                id="studentProfilePhoto"
                type="file"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("studentProfilePhoto")}
              />
            </label>
            <label
              htmlFor="studentCertificatesOfAchievement"
              className="grid font-sans text-[18px] font-semibold"
            >
              Student Certificates Of Achievement
              <input
                id="studentCertificatesOfAchievement"
                type="file"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                {...register("studentCertificatesOfAchievement")}
              />
            </label>
          </div>
          <div className="flex justify-center text-center">
            <button
              disabled={isLoading}
              type="submit"
              className="w-[180px] rounded-xl bg-[#3E5AF0] px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
            >
              {isLoading ? " Adding..." : "Add Parent"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewParent;
