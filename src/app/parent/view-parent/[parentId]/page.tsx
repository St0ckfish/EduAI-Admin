"use client"
import { useGetParentByIdQuery } from "@/features/User-Management/parentApi";
import CircleProgress from "@/components/circleProgress";
import ParentInfo from "@/components/parentInfo";
import Spinner from "@/components/spinner";
import { useEffect } from "react";

interface ViewParentProps {
  params: {
    parentId: string;
  };
}

const ViewParent: React.FC<ViewParentProps> = ({params}) => {
  const { data, error, isLoading } = useGetParentByIdQuery(params.parentId);

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
          <ParentInfo data={data} />
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