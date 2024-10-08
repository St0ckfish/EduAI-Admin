"use client";
/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/spinner";
import {
  useGetAllCoursesQuery,
  useDeleteCoursesMutation,
} from "@/features/Acadimic/courseApi";
import Link from "next/link";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import BreadCrumbs from "@/components/BreadCrumbs";

const CourseManagement = () => {
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
  ];
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<number | boolean | null>(false);
  const toggleNavbar = (index: number) => {
    setOpen(open === index ? null : index);
  };
  type Course = Record<string, any>;
  const { data, isLoading, refetch } = useGetAllCoursesQuery(null);
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCoursesMutation();
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
              ? "lg:mr-[40px]"
              : "lg:mr-[290px]"
            : booleanValue
              ? "lg:ml-[40px]"
              : "lg:ml-[290px]"
        } mt-12`}        
      >
        <div className="flex w-full justify-between px-8 text-center max-[502px]:grid max-[502px]:justify-center">
          <div className="mb-3">
            <label htmlFor="icon" className="sr-only">
              Search
            </label>
            <div className="relative min-w-72 md:min-w-80">
              <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-4">
                <svg
                  className="size-4 flex-shrink-0 text-gray-400"
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
                onChange={e => setSearch(e.target.value)}
                type="text"
                id="icon"
                name="icon"
                className="block w-full rounded-lg border-2 border-borderPrimary px-4 py-2 ps-11 text-sm outline-none focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                placeholder={
                  currentLanguage === "en"
                    ? "Search"
                    : currentLanguage === "ar"
                      ? "بحث"
                      : "Recherche"
                }
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              href="/course/course-management/add-course"
              className="mb-5 mr-3 whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
            >
              {currentLanguage === "ar"
                ? "+ إضافة دورة جديدة"
                : currentLanguage === "fr"
                  ? "+ Ajouter un nouveau cours"
                  : "+ Add New Course"}
            </Link>
          </div>
        </div>
        <div className="grid gap-3 p-3 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {data?.data.content
            .filter((course: Course) => {
              return search.toLocaleLowerCase() === ""
                ? course
                : course.name.toLocaleLowerCase().includes(search);
            })
            .map((course: Course, index: number) => (
              <div
                key={course.id}
                className="grid gap-2 rounded-lg bg-bgPrimary p-2"
              >
                <div className="grid h-[220px] rounded-xl bg-[#f4bd0e] p-2 text-[25px] font-bold text-textPrimary">
                  <div className="flex justify-end text-end">
                    <div className="flex items-start gap-2">
                      {open === index ? (
                        <div className="flex h-[35px] gap-2 rounded-full bg-bgPrimary px-1.5 py-1">
                          <button
                            disabled={isDeleting}
                            onClick={() => handleDelete(course.id)}
                          >
                            <svg
                              className="h-6 w-6 text-red-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                          <Link href={`/course/course-management/${course.id}`}>
                            <svg
                              className="h-6 w-6 text-blue-500"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {" "}
                              <path stroke="none" d="M0 0h24v24H0z" />{" "}
                              <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                              <line x1="16" y1="5" x2="19" y2="8" />
                            </svg>
                          </Link>
                        </div>
                      ) : (
                        <div className="invisible flex h-[35px] w-[100px] gap-2 rounded-full bg-bgPrimary px-3 py-0.5">
                          <button>
                            <svg
                              className="h-6 w-6 text-red-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                          <button>
                            <svg
                              className="h-6 w-6 text-blue-500"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {" "}
                              <path stroke="none" d="M0 0h24v24H0z" />{" "}
                              <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                              <line x1="16" y1="5" x2="19" y2="8" />
                            </svg>
                          </button>
                        </div>
                      )}
                      <button onClick={() => toggleNavbar(index)}>
                        <svg
                          className="mt-1.5 h-6 w-6 text-white"
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
                          <circle cx="12" cy="12" r="1" />{" "}
                          <circle cx="12" cy="19" r="1" />{" "}
                          <circle cx="12" cy="5" r="1" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="items-staet mb-6 flex justify-center text-center">
                    <h1>{course.code}</h1>
                  </div>
                </div>
                <div className="grid gap-2 font-semibold">
                  <h1>{course.level}</h1>
                  <p className="text-[12px] text-secondary">
                    {course.description}{" "}
                  </p>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <img
                    src="/images/userr.png"
                    className="mr-2 h-[40px] w-[40px] rounded-full"
                    alt="#"
                  />
                  {course.eduSystemName}
                </div>
                <div className="flex justify-evenly border-t border-borderPrimary p-1">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-6 w-6 text-textSecondary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />{" "}
                      <circle cx="9" cy="7" r="4" />{" "}
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />{" "}
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <p className="font-semibold text-textSecondary">30</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-6 w-6 text-textSecondary"
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
                      <rect x="4" y="5" width="16" height="16" rx="2" />{" "}
                      <line x1="16" y1="3" x2="16" y2="7" />{" "}
                      <line x1="8" y1="3" x2="8" y2="7" />{" "}
                      <line x1="4" y1="11" x2="20" y2="11" />{" "}
                      <line x1="10" y1="16" x2="14" y2="16" />
                    </svg>
                    <p className="font-semibold text-textSecondary">2024</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-6 w-6 text-textSecondary"
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
                      <circle cx="12" cy="11" r="3" />{" "}
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                    </svg>
                    <p className="font-semibold text-textSecondary">30</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CourseManagement;
