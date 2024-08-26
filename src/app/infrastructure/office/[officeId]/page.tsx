"use client";
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from "@/components/spinner";
import { useGetOfficeByIdQuery, useUpdateOfficesMutation } from "@/features/Infrastructure/officeApi";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
interface ViewEmployeeProps {
    params: {
      officeId: string;
    };
  }

const EditOfficd: React.FC<ViewEmployeeProps> = ({params}) => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);

    const [createDriver, { isLoading: isUpdating }] = useUpdateOfficesMutation();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { data, isLoading: isG } = useGetOfficeByIdQuery(params.officeId);

  useEffect(() => {
    if (data) {
        setValue("buildingNumber", data?.data.buildingNumber);
        setValue("floorNumber", data?.data.floorNumber);
        setValue("officeName", data?.data.officeName);
        setValue("officeType", data?.data.officeType);
        setValue("maxCapacity", data?.data.maxCapacity);
        setValue("roomNumber", data?.data.roomNumber);
        setValue("type", data?.data.type);
    }
  }, [data, setValue]);

  const onSubmit = async (data: any) => {
    try {
      await createDriver({ formData: data, id: params.officeId }).unwrap();
      toast.success("Driver Updated successfully");
    } catch (err) {
      toast.error(
        "Failed to Update Driver"
      );
    }
  };

  if (isG || isUpdating)
    return (
      <div className="h-screen w-full justify-center items-center flex ">
        <Spinner />
      </div>
    );
    return (
        <>
            <div className="lg:ml-[270px] mr-[5px] grid justify-center items-center h-[850px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid p-10 bg-white rounded-xl items-center justify-center xl:w-[1000px] lg:w-[750px] gap-5 md:w-[600px] sm:w-[500px]">
                        <div className="flex items-center justify-start gap-2">
                            <svg className="h-6 w-6 font-bold text-[#526484] group-hover:text-[#3e5af0]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="3" y1="21" x2="21" y2="21" />  <line x1="3" y1="10" x2="21" y2="10" />  <polyline points="5 6 12 3 19 6" />  <line x1="4" y1="10" x2="4" y2="21" />  <line x1="20" y1="10" x2="20" y2="21" />  <line x1="8" y1="14" x2="8" y2="17" />  <line x1="12" y1="14" x2="12" y2="17" />  <line x1="16" y1="14" x2="16" y2="17" /></svg>
                            <h1 className="text-[22px] font-sans font-semibold">Office Information</h1>
                        </div>
                        <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                            <label htmlFor="buildingNumber" className="grid text-[18px] font-sans font-semibold">
                            Building Number
                                <input id="buildingNumber" {...register("buildingNumber", { required: true })}  type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                {errors.buildingNumber && <span className="text-red-600">This field is required</span>}
                            </label>
                            <label htmlFor="roomNumber" className="grid text-[18px] font-sans font-semibold">
                            Room Number
                                <input id="roomNumber" {...register("roomNumber", { required: true })}  type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                {errors.roomNumber && <span className="text-red-600">This field is required</span>}
                            </label>                            
                            <label htmlFor="floorNumber" className="grid text-[18px] font-sans font-semibold">
                            Floor Number
                                <input id="floorNumber" {...register("floorNumber", { required: true })}  type="number" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                {errors.floorNumber && <span className="text-red-600">This field is required</span>}
                            </label>                            
                            <label htmlFor="type" className="grid text-[18px] font-sans font-semibold">
                            Type
                                <input id="type" {...register("type", { required: true })}  type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                {errors.type && <span className="text-red-600">This field is required</span>}
                            </label>                            
                            <label htmlFor="maxCapacity" className="grid text-[18px] font-sans font-semibold">
                            Max Capacity
                                <input id="maxCapacity" {...register("maxCapacity", { required: true })}  type="number" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                {errors.maxCapacity && <span className="text-red-600">This field is required</span>}
                            </label>                            
                            <label htmlFor="schoolId" className="grid text-[18px] font-sans font-semibold">
                            School Id
                                <input id="schoolId" {...register("schoolId", { required: true })}  type="number" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                {errors.schoolId && <span className="text-red-600">This field is required</span>}
                            </label>                            
                            <label htmlFor="officeName" className="grid text-[18px] font-sans font-semibold">
                            Office Name
                                <input id="officeName" {...register("officeName", { required: true })}  type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                {errors.officeName && <span className="text-red-600">This field is required</span>}
                            </label>                            
                            <label htmlFor="officeType" className="grid text-[18px] font-sans font-semibold">
                            Office Type
                                <input id="officeType" {...register("officeType", { required: true })}  type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                                {errors.officeType && <span className="text-red-600">This field is required</span>}
                            </label>                        
                        </div>
                        
                        
                        <div className="flex justify-center text-center">
                            {
                                isG? <Spinner/> :
                            <button type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white  text-[18px] w-[140px] ease-in duration-300">Edit Lab</button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditOfficd;