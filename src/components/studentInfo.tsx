/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import CircleProgress from "./circleProgress";
import DynamicPartition from "./dynamicPartition";

const StudentInfo = ({data}:{data:any}) => {

    
    return ( 
        <>
            <div className="grid bg-white rounded-xl p-5 ">

                <div className="flex justify-between">
                    <h1 className='font-sans text-gray-800 font-semibold'>Student Information</h1>
                    <Link href="/student">
                        <svg className="h-6 w-6 text-gray-800"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </Link>
                </div>

                <div className="grid justify-center text-center items-center">
                {
                    data.data.picture == null ?
                    <img src="/images/userr.png" className="w-[120px] h-[120px] mr-2 rounded-full" alt="#" />
                    :
                    <img src={data.data.picture} className="w-[120px] h-[120px] mr-2 rounded-full" alt="#" />
                }
                    <h1 className='font-sans text-gray-800 font-semibold'>{data.data.name}</h1>
                    <p className='font-sans text-gray-800 font-semibold'> <span className='font-sans text-gray-400 font-semibold'>Student ID :</span>{data.data.id}</p>
                </div>

                <div className="grid justify-start">
                    <h1 className='font-sans text-[22px] text-gray-800 font-semibold'>Basic Details</h1>
                    <div className="grid grid-cols-2 w-[400px] max-[485px]:w-[240px]">
                    <h3 className='font-sans text-gray-400 font-semibold'>Date Of Birth:</h3>
                    <p className='font-sans text-gray-800 font-semibold'>{data.data.birthDate}</p>
                    <h3 className='font-sans text-gray-400 font-semibold'>Email:</h3>
                        <p className='font-sans text-gray-800 font-semibold'>{data.data.email}</p>
                        <h3 className='font-sans text-gray-400 font-semibold'>Gender:</h3>
                        <p className='font-sans text-gray-800 font-semibold'>{data.data.gender}</p>
                        <h3 className='font-sans text-gray-400 font-semibold'>nationality:</h3>
                        <p className='font-sans text-gray-800 font-semibold'>{data.data.nationality}</p>
                        <h3 className='font-sans text-gray-400 font-semibold'>role:</h3>
                        <p className='font-sans text-gray-800 font-semibold'>{data.data.role}</p>
                        <h3 className='font-sans text-gray-400 font-semibold'>Date Of Birth:</h3>
                        <p className='font-sans text-gray-800 font-semibold'>02/05/2012</p>
                        <h3 className='font-sans text-gray-400 font-semibold'>Religion:</h3>
                        <p className='font-sans text-gray-800 font-semibold'>Islam</p>
                        <h3 className='font-sans text-gray-400 font-semibold'>Address:</h3>
                        <p className='font-sans text-gray-800 font-semibold'>13,street, Zamalk,Cairo</p>
                        <h3 className='font-sans text-gray-400 font-semibold'>Email:</h3>
                        <p className='font-sans text-gray-800 font-semibold'>Ahmed.M.Sayed@gmail.com</p>
                        <h3 className='font-sans text-gray-400 font-semibold'>Mobile:</h3>
                        <p className='font-sans text-gray-800 font-semibold'>01220145607</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 mt-4'>
                    <p className='font-sans text-[20px] text-gray-800 font-semibold'>About the student:</p>
                    <p className='font-sans text-[16px] text-gray-400 font-semibold mb-5'>{data.data.about}</p>
                    <p className='font-sans text-[20px] text-gray-800 font-semibold'>Certification:</p>
                    <p className='font-sans text-[16px] text-gray-400 font-semibold'>2021-2022 <br /> He got first place in the school</p>
                </div>

            </div>
        </>
    );
}
 
export default StudentInfo;