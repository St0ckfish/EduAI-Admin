import Calendar from "@/components/calendar";
import Exams from "@/components/exams";
import StudentInfo from "@/components/studentInfo";
import CircleProgress from "@/components/circleProgress";

const ViewParent = () => {

  return (
    <>
      <div className="lg:ml-[290px] grid py-4 ">
        <div className="grid grid-cols-2 gap-7 max-[1342px]:grid-cols-1 max-[1342px]:px-5">
          <StudentInfo />
          <div className="grid gap-10 p-5 rounded-xl bg-white justify-center items-center h-[400px]">
          <div className="flex justify-start">
            <h1 className='font-sans text-gray-800 font-semibold'>Feed</h1>
          </div>
          <CircleProgress percentage={75}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewParent;