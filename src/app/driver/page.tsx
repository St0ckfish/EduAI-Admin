/* eslint-disable @next/next/no-img-element */
"use client";
import Spinner from "@/components/spinner";
import {
    useGetAllDriversQuery,
    useDeleteDriversMutation,
} from "@/features/User-Management/driverApi";
import Link from "next/link";
import { useState, useEffect, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { toast } from "react-toastify";
import Pagination from "@/components/pagination";
// import Sheet from "@/components/sheet";
// import DriverInfo from "@/components/driverInfo";

const Driver = () => {
    //   const [isSheetOpen, setIsSheetOpen] = useState(false);

    //   const handleOpen = () => setIsSheetOpen(true);
    //   const handleClose = () => setIsSheetOpen(false);
    //     <div className="p-8">
    //     <button
    //       className="bg-blue-500 text-white px-4 py-2 rounded"
    //       onClick={handleOpen}
    //     >
    //       Open Sheet
    //     </button>
    //
    //   </div>
    const currentLanguage = useSelector(
        (state: RootState) => state.language.language
    );

    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const onPageChange = (page: SetStateAction<number>) => {
        setCurrentPage(page);
    };
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    type Driver = Record<string, any>;
    const [search, setSearch] = useState("");
    const { data, error, isLoading, refetch } = useGetAllDriversQuery({
        archived: "false",
        page: currentPage,
        size: rowsPerPage,
    });
    const onElementChange = (ele: SetStateAction<number>) => {
        setRowsPerPage(ele);
        setCurrentPage(0);
    };
    const [selectAll, setSelectAll] = useState(false);
    const [deleteDrivers] = useDeleteDriversMutation();

    const handleDelete = async (id: string) => {
        try {
            await deleteDrivers({
                id: id,
                lock: "true",
            }).unwrap();
            toast.success(`Driver with ID ${id} Locked successfully`);
            void refetch();
        } catch (err) {
            toast.error("Failed to delete the Driver");
        }
    };

    useEffect(() => {
        if (data) console.log("Response Data:", data);
        if (error) console.log("Error:", error);
    }, [data, error]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const checkboxes = document.querySelectorAll<HTMLInputElement>(
            'input[type="checkbox"]:not(#checkbox-all-search)'
        );
        checkboxes.forEach((checkbox) => {
            checkbox.checked = !selectAll;
        });
    };

    useEffect(() => {
        const handleOtherCheckboxes = () => {
            const allCheckboxes = document.querySelectorAll<HTMLInputElement>(
                'input[type="checkbox"]:not(#checkbox-all-search)'
            );
            const allChecked = Array.from(allCheckboxes).every(
                (checkbox) => checkbox.checked
            );
            const selectAllCheckbox = document.getElementById(
                "checkbox-all-search"
            ) as HTMLInputElement | null;
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = allChecked;
                setSelectAll(allChecked);
            }
        };

        const otherCheckboxes = document.querySelectorAll<HTMLInputElement>(
            'input[type="checkbox"]:not(#checkbox-all-search)'
        );
        otherCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", handleOtherCheckboxes);
        });

        return () => {
            otherCheckboxes.forEach((checkbox) => {
                checkbox.removeEventListener("change", handleOtherCheckboxes);
            });
        };
    }, []);

    if (isLoading)
        return (
            <div className="h-screen w-full justify-center items-center flex ">
                <Spinner />
            </div>
        );

    return (
        <>
            <div
                className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"
                    } mt-12 ml-7 text-[18px] max-[550px]:text-[15px]  flex-wrap`}
            >
                <Link
                    className="text-[#526484] hover:text-blue-400 hover:underline font-semibold"
                    href="/"
                >
                    {currentLanguage === "en"
                        ? "Administration"
                        : currentLanguage === "ar"
                            ? "الإدارة"
                            : currentLanguage === "fr"
                                ? "Administration"
                                : "Administration"}{" "}
                    {/* Default to English */}
                </Link>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(82, 100, 132, 1)" }}
                >
                    <path d="M10.707 17.707L16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                </svg>
                <Link
                    className="text-[#526484] hover:text-blue-400 hover:underline font-semibold"
                    href="/user-management"
                >
                    {currentLanguage === "en"
                        ? "User Management"
                        : currentLanguage === "ar"
                            ? "إدارة المستخدمين"
                            : currentLanguage === "fr"
                                ? "Gestion des utilisateurs"
                                : "User Management"}{" "}
                    {/* Default to English */}
                </Link>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(82, 100, 132, 1)" }}
                >
                    <path d="M10.707 17.707L16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                </svg>
                <Link
                    className="text-[#526484] hover:text-blue-400 hover:underline font-semibold"
                    href="/driver"
                >
                    {currentLanguage === "en"
                        ? "Driver"
                        : currentLanguage === "ar"
                            ? "السائق"
                            : currentLanguage === "fr"
                                ? "Chauffeur"
                                : "Driver"}{" "}
                    {/* Default to English */}
                </Link>
            </div>
            <div
                className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"
                    } mr-[5px] relative mt-10 overflow-x-auto bg-transparent sm:rounded-lg h-screen`}
            >
                <div className="flex justify-between max-[502px]:grid max-[502px]:justify-center text-center">
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
                        <Link
                            href="/add-new-driver"
                            className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] ease-in font-semibold duration-300"
                        >
                            {currentLanguage === "en"
                                ? "+ New Driver"
                                : currentLanguage === "ar"
                                    ? "+ سائق جديد"
                                    : currentLanguage === "fr"
                                        ? "+ Nouveau Chauffeur"
                                        : "+ New Driver"}{" "}
                            {/* Default to English */}
                        </Link>
                    </div>
                </div>
                <div className="overflow-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] ">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        {/* Add event listener for select all checkbox */}
                                        <input
                                            id="checkbox-all-search"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 -gray-800 focus:ring-2"
                                            onChange={handleSelectAll}
                                        />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    {currentLanguage === "en"
                                        ? "Name"
                                        : currentLanguage === "ar"
                                            ? "الاسم"
                                            : currentLanguage === "fr"
                                                ? "Nom"
                                                : "Name"}{" "}
                                    {/* Default to English */}
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    {currentLanguage === "en"
                                        ? "ID"
                                        : currentLanguage === "ar"
                                            ? "الرقم"
                                            : currentLanguage === "fr"
                                                ? "Identifiant"
                                                : "ID"}{" "}
                                    {/* Default to English */}
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    {currentLanguage === "en"
                                        ? "Gender"
                                        : currentLanguage === "ar"
                                            ? "الجنس"
                                            : currentLanguage === "fr"
                                                ? "Genre"
                                                : "Gender"}{" "}
                                    {/* Default to English */}
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    {currentLanguage === "en"
                                        ? "Nationality"
                                        : currentLanguage === "ar"
                                            ? "الجنسية"
                                            : currentLanguage === "fr"
                                                ? "Nationalité"
                                                : "Nationality"}{" "}
                                    {/* Default to English */}
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    {currentLanguage === "en"
                                        ? "Email"
                                        : currentLanguage === "ar"
                                            ? "البريد الإلكتروني"
                                            : currentLanguage === "fr"
                                                ? "Courriel"
                                                : "Email"}{" "}
                                    {/* Default to English */}
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    {currentLanguage === "en"
                                        ? "Mobile"
                                        : currentLanguage === "ar"
                                            ? "الجوال"
                                            : currentLanguage === "fr"
                                                ? "Mobile"
                                                : "Mobile"}{" "}
                                    {/* Default to English */}
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    {currentLanguage === "en"
                                        ? "View"
                                        : currentLanguage === "ar"
                                            ? "عرض"
                                            : currentLanguage === "fr"
                                                ? "Voir"
                                                : "View"}{" "}
                                    {/* Default to English */}
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    {currentLanguage === "en"
                                        ? "Action"
                                        : currentLanguage === "ar"
                                            ? "الإجراء"
                                            : currentLanguage === "fr"
                                                ? "Action"
                                                : "Action"}{" "}
                                    {/* Default to English */}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data.content
                                .filter((driver: Driver) => {
                                    return search.toLocaleLowerCase() === ""
                                        ? driver
                                        : driver.name.toLocaleLowerCase().includes(search);
                                })
                                .map((driver: Driver) => (
                                    <tr
                                        key={driver.id}
                                        className="bg-white border-b  hover:bg-gray-50 "
                                    >
                                        {/* onClick={handleOpen} */}
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                                    id="checkbox-table-search-1"
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                />
                                            </div>
                                        </td>
                                        <th
                                            scope="row"
                                            className="px-6 flex items-center py-4 gap-2 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            <div className="w-[50px]">
                                                {driver.picture == null ? (
                                                    <img
                                                        src="/images/userr.png"
                                                        className="w-[40px] h-[40px] mr-2 rounded-full"
                                                        alt="#"
                                                    />
                                                ) : (
                                                    <img
                                                        src={driver.picture}
                                                        className="w-[40px] h-[40px] mr-2 rounded-full"
                                                        alt="#"
                                                    />
                                                )}
                                            </div>
                                            <p> {driver.name} </p>
                                        </th>
                                        <td className="px-6 py-4 whitespace-nowrap">{driver.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {driver.gender}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {driver.nationality}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {driver.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {driver.number}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                href={`/driver/view-driver/${driver.id}`}
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                {currentLanguage === "en"
                                                    ? "View"
                                                    : currentLanguage === "ar"
                                                        ? "عرض"
                                                        : currentLanguage === "fr"
                                                            ? "Voir"
                                                            : "View"}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleDelete(driver.id)}
                                                className="px-2 py-1 rounded-lg text-white bg-red-500 font-semibold shadow-lg ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                                            >
                                                {currentLanguage === "en"
                                                    ? "Lock"
                                                    : currentLanguage === "ar"
                                                        ? "قفل"
                                                        : currentLanguage === "fr"
                                                            ? "Verrouiller"
                                                            : "Lock"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {(data?.data.content.length == 0 || data == null) && (
                        <div className="flex justify-center text-center text-[18px] w-full py-3 font-semibold">
                            {currentLanguage === "en"
                                ? "There is No Data"
                                : currentLanguage === "ar"
                                    ? "لا توجد بيانات"
                                    : currentLanguage === "fr"
                                        ? "Il n'y a pas de données"
                                        : "There is No Data"}
                        </div>
                    )}
                </div>
                <div className="overflow-auto relative">
                    <Pagination
                        totalPages={data?.data.totalPages}
                        elementsPerPage={rowsPerPage}
                        onChangeElementsPerPage={onElementChange}
                        currentPage={currentPage}
                        onChangePage={onPageChange}
                    />
                </div>
            </div>
            {/* <Sheet isOpen={isSheetOpen} onClose={handleClose}>
              <h2 className="text-2xl font-semibold mb-4">Sheet Content</h2>
              <DriverInfo data={data} />
         </Sheet> */}
        </>
    );
};

export default Driver;
