"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";

const Reviews = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  return (
    <>
      <div
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} relative mr-[5px] mt-10 h-screen overflow-x-auto bg-transparent sm:rounded-lg`}
      >
        <div className="justify-left mb-[40px] ml-4 mt-[20px] flex gap-5 text-[23px] font-semibold">
          <Link href="/post-management">Post</Link>
          <Link
            href="/post-management/reviews"
            className="text-blue-500 underline"
          >
            Reviews
          </Link>
        </div>
        <div className="grid w-full justify-center overflow-x-auto">
          <div className="grid h-full w-full justify-center overflow-x-auto">
            <div className="mb-5 grid w-full grid-cols-3 justify-center gap-4 overflow-x-auto">
              <div className="grid rounded-xl bg-white p-2">
                <p className="font-semibold">Total Reviews</p>
                <h1 className="text-[18px] font-bold">2K</h1>
                <h1 className="text-[12px] text-gray-400">
                  {" "}
                  <span className="font-semibold text-green-500">
                    4.63%
                  </span>{" "}
                  vs. last Year
                </h1>
              </div>
              <div className="grid rounded-xl bg-white p-2">
                <p className="font-semibold">Total Reviews</p>
                <h1 className="text-[18px] font-bold">2K</h1>
                <h1 className="text-[12px] text-gray-400">
                  {" "}
                  <span className="font-semibold text-green-500">
                    4.63%
                  </span>{" "}
                  vs. last Year
                </h1>
              </div>
              <div className="grid rounded-xl bg-white p-2">
                <p className="font-semibold">Total Reviews</p>
                <h1 className="text-[18px] font-bold">2K</h1>
                <h1 className="text-[12px] text-gray-400">
                  {" "}
                  <span className="font-semibold text-green-500">
                    4.63%
                  </span>{" "}
                  vs. last Year
                </h1>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center overflow-x-auto">
            <table className="h-[600px] w-[1000px] overflow-x-auto text-left text-sm text-gray-500 rtl:text-right">
              <tbody>
                <tr className="border-b bg-white hover:bg-gray-50">
                  <th
                    scope="row"
                    className="flex h-full items-center whitespace-nowrap px-6 py-4 text-[25px] font-medium text-gray-900"
                  >
                    <div className="flex items-center gap-2 text-[15px] text-black">
                      <img
                        src="/images/me.jpg"
                        className="mr-2 h-[40px] w-[40px] rounded-full"
                        alt="#"
                      />
                      <span className="grid">
                        <p>Mostapha Taha</p>
                        <p>
                          ID: <span className="text-gray-400">1385</span>
                        </p>
                      </span>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="grid grid-cols-1 gap-3">
                      Ask CDCR San Quintin State Prison 2008.
                      <br /> We installed Purex dispensers throughout the prison
                      to comba
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="grid grid-cols-2 gap-3">
                      <button>
                        <svg
                          className="h-6 w-6 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b bg-white hover:bg-gray-50">
                  <th
                    scope="row"
                    className="flex h-full items-center whitespace-nowrap px-6 py-4 text-[25px] font-medium text-gray-900"
                  >
                    <div className="flex items-center gap-2 text-[15px] text-black">
                      <img
                        src="/images/me.jpg"
                        className="mr-2 h-[40px] w-[40px] rounded-full"
                        alt="#"
                      />
                      <span className="grid">
                        <p>Mostapha Taha</p>
                        <p>
                          ID: <span className="text-gray-400">1385</span>
                        </p>
                      </span>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="grid grid-cols-1 gap-3">
                      Ask CDCR San Quintin State Prison 2008.
                      <br /> We installed Purex dispensers throughout the prison
                      to comba
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="grid grid-cols-2 gap-3">
                      <button>
                        <svg
                          className="h-6 w-6 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b bg-white hover:bg-gray-50">
                  <th
                    scope="row"
                    className="flex h-full items-center whitespace-nowrap px-6 py-4 text-[25px] font-medium text-gray-900"
                  >
                    <div className="flex items-center gap-2 text-[15px] text-black">
                      <img
                        src="/images/me.jpg"
                        className="mr-2 h-[40px] w-[40px] rounded-full"
                        alt="#"
                      />
                      <span className="grid">
                        <p>Mostapha Taha</p>
                        <p>
                          ID: <span className="text-gray-400">1385</span>
                        </p>
                      </span>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="grid grid-cols-1 gap-3">
                      Ask CDCR San Quintin State Prison 2008.
                      <br /> We installed Purex dispensers throughout the prison
                      to comba
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="grid grid-cols-2 gap-3">
                      <button>
                        <svg
                          className="h-6 w-6 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
