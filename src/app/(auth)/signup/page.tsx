/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client"
import Spinner from "@/components/spinner";
import { useForm } from "react-hook-form";
import { useGetAllNationalitysQuery, useSignupApiDashboardMutation, useGetAllReginionIDQuery } from "@/features/signupApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

const signup = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const handleNext = () => setStep(step + 1);
    const handlePrevious = () => setStep(step - 1);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginDashboard, { isLoading, error }] = useSignupApiDashboardMutation();
    const { data: nationalityData, error: nationalityError, isLoading: nationalityLoading } = useGetAllNationalitysQuery(null);
    const { data: rigiond } = useGetAllReginionIDQuery(null);

    useEffect(() => {
        if (nationalityData) {
            console.log("Response Data:", nationalityData);
        }
        if (nationalityError) {
            console.log("Error:", nationalityError);
        }
    }, [nationalityData, nationalityError]);

    const onSubmit = async (data: any) => {
        try {
            const result = await loginDashboard(data).unwrap();
            console.log("Account maked success:", result);
            toast.success("Account created Success");
            router.replace("/login");
        } catch (err: any) {
            toast.error(err.data.message);
            console.error("Failed to make account:", err);
        }
    };
    useEffect(() => {
        if (
            errors.username ||
            errors.email ||
            errors.password ||
            errors.nid ||
            errors.regionId ||
            errors.gender ||
            errors.religion ||
            errors.number ||
            errors.nationality ||
            errors.employeeType ||
            errors.qualification ||
            errors.birthDate ||
            errors.name_en ||
            errors.name_ar ||
            errors.name_fr ||
            errors.schoolId ||
            errors.about
        ) {
            toast.warn("Please Complete all inputs");
        }
    }, [
        errors.username,
        errors.email,
        errors.password,
        errors.nid,
        errors.regionId,
        errors.gender,
        errors.religion,
        errors.number,
        errors.nationality,
        errors.employeeType,
        errors.qualification,
        errors.birthDate,
        errors.name_en,
        errors.name_ar,
        errors.name_fr,
        errors.schoolId,
        errors.about
    ]);

    if (nationalityLoading)
        return (
            <div className="grid grid-cols-2 justify-center items-center ease-in duration-300 max-[1040px]:grid-cols-1 h-screen bg-white">
                <Spinner />
            </div>
        );

    return (
        <>
            <div className="grid grid-cols-2 justify-center items-center ease-in duration-300 max-[1040px]:grid-cols-1 h-screen bg-white px-4">
                <div className="gird justify-center items-center text-center">
                    <div>
                        <img className=" absolute top-5 left-5" src="images/logo.png" alt="#" />
                    </div>
                    <div className="grid mb-5">
                        <h1 className="font-bold text-[28px] font-sans text-[#041631]">Sign Up</h1>
                        <p className="text-[#526484] font-sans text-[20px] font-semibold">Sign up to enjoy the application</p>
                    </div>
                    <div className="grid justify-center items-center ">
                        <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
                            {step === 1 && (
                                <div className="grid grid-cols-1 gap-3 w-full">
                                    <label htmlFor="username" className="grid text-[#9a9a9a] text-start text-[15px] w-full font-sans font-semibold">
                                        <input id="username" {...register("username", { required: true })} placeholder=" username" className={` py-3 px-4 rounded-xl border ${errors.username ? "border-[#d74f41]" : "border-zinc-300"}  outline-none w-[400px] max-[458px]:w-[350px]`} type="text" />
                                        {errors.username && <span className="text-[#e81123] text-[13px]">Username is Required</span>}
                                    </label>
                                    <label htmlFor="email" className="grid text-[#9a9a9a] text-start text-[15px] w-full font-sans font-semibold">
                                        <input id="email" {...register("email", { required: true })} placeholder=" email" className={` py-3 px-4 rounded-xl border ${errors.email ? "border-[#d74f41]" : "border-zinc-300"}  outline-none w-[400px] max-[458px]:w-[350px]`} type="email" />
                                        {errors.email && <span className="text-[#e81123] text-[13px]">Email is Required</span>}
                                    </label>
                                    <label htmlFor="password" className="grid text-[#9a9a9a] text-start text-[15px] w-full font-sans font-semibold">
                                        <input id="password" {...register("password", { required: true })} placeholder=" password" className={` py-3 px-4 rounded-xl border ${errors.password ? "border-[#d74f41]" : "border-zinc-300"}  outline-none w-[400px] max-[458px]:w-[350px]`} type="password" />
                                        {errors.password && <span className="text-[#e81123] text-[13px]">Password is Required</span>}
                                    </label>
                                    <label htmlFor="nid" className="grid text-[#9a9a9a] text-start text-[15px] w-full font-sans font-semibold">
                                        <input id="nid" {...register("nid", { required: true })} placeholder=" NID" className={` py-3 px-4 rounded-xl border ${errors.nid ? "border-[#d74f41]" : "border-zinc-300"}  outline-none w-[400px] max-[458px]:w-[350px]`} type="number" />
                                        {errors.nid && <span className="text-[#e81123] text-[13px]">NID is Required</span>}
                                    </label>
                                    <div className="flex justify-end gap-3 w-full mt-12">
                                        <p className="px-3 py-2 rounded-xl bg-white flex gap-2 w-[120px] text-[#367aff] border border-[#e6e8e7] font-semibold items-center justify-center cursor-no-drop ">
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="15 6 9 12 15 18" /></svg>
                                            Previous
                                        </p>
                                        <button className="px-3 py-2 rounded-xl bg-[#367aff] w-[120px] flex gap-2 text-white font-semibold items-center justify-center hover:bg-[#4a5cc5] hover:shadow-xl ease-in duration-300" onClick={handleNext}>
                                            Next
                                            <svg className="h-5 w-5 " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polyline points="9 18 15 12 9 6" /></svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                            {step === 2 && (
                                <div className="grid grid-cols-1 gap-3">
                                    <label htmlFor="regionId" className="grid text-[#9a9a9a] text-start text-[15px] font-sans font-semibold">
                                        <select defaultValue="" id="regionId" {...register("regionId", { required: true })} className={`border ${errors.regionId ? "border-[#d74f41]" : "border-zinc-300"} text-[#9a9a9a] text-sm outline-none rounded-xl w-[400px] max-[458px]:w-[350px] h-full py-3 px-4 `}>
                                            <option selected value="">Select Region Id </option>
                                            {rigiond &&
                                                rigiond.data.map((rigion: { id: string | number | readonly string[] | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                                                    <option key={index} value={rigion.id}>
                                                        {rigion.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {errors.regionId && <span className="text-[#e81123] text-[13px]">regionId is Required</span>}
                                    </label>
                                    <label htmlFor="gender" className="grid text-[#9a9a9a] text-start text-[15px] font-sans font-semibold">
                                        <select defaultValue="" id="gender" {...register("gender", { required: true })} className={`border ${errors.gender ? "border-[#d74f41]" : "border-zinc-300"} text-[#9a9a9a] text-sm outline-none rounded-xl h-full py-3 px-4 w-[400px] max-[458px]:w-[350px]`}>
                                            <option selected value="">Select gender </option>
                                            <option value="MALE">Male </option>
                                            <option value="FEMALE">Female </option>
                                        </select>
                                        {errors.gender && <span className="text-[#e81123] text-[13px]">Gender is Required</span>}
                                    </label>
                                    <label htmlFor="religion" className="grid text-[#9a9a9a] text-start text-[15px] font-sans font-semibold">
                                        <select defaultValue="" id="religion" {...register("religion", { required: true })} className={`border ${errors.religion ? "border-[#d74f41]" : "border-zinc-300"} text-[#9a9a9a] text-sm outline-none rounded-xl h-full py-3 px-4 w-[400px] max-[458px]:w-[350px]`}>
                                            <option selected value="">Select religion </option>
                                            <option value="MUSLIM">Muslim </option>
                                            <option value="CHRISTIAN">Christian </option>
                                            <option value="OTHERS">Others </option>
                                        </select>
                                        {errors.religion && <span className="text-[#e81123] text-[13px]">Religion is Required</span>}
                                    </label>
                                    <label htmlFor="number" className="grid text-[#9a9a9a] text-start text-[15px] font-sans font-semibold">
                                        <input id="number" {...register("number", { required: true })} placeholder=" number" className={` py-3 px-4 rounded-xl border ${errors.number ? "border-[#d74f41]" : "border-zinc-300"}  outline-none w-[400px] max-[458px]:w-[350px]`} type="number" />
                                        {errors.number && <span className="text-[#e81123] text-[13px]">number is Required</span>}
                                    </label>
                                    <div className="flex justify-end gap-3 w-full mt-12">
                                        <button className="px-3 py-2 rounded-xl bg-[#367aff] w-[120px] flex gap-2 text-white font-semibold items-center justify-center hover:bg-[#4a5cc5] hover:shadow-xl ease-in duration-300" onClick={handlePrevious}>
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="15 6 9 12 15 18" /></svg>
                                            Previous
                                        </button>
                                        <button className="px-3 py-2 rounded-xl bg-[#367aff] w-[120px] flex gap-2 text-white font-semibold items-center justify-center hover:bg-[#4a5cc5] hover:shadow-xl ease-in duration-300" onClick={handleNext}>
                                            Next
                                            <svg className="h-5 w-5 " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polyline points="9 18 15 12 9 6" /></svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                            {step === 3 && (
                                <div className="grid grid-cols-1 gap-3">
                                    <label htmlFor="nationality" className="grid text-[#9a9a9a] text-start text-[15px] font-sans font-semibold">
                                        <select defaultValue="" id="nationality" {...register("nationality", { required: true })} className={`border ${errors.nationality ? "border-[#d74f41]" : "border-zinc-300"} text-[#9a9a9a] text-sm outline-none rounded-xl w-[400px] max-[458px]:w-[350px] h-full py-3 px-4 `}>
                                            <option selected value="">Select Nationality </option>
                                            {nationalityData &&
                                                Object.entries(nationalityData.data).map(([key, value]) => (
                                                    <option key={String(value)} value={key}>
                                                        {String(value)}
                                                    </option>
                                                ))}
                                        </select>
                                        {errors.nationality && <span className="text-[#e81123] text-[13px]">Nationality is Required</span>}
                                    </label>
                                    <label htmlFor="employeeType" className="grid text-[#9a9a9a] text-start text-[15px] font-sans font-semibold">

                                        <select defaultValue="" id="religion" {...register("employeeType", { required: true })} className={`border ${errors.employeeType ? "border-[#d74f41]" : "border-zinc-300"} text-[#9a9a9a] text-sm outline-none  w-[400px] max-[458px]:w-[350px] rounded-xl h-full py-3 px-4 `}>
                                            <option selected value="">Select religion </option>
                                            <option value="EMPLOYEE">Employee </option>
                                            <option value="DRIVER">Driver </option>
                                            <option value="WORKER">Worker </option>
                                        </select>
                                        {errors.employeeType && <span className="text-[#e81123] text-[13px]">Employee Type is Required</span>}
                                    </label>
                                    <label htmlFor="qualification" className="grid text-[#9a9a9a] text-start text-[15px] font-sans font-semibold">

                                        <select defaultValue="" id="qualification" {...register("qualification", { required: true })} className={`border ${errors.qualification ? "border-[#d74f41]" : "border-zinc-300"} text-[#9a9a9a] text-sm outline-none w-[400px] max-[458px]:w-[350px] rounded-xl h-full py-3 px-4 `}>
                                            <option selected value="">Select religion </option>
                                            <option value="HIGH_SCHOOL_DIPLOMA">High School Diploma </option>
                                            <option value="MASTER_DEGREE">Master Degree </option>
                                            <option value="BACHELOR_DEGREE">Bachelor Degree </option>
                                            <option value="DOCTORATE_DEGREE">Doctorate Degree </option>
                                        </select>
                                        {errors.qualification && <span className="text-[#e81123] text-[13px]">Qualification is Required</span>}
                                    </label>
                                    <label htmlFor="birthDate" className="grid text-[#9a9a9a] text-start text-[15px] font-sans font-semibold">

                                        <input id="birthDate" {...register("birthDate", { required: true })} placeholder=" NID" className={`w-[400px] max-[458px]:w-[350px] py-3 px-4 rounded-xl border ${errors.birthDate ? "border-[#d74f41]" : "border-zinc-300"}  outline-none`} type="date" />
                                        {errors.birthDate && <span className="text-[#e81123] text-[13px]">birthDate is Required</span>}
                                    </label>
                                    <div className="flex justify-end gap-3 w-full mt-12">
                                        <button className="px-3 py-2 rounded-xl bg-[#367aff] w-[120px] flex gap-2 text-white font-semibold items-center justify-center hover:bg-[#4a5cc5] hover:shadow-xl ease-in duration-300" onClick={handlePrevious}>
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="15 6 9 12 15 18" /></svg>
                                            Previous
                                        </button>
                                        <button className="px-3 py-2 rounded-xl bg-[#367aff] w-[120px] flex gap-2 text-white font-semibold items-center justify-center hover:bg-[#4a5cc5] hover:shadow-xl ease-in duration-300" onClick={handleNext}>
                                            Next
                                            <svg className="h-5 w-5 " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polyline points="9 18 15 12 9 6" /></svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                            {step === 4 && (
                                <div className="grid grid-cols-1 gap-3">
                                    <label htmlFor="name_en" className="grid text-[#9a9a9a] text-start text-[15px] font-sans font-semibold">

                                        <input id="name_en" {...register("name_en", { required: true })} placeholder=" English Name" className={`w-[400px] py-3 px-4 rounded-xl border ${errors.name_en ? "border-[#d74f41]" : "border-zinc-300"}  outline-none max-[458px]:w-[350px]`} type="text" />
                                        {errors.name_en && <span className="text-[#e81123] text-[13px]">English Name is Required</span>}
                                    </label>
                                    <label htmlFor="name_ar" className="grid text-[#9a9a9a] text-start text-[15px] font-sans font-semibold">

                                        <input id="name_ar" {...register("name_ar", { required: true })} placeholder=" Arabic Name" className={`w-[400px] py-3 px-4 rounded-xl border ${errors.name_ar ? "border-[#d74f41]" : "border-zinc-300"}  outline-none max-[458px]:w-[350px]`} type="text" />
                                        {errors.name_ar && <span className="text-[#e81123] text-[13px]">Arabic Name is Required</span>}
                                    </label>
                                    <label htmlFor="name_fr" className="grid text-[#9a9a9a] text-start text-[15px] font-sans font-semibold">

                                        <input id="name_fr" {...register("name_fr", { required: true })} placeholder=" French Name" className={`w-[400px] py-3 px-4 rounded-xl border ${errors.name_fr ? "border-[#d74f41]" : "border-zinc-300"}  outline-none max-[458px]:w-[350px]`} type="text" />
                                        {errors.name_fr && <span className="text-[#e81123] text-[13px]">French Name is Required</span>}
                                    </label>
                                    <label htmlFor="schoolId" className="grid text-[#9a9a9a] text-start text-[15px] font-sans font-semibold">

                                        <input id="schoolId" {...register("schoolId", { required: true })} placeholder=" schoolId" className={`w-[400px] py-3 px-4 rounded-xl border ${errors.schoolId ? "border-[#d74f41]" : "border-zinc-300"}  outline-none max-[458px]:w-[350px]`} type="number" />
                                        {errors.schoolId && <span className="text-[#e81123] text-[13px]">schoolId is Required</span>}
                                    </label>
                                    <label htmlFor="about" className="grid text-[#9a9a9a] text-start text-[15px] font-sans font-semibold w-full">
                                        Your about
                                        <textarea id="about" {...register("about", { required: true })} placeholder=" about" className={`w-[400px] max-[458px]:w-[350px] py-3 px-4 rounded-xl border ${errors.about ? "border-[#d74f41]" : "border-zinc-300"}  outline-none `} />
                                        {errors.about && <span className="text-[#e81123] text-[13px]">about is Required</span>}
                                    </label>
                                    <div className="flex justify-end gap-3 w-full mt-12">
                                        <button className="px-3 py-2 rounded-xl bg-[#367aff] w-[120px] flex gap-2 text-white font-semibold items-center justify-center hover:bg-[#4a5cc5] hover:shadow-xl ease-in duration-300" onClick={handlePrevious}>
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="15 6 9 12 15 18" /></svg>
                                            Previous
                                        </button>
                                    <button disabled={isLoading} type="submit" className="px-3 py-2 rounded-xl bg-[#367aff] w-[120px] flex gap-2 text-white font-semibold items-center justify-center hover:bg-[#4a5cc5] hover:shadow-xl ease-in duration-300">{isLoading ? " Loading..." : "SignUp"}</button>
                                    </div>
                                </div>
                            )}
                            {error && (
                                <p className="text-[#e81123] font-semibold">
                                    You may not have completed the data or entered it correctly!
                                </p>
                            )}
                            <div className="flex text-center justify-center items-center gap-2 mt-4">
                                <p className=" text-[#526484] font-medium font-sans">Already have an account?</p>
                                <a href="/login" className="flex text-[#367aff] font-medium font-sans hover:underline ">Login</a>
                            </div>
                        </form>
                    </div>
                </div >
                <div className="max-[1040px]:hidden flex justify-end">
                    <img className="w-[600px] h-[928px]" src="images/signup.png" alt="#" />
                </div>
            </div >
        </>
    );
}

export default signup;