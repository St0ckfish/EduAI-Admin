"use client";
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const Permissions = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  return (
    <>
      <div className="relative mr-[5px] mt-5 flex h-[650px] items-center justify-center overflow-x-auto bg-transparent max-[1200px]:w-screen sm:rounded-lg lg:ml-[270px]">
        <div className="relative overflow-auto shadow-md sm:rounded-lg">
          <table className="h-[600px] w-[1000px] overflow-x-auto text-left text-sm text-gray-500 rtl:text-right">
            <thead className="bg-thead text-xs uppercase text-textPrimary">
              <tr>
                <th
                  scope="col"
                  className="whitespace-nowrap px-6 py-6 text-[28px]"
                >
                  Permission
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-6 py-3 text-[28px]"
                >
                  Applicable For
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-textPrimary"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-thead after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-borderPrimary after:bg-bgPrimary after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-borderPrimary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-textSecondary">
                      New Permission
                    </span>
                  </label>

                  <p className="mt-3 text-[14px] text-secondary">
                    Enable or disable Attendance Module globally or for
                    individual user roles. <br /> Note that disabling Attendance
                    module for individual profile users will
                    <br /> not stop absent notifications to students or parents.
                  </p>
                </th>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <span className="grid items-center gap-2 text-[18px] font-semibold text-blackOrWhite">
                      Sections
                      <select
                        id="countries"
                        className="border-borderPrimarylue-500 block w-full rounded-lg border border-borderPrimary bg-bgSecondary p-1.5 text-sm text-textSecondary focus:border-b focus:ring-blue-500"
                      >
                        <option selected>Choose </option>
                        <option value="US">Teacher</option>
                      </select>
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-textPrimary"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-thead after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-borderPrimary after:bg-bgPrimary after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-borderPrimary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-textSecondary">
                      New Permission
                    </span>
                  </label>

                  <p className="mt-3 text-[14px] text-secondary">
                    Enable or disable Assessment & Grading globally or for
                    individual user
                    <br /> roles. Note that disabling Assessment & Grading
                    module for individual <br />
                    profile users will not stop absent notifications to students
                    or parents
                  </p>
                </th>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <span className="grid items-center gap-2 text-[18px] font-semibold text-blackOrWhite">
                      Sections
                      <select
                        id="countries"
                        className="border-borderPrimarylue-500 block w-full rounded-lg border border-borderPrimary bg-bgSecondary p-1.5 text-sm text-textSecondary focus:border-b focus:ring-blue-500"
                      >
                        <option selected>Choose </option>
                        <option value="DE">Teacher</option>
                      </select>
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-textPrimary"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-thead after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-borderPrimary after:bg-bgPrimary after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-borderPrimary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-textSecondary">
                      New Permission
                    </span>
                  </label>

                  <p className="mt-3 text-[14px] text-secondary">
                    Enable or disable Events Module globally or for individual
                    user roles.
                  </p>
                </th>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <span className="grid items-center gap-2 text-[18px] font-semibold text-blackOrWhite">
                      Sections
                      <select
                        id="countries"
                        className="border-borderPrimarylue-500 block w-full rounded-lg border border-borderPrimary bg-bgSecondary p-1.5 text-sm text-textSecondary focus:border-b focus:ring-blue-500"
                      >
                        <option selected>Choose</option>
                        <option value="DE">Teacher</option>
                      </select>
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-textPrimary"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-thead after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-borderPrimary after:bg-bgPrimary after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-borderPrimary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-textSecondary">
                      New Permission
                    </span>
                  </label>
                  <p className="mt-3 text-[14px] text-secondary">
                    Enable or disable Fee & Invoicing Module globally or for
                    individual
                    <br /> user roles. Note that any invoice notifications sent
                    to disabled user
                    <br /> profiles dont stop sending emails, SMS, or mobile app
                    push notifications
                  </p>
                </th>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <span className="grid items-center gap-2 text-[18px] font-semibold text-blackOrWhite">
                      Sections
                      <select
                        id="countries"
                        className="border-borderPrimarylue-500 block w-full rounded-lg border border-borderPrimary bg-bgSecondary p-1.5 text-sm text-textSecondary focus:border-b focus:ring-blue-500"
                      >
                        <option selected>Choose </option>
                        <option value="DE">Teacher</option>
                      </select>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Permissions;
