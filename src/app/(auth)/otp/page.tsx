/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, useRef, ChangeEvent, RefObject, useEffect } from 'react';
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import { useSendOtpMutation, useSelectAccoutMutation } from "@/features/loginApi";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

const OTP = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(180);
    const inputRefs: RefObject<HTMLInputElement>[] = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
    const [sendOtp, { isLoading }] = useSendOtpMutation();

    useEffect(() => {
        const emailFromCookie = Cookie.get("email") || '';
        setEmail(emailFromCookie);

        const interval = setInterval(() => {
            setTimer(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleInput = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);       
        if (!value && index > 0) {
            inputRefs[index - 1].current?.focus();
        } else if (value && index < inputRefs.length - 1) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join('');

        try {
            await sendOtp({ code, email }).unwrap();
            Cookie.set("otp", code);
            toast.success("OTP verified successfully!");
            router.replace("/new-password");
        } catch (error) {
            toast.error("Failed to verify OTP. Please try again.");
        }
    };
    const [selectAccount] = useSelectAccoutMutation();
    const SendOtpAgian = async () => {
        const UserId = Cookie.get("userId")
        await selectAccount ({ id: UserId, email:email }).unwrap();
        toast.success("Reset password email generated and sent successfully");
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <>
            <div className="grid grid-cols-2 justify-center items-center ease-in duration-300 max-[1040px]:grid-cols-1 h-screen bg-white">
                <div className="grid justify-center items-center text-center">
                    <div className="grid mb-10">
                        <h1 className="font-bold text-[28px] font-sans text-[#041631]">Check your Email</h1>
                        <p className="text-[#526484] font-sans text-[20px] font-semibold">{`OTP code has been sent to ${email}`}</p>
                    </div>
                    <div className="grid justify-center items-center">
                        <form id="otp-form" onSubmit={handleSubmit}>
                            <div className="flex items-center justify-center gap-3 mb-12">
                                {otp.map((value, index) => (
                                    <input
                                        key={index}
                                        ref={inputRefs[index]}
                                        type="text"
                                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-white border-2 hover:border-slate-200 appearance-none rounded-lg p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                        pattern="\d*"
                                        maxLength={1}
                                        value={value}
                                        onChange={(e) => handleInput(index, e)}
                                        required
                                    />
                                ))}
                            </div>
                            {
                                isLoading ? <Spinner /> :
                                    <div className="grid gap-3 justify-center text-center">
                                        <button type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white font-bold text-[18px] w-[140px] ease-in duration-300">Verify</button>
                                        <p className="text-[#e44f4f] font-sans text-[17px] font-semibold">{`${formatTime(timer)}`}</p>
                                        <button onClick={()=> {SendOtpAgian(); setTimer(180);}} type="button" className="px-4 py-2 rounded-xl border-2 border-[#3E5AF0] hover:shadow-xl text-[#3E5AF0] font-bold text-[18px] w-[140px] ease-in duration-300">Send Again</button>
                                    </div>
                            }
                        </form>
                    </div>
                </div>
                <div className="max-[1040px]:hidden flex justify-end">
                    <img className="w-[800px] h-[929px]" src="images/otp.png" alt="OTP Illustration" />
                </div>
            </div>
        </>
    );
}

export default OTP;
