"use client"
/* eslint-disable @next/next/no-img-element */
import { useGetAllCurrentUserQuery } from "@/features/dashboard/dashboardApi";
import Link from "next/link";

const Profile = () => {
    const { data: userData, error: userError, isLoading: userLoading } = useGetAllCurrentUserQuery(null);

    return (
        <>
            <div className="lg:ml-[270px] mt-7">
                <div className="grid w-full h-full bg-white rounded-xl p-7">
                    <div>
                        <div className="flex justify-left gap-5 text-[18px] font-semibold mb-5 ml-4">
                            <Link href="/profile" className="text-blue-500 underline">
                                My Profile
                            </Link>
                            <Link href="/profile/password">
                                Password
                            </Link>
                        </div>
                    </div>
                    <div className="border-2 border-gray-200 text-semibold rounded-xl p-5 flex justify-between w-full h-full">
                        <div className="flex items-center gap-2 text-[15px] text-black text-semibold">
                            <img src="/images/userr.png" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                            <span className="grid font-semibold ">
                                <p>Mostapha Taha</p>
                                <p>School manager</p>
                                <p>ID: <span className="text-gray-400">1385</span></p>
                            </span>
                        </div>
                    </div>
                    <div className="border-2 border-gray-200 text-semibold rounded-xl p-5 flex w-full h-full mt-5">
                        <div className="grid gap-2 w-full">
                            <div className="flex justify-between w-full">
                                <h1 className="text-[20px] font-bold">Admin Information</h1>
                                <div>
                                    <button className="flex gap-1 border border-gray-300 rounded-full px-3 py-1 text-gray-500 font-semibold">
                                        Edit
                                        <svg className="h-6 w-6 text-gray-500" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="grid justify-center">
                                <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                                    <label htmlFor="name" className="grid text-[18px] font-sans font-semibold">
                                        First Name
                                        <input id="name" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                    </label>
                                    <label htmlFor="code" className="grid text-[18px] font-sans font-semibold">
                                        Last Name
                                        <input id="code" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                    </label>
                                    <label htmlFor="about" className="grid text-[18px] font-sans font-semibold">
                                        Age
                                        <input id="about" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                    </label>
                                    <label htmlFor="about" className="grid text-[18px] font-sans font-semibold">
                                        Gender
                                        <input id="about" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                    </label>
                                </div>
                                <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                                    <label htmlFor="Version" className="grid text-[18px] font-sans font-semibold">
                                        ID
                                        <input id="Version" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                    </label>
                                    <label htmlFor="Expiration" className="grid text-[18px] font-sans font-semibold">
                                        Date Of Birth
                                        <input id="Expiration" type="date" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                    </label>
                                    <label htmlFor="Version" className="grid text-[18px] font-sans font-semibold">
                                        Address
                                        <input id="Version" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                    </label>
                                    <label htmlFor="Initial" className="grid text-[18px] font-sans font-semibold">
                                        Email
                                        <input id="Initial" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                    </label>
                                </div>
                                <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                                    <label htmlFor="name" className="grid text-[18px] font-sans font-semibold">
                                        Mobile
                                        <input id="name" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                    </label>
                                    <label htmlFor="code" className="grid text-[18px] font-sans font-semibold">
                                        Password
                                        <input id="code" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;