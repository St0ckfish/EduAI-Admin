"use client";
/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form";
import { useLoginDashboardMutation } from "@/features/loginApi";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginDashboard, { isLoading, error }] = useLoginDashboardMutation();

  const onSubmit = async (data: any) => {
    try {
      const result = await loginDashboard(data).unwrap();
      console.log("Login success:", result);
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
      <div className="grid h-screen grid-cols-2 items-center justify-center bg-white duration-300 ease-in max-[1040px]:grid-cols-1">
        <div className="gird items-center justify-center text-center">
          <div>
            <img
              className="absolute left-5 top-5"
              src="images/logo.png"
              alt="#"
            />
          </div>
          <div className="mb-10 grid">
            <h1 className="font-sans text-[28px] font-bold text-[#041631]">
              Log in
            </h1>
            <p className="font-sans text-[20px] font-semibold text-[#526484]">
              To access your account
            </p>
          </div>
          <div className="grid items-center justify-center">
            <form className="grid gap-10" onSubmit={handleSubmit(onSubmit)}>
              <label
                htmlFor="email"
                className="grid text-start font-sans text-[18px] font-semibold text-[#041631]"
              >
                Your Email
                <input
                  id="email"
                  {...register("username", { required: true })}
                  placeholder="Enter Your Email"
                  className={`w-[450px] rounded-xl border px-4 py-3 ${errors.username ? "border-[#d74f41]" : "border-zinc-300"} outline-none max-[471px]:w-[350px]`}
                />
                {errors.username && (
                  <span className="text-[13px] text-[#e81123]">
                    Email is Required
                  </span>
                )}
              </label>
              <label
                htmlFor="password"
                className="grid text-start font-sans text-[18px] font-semibold text-[#041631]"
              >
                Your Password
                <input
                  id="password"
                  {...register("password", { required: true })}
                  placeholder="Enter Your Password"
                  className={`w-[450px] rounded-xl border px-4 py-3 ${errors.password ? "border-[#d74f41]" : "border-zinc-300"} outline-none max-[471px]:w-[350px]`}
                  type="password"
                />
                {errors.password && (
                  <span className="text-[13px] text-[#e81123]">
                    Password is Required
                  </span>
                )}
              </label>
              <div className="flex justify-end text-end">
                <a
                  href="/forget-password"
                  className="flex font-sans text-[12px] font-medium text-[#526484] hover:underline"
                >
                  Forgot password ?
                </a>
              </div>

              {/* <Spinner/> */}
              <div className="flex justify-center text-center">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-[450px] rounded-xl bg-[#367aff] px-4 py-2 text-[18px] font-bold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl max-[471px]:w-[350px]"
                >
                  {isLoading ? " Loading..." : "Login"}
                </button>
              </div>
              {error && (
                <p className="font-semibold text-[#e81123]">
                  Username or Password are not valid!
                </p>
              )}
              <div className="flex items-center justify-center gap-2 text-center">
                <p className="font-sans font-medium text-[#526484]">
                  Need an account?
                </p>
                <a
                  href="/signup"
                  className="flex font-sans font-medium text-[#367aff] hover:underline"
                >
                  Create Account
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-end max-[1040px]:hidden">
          <img
            className="h-[928px] w-[800px]"
            src="images/signin.png"
            alt="#"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
