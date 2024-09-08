"use client";
/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/spinner";
import {
  useGetAllLabsQuery,
  useDeleteLabsMutation,
} from "@/features/Infrastructure/labApi";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { toast } from "react-toastify";

const Lab = () => {
  const { data, error, isLoading, refetch } = useGetAllLabsQuery(null);
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data) console.log("Response Data:", data);
    if (error) console.log("Error:", error);
  }, [data, error]);

  const [deleteBuses] = useDeleteLabsMutation();
  type Bus = Record<string, any>;

  const handleDelete = async (id: number) => {
    console.log(id);
    try {
      await deleteBuses(id).unwrap();

      toast.success(`Lab with ID ${id} Deleted successfully`);
      void refetch();
    } catch (err) {
      toast.error("Failed to Delete the Lab");
    }
  };

  const [selectAll, setSelectAll] = useState(false);

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
        className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} ml-7 mt-12 flex-wrap text-[18px] max-[550px]:text-[15px]`}
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
          href="/infrastructure"
        >
          Infrastructure
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
          href="/lab"
        >
          Lab
        </Link>
      </div>
      <div
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} relative mr-[5px] mt-10 h-screen overflow-x-auto bg-transparent sm:rounded-lg`}
      >
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
                className="block w-full rounded-lg border-2 border-borderPrimary px-4 py-2 ps-11 text-sm outline-none focus:border-b border-borderPrimarylue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              href="/infrastructure/lab/add-lab"
              className="mb-5 mr-3 w-[210px] whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
            >
              + New Lab
            </Link>
          </div>
        </div>
        <div className="relative overflow-auto shadow-md sm:rounded-lg">
          <table className="w-full overflow-x-auto text-left text-sm text-bgSecondary0 rtl:text-right">
            <thead className="bg-thead text-xs uppercase text-textPrimary">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="-gray-800 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  building Number
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  category
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  lab Name
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  lab Type
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  room Number
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  max Capacity
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  floor Number
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  type
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  status
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  Action
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.content
                .filter((bus: Bus) => {
                  return search.toLocaleLowerCase() === ""
                    ? bus
                    : bus.labName.toLocaleLowerCase().includes(search);
                })
                .map((bus: Bus, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary"
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
                    <th
                      scope="row"
                      className="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                    >
                      {bus.buildingNumber}
                    </th>
                    <td className="whitespace-nowrap px-6 py-4">
                      {bus.category}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {bus.labName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {bus.labType}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {bus.roomNumber}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {bus.maxCapacity}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {bus.floorNumber}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{bus.type}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {bus.status}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        onClick={() => handleDelete(bus.roomId)}
                        className="rounded-lg bg-error px-2 py-1 font-semibold text-white shadow-lg delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link
                        href={`/infrastructure/lab/${bus.roomId}`}
                        className="font-medium text-primary hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {(data?.data.content.length == 0 || data == null) && (
            <div className="flex w-full justify-center py-3 text-center text-[18px] font-semibold">
              There is No Data
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Lab;
