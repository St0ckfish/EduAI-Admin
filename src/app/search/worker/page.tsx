"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, useEffect, SetStateAction } from "react";
import {
  useGetAllWorkersQuery,
  useGetWorkerByIdQuery,
} from "@/features/User-Management/workerApi";
import Spinner from "@/components/spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";

const WorkerSearch = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  type Student = Record<string, any>;
  const { data, error, isLoading } = useGetAllWorkersQuery({
    archived: "false",
    page: 0,
    size: 1000000,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  useEffect(() => {
    if (data) {
      console.log("Response Data:", data);
      const filtered = data.data.content.filter((student: Student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredStudents(filtered);
    }
    if (error) {
      console.log("Error:", error);
    }
  }, [data, searchTerm, error]);

  const [selectedId, setSelectedId] = useState(null);
  const { data: EmployeeQ, isLoading: isEmployee } = useGetWorkerByIdQuery(
    selectedId,
    {
      skip: !selectedId,
    },
  );
  const handleClick = (id: SetStateAction<null>) => {
    setSelectedId(id);
  };
  return (
    <>
      <div
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12`}
      >
        <div className="flex h-full w-full justify-center overflow-auto p-2">
          <div className="grid h-full w-full overflow-auto rounded-xl bg-white">
            <div className="flex h-[70px] items-center gap-7 overflow-auto rounded-t-xl bg-gray-200 pl-3 font-semibold">
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
                className="text-blue-500 underline underline-offset-4"
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
                className="underline-offset-4 hover:text-blue-500 hover:underline"
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
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        type="text"
                        id="icon"
                        name="icon"
                        className="block w-full rounded-lg border-2 border-gray-200 px-4 py-2 ps-11 text-sm outline-none focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <div>
                    <select
                      id="countries"
                      className="block h-full w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option selected>Search by Name </option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-semibold">
                    {filteredStudents.length}{" "}
                    {currentLanguage === "en"
                      ? "Workers Found"
                      : currentLanguage === "ar"
                        ? "عمال تم العثور عليهم"
                        : currentLanguage === "fr"
                          ? "Travailleurs trouvés"
                          : "Workers Found"}{" "}
                    {/* Default to English */}
                  </p>
                </div>
                <div className="grid h-[450px] w-full overflow-y-auto">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <div className="h-full w-full overflow-y-auto">
                      {filteredStudents.length > 0 && searchTerm ? (
                        <ul className="mt-12 grid w-full gap-2 overflow-y-auto">
                          {filteredStudents.map(student => (
                            <div
                              onClick={() => handleClick(student.id)}
                              key={student.id}
                              className="flex w-full cursor-pointer items-center rounded-lg border border-[#f5f6f7] px-2 py-1 hover:bg-gray-200"
                            >
                              <div>
                                {student.picture == null ? (
                                  <img
                                    src="/images/userr.png"
                                    className="mr-2 h-[40px] w-[40px] rounded-full"
                                    alt="#"
                                  />
                                ) : (
                                  <img
                                    src={student.picture}
                                    className="mr-2 h-[40px] w-[40px] rounded-full"
                                    alt="#"
                                  />
                                )}
                              </div>
                              <div className="grid gap-2">
                                <p className="font-semibold">{student.name}</p>
                                <p className="font-semibold text-[#536471]">
                                  ID: {student.id}
                                </p>
                              </div>
                            </div>
                          ))}
                        </ul>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <img src="/images/nothing.png" alt="" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid h-full w-full items-center overflow-hidden text-ellipsis rounded-xl border">
                {isEmployee ? (
                  <Spinner />
                ) : (
                  <div className="mt-16 grid items-center justify-center">
                    {EmployeeQ ? (
                      <div>
                        <div className="flex justify-end">
                          <Link
                            className="rounded-lg bg-[#3E5AF0] px-2 py-1 font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
                            href={`/worker/view-worker/${EmployeeQ.data.id}`}
                          >
                            View
                          </Link>
                        </div>
                        <div className="grid items-center justify-center text-center">
                          {EmployeeQ?.data.picture == null ? (
                            <img
                              src="/images/userr.png"
                              className="mr-2 h-[120px] w-[120px] rounded-full"
                              alt="#"
                            />
                          ) : (
                            <img
                              src={EmployeeQ?.data.picture}
                              className="mr-2 h-[120px] w-[120px] rounded-full"
                              alt="#"
                            />
                          )}
                          <h1 className="font-sans font-semibold text-gray-800">
                            {EmployeeQ?.data.name}
                          </h1>
                        </div>

                        <div className="grid justify-start">
                          <h1 className="font-sans text-[22px] font-semibold text-gray-800">
                            Basic Details
                          </h1>
                          <div className="grid w-[400px] grid-cols-2 max-[485px]:w-[240px]">
                            <h3 className="font-sans font-semibold text-gray-400">
                              Email:
                            </h3>
                            <p className="font-sans font-semibold text-gray-800">
                              {EmployeeQ?.data.email}
                            </p>
                            <h3 className="font-sans font-semibold text-gray-400">
                              Salary:
                            </h3>
                            <p className="font-sans font-semibold text-gray-800">
                              {EmployeeQ?.data.salary == null
                                ? `Not specified`
                                : EmployeeQ?.data.salary}
                            </p>
                            <h3 className="font-sans font-semibold text-gray-400">
                              Age:
                            </h3>
                            <p className="font-sans font-semibold text-gray-800">
                              {EmployeeQ?.data.birthDate}
                            </p>
                            <h3 className="font-sans font-semibold text-gray-400">
                              Gender:
                            </h3>
                            <p className="font-sans font-semibold text-gray-800">
                              {EmployeeQ?.data.gender}
                            </p>
                            <h3 className="font-sans font-semibold text-gray-400">
                              Position:
                            </h3>
                            <p className="font-sans font-semibold text-gray-800">
                              {EmployeeQ?.data.role}
                            </p>
                            <h3 className="font-sans font-semibold text-gray-400">
                              Religion:
                            </h3>
                            <p className="font-sans font-semibold text-gray-800">
                              {EmployeeQ?.data.religion}
                            </p>
                            <h3 className="font-sans font-semibold text-gray-400">
                              Address:
                            </h3>
                            <p className="font-sans font-semibold text-gray-800">
                              {EmployeeQ?.data.nationality}
                            </p>
                            <h3 className="font-sans font-semibold text-gray-400">
                              Mobile:
                            </h3>
                            <p className="font-sans font-semibold text-gray-800">
                              {EmployeeQ?.data.phoneNumber}
                            </p>
                            <h3 className="font-sans font-semibold text-gray-400">
                              About:
                            </h3>
                            <p className="font-sans font-semibold text-gray-800">
                              {EmployeeQ?.data.about}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkerSearch;
