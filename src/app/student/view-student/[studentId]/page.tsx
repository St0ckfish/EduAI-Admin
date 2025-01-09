"use client";
import Calendar from "@/components/calendar";
import Exams from "@/components/exams";
import Spinner from "@/components/spinner";
import StudentInfo from "@/components/studentInfo";
import { useGetStudentByIdQuery } from "@/features/User-Management/studentApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import Container from "@/components/Container";

interface ViewStudentProps {
  params: {
    studentId: string;
  };
}

const ViewStudent: React.FC<ViewStudentProps> = ({ params }) => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  const { data, error, isLoading } = useGetStudentByIdQuery(params.studentId);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  
  }, [data, error]);

  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );

  if (loading || isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <Container>
        <div className="grid grid-cols-2 gap-7 pr-7 max-[1342px]:grid-cols-1 max-[1342px]:px-5">
          <StudentInfo data={data} />
          <div className="grid gap-10">
            <Calendar />
            <Exams />
          </div>
        </div>
        </Container>
  );
};

export default ViewStudent;
