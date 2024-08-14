/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useGetAllInvoicesQuery } from "@/features/Financial/feesApi";
import Spinner from "@/components/spinner";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";

const FeesManagement = () => {
    const [selectAll, setSelectAll] = useState(false);
    const { data, error, isLoading, refetch } = useGetAllInvoicesQuery(null);
    useEffect(() => {
        if (data) console.log("Response Data:", data);
        if (error) console.log("Error:", error);
    }, [data, error]);
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    type Invoice = Record<string, any>;
    const [search, setSearch] = useState("");
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(#checkbox-all-search)');
        checkboxes.forEach(checkbox => {
            checkbox.checked = !selectAll;
        });
    };

    useEffect(() => {
        const handleOtherCheckboxes = () => {
            const allCheckboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(#checkbox-all-search)');
            const allChecked = Array.from(allCheckboxes).every(checkbox => checkbox.checked);
            const selectAllCheckbox = document.getElementById('checkbox-all-search') as HTMLInputElement | null;
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = allChecked;
                setSelectAll(allChecked);
            }
        };



        const otherCheckboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(#checkbox-all-search)');
        otherCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleOtherCheckboxes);
        });

        return () => {
            otherCheckboxes.forEach(checkbox => {
                checkbox.removeEventListener('change', handleOtherCheckboxes);
            });
        };
    }, []);
    const formatTransactionDate = (dateString: string | number | Date) => {
        if (!dateString) return "No transaction date";
        const formatter = new Intl.DateTimeFormat("en-EG", {
            timeZone: "Asia/Riyadh",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour12: false,
        });
        return formatter.format(new Date(dateString));
    };

    if (isLoading)
        return (
            <div className="h-screen w-full justify-center items-center flex ">
                <Spinner />
            </div>
        );

    return (
        <>
            <div className="flex items-center gap-1 lg:ml-[290px] mt-12 ml-7 text-[18px] max-[550px]:text-[15px] flex-wrap">
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/">Administration</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/financial-management">Financial Management</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/fees-management">Fees Management</Link>
            </div>
            <div className="lg:ml-[270px] mr-[5px] relative mt-10 overflow-x-auto bg-transparent sm:rounded-lg h-screen">
                <div className="flex justify-between max-[502px]:grid max-[502px]:justify-center text-center">
                    <div className="mb-3">
                        <label htmlFor="icon" className="sr-only">Search</label>
                        <div className="relative min-w-72 md:min-w-80">
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                <svg className="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                            <input type="text" id="icon" name="icon" className="py-2  outline-none border-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Link href="/" className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] w-[180px] ease-in font-semibold duration-300">+ Add Invoices</Link>
                    </div>
                </div>
                <div className="flex justify-left gap-5 text-[23px] font-semibold mb-5 ml-4">
                    <Link href="/financial-management" className="text-blue-500 underline">
                        Invoices
                    </Link>
                    <Link href="/fees-management/scholarship">
                        Scholarship
                    </Link>
                </div>
                <div className="overflow-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] ">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 -gray-800 focus:ring-2" onChange={handleSelectAll} />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Paid Amount
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    total Fees Amount
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Invoice Date
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    discount
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data.content.filter((invoice: Invoice) => {
                                return search.toLocaleLowerCase() === '' ? invoice : invoice.name.toLocaleLowerCase().includes(search);
                            }).map((invoice: Invoice, index: number) => (
                                <tr className="bg-white border-b  hover:bg-gray-50" key={index}>
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                        </div>
                                    </td>
                                    <th scope="row" className="px-6 flex items-center py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {invoice.billedToName}
                                    </th>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {invoice.paidAmount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {invoice.totalFeesAmount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {formatTransactionDate(invoice.creationDate)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {
                                            invoice.paymentStatus == "NOT_FULLY_PAID" ? <div className="flex gap-2 text-[#e85347] items-center font-semibold"> <div className="h-2.5 w-2.5 rounded-full bg-[#e85347]"></div> Unpaid </div> : <div className="flex gap-2 text-[#3e5af0] font-semibold items-center"> <div className="h-2.5 w-2.5 rounded-full bg-[#3e5af0]"></div> Unpaid </div>
                                        }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {invoice.discountAmount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex gap-3 items-center">
                                            <button>
                                                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                            <Link href={`/fees-management/${invoice.billedToId}`} className="font-medium text-blue-600 hover:underline">
                                                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>

                                            </Link>
                                        </div>

                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    {
                        (data?.data.content.length == 0 || data == null) && <div className="flex justify-center text-center text-[18px] w-full py-3 font-semibold">There is No Data</div>
                    }
                </div>
            </div>
        </>
    );
}

export default FeesManagement;
