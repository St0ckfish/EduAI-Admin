"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateClasssMutation } from "@/features/Infrastructure/classApi";
import { toast } from "react-toastify";


const AddClass = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [createDriver, { isLoading }] = useCreateClasssMutation();

  const onSubmit = async (data: any) => {
    try {
      await createDriver(data).unwrap();
      toast.success('Class created successfully');
    } catch (err) {
        toast.error('Failed to create Class: you may enter data incorrectly ');
    }
  };

  return (
    <div className="lg:ml-[270px] mr-[5px] grid justify-center items-center h-[850px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid p-10 bg-white rounded-xl items-center justify-center xl:w-[1000px] lg:w-[750px] my-10 gap-5 md:w-[600px] sm:w-[500px]">
          <div className="flex items-center justify-start gap-2">
            <svg className="h-6 w-6 font-bold text-[#526484] group-hover:text-[#3e5af0]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="3" y1="21" x2="21" y2="21" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <polyline points="5 6 12 3 19 6" />
              <line x1="4" y1="10" x2="4" y2="21" />
              <line x1="20" y1="10" x2="20" y2="21" />
              <line x1="8" y1="14" x2="8" y2="17" />
              <line x1="12" y1="14" x2="12" y2="17" />
              <line x1="16" y1="14" x2="16" y2="17" />
            </svg>
            <h1 className="text-[22px] font-sans font-semibold">Class Information</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
            <label htmlFor="buildingNumber" className="grid text-[18px] font-sans font-semibold">
            Building Number
              <input id="buildingNumber" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("buildingNumber", { required: true })} />
              {errors.buildingNumber && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="roomNumber" className="grid text-[18px] font-sans font-semibold">
            Room Number
              <input id="roomNumber" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("roomNumber", { required: true })} />
              {errors.roomNumber && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="floorNumber" className="grid text-[18px] font-sans font-semibold">
            Floor Number
              <input id="floorNumber" type="number" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("floorNumber", { required: true })} />
              {errors.floorNumber && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="type" className="grid text-[18px] font-sans font-semibold">
            Type
              <input id="type" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("type", { required: true })} />
              {errors.type && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="maxCapacity" className="grid text-[18px] font-sans font-semibold">
            Max Capacity
              <input id="maxCapacity" type="number" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("maxCapacity", { required: true })} />
              {errors.maxCapacity && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="schoolId" className="grid text-[18px] font-sans font-semibold">
            School Id
              <input id="schoolId" type="number" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("schoolId", { required: true })} />
              {errors.schoolId && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="classroomName" className="grid text-[18px] font-sans font-semibold">
            Classroom Name
              <input id="classroomName" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("classroomName", { required: true })} />
              {errors.classroomName && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="classroomNumber" className="grid text-[18px] font-sans font-semibold">
            Classroom Number
              <input id="classroomNumber" type="number" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("classroomNumber", { required: true })} />
              {errors.classroomNumber && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="classroomStudyLevel" className="grid text-[18px] font-sans font-semibold">
            Classroom Study Level
              <input id="classroomStudyLevel" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("classroomStudyLevel", { required: true })} />
              {errors.classroomStudyLevel && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="classroomStudyStage" className="grid text-[18px] font-sans font-semibold">
            Classroom Study Stage
              <input id="classroomStudyStage" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("classroomStudyStage", { required: true })} />
              {errors.classroomStudyStage && <span className="text-red-600">This field is required</span>}
            </label>
          </div>
          
          <div className="flex justify-center text-center">
            <button disabled={isLoading} type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white text-[18px] w-[180px] ease-in duration-300">
              {isLoading ? " Adding..." : "Add Class"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddClass;
