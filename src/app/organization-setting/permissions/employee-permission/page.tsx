/* eslint-disable @next/next/no-img-element */
"use client";
import Spinner from "@/components/spinner";
import { useGetAllEmployeePermissionsQuery } from "@/features/Organization-Setteings/employeePermissionApi";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";

const EmployeePermission = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  type EmployeePermission = Record<string, any>;
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useGetAllEmployeePermissionsQuery(null);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (data) console.log("Response Data:", data);
    if (error) console.log("Error:", error);
  }, [data, error]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:not(#checkbox-all-search)',
    );
    checkboxes.forEach(checkbox => {
      checkbox.checked = !selectAll;
    });
  };

  useEffect(() => {
    const handleOtherCheckboxes = () => {
      const allCheckboxes = document.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]:not(#checkbox-all-search)',
      );
      const allChecked = Array.from(allCheckboxes).every(
        checkbox => checkbox.checked,
      );
      const selectAllCheckbox = document.getElementById(
        "checkbox-all-search",
      ) as HTMLInputElement | null;
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = allChecked;
        setSelectAll(allChecked);
      }
    };

    const otherCheckboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:not(#checkbox-all-search)',
    );
    otherCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", handleOtherCheckboxes);
    });

    return () => {
      otherCheckboxes.forEach(checkbox => {
        checkbox.removeEventListener("change", handleOtherCheckboxes);
      });
    };
  }, []);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <>
      <div
        className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} ml-7 mt-12 flex-wrap text-[18px] max-[550px]:text-[15px]`}
      >
        <Link
          className="font-semibold text-[#526484] hover:text-blue-400 hover:underline"
          href="/"
        >
          Administration
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: "rgba(82, 100, 132, 1)", transform: "", msFilter: "" }}
        >
          <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
        <Link
          className="font-semibold text-[#526484] hover:text-blue-400 hover:underline"
          href="/document-management"
        >
          Organization Settings
        </Link>
      </div>
      <div
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} relative mr-[5px] mt-10 h-screen overflow-x-auto bg-transparent sm:rounded-lg`}
      >
        <div className="justify-left mb-[80px] ml-4 mt-[50px] flex flex-wrap gap-5 text-[20px] font-semibold max-[725px]:text-[15px]">
          <Link href="/organization-setting/permissions/department-permission">
            Department
          </Link>
          <Link
            href="/organization-setting/permissions/employee-permission"
            className="text-blue-500 underline"
          >
            Employee
          </Link>
        </div>
        <div className="flex justify-between text-center max-[502px]:grid max-[502px]:justify-center">
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
                className="block w-full rounded-lg border-2 border-gray-200 px-4 py-2 ps-11 text-sm outline-none focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              href="/organization-setting/permissions/add/employee"
              className="mb-5 mr-3 whitespace-nowrap rounded-xl bg-[#3E5AF0] px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
            >
              + Add Employee Permissions
            </Link>
          </div>
        </div>
        <div className="relative overflow-auto shadow-md sm:rounded-lg">
          <table className="w-full overflow-x-auto text-left text-sm text-gray-500 rtl:text-right">
            <thead className="bg-[#daeafb] text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    {/* Add event listener for select all checkbox */}
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="-gray-800 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  Name
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  id
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  is Full Academic
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  is Full Administration
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  is Full Communication
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  is Full Operations
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  view
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.content
                .filter((employeePermission: EmployeePermission) => {
                  return search.toLocaleLowerCase() === ""
                    ? employeePermission
                    : employeePermission.name
                        .toLocaleLowerCase()
                        .includes(search);
                })
                .map((employeePermission: EmployeePermission) => (
                  <tr
                    key={employeePermission.id}
                    className="border-b bg-white hover:bg-gray-50"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                    <th scope="row" className="whitespace-nowrap px-6 py-4">
                      <p> {employeePermission.name} </p>
                    </th>
                    <td className="whitespace-nowrap px-6 py-4">
                      {employeePermission.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {employeePermission.isFullAcademic ? "Yes" : "No"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {employeePermission.isFullAdministration ? "Yes" : "No"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {employeePermission.isFullCommunication ? "Yes" : "No"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {employeePermission.isFullOperations ? "Yes" : "No"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link
                        href={`/organization-setting/permissions/employee-permission/${employeePermission.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        edit
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button className="rounded-lg bg-red-500 px-2 py-1 font-semibold text-white shadow-lg delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeePermission;
