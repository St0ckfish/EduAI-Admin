"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import Spinner from "@/components/spinner";
import { useCreateWorkersMutation } from "@/features/User-Management/workerApi";
import { useGetAllNationalitysQuery } from "@/features/signupApi";
import { toast } from "react-toastify";


const AddNewWorker = () => {
  const { data: nationalityData, error: nationalityError, isLoading: nationalityLoading } = useGetAllNationalitysQuery(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [createWorker, { isLoading, isSuccess, isError, error }] = useCreateWorkersMutation();

  const onSubmit = async (data: any) => {
    try {
      await createWorker(data).unwrap();
      toast.success('Wroker created successfully');
    } catch (err) {
        toast.error('Failed to create Wroker:  you may enter the passord incorrectly');
    }
  };

  if (nationalityLoading)
    return (
      <div className="h-screen w-full justify-center items-center flex ">
        <Spinner />
      </div>
    );

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
            <h1 className="text-[22px] font-sans font-semibold">Worker Information</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
            <label htmlFor="username" className="grid text-[18px] font-sans font-semibold">
            Username
              <input id="username" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("username", { required: true })} />
              {errors.username && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="email" className="grid text-[18px] font-sans font-semibold">
              Email
              <input id="email" type="email" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("email", { required: true })} />
              {errors.email && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="password" className="grid text-[18px] font-sans font-semibold">
            Password
              <input id="password" type="password" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("password", { required: true })} />
              {errors.password && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="nid" className="grid text-[18px] font-sans font-semibold">
              NID
              <input id="nid" type="number" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("nid", { required: true })} />
              {errors.nid && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="gender" className="grid text-[18px] font-sans font-semibold">
              Gender
              <select id="gender" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("gender", { required: true })}>
                <option selected value="">Select gender </option>
                <option  value="MALE">Male </option>
                <option  value="FEMALE">Female </option>
              </select>
              {errors.gender && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="religion" className="grid text-[18px] font-sans font-semibold">
            Religion
              <select id="religion" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("religion", { required: true })}>
                <option selected value="">Select religion </option>
                <option  value="MUSLIM">Muslim </option>
                <option  value="CHRISTIAN">Christian </option>
                <option  value="OTHERS">Others </option>
              </select>
              {errors.religion && <span className="text-red-600">This field is required</span>}
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
            <label htmlFor="nationality" className="grid text-[18px] font-sans font-semibold">
              Your Nationality
              <select id="nationality" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("nationality", { required: true })}>
                <option value="">Select Nationality</option>
                {nationalityData && Object.entries(nationalityData.data).map(([key, value]) => (
                  <option key={key} value={key}>
                    {String(value)}
                  </option>
                ))}
              </select>
              {errors.nationality && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="regionId" className="grid text-[18px] font-sans font-semibold">
            RegionId
              <input id="fatherName" type="number" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("regionId", { required: true })} />
              {errors.regionId && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="name_en" className="grid text-[18px] font-sans font-semibold">
            name_en
              <input id="name_en" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("name_en", { required: true })} />
              {errors.name_en && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="name_en" className="grid text-[18px] font-sans font-semibold">
            name_ar
              <input id="name_ar" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("name_ar", { required: true })} />
              {errors.name_ar && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="name_fr" className="grid text-[18px] font-sans font-semibold">
            name_fr
              <input id="name_fr" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("name_fr", { required: true })} />
              {errors.name_fr && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="about" className="grid text-[18px] font-sans font-semibold">
            about
              <input id="about" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("about", { required: true })} />
              {errors.about && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="birthDate" className="grid text-[18px] font-sans font-semibold">
              Date Of Birth
              <input id="birthDate" type="date" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("birthDate", { required: true })} />
              {errors.birthDate && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="qualification" className="grid items-center text-[18px] font-sans font-semibold mt-4">
                <select defaultValue="" id="qualification" {...register("qualification", { required: true })} className="w-[400px] h-[55px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]">
                    <option selected value="">Select religion </option>
                    <option  value="HIGH_SCHOOL_DIPLOMA">High School Diploma </option>
                    <option  value="MASTER_DEGREE">Master Degree </option>
                    <option  value="BACHELOR_DEGREE">Bachelor Degree </option>
                    <option  value="DOCTORATE_DEGREE">Doctorate Degree </option>
                </select>
                {errors.qualification && <span className="text-[#e81123] text-[18px]">Qualification is Required</span>}
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
            <label htmlFor="hireDate" className="grid text-[18px] font-sans font-semibold">
            hireDate
              <input id="hireDate" type="date" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("hireDate", { required: true })} />
              {errors.hireDate && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="number" className="grid text-[18px] font-sans font-semibold">
              Mobile
              <input id="number" type="number" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("number", { required: true })} />
              {errors.number && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="positionId" className="grid text-[18px] font-sans font-semibold">
            positionId
              <input id="positionId" type="number" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("positionId", { required: true })} />
              {errors.positionId && <span className="text-red-600">This field is required</span>}
            </label>
            <label htmlFor="salary" className="grid text-[18px] font-sans font-semibold">
            salary
              <input id="salary" type="number" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("salary", { required: true })} />
              {errors.salary && <span className="text-red-600">This field is required</span>}
            </label>
          </div>
          <div className="flex justify-center text-center">
            <button disabled={isLoading} type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white text-[18px] w-[180px] ease-in duration-300">
              {isLoading ? " Adding..." : "Add Worker"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddNewWorker;
