"use client";
import Link from "next/link";
import { useGetAllClasssQuery } from "@/features/Infrastructure/classApi";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import Spinner from "@/components/spinner";
import { useEffect, useState } from "react";

const Infrastructure = () => {
    type Class = Record<string, any>;
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const { data, error, isLoading } = useGetAllClasssQuery(null);
    const [search, setSearch] = useState("");


    useEffect(() => {
        if (data) console.log("Response Data:", data);
        if (error) console.log("Error:", error);
    }, [data, error]);

    if (isLoading)
        return (
            <div className="h-screen w-full justify-center items-center flex ">
                <Spinner />
            </div>
        );
    return (
        <>
            <div className={`flex justify-between ${booleanValue ? "lg:ml-[150px]" : "lg:ml-[320px]"} lg:mr-[40px] max-[502px]:grid max-[502px]:justify-center text-center mt-16`}>
                <div className="mb-3">
                    <label htmlFor="icon" className="sr-only">
                        Search
                    </label>
                    <div className="relative min-w-72 md:min-w-80">
                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                            <svg
                                className="flex-shrink-0 size-4 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </div>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            id="icon"
                            name="icon"
                            className="py-2  outline-none border-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            placeholder="Search"
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <Link href="/classes/add-class" className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] w-[180px] ease-in font-semibold duration-300">+ Add Class</Link>
                </div>
            </div>
            <div className={`${booleanValue ? "lg:ml-[120px]" : "lg:ml-[290px]"} grid justify-center`}>

                <div className="grid justify-center gap-2 mt-5 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
                {data?.data.content.filter((classItem: Class) => {
                    return search.toLocaleLowerCase() === '' ? classItem : classItem.classroomName.toLocaleLowerCase().includes(search);
                }).map((classItem: Class) => (
                    <div key={classItem.roomId}>
                        <Link href={`/class-detials/${classItem.roomId}`}>
                            <div className="flex justify-center items-center p-2 rounded-xl bg-white shadow-xl gap-2 w-[200px] h-[130px] max-[640px]:w-[300px]">
                                <div className="rounded-full h-[70px] w-[70px] bg-[#09C2DE] flex justify-center items-center text-center font-bold text-white text-[18px]">
                                    {classItem.classroomName}
                                </div>
                                <div className="grid text-[13px] font-semibold">
                                    <p className="text-[#526484]">N.Student</p>
                                    <p>30</p>
                                    <p className="text-[#526484]">N.Student</p>
                                    <p>4</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
                </div>
            </div>
        </>
    );
};

export default Infrastructure;
