"use client"
/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/spinner";
import { useGetAllCoursesQuery, useDeleteCoursesMutation } from "@/features/Acadimic/courseApi";
import Link from "next/link";
import { toast } from "react-toastify";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "@/GlobalRedux/store";

const CourseManagement = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState<number | boolean | null>(false);
    const toggleNavbar = (index: number) => {
        setOpen(open === index ? null : index);
    };
    type Course = Record<string, any>;
    const { data, isLoading, refetch } = useGetAllCoursesQuery(null);
    const [deleteCourse, { isLoading: isDeleting }] =
    useDeleteCoursesMutation();
    const handleDelete = async (id: number) => {
        try {
          await deleteCourse(id).unwrap();
          toast.success(`Course with ID ${id} deleted successfully`);
          refetch();
        } catch (err) {
            toast.error("Failed to delete the Course");
        }
      };

    if (isLoading)
        return (
            <div className="h-screen w-full justify-center items-center flex ">
                <Spinner />
            </div>
        );

    return (
        <>
            <div className={`lg:ml-[290px] ${booleanValue ? "lg:ml-[120px]" : "lg:ml-[290px]"} mt-12`}>
                <div className="flex justify-between max-[502px]:grid max-[502px]:justify-center text-center w-full px-8">
                    <div className="mb-3">
                        <label htmlFor="icon" className="sr-only">Search</label>
                        <div className="relative min-w-72 md:min-w-80">
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                <svg className="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                            <input onChange={(e) => setSearch(e.target.value)} type="text" id="icon" name="icon" className="py-2  outline-none border-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Link href="/course/course-management/add-course" className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] ease-in font-semibold duration-300">+ Add New Course</Link>
                    </div>
                </div>
                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 p-3">
                    {data?.data.content.filter((course: Course) => {
                        return search.toLocaleLowerCase() === '' ? course : course.name.toLocaleLowerCase().includes(search);
                    }).map((course: Course, index:number) => (
                        <div key={course.id} className="p-2 bg-white rounded-lg grid gap-2">
                            <div className="grid p-2 bg-[#f4bd0e]  text-[25px] font-bold text-white rounded-xl h-[220px]">
                                <div className="flex justify-end text-end">
                                    <div className="flex gap-2 items-start">
                                        {
                                            open === index ? (
                                                <div className="flex bg-white h-[35px] px-1.5 py-1 rounded-full gap-2">
                                                    <button disabled={isDeleting} onClick={() => handleDelete(course.id)
                                            }>
                                                        <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                    <Link href={`/course/course-management/${course.id}`}>
                                                        <svg className="h-6 w-6 text-blue-500"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                                                    </Link>
                                                </div>
                                            ):(
                                                <div className="invisible flex bg-white h-[35px] w-[100px] px-3 py-0.5 rounded-full gap-2">
                                                    <button>
                                                        <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                    <button>
                                                    <svg className="h-6 w-6 text-blue-500"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                                                    </button>
                                                </div>
                                            )
                                        }
                                        <button onClick={() => toggleNavbar(index)}>
                                            <svg className="h-6 w-6 text-white mt-1.5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="19" r="1" />  <circle cx="12" cy="5" r="1" /></svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-staet justify-center text-center mb-6">
                                    <h1>{course.code}</h1>
                                </div>
                            </div>
                            <div className="font-semibold grid gap-2">
                                <h1>{course.level}</h1>
                                <p className="text-[12px] text-[#526484]">{course.description} </p>
                            </div>
                            <div className="flex gap-2 items-center font-semibold">
                                <img src="/images/userr.png" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                {course.eduSystemName}
                            </div>
                            <div className="border-t border-gray-300 p-1 flex justify-evenly">
                                <div className="flex gap-2 items-center">
                                    <svg className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                    <p className="text-gray-500 font-semibold">30</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <svg className="h-6 w-6 text-gray-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="10" y1="16" x2="14" y2="16" /></svg>
                                    <p className="text-gray-500 font-semibold">2024</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <svg className="h-6 w-6 text-gray-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="11" r="3" />  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" /></svg>
                                    <p className="text-gray-500 font-semibold">30</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CourseManagement;