"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import Spinner from "@/components/spinner";
import { useCreateAchievementsMutation } from "@/features/Document-Management/achievementApi";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';

const AddNewAchievement = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createCertificate, { isLoading }] = useCreateAchievementsMutation();

    const onSubmit = async (formData: any) => {
        const data = new FormData();
        data.append('certificate', JSON.stringify({
            studentId: formData.studentId,
            stage: formData.stage,
            issueDate: formData.issueDate,
            subject: formData.subject
        }));
        data.append('file', formData.endDate[0]); // Assuming 'endDate' is the file input

        try {
            await createCertificate(data).unwrap();
            toast.success('Certificate created successfully');
        } catch (err) {
            toast.error('Failed to create Certificate');
        }
    };

    return (
        <>
            <div className={` ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mr-[5px] grid justify-center items-center h-[850px]`}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid p-10 bg-white rounded-xl items-center justify-center xl:w-[1000px] lg:w-[750px] xl:h-[800px] h-[900px] gap-5 md:w-[600px] sm:w-[500px]">
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
                            <h1 className="text-[22px] font-sans font-semibold">Achievement Certificates</h1>
                        </div>
                        <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                            <label htmlFor="studentId" className="grid text-[18px] font-sans font-semibold">
                                Student Id
                                <input id="studentId" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("studentId", { required: true })} />
                                {errors.studentId && <span className="text-red-600">This field is required</span>}
                            </label>
                            <label htmlFor="stage" className="grid text-[18px] font-sans font-semibold">
                                Educational stage
                                <input id="stage" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("stage", { required: true })} />
                                {errors.stage && <span className="text-red-600">This field is required</span>}
                            </label>
                            <label htmlFor="subject" className="grid text-[18px] font-sans font-semibold">
                            Subject
                                <input id="stage" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("subject", { required: true })} />
                                {errors.subject && <span className="text-red-600">This field is required</span>}
                            </label>
                            <label htmlFor="issueDate" className="grid text-[18px] font-sans font-semibold">
                                Graduation Semester
                                <input id="issueDate" type="date" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("issueDate", { required: true })} />
                                {errors.issueDate && <span className="text-red-600">This field is required</span>}
                            </label>
                            <label htmlFor="endDate" className="grid text-[18px] font-sans font-semibold">
                                Document
                                <input id="endDate" type="file" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" {...register("endDate", { required: true })} />
                                {errors.endDate && <span className="text-red-600">This field is required</span>}
                            </label>
                        </div>

                        <div className="flex justify-center text-center">
                            {
                                isLoading ? <Spinner /> :
                                    <button type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white text-[18px] w-[140px] ease-in duration-300">Save</button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddNewAchievement;
