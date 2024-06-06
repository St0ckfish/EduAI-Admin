/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const Reviews = () => {
    return (
        <>
            <div className="lg:ml-[290px] mt-12 pr-5 overflow-x-auto md:px-6">
                <div className="flex justify-left gap-5 text-[23px] font-bold mb-5 ml-4">
                    <Link href="/post-management">
                        Post
                    </Link>
                    <Link href="/post-management/reviews" className="text-blue-500 underline">
                        Reviews
                    </Link>
                </div>
                <div className="overflow-x-auto grid w-full justify-center">
                <div className="grid w-full h-full justify-center overflow-x-auto">
                    <div className="grid grid-cols-3 justify-center mb-5 gap-4 w-full overflow-x-auto">
                        <div className="grid bg-white p-2 rounded-xl">
                            <p className="font-semibold">Total Reviews</p>
                            <h1 className="font-bold text-[18px]">2K</h1>
                            <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1>
                        </div>
                        <div className="grid bg-white p-2 rounded-xl">
                            <p className="font-semibold">Total Reviews</p>
                            <h1 className="font-bold text-[18px]">2K</h1>
                            <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1>
                        </div>
                        <div className="grid bg-white p-2 rounded-xl">
                            <p className="font-semibold">Total Reviews</p>
                            <h1 className="font-bold text-[18px]">2K</h1>
                            <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1>
                        </div>
                    </div>
                    </div>
                <div className="overflow-x-auto flex w-full justify-center">
                    <table className="w-[1000px] h-[600px] overflow-x-auto text-sm text-left rtl:text-right text-gray-500  ">
                        <tbody>
                            <tr className="bg-white border-b  hover:bg-gray-50">
                                <th scope="row" className=" flex items-center px-6 py-4 h-full text-[25px] font-medium text-gray-900 whitespace-nowrap ">
                                    <div className="flex items-center gap-2 text-[15px] text-black ">
                                        <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                        <span className="grid">
                                            <p>Mostapha Taha</p>
                                            <p>ID: <span className="text-gray-400">1385</span></p>
                                        </span>
                                    </div>
                                </th>
                                <td className="px-6 py-4 ">
                                    <div className="grid grid-cols-1 gap-3">
                                        Ask CDCR San Quintin State Prison 2008.<br /> We installed Purex dispensers throughout the prison to comba
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="grid grid-cols-2 gap-3">
                                        <button><svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg></button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-white border-b  hover:bg-gray-50">
                                <th scope="row" className=" flex items-center px-6 py-4 h-full text-[25px] font-medium text-gray-900 whitespace-nowrap ">
                                    <div className="flex items-center gap-2 text-[15px] text-black ">
                                        <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                        <span className="grid">
                                            <p>Mostapha Taha</p>
                                            <p>ID: <span className="text-gray-400">1385</span></p>
                                        </span>
                                    </div>
                                </th>
                                <td className="px-6 py-4 ">
                                    <div className="grid grid-cols-1 gap-3">
                                        Ask CDCR San Quintin State Prison 2008.<br /> We installed Purex dispensers throughout the prison to comba
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="grid grid-cols-2 gap-3">
                                        <button><svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg></button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-white border-b  hover:bg-gray-50">
                                <th scope="row" className=" flex items-center px-6 py-4 h-full text-[25px] font-medium text-gray-900 whitespace-nowrap ">
                                    <div className="flex items-center gap-2 text-[15px] text-black ">
                                        <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                        <span className="grid">
                                            <p>Mostapha Taha</p>
                                            <p>ID: <span className="text-gray-400">1385</span></p>
                                        </span>
                                    </div>
                                </th>
                                <td className="px-6 py-4 ">
                                    <div className="grid grid-cols-1  gap-3">
                                        Ask CDCR San Quintin State Prison 2008.<br /> We installed Purex dispensers throughout the prison to comba
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="grid grid-cols-2 gap-3">
                                        <button><svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg></button>
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
}

export default Reviews;