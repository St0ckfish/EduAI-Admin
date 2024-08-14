/* eslint-disable @next/next/no-img-element */
"use client"

import Spinner from "@/components/spinner";
import { useGetCertificateByIdQuery } from "@/features/Document-Management/certificatesApi";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "@/GlobalRedux/store";
interface ViewDriverProps {
    params: {
        certificateID: string;
    };
}
const ViewCertificate: React.FC<ViewDriverProps> = ({ params }) => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const { data, error, isLoading } = useGetCertificateByIdQuery(params.certificateID);
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
        <div className={`${booleanValue ?  "lg:ml-[100px]" : "lg:ml-[270px]"}`}>
            <div className="p-9 max-[505px]:p-2 rounded-xl bg-white grid justify-center items-center w-full h-full gap-4">
                <div>
                </div>
            </div>
        </div>
    );
}

export default ViewCertificate;