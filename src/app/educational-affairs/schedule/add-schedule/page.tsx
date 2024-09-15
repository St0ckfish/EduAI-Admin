"use client";

import { FieldValues, useForm } from "react-hook-form";
import { useCreateSchedualMutation } from "@/features/Acadimic/scheduleApi";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

const AddSchedule = () => {
  const { register, handleSubmit, reset } = useForm();

  const [createSchedule, { isLoading: isCreating }] =
    useCreateSchedualMutation();

  const onSubmitCreateSchedule: SubmitHandler<FieldValues> = async data => {
    try {
      await createSchedule({
        classroomId: data.classroomId,
        teacherId: data.teacherId,
        courseId: data.courseId,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
      }).unwrap();
      toast.success("Schedule Created Successfully");
      reset();
    } catch (error) {
      toast.error("Error creating schedule");
      console.error("Error creating schedule:", error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitCreateSchedule)}
        className="mr-3 space-y-4 lg:ml-[270px]"
      >
        <div>
          <label>Classroom ID</label>
          <input
            {...register("classroomId", { required: true })}
            placeholder="Enter Classroom ID"
            className="w-full rounded border border-borderPrimary px-4 py-2"
          />
        </div>
        <div>
          <label>Teacher ID</label>
          <input
            {...register("teacherId", { required: true })}
            placeholder="Enter Teacher ID"
            className="w-full rounded border border-borderPrimary px-4 py-2"
          />
        </div>
        <div>
          <label>Course ID</label>
          <input
            {...register("courseId", { required: true })}
            placeholder="Enter Course ID"
            className="w-full rounded border border-borderPrimary px-4 py-2"
          />
        </div>
        <div>
          <label>Day</label>
          <input
            {...register("day", { required: true })}
            placeholder="Enter Day"
            className="w-full rounded border border-borderPrimary px-4 py-2"
          />
        </div>
        <div>
          <label>Start Time</label>
          <input
            {...register("startTime", { required: true })}
            placeholder="HH:mm:ss"
            className="w-full rounded border border-borderPrimary px-4 py-2"
            type="time"
          />
        </div>
        <div>
          <label>End Time</label>
          <input
            {...register("endTime", { required: true })}
            placeholder="HH:mm:ss"
            className="w-full rounded border border-borderPrimary px-4 py-2"
            type="time"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`rounded bg-blue-500 px-4 py-2 text-white ${isCreating ? "opacity-50" : ""}`}
            disabled={isCreating}
          >
            {isCreating ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddSchedule;
