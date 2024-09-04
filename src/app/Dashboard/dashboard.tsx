"use client";

import dynamic from "next/dynamic";
import Calendar from "@/components/calendar";
import React, { useEffect, useState } from "react";
import Modal from "@/components/model";
import {
  useGetAllStudentsQuery,
  useGetAllEmployeesQuery,
  useGetAllTeachersQuery,
  useGetAllWorkersQuery,
  useGetAllNoticesQuery,
  useGetAllCurrentUserQuery,
  useGetEventsInMonthQuery,
} from "@/features/dashboard/dashboardApi";
import Spinner from "@/components/spinner";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Dashboard: React.FC = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  const router = useRouter();

  const {
    data: events,
    error: err0,
    isLoading: isEvents,
  } = useGetEventsInMonthQuery(null);
  const {
    data: students,
    error: err1,
    isLoading: isStudents,
  } = useGetAllStudentsQuery(null);
  const {
    data: employees,
    error: err2,
    isLoading: isEmployee,
  } = useGetAllEmployeesQuery(null);
  const {
    data: teachers,
    error: err3,
    isLoading: isTeacher,
  } = useGetAllTeachersQuery(null);
  const {
    data: workers,
    error: err4,
    isLoading: isWorker,
  } = useGetAllWorkersQuery(null);
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
      name: "Expense",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Income",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      width: 800,
      //type: 'area' as 'area'
      type: "area" as const,
    },
    colors: ["#f19b78", "#008FFB"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth" as const,
    },
    xaxis: {
      type: "datetime" as const,
      categories: [
        "2024-06-19T00:00:00.000Z",
        "2024-06-19T01:30:00.000Z",
        "2024-06-19T02:30:00.000Z",
        "2024-06-19T03:30:00.000Z",
        "2024-06-19T04:30:00.000Z",
        "2024-06-19T05:30:00.000Z",
        "2024-06-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  });

  if (isStudents || isEmployee || isWorker || isTeacher || isEvents)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="mr-10 grid w-full justify-center overflow-x-auto p-6">
      <div className="grid overflow-x-auto">
        <div className="mb-6 flex w-full justify-evenly gap-4 whitespace-nowrap max-[812px]:justify-center max-[576px]:h-[120px]">
          <div className="h-[80px] w-[201px] items-center justify-center rounded-xl bg-bgPrimary p-2 shadow-xl max-[576px]:h-[100px]">
            <p className="text-[12px] text-textSecondary">{students?.message} </p>
            <h1 className="text-[17px] font-semibold">{students?.data} 🧑‍🎓</h1>
            {/* <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1> */}
          </div>
          <div className="h-[80px] w-[201px] items-center justify-center rounded-xl bg-bgPrimary p-2 shadow-xl max-[576px]:h-[100px]">
            <p className="text-[12px] text-textSecondary">{employees?.message}</p>
            <h1 className="text-[17px] font-semibold">{employees?.data} 👨‍💼</h1>
            {/* <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1> */}
          </div>
          <div className="h-[80px] w-[201px] items-center justify-center rounded-xl bg-bgPrimary p-2 shadow-xl max-[576px]:h-[100px]">
            <p className="text-[12px] text-textSecondary">{teachers?.message}</p>
            <h1 className="text-[17px] font-semibold">{teachers?.data} 👨‍🏫</h1>
            {/* <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1> */}
          </div>
          <div className="h-[80px] w-[201px] items-center justify-center rounded-xl bg-bgPrimary p-2 shadow-xl max-[576px]:h-[100px]">
            <p className="text-[12px] text-textSecondary">{workers?.message}</p>
            <h1 className="text-[17px] font-semibold">{workers?.data} 🧑‍🏭</h1>
            {/* <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1> */}
          </div>
          <div className="h-[80px] w-[201px] items-center justify-center rounded-xl bg-bgPrimary p-2 shadow-xl max-[576px]:h-[100px]">
            <p className="text-[12px] text-textSecondary">Events</p>
            <h1 className="text-[17px] font-semibold">
              {events?.data}⏰{" "}
              {currentLanguage === "en"
                ? "in this month"
                : currentLanguage === "ar"
                  ? "هذا الشهر"
                  : currentLanguage === "fr"
                    ? "ce mois-ci"
                    : "in this month"}
            </h1>
            {/* <h1 className="text-gray-400 text-[12px]"> <span className="text-green-500 font-semibold">4.63%</span> vs. last Year</h1> */}
          </div>
        </div>
      </div>

      <div className="mb-6 grid w-full grid-cols-1 justify-between gap-10 overflow-x-auto 2xl:flex">
        <div className="flex overflow-x-auto rounded-xl max-[1535px]:justify-center">
          <div
            id="chart"
            className="w-[850px] overflow-x-auto rounded-xl bg-bgPrimary p-2 shadow-xl"
          >
            <p className="text-[18px] font-semibold">
              {" "}
              {currentLanguage === "en"
                ? "School Finance"
                : currentLanguage === "ar"
                  ? "مالية المدرسة"
                  : currentLanguage === "fr"
                    ? "Finance de l'école"
                    : "School Finance"}
            </p>
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              width={options.chart.width}
              height={options.chart.height}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid overflow-x-auto rounded-2xl">
            <div className="grid w-[550px] items-center justify-center overflow-x-auto rounded-2xl bg-bgPrimary p-2 shadow-xl max-[1536px]:h-[450px] max-[1536px]:w-[850px]">
              <div className="flex items-center justify-evenly">
                <div className="mr-3 h-[75px] w-[66px] items-center justify-center rounded-xl bg-[#F9DCA4] p-2 text-center">
                  <h1 className="text-[18px] font-semibold text-warning">
                    6
                  </h1>
                  <h1 className="text-[18px] font-semibold text-warning">
                    Sun
                  </h1>
                </div>
                <div className="grid w-[150px] gap-2">
                  <p className="text-[13px] text-warning">06 - May -2024</p>
                  <p className="text-[16px] text-gray-400">Event Name</p>
                  <div className="h-2.5 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2.5 rounded-full bg-warning"
                      style={{ width: `50%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-3 grid w-[200px] gap-8">
                  <p className="text-[13px] text-warning">7:00AM - 8:00AM</p>
                  <p className="text-[16px] text-gray-600">
                    23 Intersted in the event
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-evenly">
                <div className="mr-3 h-[75px] w-[66px] items-center justify-center rounded-xl bg-gray-200 p-2 text-center">
                  <h1 className="text-[18px] font-semibold text-gray-600">6</h1>
                  <h1 className="text-[18px] font-semibold text-gray-600">
                    Sun
                  </h1>
                </div>
                <div className="grid w-[150px] gap-2">
                  <p className="text-[13px] text-gray-600">06 - May -2024</p>
                  <p className="text-[16px] text-gray-600">Event Name</p>
                  <div className="h-2.5 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2.5 rounded-full bg-gray-600"
                      style={{ width: `50%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-3 grid w-[200px] gap-8">
                  <p className="text-[13px] text-gray-600">7:00AM - 8:00AM</p>
                  <p className="text-[16px] text-gray-600">
                    23 Intersted in the event
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-evenly">
                <div className="mr-3 h-[75px] w-[66px] items-center justify-center rounded-xl bg-[#2970ff91] p-2 text-center">
                  <h1 className="text-[18px] font-semibold te-warning">
                    6
                  </h1>
                  <h1 className="text-[18px] font-semibold te-warning">
                    Sun
                  </h1>
                </div>
                <div className="grid w-[150px] gap-2">
                  <p className="text-[13px] text-primary">06 - May -2024</p>
                  <p className="text-[16px] text-gray-400">Event Name</p>
                  <div className="h-2.5 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2.5 rounded-full bg-primary"
                      style={{ width: `50%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-3 grid w-[200px] gap-8">
                  <p className="text-[13px] text-primary">7:00AM - 8:00AM</p>
                  <p className="text-[16px] text-gray-600">
                    23 Intersted in the event
                  </p>
                </div>
              </div>
              <div className="grid justify-center">
                <button
                  onClick={handleOpenModal}
                  className="mb-5 mr-3 w-[120px] whitespace-nowrap rounded-xl bg-primary px-1 py-1.5 text-[14px] font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
                >
                  + New Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 grid w-full grid-cols-1 justify-between gap-10 overflow-x-auto 2xl:flex">
        <div className="grid overflow-x-auto rounded-2xl">
          <div className="flex w-[850px] justify-center overflow-x-auto rounded-2xl bg-bgPrimary shadow-xl max-[1536px]:w-full">
            <Calendar />
          </div>
        </div>
        <div className="grid overflow-x-auto rounded-xl">
          <div className="grid w-[550px] overflow-x-auto rounded-xl bg-bgPrimary p-2 shadow-xl max-[1536px]:w-full">
            <p className="text-[20px] font-bold">
              {currentLanguage === "en"
                ? "Notice Board"
                : currentLanguage === "ar"
                  ? "لوحة الإعلانات"
                  : currentLanguage === "fr"
                    ? "Tableau d'affichage"
                    : "Notice Board"}
            </p>
            <div className="">
              <h1 className="text-[18px] font-semibold text-warning">
                Leslie Alexander
              </h1>
              <p className="text-textSecondary">
                In a laoreet purus. Integer turpis quam, laoreet id orci nec,
                ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="text-[18px] font-semibold text-primary">
                Leslie Alexander
              </h1>
              <p className="text-textSecondary">
                In a laoreet purus. Integer turpis quam, laoreet id orci nec,
                ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="text-[18px] font-semibold text-seccess">
                Leslie Alexander
              </h1>
              <p className="text-textSecondary">
                In a laoreet purus. Integer turpis quam, laoreet id orci nec,
                ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="text-[18px] font-semibold text-error">
                Leslie Alexander
              </h1>
              <p className="text-textSecondary">
                In a laoreet purus. Integer turpis quam, laoreet id orci nec,
                ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="text-[18px] font-semibold text-warning">
                Leslie Alexander
              </h1>
              <p className="text-textSecondary">
                In a laoreet purus. Integer turpis quam, laoreet id orci nec,
                ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="text-[18px] font-semibold text-primary">
                Leslie Alexander
              </h1>
              <p className="text-textSecondary">
                In a laoreet purus. Integer turpis quam, laoreet id orci nec,
                ultrices lacinia nunc. Aliquam erat vo
              </p>
              <h1 className="text-[18px] font-semibold text-success">
                Leslie Alexander
              </h1>
              <p className="text-textSecondary">
                In a laoreet purus. Integer turpis quam, laoreet id orci nec,
                ultrices lacinia nunc. Aliquam erat vo
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="mb-4 text-textPrimary text-xl font-semibold"> Event Name</h2>
        <div className="mb-4 rounded-sm">
          <input
            type="text"
            placeholder="Event Name "
            className="w-full rounded-xl border border-secondary bg-bgSecondary px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <h2 className="mb-4 text-xl font-semibold">Event Date</h2>
        <div className="mb-4 rounded-sm">
          <input
            type="date"
            className="w-full rounded-xl border border-secondary bg-bgSecondary px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl">
            Add
          </button>
          <button
            onClick={handleCloseModal}
            className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl border bg-[#ffffff] px-4 py-2 text-[18px] font-semibold text-black duration-300 ease-in hover:shadow-xl"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
