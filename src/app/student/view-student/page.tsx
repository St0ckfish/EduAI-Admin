import Calendar from "@/components/calendar";
import Exams from "@/components/exams";
import StudentInfo from "@/components/studentInfo";

const ViewStudent = () => {

  return (
    <>
      <div className="lg:ml-[290px] grid py-4 ">
        <div className="grid grid-cols-2 gap-7 max-[1342px]:grid-cols-1 max-[1342px]:px-5">
          <StudentInfo />
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
