/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef, ChangeEvent, RefObject, useEffect } from "react";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import {
  useSendOtpMutation,
  useSelectAccoutMutation,
} from "@/features/loginApi";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

const OTP = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(180);
  const inputRefs: RefObject<HTMLInputElement>[] = Array.from(
    { length: 6 },
    () => useRef<HTMLInputElement>(null),
  );
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  useEffect(() => {
    const emailFromCookie = Cookie.get("email") || "";
    setEmail(emailFromCookie);

    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
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
    const code = otp.join("");

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
    const UserId = Cookie.get("userId");
    await selectAccount({ id: UserId, email: email }).unwrap();
    toast.success("Reset password email generated and sent successfully");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <div className="grid h-screen grid-cols-2 items-center justify-center bg-bgSecondary duration-300 ease-in max-[1040px]:grid-cols-1">
        <div className="grid items-center justify-center text-center">
          <div className="mb-10 grid">
            <h1 className="font-sans text-[28px] font-bold text-primary">
              Check your Email
            </h1>
            <p className="font-sans text-[20px] font-semibold text-secondary">{`OTP code has been sent to ${email}`}</p>
          </div>
          <div className="grid items-center justify-center">
            <form id="otp-form" onSubmit={handleSubmit}>
              <div className="mb-12 flex items-center justify-center gap-3">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    className="h-14 w-14 appearance-none rounded-lg border-2 bg-bgSecondary p-4 text-center text-2xl font-extrabold text-textPrimary outline-none hover:border-borderPrimary focus:border-indigo-400 focus:bg-bgPrimary focus:ring-2 focus:ring-indigo-100"
                    pattern="\d*"
                    maxLength={1}
                    value={value}
                    onChange={e => handleInput(index, e)}
                    required
                  />
                ))}
              </div>
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="grid justify-center gap-3 text-center">
                  <button
                    type="submit"
                    className="w-[140px] rounded-xl bg-primary px-4 py-2 text-[18px] font-bold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
                  >
                    Verify
                  </button>
                  <p className="font-sans text-[17px] font-semibold text-warning">{`${formatTime(timer)}`}</p>
                  <button
                    onClick={() => {
                      SendOtpAgian();
                      setTimer(180);
                    }}
                    type="button"
                    className="w-[140px] rounded-xl border-2 border-primary px-4 py-2 text-[18px] font-bold text-primary duration-300 ease-in hover:shadow-xl"
                  >
                    Send Again
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="flex justify-end max-[1040px]:hidden">
          <img
            className="h-[929px] w-[800px]"
            src="images/otp.png"
            alt="OTP Illustration"
          />
        </div>
      </div>
    </>
  );
};

export default OTP;
