import Calendar from "@/components/calendar";
import CircleProgress from "@/components/circleProgress";

interface ViewDriverProps {
  params: {
    classId: string;
  };
}
const classDetails: React.FC<ViewDriverProps> = ({ params }) => {
  return (
    <>
      <div className="mt-16 grid justify-center lg:ml-[290px] lg:mr-32">
        {params.classId}
        <div className="grid justify-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          <div className="grid justify-center gap-2">
            <div className="flex h-[130px] w-[200px] items-center justify-center gap-2 rounded-xl bg-white p-2 shadow-xl"></div>
            <div className="flex h-[330px] w-[300px] items-center justify-center gap-2 rounded-xl bg-white p-2 shadow-xl">
              <CircleProgress percentage={75} />
            </div>
            <div className="flex h-[250px] w-[200px] items-center justify-center gap-2 rounded-xl bg-white p-2 shadow-xl"></div>
          </div>
          <div className="grid justify-center gap-2">
            <div className="flex h-[130px] w-[200px] items-center justify-center gap-2 rounded-xl bg-white p-2 shadow-xl"></div>
            <div className="flex h-[250px] w-[200px] items-center justify-center gap-2 rounded-xl bg-white p-2 shadow-xl"></div>
          </div>
          <div className="grid justify-center">
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
};

export default classDetails;
