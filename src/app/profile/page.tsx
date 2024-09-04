"use client";
/* eslint-disable @next/next/no-img-element */
import { useGetAllCurrentUserQuery } from "@/features/dashboard/dashboardApi";
import Link from "next/link";

const Profile = () => {
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useGetAllCurrentUserQuery(null);

  return (
    <>
      <div className="mt-7 lg:ml-[270px]">
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
                <p>Mostapha Taha</p>
                <p>School manager</p>
                <p>
                  ID: <span className="text-textSecondary">1385</span>
                </p>
              </span>
            </div>
          </div>
          <div className="text-semibold mt-5 flex h-full w-full rounded-xl border-2 border-borderPrimary bg-bgPrimary p-5">
            <div className="grid w-full gap-2">
              <div className="flex w-full justify-between">
                <h1 className="text-[20px] font-bold">Admin Information</h1>
                <div>
                  <button className="flex gap-1 rounded-full border border-borderPrimary px-3 py-1 font-semibold text-textPrimary">
                    Edit
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
                      {" "}
                      <path d="M12 20h9" />{" "}
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid justify-center">
                <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                  <label
                    htmlFor="name"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    First Name
                    <input
                      id="name"
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label
                    htmlFor="code"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    Last Name
                    <input
                      id="code"
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label
                    htmlFor="about"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    Age
                    <input
                      id="about"
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label
                    htmlFor="about"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    Gender
                    <input
                      id="about"
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                  <label
                    htmlFor="Version"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    ID
                    <input
                      id="Version"
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label
                    htmlFor="Expiration"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    Date Of Birth
                    <input
                      id="Expiration"
                      type="date"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label
                    htmlFor="Version"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    Address
                    <input
                      id="Version"
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label
                    htmlFor="Initial"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    Email
                    <input
                      id="Initial"
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                  <label
                    htmlFor="name"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    Mobile
                    <input
                      id="name"
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label
                    htmlFor="code"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    Password
                    <input
                      id="code"
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
