"use client"

import dynamic from 'next/dynamic';
import Calendar from '@/components/calendar';
import React, { useEffect, useState } from 'react';
import Modal from '@/components/model';
import { useGetAllStudentsQuery, useGetAllEmployeesQuery, useGetAllTeachersQuery, useGetAllWorkersQuery, useGetAllNoticesQuery, useGetAllCurrentUserQuery } from '@/features/dashboard/dashboardApi';
import Spinner from '@/components/spinner';
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Dashboard: React.FC = () => {
  
  const router = useRouter();
  
  const { data: students,error:err1, isLoading: isStudents } = useGetAllStudentsQuery(null);
  const { data: employees,error:err2, isLoading: isEmployee } = useGetAllEmployeesQuery(null);
  const { data: teachers,error:err3, isLoading: isTeacher } = useGetAllTeachersQuery(null);
  const { data: workers,error:err4, isLoading: isWorker } = useGetAllWorkersQuery(null);
  // const { data: notices, isLoading: isNotices } = useGetAllNoticesQuery(null);

  useEffect(() => {
    if (students || employees || teachers || workers) {
      console.log(teachers);
      console.log(employees);
      console.log(students);
      console.log(workers);
    }
  }, [router, students, employees, teachers, workers, err1, err2, err3, err4]);
  
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [series, setSeries] = useState([
    {
      name: 'Expense',
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: 'Income',
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      width: 800,
      //type: 'area' as 'area'
      type: 'area' as const 
    },
    colors: ['#f19b78', '#008FFB'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth' as const
    },
    xaxis: {
      type: 'datetime' as const,
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

  if (isStudents || isEmployee || isWorker || isTeacher)
    return (
      <div className="h-screen w-full justify-center items-center flex ">
        <Spinner />
      </div>
    );


  return (
    <div className="grid mr-10 justify-center w-full overflow-x-auto p-6">
      <div className="grid overflow-x-auto">
        <div className="flex w-full justify-evenly gap-4 mb-6  max-[812px]:justify-center max-[576px]:h-[120px] whitespace-nowrap">
          <div className="bg-white rounded-xl p-2 w-[201px] h-[80px] justify-center items-center shadow-xl max-[576px]:h-[100px]">
            <p className="text-gray-400 text-[12px]">{students?.message} </p>
            <h1 className="text-[17px] font-semibold">{students?.data} 🧑‍🎓</h1>
            {/* <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1> */}
          </div>
          <div className="bg-white rounded-xl p-2 w-[201px] h-[80px] justify-center items-center shadow-xl max-[576px]:h-[100px]">
            <p className="text-gray-400 text-[12px]">{employees?.message}</p>
            <h1 className="text-[17px] font-semibold">{employees?.data} 👨‍💼</h1>
            {/* <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1> */}
          </div>
          <div className="bg-white rounded-xl p-2 w-[201px] h-[80px] justify-center items-center shadow-xl max-[576px]:h-[100px]">
            <p className="text-gray-400 text-[12px]">{teachers?.message}</p>
            <h1 className="text-[17px] font-semibold">{teachers?.data} 👨‍🏫</h1>
            {/* <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1> */}
          </div>
          <div className="bg-white rounded-xl p-2 w-[201px] h-[80px] justify-center items-center shadow-xl max-[576px]:h-[100px]">
            <p className="text-gray-400 text-[12px]">{workers?.message}</p>
            <h1 className="text-[17px] font-semibold">{workers?.data} 🧑‍🏭</h1>
            {/* <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1> */}
          </div>
          <div className="bg-white rounded-xl p-2 w-[201px] h-[80px] justify-center items-center shadow-xl max-[576px]:h-[100px]">
            <p className="text-gray-400 text-[12px]">Events</p>
            <h1 className="text-[17px] font-semibold">⏰ in this month</h1>
            {/* <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1> */}
          </div>
        </div>
      </div>

      <div className="2xl:flex grid grid-cols-1 mb-6 justify-between  gap-10 w-full overflow-x-auto ">
        <div className="flex overflow-x-auto rounded-xl max-[1535px]:justify-center">
          <div id="chart" className='bg-white rounded-xl p-2 w-[850px] shadow-xl overflow-x-auto'>
            <p className="font-semibold text-[18px]">School Finace</p>
            <ReactApexChart options={options} series={series} type="area" width={options.chart.width} height={options.chart.height} />
          </div>
        </div>
        <div className='flex justify-center'>
          <div className="grid overflow-x-auto rounded-2xl">
            <div className='grid bg-white justify-center items-center p-2 rounded-2xl w-[550px] shadow-xl max-[1536px]:w-[850px] max-[1536px]:h-[450px] overflow-x-auto'>
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
                  <p className="text-[13px] text-[#F79009]">7:00AM - 8:00AM</p>
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
                  <p className="text-[13px] text-gray-600">7:00AM - 8:00AM</p>
                  <p className="text-[16px] text-gray-600">23 Intersted in the event</p>
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
                  <p className="text-[16px] text-gray-600">23 Intersted in the event</p>
                </div>
              </div>
              <div className="grid justify-center ">
                <button onClick={handleOpenModal} className="px-1 py-1.5 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[14px] w-[120px] ease-in font-semibold duration-300">+ New Event</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="2xl:flex grid grid-cols-1 mb-6 justify-between gap-10 w-full overflow-x-auto">
        <div className="grid overflow-x-auto rounded-2xl">

          <div className="shadow-xl w-[850px] max-[1536px]:w-full flex justify-center bg-white overflow-x-auto rounded-2xl">
            <Calendar />
          </div>
        </div>
        <div className="grid overflow-x-auto rounded-xl">

          <div className="grid bg-white rounded-xl shadow-xl p-2 w-[550px]  max-[1536px]:w-full overflow-x-auto">
            <p className="font-bold text-[20px]">Notice Board</p>
            <div className="">
              <h1 className="font-semibold text-[18px] text-[#F79009]">Leslie Alexander</h1>
              <p>
                In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="font-semibold text-[18px] text-[#3E5AF0]">Leslie Alexander</h1>
              <p>
                In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="font-semibold text-[18px] text-[#57b843]">Leslie Alexander</h1>
              <p>
                In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="font-semibold text-[18px] text-[#f03f3f]">Leslie Alexander</h1>
              <p>
                In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="font-semibold text-[18px] text-[#F79009]">Leslie Alexander</h1>
              <p>
                In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="font-semibold text-[18px] text-[#3E5AF0]">Leslie Alexander</h1>
              <p>
                In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="font-semibold text-[18px] text-[#57b843]">Leslie Alexander</h1>
              <p>
                In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>


        <h2 className="text-xl mb-4 font-semibold"> Event Name</h2>
        <div className="mb-4 rounded-sm">
          <input
            type="text"
            placeholder="Event Name "
            className="w-full px-4 py-2 border bg-[#ffffff] shadow-md rounded-xl  border-[#436789] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <h2 className="text-xl mb-4 font-semibold">  Event Date</h2>
        <div className="mb-4 rounded-sm">
          <input
            type="date"
            className="w-full px-4 py-2 border bg-[#ffffff] rounded-xl shadow-md border-[#436789] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] w-[180px] ease-in font-semibold duration-300">
            Add
          </button>
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#ffffff] hover:shadow-xl mb-5 mr-3 border text-black text-[18px] w-[180px] ease-in font-semibold duration-300"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};


export default Dashboard;