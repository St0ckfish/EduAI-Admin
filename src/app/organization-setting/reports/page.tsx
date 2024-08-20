"use client"
/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/spinner";
import { useGetAllReportsQuery, useDeleteReportsMutation } from "@/features/Organization-Setteings/reportApi";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "@/GlobalRedux/store";
import { toast } from "react-toastify";


const Report = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);

    const { data, error, isLoading, refetch } = useGetAllReportsQuery(null);
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
            <div className="lg:ml-[270px] mr-[5px]  grid justify-center items-center h-[650px] relative mt-10 overflow-x-auto bg-transparent sm:rounded-lg max-[1200px]:w-screen">
                <div className="flex justify-left gap-5 text-[23px] font-bold mb-5 ml-4">
                    <Link href="/organization-setting/reports" className="text-blue-500 underline">
                        Reports
                    </Link>
                    <Link href="/organization-setting/suggestions">
                        Suggestions
                    </Link>
                </div>
                <div className="overflow-auto relative shadow-md sm:rounded-lg">
                    <table className="w-[1000px] h-[600px] overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                        <tbody>
                        {
                        data?.data.content.map((notifi: Notifi, index: number) => (
                            <tr key={index} className="bg-white border-b  hover:bg-gray-50">
                                <th scope="row" className=" flex items-center px-6 py-4 h-full text-[25px] font-medium text-gray-900 whitespace-nowrap ">
                                    <div className="flex items-center gap-2 text-[15px] text-black ">
                                        <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                        <span className="grid">
                                            <p>{notifi.userFullName}</p>
                                            <p>ID: <span className="text-gray-400">{notifi.id}</span></p>
                                        </span>
                                    </div>
                                </th>
                                <td className="px-6 py-4 ">
                                     <img src={notifi.viewAttachment} alt="" />   
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="grid grid-cols-1 gap-3">

                                       {notifi.message}


                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="grid grid-cols-2 gap-3">

                                        <button onClick={()=>handleDelete(notifi.id)}><svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg></button>


                                    </div>
                                </td>
                            </tr>
                                                    ))
                                                }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Report;