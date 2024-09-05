"use client";
/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/spinner";
import { useResetPasswordMutation } from "@/features/loginApi";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const code = Cookie.get("otp");
  const email = Cookie.get("email");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const password = data.password;

    try {
      await resetPassword({ code, email, password }).unwrap();
      toast.success("Password Reseted successfully");
      Cookie.remove("otp");
      Cookie.remove("email");
      Cookie.remove("userId");
      router.replace("/login");
    } catch (error) {
      toast.error(`${(error as any).data.message}`);
    }
  };
  return (
    <>
      <div className="grid h-screen grid-cols-2 items-center justify-center bg-bgSecondary duration-300 ease-in max-[1040px]:grid-cols-1">
        <div className="gird items-center justify-center text-center">
          <div className="mb-10 grid">
            <h1 className="font-sans text-[28px] font-bold text-primary">
              Reset your password
            </h1>
            <p className="font-sans text-[20px] font-semibold text-secondary">
              Enter new password
            </p>
          </div>
          <div className="grid items-center justify-center">
            <form className="grid gap-10" onSubmit={handleSubmit(onSubmit)}>
              <label
                htmlFor="password"
                className="grid text-start font-sans text-[18px] font-semibold text-textSecondary"
              >
                New password
                <input
                  {...register("password", { required: true })}
                  id="password"
                  placeholder="Enter you new password"
                  className={`w-[450px] rounded-xl border px-4 py-3 ${errors.username ? "border-warning" : "border-borderPrimary"} outline-none max-[471px]:w-[350px]`}
                  type="password"
                />
                {errors.username && (
                  <span className="text-[13px] text-error">
                    Email is Required
                  </span>
                )}
              </label>
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="flex justify-center text-center">
                  <button
                    type="submit"
                    className="w-[170px] rounded-xl bg-primary px-4 py-2 text-[18px] font-bold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
                  >
                    Reset password
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="flex w-full justify-end h-full">
          <div className="flex justify-end max-[1040px]:hidden bg-[#2a3469] h-full items-center w-[600px]">
            <img
              className="h-[300px] w-[500px] -translate-x-[260px]"
              src="images/forget.png"
              alt="#"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
