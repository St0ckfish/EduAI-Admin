"use client"
import Calendar from "@/components/calendar";
import Exams from "@/components/exams";
import Spinner from "@/components/spinner";
import StudentInfo from "@/components/studentInfo";
import { useGetStudentByIdQuery } from "@/features/User-Management/studentApi";
import { useEffect } from "react";

interface ViewStudentProps {
  params: {
    studentId: string;
  };
}

const ViewStudent: React.FC<ViewStudentProps> = ({params}) => {

  const { data, error, isLoading } = useGetStudentByIdQuery(params.studentId);

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
          <StudentInfo data={data} />
          <div className="grid gap-10">
            <Calendar />
            <Exams/>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewStudent;
