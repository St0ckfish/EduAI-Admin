/* eslint-disable @next/next/no-img-element */
import Calendar from "@/components/calendar";
import Exams from "@/components/exams";
import DriverInfo from "@/components/driverInfo";
import DynamicPartition from "@/components/dynamicPartition";
import WorkerInfo from "@/components/workerInfo";

const ViewWorker = () => {

  return (
    <>
<div className="lg:ml-[290px] grid py-4 ">
        <div className="grid grid-cols-2 gap-7 max-[1342px]:grid-cols-1 max-[1342px]:px-5">
          <DriverInfo />
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