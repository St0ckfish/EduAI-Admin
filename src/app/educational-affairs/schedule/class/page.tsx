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

  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />{" "}
      <div
        className={` ${
          currentLanguage === "ar"
            ? booleanValue
              ? "lg:mr-[100px]"
              : "lg:mr-[270px]"
            : booleanValue
              ? "lg:ml-[100px]"
              : "lg:ml-[270px]"
        } mt-7`}
      >
        <div className="my-12 mr-5 flex justify-between max-[540px]:my-1 max-[540px]:mr-0 max-[540px]:grid max-[540px]:justify-center">
          <div className="ml-2 flex items-center justify-start gap-3 text-xl font-semibold max-[540px]:mb-2 max-[540px]:ml-0 max-[540px]:justify-center">
            <Link href="/educational-affairs/schedule">
              {currentLanguage === "ar"
                ? "معلم"
                : currentLanguage === "fr"
                  ? "Enseignant"
                  : "Teacher"}
            </Link>
            <Link
              className="text-blue-500 underline"
              href="/educational-affairs/schedule/class"
            >
              {currentLanguage === "ar"
                ? "الصف"
                : currentLanguage === "fr"
                  ? "Classe"
                  : "Class"}
            </Link>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="justify-center gap-3 max-[540px]:grid"
          >
            <input
              {...register("teacherId", { required: true })}
              placeholder={
                currentLanguage === "ar"
                  ? "أدخل معرف الصف"
                  : currentLanguage === "fr"
                    ? "Entrez l'ID de la classe"
                    : "Enter Class ID"
              }
              className="mr-3 rounded border border-borderPrimary px-4 py-2 outline-none"
            />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              {currentLanguage === "ar"
                ? "تحميل الجدول"
                : currentLanguage === "fr"
                  ? "Charger l'emploi du temps"
                  : "Load Schedule"}
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
