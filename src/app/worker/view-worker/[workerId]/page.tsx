"use client"
/* eslint-disable @next/next/no-img-element */
import DynamicPartition from "@/components/dynamicPartition";
import Spinner from "@/components/spinner";
import WorkerInfo from "@/components/workerInfo";
import { useGetWorkerByIdQuery } from "@/features/workerApi";
import { useEffect } from "react";
interface ViewWorkerProps {
  params: {
    workerId: string;
  };
}
const ViewWorker : React.FC<ViewWorkerProps> = ({ params })=> {

  const { data, error, isLoading } = useGetWorkerByIdQuery(params.workerId);
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
          <WorkerInfo data={data} />
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

export default ViewWorker;