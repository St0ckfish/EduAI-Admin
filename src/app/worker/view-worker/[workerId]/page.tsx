"use client";
/* eslint-disable @next/next/no-img-element */
import DynamicPartition from "@/components/dynamicPartition";
import Spinner from "@/components/spinner";
import WorkerInfo from "@/components/workerInfo";
import { useGetWorkerByIdQuery } from "@/features/User-Management/workerApi";
import { useEffect } from "react";
interface ViewWorkerProps {
  params: {
    workerId: string;
  };
}
const ViewWorker: React.FC<ViewWorkerProps> = ({ params }) => {
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
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="grid py-4 lg:ml-[290px]">
        <div className="grid grid-cols-2 gap-7 max-[1342px]:grid-cols-1 max-[1342px]:px-5">
          <WorkerInfo data={data} />
          <div className="grid h-[400px] items-center justify-center gap-10 rounded-xl bg-bgPrimary p-5">
            <div className="grid justify-start">
              <h1 className="font-sans font-semibold text-textPrimary">
                Available days of absence
              </h1>
              <h1 className="font-sans text-[14px] font-semibold text-textSecondary">
                14 day in year
              </h1>
            </div>
            <DynamicPartition percentage={5} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewWorker;
