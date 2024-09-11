"use client";

import { FieldValues, useForm } from "react-hook-form";
import { useGetAllClassScheduleQuery } from "@/features/Acadimic/scheduleApi";
import { RootState } from "@/GlobalRedux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import TimeTable from "@/components/TimeTable";
import { SubmitHandler } from "react-hook-form";
import Spinner from "@/components/spinner";
import Link from "next/link";

const ClassSchedule = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const [teacherId, setTeacherId] = useState(null);

  const { register, handleSubmit } = useForm();


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setTeacherId(data.teacherId);
  };
  const { data, isLoading } = useGetAllClassScheduleQuery(teacherId, {
    skip: !teacherId,
  });

  return (
    <>
      <div className={` ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mt-7`}>
        <div className="flex justify-between my-12 mr-5 max-[540px]:grid max-[540px]:justify-center max-[540px]:mr-0 max-[540px]:my-1">
          <div className="flex gap-3 items-center justify-start ml-2 font-semibold text-xl max-[540px]:justify-center max-[540px]:ml-0 max-[540px]:mb-2">
            <Link href="/educational-affairs/schedule">Teacher</Link>
            <Link className="text-blue-500 underline" href="/educational-affairs/schedule/class">Class</Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="max-[540px]:grid justify-center gap-3">
            <input
              {...register("teacherId", { required: true })}
              placeholder="Enter Class ID"
              className="mr-3 px-4 py-2 border border-borderPrimary rounded outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Load Schedule
            </button>
          </form>
        </div>
        {isLoading && <Spinner />}
        <TimeTable scheduleData={data?.data?.content ? data?.data?.content : []} />
      </div>
    </>
  );
};

export default ClassSchedule;