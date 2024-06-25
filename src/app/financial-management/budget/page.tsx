"use client"
import React, { useState } from 'react';
import Link from "next/link";
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ApexChart = () => {
    const [series, setSeries] = useState([
        {
            name: 'Expense',
            data: [31, 40, 28, 51, 42, 109, 100]
        }
    ]);

    const [options, setOptions] = useState({
        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Product Trends by Month',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        },
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="line" height={350} width={800} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

const Budget = () => {
    return (
        <>
            <div className="flex items-center gap-1 lg:ml-[290px] mt-12 ml-7 text-[18px] max-[550px]:text-[15px] flex-wrap">
                <Link className="text-[#526484] hover:text-blue-400 hover:underline font-semibold" href="/">Administration</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}>
                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                </svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline font-semibold" href="/financial-management">Financial Management</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}>
                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                </svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline font-semibold" href="/financial-management/budget">Budget</Link>
            </div>
            <div className="lg:ml-[290px] mt-12 grid justify-center">
                <div className='mb-5 flex gap-2 justify-center'>
                    <div className="grid gap-2">
                        <div className="bg-white rounded-xl p-2 w-[201px] h-[80px] justify-center items-center shadow-xl max-[576px]:h-[100px]">
                            <p className="text-gray-400 text-[12px]">Total student</p>
                            <h1 className="text-[17px] font-semibold">12.130K</h1>
                            <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1>
                        </div>
                        <div className="bg-white rounded-xl p-2 w-[201px] h-[80px] justify-center items-center shadow-xl max-[576px]:h-[100px]">
                            <p className="text-gray-400 text-[12px]">Total student</p>
                            <h1 className="text-[17px] font-semibold">12.130K</h1>
                            <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        
                    </div>
                    <div className="grid gap-2">
                        <div className="bg-white rounded-xl p-2 w-[201px] h-[80px] justify-center items-center shadow-xl max-[576px]:h-[100px]">
                            <p className="text-gray-400 text-[12px]">Total student</p>
                            <h1 className="text-[17px] font-semibold">12.130K</h1>
                            <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1>
                        </div>
                        <div className="bg-white rounded-xl p-2 w-[201px] h-[80px] justify-center items-center shadow-xl max-[576px]:h-[100px]">
                            <p className="text-gray-400 text-[12px]">Total student</p>
                            <h1 className="text-[17px] font-semibold">12.130K</h1>
                            <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1>
                        </div>
                    </div>
                </div>
                <div className="2xl:flex grid grid-cols-1 mb-6 justify-center gap-10 w-full overflow-x-auto ">
                    <div className="flex overflow-x-auto">
                        <div id="chart" className='bg-white rounded-xl p-2 w-[850px] shadow-xl overflow-x-auto'>
                            <p className="font-semibold text-[18px]">School Finace</p>
                            <ApexChart />
                        </div>
                    </div>
                </div>
                <div className="rounded-xl bg-white p-5 grid w-full">
                    <div className="overflow-auto relative shadow-md sm:rounded-lg">
                        <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] ">
                                <tr>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Full Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Address
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b  hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        Nahda
                                    </th>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        C45121
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        This is text
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        kdsk
                                    </td>
                                </tr>
                                <tr className="bg-white border-b  hover:bg-gray-50">

                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        Nahda
                                    </th>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        C45121
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        This is text
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        sdsdd
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

export default Budget;
