/* eslint-disable @next/next/no-img-element */
import Calendar from "@/components/calendar";
import Exams from "@/components/exams";
import DriverInfo from "@/components/driverInfo";
import DynamicPartition from "@/components/dynamicPartition";
import EmployeeInfo from "@/components/employeeInfo";

const ViewEmployee = () => {

  return (
    <>
      <div className="lg:ml-[290px] grid py-4 ">
        <div className="grid grid-cols-2 gap-7 max-[1342px]:grid-cols-1 max-[1342px]:px-5">
          <EmployeeInfo />
          <div className="grid gap-10 p-5 rounded-xl bg-white justify-center items-center h-[600px]">
          <div className="flex justify-between">
            <h1 className='font-sans text-gray-800 font-semibold'>Number of student in Bus</h1>
          </div>
          <DynamicPartition percentage={5} />

            </div>
          </div>
        </div>
    </>
  );
}

export default ViewEmployee;