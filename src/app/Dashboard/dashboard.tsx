"use client"
import Calendar from '@/components/calendar';
import Link from 'next/link';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ApexChartProps { }

const Dashboard: React.FC<ApexChartProps> = () => {
  const [series, setSeries] = useState([
    {
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'area' as 'area'
    },
    colors: ['#FF4560', '#008FFB'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth' as 'smooth'
    },
    xaxis: {
      type: 'datetime' as 'datetime',
      categories: [
        "2024-06-19T00:00:00.000Z",
        "2024-06-19T01:30:00.000Z",
        "2024-06-19T02:30:00.000Z",
        "2024-06-19T03:30:00.000Z",
        "2024-06-19T04:30:00.000Z",
        "2024-06-19T05:30:00.000Z",
        "2024-06-19T06:30:00.000Z"
      ]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    }
  });

  return (
    <div className="grid mr-10 justify-center w-full ">

      <div className="flex justify-evenly mb-6 w-full ">
        <div className="bg-white rounded-xl p-2 w-[201px] h-[80px] justify-center items-center shadow-xl">
          <p className="text-gray-400 text-[12px]">Total student</p>
          <h1 className="text-[17px] font-semibold">12.130K</h1>
          <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1>
        </div>
        <div className="bg-white rounded-xl p-2 w-[201px] h-[80px] justify-center items-center shadow-xl">
          <p className="text-gray-400 text-[12px]">Total student</p>
          <h1 className="text-[17px] font-semibold">12.130K</h1>
          <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1>
        </div>
        <div className="bg-white rounded-xl p-2 w-[201px] h-[80px] justify-center items-center shadow-xl">
          <p className="text-gray-400 text-[12px]">Total student</p>
          <h1 className="text-[17px] font-semibold">12.130K</h1>
          <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1>
        </div>
        <div className="bg-white rounded-xl p-2 w-[201px] h-[80px] justify-center items-center shadow-xl">
          <p className="text-gray-400 text-[12px]">Total student</p>
          <h1 className="text-[17px] font-semibold">12.130K</h1>
          <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1>
        </div>
      </div>

      <div className="flex mb-6 justify-between gap-10 w-full">
        <div id="chart" className='bg-white rounded-xl p-2 w-[850px] shadow-xl'>
          <p className="font-semibold text-[18px]">School Finace</p>
          <ReactApexChart options={options} series={series} type="area" width={800} height={350} />
        </div>
        <div className='grid bg-white justify-center items-center p-2 rounded-xl w-[550px] shadow-xl'>
          <div className="flex justify-evenly items-center">
            <div className="p-2 bg-[#F9DCA4] h-[75px] w-[66px] rounded-xl justify-center items-center text-center mr-3">
              <h1 className="text-[18px] font-semibold text-[#F79009]">6</h1>
              <h1 className="text-[18px] font-semibold text-[#F79009]">Sun</h1>
            </div>
            <div className=" grid gap-2 w-[150px]">
              <p className="text-[13px] text-[#F79009]">06 - May -2024</p>
              <p className="text-[16px] text-gray-400">Event Name</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                <div
                  className="bg-[#F79009] h-2.5 rounded-full"
                  style={{ width: `50%` }}
                ></div>
              </div>
            </div>
            <div className=" grid gap-8 w-[200px] ml-3">
              <p className="text-[13px] text-gray-600">7:00AM - 8:00AM</p>
              <p className="text-[16px] text-gray-600">23 Intersted in the event</p>
            </div>
          </div>
          <div className="flex justify-evenly items-center">
            <div className="p-2 bg-gray-200 h-[75px] w-[66px] rounded-xl justify-center items-center text-center mr-3">
              <h1 className="text-[18px] font-semibold text-gray-600">6</h1>
              <h1 className="text-[18px] font-semibold text-gray-600">Sun</h1>
            </div>
            <div className=" grid gap-2 w-[150px]">
              <p className="text-[13px] text-gray-600">06 - May -2024</p>
              <p className="text-[16px] text-gray-600">Event Name</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                <div
                  className="bg-gray-600 h-2.5 rounded-full"
                  style={{ width: `50%` }}
                ></div>
              </div>
            </div>
            <div className=" grid gap-8 w-[200px] ml-3">
              <p className="text-[13px] text-[#F79009]">7:00AM - 8:00AM</p>
              <p className="text-[16px] text-gray-400">23 Intersted in the event</p>
            </div>
          </div>
          <div className="flex justify-evenly items-center">
            <div className="p-2 bg-[#2970ff91] h-[75px] w-[66px] rounded-xl justify-center items-center text-center mr-3">
              <h1 className="text-[18px] font-semibold text-[#2970FF]">6</h1>
              <h1 className="text-[18px] font-semibold text-[#2970FF]">Sun</h1>
            </div>
            <div className=" grid gap-2 w-[150px]">
              <p className="text-[13px] text-[#2970FF]">06 - May -2024</p>
              <p className="text-[16px] text-gray-400">Event Name</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                <div
                  className="bg-[#2970FF] h-2.5 rounded-full"
                  style={{ width: `50%` }}
                ></div>
              </div>
            </div>
            <div className=" grid gap-8 w-[200px] ml-3">
              <p className="text-[13px] text-[#2970FF]">7:00AM - 8:00AM</p>
              <p className="text-[16px] text-gray-400">23 Intersted in the event</p>
            </div>
          </div>
          <div className="grid justify-center ">
              <button className="px-1 py-1.5 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[14px] w-[120px] ease-in font-semibold duration-300">+ New Event</button>
          </div>
        </div>
      </div>

      <div className="flex mb-6 justify-between gap-10 w-full">
        <div className="shadow-xl w-[850px] flex justify-center bg-white">
          <Calendar/>
        </div>
        <div className="grid bg-white rounded-xl shadow-xl p-2 w-[550px]">
          <p className="font-semibold text-[18px]">Notice Board</p>
          <div className="">
          </div>
        </div>
      </div>

    </div>
  );
};


export default Dashboard;