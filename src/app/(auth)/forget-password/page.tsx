"use client";
/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/spinner";
import {
  useFindAccountMutation,
  useSelectAccoutMutation,
} from "@/features/loginApi";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const ForgetPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [forgetPassword, { isLoading }] = useFindAccountMutation();
  const [selectAccount] = useSelectAccoutMutation();

  const onSubmit = async (data: any) => {
    try {
      const username = data.username;
      const result = await forgetPassword(username).unwrap();
      Cookie.set("userId", result.data.userId);
      Cookie.set("email", result.data.emails);
      const Email = Cookie.get("email");
      const UserId = Cookie.get("userId");
      await selectAccount({ id: UserId, email: Email }).unwrap();
      toast.success("Reset password email generated and sent successfully");
      router.replace("/otp");
    } catch (err) {
      toast.error("Failed to Find this username or Email");
    }
  };
  return (
    <>
      <div className="grid h-screen grid-cols-2 items-center justify-center bg-bgSecondary duration-300 ease-in max-[1040px]:grid-cols-1">
        <div className="gird items-center justify-center text-center">
          <div className="mb-10 grid">
            <h1 className="font-sans text-[28px] font-bold text-primary">
              Forgot Password
            </h1>
            <p className="font-sans text-[20px] font-semibold text-secondary">
              Enter your phone to get OTP.
            </p>
          </div>
          <div className="grid items-center justify-center">
            <form className="grid gap-10" onSubmit={handleSubmit(onSubmit)}>
              <label
                htmlFor="text"
                className="grid text-start font-sans text-[18px] font-semibold text-textSecondary"
              >
                Username | Email
                <input
                  id="text"
                  {...register("username", { required: true })}
                  placeholder="Usernamre | Email"
                  className={`w-[450px] rounded-xl border px-4 py-3 ${errors.username ? "border-warning" : "border-borderPrimary"} outline-none max-[471px]:w-[350px]`}
                  type="text"
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
                    Recovery code
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="flex h-full w-full justify-end">
          <div className="flex h-full w-[600px] items-center justify-end bg-[#2a3469] max-[1040px]:hidden">
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

export default ForgetPassword;
