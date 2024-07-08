/* eslint-disable react-hooks/rules-of-hooks */
"use client"
/* eslint-disable @next/next/no-img-element */
import { useState, useRef, ChangeEvent } from 'react';
import Spinner from "@/components/spinner";

const OTP = () => {
    const loading = false;

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = Array.from({ length: 6 }, () => useRef(null));

    const handleInput = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Check if the value is empty and index is greater than 0
        if (!value && index > 0) {
            // If the current input is empty, focus on the previous input
            inputRefs[index - 1].current.focus();
        } else if (value && index < inputRefs.length - 1) {
            // If the current input has a value and it's not the last input, focus on the next input
            inputRefs[index + 1].current.focus();
        }
    };
    console.log(otp);

    return (
        <>
            <div className="grid grid-cols-2 justify-center items-center ease-in duration-300 max-[1040px]:grid-cols-1 h-screen bg-white">
                <div className="gird justify-center items-center text-center">
                    <div className="grid mb-10">
                        <h1 className="font-bold text-[28px] font-sans text-[#041631]">Check your phone</h1>
                        <p className="text-[#526484] font-sans text-[20px] font-semibold">OTP code has been sent to 01522798716 </p>
                    </div>
                    <div className="grid justify-center items-center">
                        <form id="otp-form">
                            <div className="flex items-center justify-center gap-3 mb-12">
                                {otp.map((value, index) => (
                                    <input
                                        key={index}
                                        ref={inputRefs[index]}
                                        type="text"
                                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-white border-2 hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                        pattern="\d*"
                                        maxLength={1}
                                        value={value}
                                        onChange={(e) => handleInput(index, e)}
                                    />
                                ))}
                            </div>
                            {
                                loading ? <Spinner /> :
                                    <div className="grid gap-3 justify-center text-center">
                                        <button type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white font-bold text-[18px] w-[140px] ease-in duration-300">Verify</button>
                                        <button type="submit" className="px-4 py-2 rounded-xl border-2 border-[#3E5AF0] hover:shadow-xl text-[#3E5AF0] font-bold text-[18px] w-[140px] ease-in duration-300">Send Again</button>
                                    </div>
                            }
                        </form>
                    </div>
                </div>
                <div className="max-[1040px]:hidden flex justify-end">
                    <img className="w-[800px] h-[929px]" src="images/otp.png" alt="#" />
                </div>
            </div>
        </>
    );
}

export default OTP;