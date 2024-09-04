/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Password = () => {
  return (
    <>
      <div className="mt-7 lg:ml-[270px]">
        <div className="grid h-full w-full rounded-xl bg-bgPrimary p-7">
          <div>
            <div className="justify-left mb-5 ml-4 flex gap-5 text-[18px] font-semibold">
              <Link href="/profile">My Profile</Link>
              <Link
                href="/profile/password"
                className="text-blue-500 underline"
              >
                Password
              </Link>
            </div>
          </div>
          <div className=" text-semibold mt-5 flex h-full w-full rounded-xl border-2 border-borderPrimary p-5">
            <div className="grid w-full gap-2">
              <div className="grid justify-center">
                <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                  <label
                    htmlFor="name"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    Current Password
                    <input
                      id="name"
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label
                    htmlFor="about"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    New Password
                    <input
                      id="about"
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                  <label
                    htmlFor="code"
                    className="grid font-sans text-[18px] font-semibold"
                  >
                    Confirm Password
                    <input
                      id="code"
                      type="text"
                      className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                    />
                  </label>
                </div>
                <div className="mt-7 flex justify-between">
                  <button className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl">
                    Save
                  </button>
                  <button className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl border border-primary px-4 py-2 text-[18px] font-semibold text-primary duration-300 ease-in hover:shadow-xl">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Password;
