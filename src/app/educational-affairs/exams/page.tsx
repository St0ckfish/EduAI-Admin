"use client";

import Spinner from "@/components/spinner";
import { useGetAllExpensesQuery } from "@/features/Acadimic/examsApi";
import { Key } from "react";
import BreadCrumbs from "@/components/BreadCrumbs";

const Exams = () => {
  const breadcrumbs = [
    {
      nameEn: "Academic",
      nameAr: "أكاديمي",
      nameFr: "Académique",
      href: "/",
    },
    {
      nameEn: "Educational Affairs",
      nameAr: "الشئون التعليمية",
      nameFr: "Affaires éducatives",
      href: "/educational-affairs",
    },
    {
      nameEn: "Exams",
      nameAr: "الإمتحانات",
      nameFr: "Examens",
      href: "/educational-affairs/exams",
    },
  ];
  const { data: exams, isLoading: isExams } = useGetAllExpensesQuery(null);
  if (isExams)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="mt-12 lg:ml-[290px] lg:mr-10">
        <div className="flex justify-end">
          <div className="flex justify-end">
            <button className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl">
              6-Jun-2024
            </button>
          </div>
        </div>
        <div className="grid gap-3">
          {exams?.map((exam: { id: Key | null | undefined }) => (
            <div
              key={exam.id}
              className="grid h-full w-full gap-5 rounded-xl bg-bgPrimary p-7"
            >
              <div className="flex items-center justify-between font-semibold">
                <div className="flex items-center">
                  <h1 className="text-[18px]">Exam : </h1>
                  <p>Unit 6 final Exam</p>
                </div>
                <div>
                  <p>6 June 2024 09:00 AM &rarr; 12:00 PM</p>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <div className="grid justify-center gap-3 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                  <div className="flex h-[80px] w-[201px] items-center justify-between rounded-xl bg-bgSecondary p-2 shadow-xl max-[576px]:h-[100px]">
                    <div className="rounded-full bg-gray-500 p-2">
                      <svg
                        className="h-6 w-6 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[12px] text-textSecondary">
                        Total student
                      </p>
                      <p className="text-[12px] text-textSecondary">50</p>
                    </div>
                  </div>
                  <div className="flex h-[80px] w-[201px] items-center justify-between rounded-xl bg-bgSecondary p-2 shadow-xl max-[576px]:h-[100px]">
                    <div className="rounded-full bg-gray-500 p-2">
                      <svg
                        className="h-6 w-6 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[12px] text-textSecondary">
                        Total student
                      </p>
                      <p className="text-[12px] text-textSecondary">50</p>
                    </div>
                  </div>
                  <div className="flex h-[80px] w-[201px] items-center justify-between rounded-xl bg-bgSecondary p-2 shadow-xl max-[576px]:h-[100px]">
                    <div className="rounded-full bg-gray-500 p-2">
                      <svg
                        className="h-6 w-6 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[12px] text-textSecondary">
                        Total student
                      </p>
                      <p className="text-[12px] text-textSecondary">50</p>
                    </div>
                  </div>
                  <div className="flex h-[80px] w-[201px] items-center justify-between rounded-xl bg-bgSecondary p-2 shadow-xl max-[576px]:h-[100px]">
                    <div className="rounded-full bg-gray-500 p-2">
                      <svg
                        className="h-6 w-6 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[12px] text-textSecondary">
                        Total student
                      </p>
                      <p className="text-[12px] text-textSecondary">50</p>
                    </div>
                  </div>
                  <div className="flex h-[80px] w-[201px] items-center justify-between rounded-xl bg-bgSecondary p-2 shadow-xl max-[576px]:h-[100px]">
                    <div className="rounded-full bg-gray-500 p-2">
                      <svg
                        className="h-6 w-6 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[12px] text-textSecondary">
                        Total student
                      </p>
                      <p className="text-[12px] text-textSecondary">50</p>
                    </div>
                  </div>
                  <div className="flex h-[80px] w-[201px] items-center justify-between rounded-xl bg-bgSecondary p-2 shadow-xl max-[576px]:h-[100px]">
                    <div className="rounded-full bg-gray-500 p-2">
                      <svg
                        className="h-6 w-6 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[12px] text-textSecondary">
                        Total student
                      </p>
                      <p className="text-[12px] text-textSecondary">50</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Exams;
