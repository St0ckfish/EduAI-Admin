"use client";

import Modal from "@/components/model";
import Soon from "@/components/soon";
import TimeTable from "@/components/TimeTable";
import { RootState } from "@/GlobalRedux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import BreadCrumbs from "@/components/BreadCrumbs";


const Schedule = () => {
  const breadcrumbs = [
    {
      nameEn: "Academic",
      nameAr: "أكاديمي",
      nameFr: "Académique",
      href: "/",
    },
    {
      nameEn: "Educational Affairs",
      nameAr: "الشئون التعليمية",
      nameFr: "Affaires éducatives",
      href: "/educational-affairs",
    },
    {
      nameEn: "Schedule",
      nameAr: "الجدول",
      nameFr: "Emploi du temps",
      href: "/educational-affairs/schedule",
    },
  ];
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      {/* <Soon /> */}
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div
        className={` ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mt-7`}
      >
        <div className="flex justify-end">
          <button
            onClick={handleOpenModal}
            className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
          >
            + Add Event
          </button>
        </div>
        <TimeTable />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="mb-4 text-xl font-light"> Event Name</h2>
          <div className="mb-4 rounded-sm">
            <input
              type="text"
              placeholder="Event Name "
              className="w-full rounded-xl border border-borderPrimary bg-bgPrimary px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <h2 className="mb-4 text-xl font-light"> Event Date</h2>
          <div className="mb-4 rounded-sm">
            <input
              type="date"
              className="w-full rounded-xl border border-borderPrimary bg-bgPrimary px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between">
            <button className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl">
              Add
            </button>
            <button
              onClick={handleCloseModal}
              className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-error px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-[#af4747] hover:shadow-xl"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Schedule;
