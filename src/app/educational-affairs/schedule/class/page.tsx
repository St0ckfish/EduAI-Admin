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
import BreadCrumbs from "@/components/BreadCrumbs";

const ClassSchedule = () => {
  const breadcrumbs = [
    {
      nameEn: "Academic",
      nameAr: "أكاديمي",
      nameFr: "Académique",
      href: "/",
    },
    {
      nameEn: "Educational Affairs",
      nameAr: "الشئون التعليمية",
      nameFr: "Affaires éducatives",
      href: "/educational-affairs",
    },
    {
      nameEn: "Schedule",
      nameAr: "الجدول",
      nameFr: "Emploi du temps",
      href: "/educational-affairs/schedule",
    },
    {
      nameEn: "Class",
      nameAr: "فصل",
      nameFr: "Classe",
      href: "/educational-affairs/schedule/class",
    },
  ];
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const [teacherId, setTeacherId] = useState(null);

  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = data => {
    setTeacherId(data.teacherId);
  };
  const { data, isLoading } = useGetAllClassScheduleQuery(teacherId, {
    skip: !teacherId,
  });

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />{" "}
      <div
        className={` ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mt-7`}
      >
        <div className="my-12 mr-5 flex justify-between max-[540px]:my-1 max-[540px]:mr-0 max-[540px]:grid max-[540px]:justify-center">
          <div className="ml-2 flex items-center justify-start gap-3 text-xl font-semibold max-[540px]:mb-2 max-[540px]:ml-0 max-[540px]:justify-center">
            <Link href="/educational-affairs/schedule">Teacher</Link>
            <Link
              className="text-blue-500 underline"
              href="/educational-affairs/schedule/class"
            >
              Class
            </Link>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="justify-center gap-3 max-[540px]:grid"
          >
            <input
              {...register("teacherId", { required: true })}
              placeholder="Enter Class ID"
              className="mr-3 rounded border border-borderPrimary px-4 py-2 outline-none"
            />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Load Schedule
            </button>
          </form>
        </div>
        {isLoading && <Spinner />}
        <TimeTable
          scheduleData={data?.data?.content ? data?.data?.content : []}
        />
      </div>
    </>
  );
};

export default ClassSchedule;
