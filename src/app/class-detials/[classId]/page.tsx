import Calendar from "@/components/calendar";
import CircleProgress from "@/components/circleProgress";

interface ViewDriverProps {
    params: {
        classId: string;
    };
  }
const classDetails: React.FC<ViewDriverProps> = ({params}) => {

    return (
        <>
            <div className="lg:ml-[290px] mt-16 grid justify-center lg:mr-32">
                {params.classId}
                <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 justify-center">
                    <div className="grid gap-2 justify-center">
                        <div className="flex justify-center items-center p-2 rounded-xl bg-white shadow-xl gap-2 w-[200px] h-[130px]"></div>
                        <div className="flex justify-center items-center p-2 rounded-xl bg-white shadow-xl gap-2 w-[300px] h-[330px]">
                            <CircleProgress percentage={75}/>
                        </div>
                        <div className="flex justify-center items-center p-2 rounded-xl bg-white shadow-xl gap-2 w-[200px] h-[250px]"></div>
                        
                    </div>
                    <div className="grid gap-2 justify-center">
                        <div className="flex justify-center items-center p-2 rounded-xl bg-white shadow-xl gap-2 w-[200px] h-[130px]"></div>
                        <div className="flex justify-center items-center p-2 rounded-xl bg-white shadow-xl gap-2 w-[200px] h-[250px]"></div>

                    </div>
                    <div className="grid justify-center">
                        <Calendar/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default classDetails;