"use client"
/* eslint-disable @next/next/no-img-element */
import DriverInfo from "@/components/driverInfo";
import Spinner from "@/components/spinner";
import { useGetDriverByIdQuery } from "@/features/driverApi";
import { useEffect } from "react";

interface ViewDriverProps {
    params: {
        driverId: string;
    };
  }

const ViewDriver : React.FC<ViewDriverProps> = ({ params }) => {

    const { data, error, isLoading } = useGetDriverByIdQuery(params.driverId);
  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error) {
      console.error("Error:", error);
    }
  }, [data, error]);

  if (isLoading)
    return (
        <div className="h-screen w-full justify-center items-center flex ">
            <Spinner />
        </div>
);

  return (
    <>
      <div className="lg:ml-[290px] grid py-4 ">
        <div className="grid grid-cols-2 gap-7 max-[1342px]:grid-cols-1 max-[1342px]:px-5">
          <DriverInfo data={data} />
          <div className="grid gap-10 p-5 rounded-xl bg-white justify-center items-center h-[400px]">
          <div className="flex justify-between">
            <h1 className='font-sans text-gray-800 font-semibold'>Number of student in Bus</h1>
            <img src="/images/bus 1.png" alt="#" />
          </div>
          <div className="rounded-xl bg-white p-5 grid w-[500px] max-[1342px]:w-full">
                <div className="overflow-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] ">
                            <tr>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Full Name 
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                ID
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Address
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b  hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    Nahda
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    C45121
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    This is text
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    kdsk
                                </td>
                            </tr>
                            <tr className="bg-white border-b  hover:bg-gray-50">
                                
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    Nahda
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    C45121
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    This is text
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    sdsdd
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDriver;