"use client"
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const Permissions = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);

    return ( 
        <>
            <div className="lg:ml-[270px] mr-[5px]  flex justify-center items-center h-[650px] relative mt-5 overflow-x-auto bg-transparent sm:rounded-lg max-[1200px]:w-screen">
            <div className="overflow-auto relative shadow-md sm:rounded-lg">
                    <table className="w-[1000px] h-[600px] overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] ">
                            <tr>
                                <th scope="col" className="px-6 py-6 whitespace-nowrap text-[28px]">
                                Permission
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap  text-[28px]">
                                Applicable For
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b  hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4  text-[25px] font-medium text-gray-900 whitespace-nowrap ">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-[25px] font-medium text-gray-900 whitespace-nowrap">New Permission</span>
                                </label>
                                
                                <p className=" text-[14px] text-[#526484] mt-3">
                                Enable or disable Attendance Module globally or for individual user roles. <br/> Note that disabling Attendance module for individual profile users will<br/> not stop absent notifications to students or parents.
                                </p>
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="grid grid-cols-2 gap-3">
                                        <span className="grid items-center gap-2 text-[18px] text-black font-semibold">
                                            Sections
                                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5">
                                                <option selected>Choose </option>
                                                <option value="US">Teacher</option>

                                            </select>
                                        </span>
                                        
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-white border-b  hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 text-[25px] font-medium text-gray-900 whitespace-nowrap ">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-[25px] font-medium text-gray-900 whitespace-nowrap">New Permission</span>
                                </label>
                                
                                <p className=" text-[14px] text-[#526484] mt-3">
                                Enable or disable Assessment & Grading globally or for individual user<br/> roles. Note that disabling Assessment & Grading module for individual <br/>profile users will not stop absent notifications to students or parents
                                </p>
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="grid grid-cols-2 gap-3">
                                <span className="grid items-center gap-2 text-[18px] text-black font-semibold">
                                            Sections
                                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5">
                                                <option selected>Choose </option>
                                                <option value="DE">Teacher</option>
                                            </select>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-white border-b  hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 text-[25px] font-medium text-gray-900 whitespace-nowrap ">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-[25px] font-medium text-gray-900 whitespace-nowrap">New Permission</span>
                                </label>
                                
                                <p className=" text-[14px] text-[#526484] mt-3">
                                Enable or disable Events Module globally or for individual user roles.
                                </p>
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="grid grid-cols-2 gap-3">
                                <span className="grid items-center gap-2 text-[18px] text-black font-semibold">
                                            Sections
                                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5">
                                                <option selected>Choose</option>
                                                <option value="DE">Teacher</option>
                                            </select>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-white border-b  hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 text-[25px] font-medium text-gray-900 whitespace-nowrap ">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-[25px] font-medium text-gray-900 whitespace-nowrap">New Permission</span>
                                </label>
                                <p className=" text-[14px] text-[#526484] mt-3">
                                Enable or disable Fee & Invoicing Module globally or for individual<br/> user roles. Note that any invoice notifications sent to disabled user<br/> profiles dont stop sending emails, SMS, or mobile app push notifications

                                </p>
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="grid grid-cols-2 gap-3">
                                <span className="grid items-center gap-2 text-[18px] text-black font-semibold">
                                            Sections
                                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5">
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
}
 
export default Permissions;