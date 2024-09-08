"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";

const FeesSearch = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  return (
    <>
      <div
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12`}
      >
        <div className="flex h-full w-full justify-center overflow-auto p-2">
          <div className="grid h-full w-full overflow-auto rounded-xl bg-bgPrimary">
            <div className="flex h-[70px] items-center gap-7 overflow-auto rounded-t-xl bg-bgPrimary pl-3 font-semibold">
              <Link
                className="underline-offset-4 hover:text-blue-500 hover:underline"
                href="/search"
              >
                {currentLanguage === "en"
                  ? "Student"
                  : currentLanguage === "ar"
                    ? "طالب"
                    : currentLanguage === "fr"
                      ? "Étudiant"
                      : "Student"}{" "}
                {/* Default to English */}
              </Link>
              <Link
                className="underline-offset-4 hover:text-blue-500 hover:underline"
                href="/search/teacher"
              >
                {currentLanguage === "en"
                  ? "Teacher"
                  : currentLanguage === "ar"
                    ? "معلم"
                    : currentLanguage === "fr"
                      ? "Enseignant"
                      : "Teacher"}{" "}
                {/* Default to English */}
              </Link>
              <Link
                className="underline-offset-4 hover:text-blue-500 hover:underline"
                href="/search/employee"
              >
                {currentLanguage === "en"
                  ? "Employee"
                  : currentLanguage === "ar"
                    ? "موظف"
                    : currentLanguage === "fr"
                      ? "Employé"
                      : "Employee"}{" "}
                {/* Default to English */}
              </Link>
              <Link
                className="underline-offset-4 hover:text-blue-500 hover:underline"
                href="/search/worker"
              >
                {currentLanguage === "en"
                  ? "Worker"
                  : currentLanguage === "ar"
                    ? "عامل"
                    : currentLanguage === "fr"
                      ? "Travailleur"
                      : "Worker"}{" "}
                {/* Default to English */}
              </Link>
              <Link
                className="text-blue-500 underline underline-offset-4"
                href="/search/fees"
              >
                {currentLanguage === "en"
                  ? "Fees"
                  : currentLanguage === "ar"
                    ? "رسوم"
                    : currentLanguage === "fr"
                      ? "Frais"
                      : "Fees"}{" "}
                {/* Default to English */}
              </Link>
              <Link
                className="underline-offset-4 hover:text-blue-500 hover:underline"
                href="/search/infrastructure"
              >
                {currentLanguage === "en"
                  ? "Infrastructure"
                  : currentLanguage === "ar"
                    ? "البنية التحتية"
                    : currentLanguage === "fr"
                      ? "Infrastructure"
                      : "Infrastructure"}{" "}
                {/* Default to English */}
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 p-7 xl:grid-cols-2">
              <div className="grid p-4">
                <div className="flex gap-3 md:justify-center">
                  <div>
                    <label htmlFor="icon" className="sr-only">
                      Search
                    </label>
                    <div className="relative min-w-48 md:min-w-80">
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
                        type="text"
                        id="icon"
                        name="icon"
                        className="block w-full rounded-lg border-2 border-borderPrimary px-4 py-2 ps-11 text-sm outline-none focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <div>
                    <select
                      id="countries"
                      className="block h-full w-full rounded-lg border border-borderPrimary bg-bgSecondary p-1.5 text-sm text-textPrimary focus:border-borderPrimary outline-none"
                    >
                      <option selected>Search by Name </option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-semibold">0 Fees Found</p>
                </div>
                <div className="grid h-[450px] items-center justify-center">
                  <img src="/images/nothing.png" alt="" />
                </div>
              </div>
              <div className="h-full w-full rounded-xl border border-borderPrimary"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeesSearch;
