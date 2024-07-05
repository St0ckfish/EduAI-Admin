/* eslint-disable @next/next/no-img-element */
'use client'
import Calendar from "@/components/calendar";
import Exams from "@/components/exams";
import DriverInfo from "@/components/driverInfo";
import DynamicPartition from "@/components/dynamicPartition";
import { useGetEmployeeByIdQuery } from "@/features/employeeApi";
import EmployeeInfo from "@/components/employeeInfo";
import { useEffect } from "react";
import Link from "next/link";
import Spinner from "@/components/spinner";

interface ViewEmployeeProps {
  params: {
    employeeId: string;
  };
}

const ViewEmployee: React.FC<ViewEmployeeProps> = ({ params }) => {
  const { data, error, isLoading } = useGetEmployeeByIdQuery(params.employeeId);
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
        <EmployeeInfo data={data}/>
          <div className="grid gap-10 p-5 rounded-xl bg-white justify-center items-center h-[400px]">
            <div className="grid justify-start">
              <h1 className='font-sans text-gray-800 font-semibold'>Available days of absence</h1>
              <h1 className='font-sans text-gray-400 font-semibold text-[14px]'>14 day in year</h1>
            </div>
            <DynamicPartition percentage={5} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewEmployee;