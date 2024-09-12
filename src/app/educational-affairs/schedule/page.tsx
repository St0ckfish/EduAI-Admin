"use client";

import { FieldValues, useForm } from "react-hook-form";
import {
  useCreateSchedualMutation,
  useGetAllTeacherScheduleQuery,
  useUpdateSchedualMutation
} from "@/features/Acadimic/scheduleApi";
import { RootState } from "@/GlobalRedux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import TimeTable from "@/components/TimeTable";
import { SubmitHandler } from "react-hook-form";
import Spinner from "@/components/spinner";
import Link from "next/link";
import BreadCrumbs from "@/components/BreadCrumbs";
import Modal from "@/components/model";
import { toast } from "react-toastify";

const Schedule = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);

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
  ];
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const [teacherId, setTeacherId] = useState(null);

  const { register, handleSubmit, reset } = useForm();
  const { data, isLoading, refetch } = useGetAllTeacherScheduleQuery(teacherId, {
    skip: !teacherId,
  });

  const [createSchedule, { isLoading: isCreating }] = useCreateSchedualMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setTeacherId(data.teacherId);

    // Handling the API call for creating the schedule
    try {
      await createSchedule({
        classroomId: data.classroomId,
        teacherId: data.teacherId,
        courseId: data.courseId,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
      }).unwrap();
      refetch();
      reset(); // reset form fields after submission
      setModalOpen(false); // close modal on success
      toast.success("Event Cteated")
    } catch (error) {
      console.error("Error creating schedule:", error);
      toast.error("faild to create event")
    }
  };

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div className={` ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mt-7`}>
        <div className="flex justify-between my-12 mr-5 max-[540px]:grid max-[540px]:justify-center max-[540px]:mr-0 max-[540px]:my-1">
          <div className="flex gap-3 items-center justify-start ml-2 font-semibold text-xl max-[540px]:justify-center max-[540px]:ml-0 max-[540px]:mb-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleModalOpen}>
              Add Event
            </button>
            <Link className="text-blue-500 underline" href="/educational-affairs/schedule">Teacher</Link>
            <Link href="/educational-affairs/schedule/class">Class</Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="max-[540px]:grid justify-center gap-3">
            <input
              {...register("teacherId", { required: true })}
              placeholder="Enter Teacher ID"
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
      
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Classroom ID</label>
            <input
              {...register("classroomId", { required: true })}
              placeholder="Enter Classroom ID"
              className="w-full px-4 py-2 border border-borderPrimary rounded"
            />
          </div>
          <div>
            <label>Teacher ID</label>
            <input
              {...register("teacherId", { required: true })}
              placeholder="Enter Teacher ID"
              className="w-full px-4 py-2 border border-borderPrimary rounded"
            />
          </div>
          <div>
            <label>Course ID</label>
            <input
              {...register("courseId", { required: true })}
              placeholder="Enter Course ID"
              className="w-full px-4 py-2 border border-borderPrimary rounded"
            />
          </div>
          <div>
            <label>Day</label>
            <input
              {...register("day", { required: true })}
              placeholder="Enter Day"
              className="w-full px-4 py-2 border border-borderPrimary rounded"
            />
          </div>
          <div>
            <label>Start Time</label>
            <input
              {...register("startTime", { required: true })}
              placeholder="HH:mm:ss"
              className="w-full px-4 py-2 border border-borderPrimary rounded"
              type="time"
            />
          </div>
          <div>
            <label>End Time</label>
            <input
              {...register("endTime", { required: true })}
              placeholder="HH:mm:ss"
              className="w-full px-4 py-2 border border-borderPrimary rounded"
              type="time"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleModalClose}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-500 text-white rounded ${isCreating ? "opacity-50" : ""}`}
              disabled={isCreating}
            >
              {isCreating ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Schedule;
