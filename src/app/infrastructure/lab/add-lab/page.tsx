"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/spinner";
import { useCreateLabsMutation } from "@/features/Infrastructure/labApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";

const AddLab = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createBus, { isLoading }] = useCreateLabsMutation();

  const onSubmit = async (data: any) => {
    try {
      await createBus(data).unwrap();
      toast.success("Lab created successfully");
    } catch (err) {
      toast.error("Failed to create Lab");
    }
  };
  return (
    <>
      <div className="mr-[5px] grid h-[850px] items-center justify-center lg:ml-[270px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid items-center justify-center gap-5 rounded-xl bg-white p-10 sm:w-[500px] md:w-[600px] lg:w-[750px] xl:w-[1000px]">
            <div className="flex items-center justify-start gap-2">
              <svg
                className="h-6 w-6 font-bold text-[#526484] group-hover:text-[#3e5af0]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <line x1="3" y1="21" x2="21" y2="21" />{" "}
                <line x1="3" y1="10" x2="21" y2="10" />{" "}
                <polyline points="5 6 12 3 19 6" />{" "}
                <line x1="4" y1="10" x2="4" y2="21" />{" "}
                <line x1="20" y1="10" x2="20" y2="21" />{" "}
                <line x1="8" y1="14" x2="8" y2="17" />{" "}
                <line x1="12" y1="14" x2="12" y2="17" />{" "}
                <line x1="16" y1="14" x2="16" y2="17" />
              </svg>
              <h1 className="font-sans text-[22px] font-semibold">
                Lab Information
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="buildingNumber"
                className="grid font-sans text-[18px] font-semibold"
              >
                Building Number
                <input
                  id="buildingNumber"
                  {...register("buildingNumber", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.buildingNumber && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="roomNumber"
                className="grid font-sans text-[18px] font-semibold"
              >
                Room Number
                <input
                  id="roomNumber"
                  {...register("roomNumber", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.roomNumber && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="floorNumber"
                className="grid font-sans text-[18px] font-semibold"
              >
                Floor Number
                <input
                  id="floorNumber"
                  {...register("floorNumber", { required: true })}
                  type="number"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.floorNumber && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="type"
                className="grid font-sans text-[18px] font-semibold"
              >
                Type
                <input
                  id="type"
                  {...register("type", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.type && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="maxCapacity"
                className="grid font-sans text-[18px] font-semibold"
              >
                Max Capacity
                <input
                  id="maxCapacity"
                  {...register("maxCapacity", { required: true })}
                  type="number"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.maxCapacity && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="schoolId"
                className="grid font-sans text-[18px] font-semibold"
              >
                School Id
                <input
                  id="schoolId"
                  {...register("schoolId", { required: true })}
                  type="number"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.schoolId && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="labName"
                className="grid font-sans text-[18px] font-semibold"
              >
                Lab Name
                <input
                  id="labName"
                  {...register("labName", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.labName && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              <label
                htmlFor="labType"
                className="grid font-sans text-[18px] font-semibold"
              >
                Lab Type
                <input
                  id="labType"
                  {...register("labType", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.labType && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
            </div>

            <div className="flex justify-center text-center">
              {isLoading ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="w-[140px] rounded-xl bg-[#3E5AF0] px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
                >
                  Add Lab
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddLab;
