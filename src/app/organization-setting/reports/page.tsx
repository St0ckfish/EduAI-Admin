"use client";
/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/spinner";
import {
    useGetAllReportsQuery,
    useDeleteReportsMutation,
} from "@/features/Organization-Setteings/reportApi";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { toast } from "react-toastify";

const Report = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);

    const { data, error, isLoading, refetch } = useGetAllReportsQuery("REPORT");
    type Notifi = Record<string, any>;

    const [deleteReport] = useDeleteReportsMutation();

    const handleDelete = async (id: string) => {
        try {
            await deleteReport(id).unwrap();
            toast.success(`report deleted successfully`);
            void refetch();
        } catch (err) {
            toast.error("Failed to delete the report");
        }
    };

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
        <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} flex justify-left gap-5 text-[23px] font-semibold mb-4 ml-4 mt-2`}>
                    <Link href="/organization-setting/reports" className="text-blue-500 underline">
                        Reports
                    </Link>
                    <Link href="/organization-setting/suggestions" >
                        Suggestions
                    </Link>
                </div>
            <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mr-[5px] relative mt-10 overflow-x-auto bg-transparent sm:rounded-lg h-screen`}>
                <div className="overflow-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">

                        <tbody>
                        {data?.data.content.map((report: Notifi) => (
                            <tr key={report.id} className="bg-white border-b  hover:bg-gray-50 text-nowrap"  >
                                    <th
                                        scope="row"
                                        className=" flex items-center px-6 py-4 h-full text-[25px] font-medium text-gray-900 whitespace-nowrap "
                                    >
                                        <div className="flex items-center gap-2 text-[15px] text-black ">
                                        {
                                            report.userPicture == null ?
                                            <img src="/images/userr.png" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                            :
                                            <img src={report.userPicture} className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                        }
                                            <span className="grid">
                                                <p>{report.userFullName}</p>
                                                <p>
                                                    ID: <span className="text-gray-400">{report.id}</span>
                                                </p>
                                            </span>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4 ">
                                        <div className="flex w-[300px]">
                                            <img src={report.viewAttachment} alt="#" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <div className="grid grid-cols-1 gap-3">
                                            {report.message}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <div className="grid grid-cols-2 gap-3">
                                            <button onClick={() => handleDelete(report.id)}>
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
};

export default Report;
