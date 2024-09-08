"use client";
import Spinner from "@/components/spinner";
/* eslint-disable @next/next/no-img-element */
import { useGetAllCurrentUserQuery } from "@/features/dashboard/dashboardApi";
import { useUpdateCurrentUserMutation } from "@/features/User-Management/employeeApi";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Profile = () => {
  const { data: userData, isLoading: userLoading } =
    useGetAllCurrentUserQuery(null);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Use effect to set default values when userData is available
  useEffect(() => {
    if (userData) {
      setValue("username", userData.data.username);
      setValue("email", userData.data.email);
      setValue("nid", userData.data.nid);
      setValue("about", userData.data.about);
      setValue("gender", userData.data.gender);
      setValue("nationality", userData.data.nationality);
      setValue("religion", userData.data.religion);
      setValue("birthDate", userData.data.birthDate);
      setValue("regionId", userData.data.regionId);
      setValue("phone", userData.data.phoneNumber);
    }
  }, [userData, setValue]);

  const [UpdateUser, { isLoading }] = useUpdateCurrentUserMutation();

  const onSubmit = async (data: any) => {
    try {
      await UpdateUser(data).unwrap();
      toast.success("User Updated successfully");
    } catch (err) {
      toast.error("Failed to Update User");
    }
  };

  if (userLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="mt-7 lg:ml-[270px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid h-full w-full rounded-xl bg-bgPrimary p-7">
            <div>
              <div className="justify-left mb-5 ml-4 flex gap-5 text-[18px] font-semibold">
                <Link href="/profile" className="text-primary underline">
                  My Profile
                </Link>
                <Link href="/profile/password">Password</Link>
              </div>
            </div>
            <div className="text-semibold flex h-full w-full justify-between rounded-xl border-2 border-borderPrimary bg-bgPrimary p-5">
              <div className="text-semibold flex items-center gap-2 text-[15px] text-textPrimary">
                <img
                  src="/images/userr.png"
                  className="mr-2 h-[40px] w-[40px] rounded-full"
                  alt="#"
                />
                <span className="grid font-semibold">
                  <p>{userData.data?.username || "Username"}</p>
                  <p>{userData.data?.role || "Role"}</p>
                  <p>
                    ID:{" "}
                    <span className="text-textSecondary">
                      {userData.data?.id}
                    </span>
                  </p>
                </span>
              </div>
            </div>
            <div className="text-semibold mt-5 flex h-full w-full rounded-xl border-2 border-borderPrimary bg-bgPrimary p-5">
              <div className="grid w-full gap-2">
                <div className="flex w-full justify-between">
                  <h1 className="text-[20px] font-bold">Admin Information</h1>
                  <div>
                    <button
                      type="submit"
                      className="flex gap-1 rounded-full border border-borderPrimary px-3 py-1 font-semibold text-textPrimary"
                    >
                      {isLoading ? "Saving..." : "Save"}
                      <svg
                        className="h-6 w-6 text-gray-500"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                  <label className="grid font-sans text-[18px] font-semibold">
                    Username
                    <input
                      {...register("username")}
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label className="grid font-sans text-[18px] font-semibold">
                    Email
                    <input
                      {...register("email")}
                      type="email"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label className="grid font-sans text-[18px] font-semibold">
                    NID
                    <input
                      {...register("nid")}
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label className="grid font-sans text-[18px] font-semibold">
                    About
                    <input
                      {...register("about")}
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label className="grid font-sans text-[18px] font-semibold">
                    Gender
                    <input
                      {...register("gender")}
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label className="grid font-sans text-[18px] font-semibold">
                    Nationality
                    <input
                      {...register("nationality")}
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label className="grid font-sans text-[18px] font-semibold">
                    Phone
                    <input
                      {...register("phone")}
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label className="grid font-sans text-[18px] font-semibold">
                    Birth Date
                    <input
                      {...register("birthDate")}
                      type="date"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
