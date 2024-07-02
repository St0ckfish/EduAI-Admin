"use client"
/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/spinner";
import { useForm } from "react-hook-form";
import { useRef, useEffect, useState } from "react";
import { useLoginDashboardMutation } from "@/features/loginApi";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

const Login = () => {
    const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginDashboard, { isLoading, error }] = useLoginDashboardMutation();

  const onSubmit = async (data: any) => {
    try {
      const result = await loginDashboard(data).unwrap();
      console.log("Login success:", result);
      const token = result.token;
      Cookie.set("token", result.data);
      toast.success("Login Success");
      router.replace("/");
    } catch (err) {
      toast.error("Failed to login");
      console.error("Failed to login:", err);
    }
  };

    return (
        <>
            <div className="grid grid-cols-2 justify-center items-center ease-in duration-300 max-[1040px]:grid-cols-1 h-screen bg-white">
                <div className="gird justify-center items-center text-center">
                <div>
                    <img className=" absolute top-5 left-5" src="images/logo.png" alt="#" />
                </div>
                    <div className="grid mb-10">
                        <h1 className="font-bold text-[28px] font-sans text-[#041631]">Log in</h1>
                        <p className="text-[#526484] font-sans text-[20px] font-semibold">To access your account</p>
                    </div>
                    <div className="grid justify-center items-center">
                        <form className="grid gap-10" onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="email" className="grid text-[#041631] text-start text-[18px] font-sans font-semibold">
                                Your Email
                                <input id="email" {...register("username", { required: true })} placeholder="Enter Your Email" className={`w-[450px] py-3 px-4 rounded-xl border ${errors.username ? "border-[#d74f41]" : "border-zinc-300"}  outline-none max-[471px]:w-[350px]`} type="email" />
                                {errors.username && <span className="text-[#e81123] text-[13px]">Email is Required</span>}
                            </label>
                            <label htmlFor="password" className="grid text-[#041631] text-start text-[18px] font-sans font-semibold">
                                Your Password
                                <input id="password" {...register("password", { required: true })} placeholder="Enter Your Password" className={`w-[450px] py-3 px-4 rounded-xl border ${errors.password ? "border-[#d74f41]" : "border-zinc-300"}  outline-none max-[471px]:w-[350px]`} type="password" />
                                {errors.password && <span className="text-[#e81123] text-[13px]">Password is Required</span>}

                            </label>
                            <div className="flex text-end justify-end">
                                <a href="/forget-password" className="flex text-[12px] text-[#526484] font-medium font-sans hover:underline ">Forgot password ?</a>
                            </div>

                            {/* <Spinner/> */}
                            <div className="flex justify-center text-center">
                                <button disabled={isLoading} type="submit" className="px-4 py-2 rounded-xl bg-[#367aff] hover:bg-[#4a5cc5] hover:shadow-xl text-white font-bold text-[18px] w-[450px] max-[471px]:w-[350px] ease-in duration-300">{isLoading ? " Loading..." : "Login"}</button>
                            </div>
                            {error && (
                                <p className="text-[#e81123]">
                                Username or Password are not valid!
                                </p>
                            )}
                            <div className="flex text-center justify-center items-center gap-2">
                                <p className=" text-[#526484] font-medium font-sans">Need an account?</p>
                                <a href="/signup" className="flex text-[#367aff] font-medium font-sans hover:underline ">Create Account</a>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="max-[1040px]:hidden">
                    <img className="w-[800px] h-[928px]" src="images/loginbg.png" alt="#" />
                </div>
            </div>
        </>
    );
}

export default Login;