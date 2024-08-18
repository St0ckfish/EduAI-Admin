/* eslint-disable @next/next/no-img-element */
"use client"

import Spinner from "@/components/spinner";
import { useGetAchievementByIdQuery } from "@/features/Document-Management/achievementApi";
import Link from "next/link";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "@/GlobalRedux/store";
interface ViewDriverProps {
    params: {
        achievementId: string;
    };
}
const ViewAchievement: React.FC<ViewDriverProps> = ({ params }) => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const { data, error, isLoading } = useGetAchievementByIdQuery(params.achievementId);
    useEffect(() => {
        if (data) {
            console.log(data);
        }
        if (error) {
            console.error("Error:", error);
        }
    }, [data, error]);

    if (isLoading)
        return (
            <div className="h-screen w-full justify-center items-center flex ">
                <Spinner />
            </div>
        );
    return (
        <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"}`}>
            <div className="p-9 max-[505px]:p-2 rounded-xl bg-white grid justify-center items-center w-full h-full gap-4">
                <div className="flex justify-end w-full">
                    <Link href={data.data.fileViewDownload}>
                        <svg className="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </Link>
                </div>
                <div>
                    <img src={data.data.fileViewLink} alt="#" className="w-[1000px] " />
                </div>
            </div>
        </div>
    );
}

export default ViewAchievement;