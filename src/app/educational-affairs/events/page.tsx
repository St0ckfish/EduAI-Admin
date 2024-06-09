"use client"

import Modal from "@/components/model";
import Timeline from "@/components/timeLine";
import { useState } from "react";

const Events = () => {
    
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return ( 
        <>
            <div className="lg:ml-[270px] mt-7">
                <div className="flex justify-end">
                    <button onClick={handleOpenModal} className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] w-[180px] ease-in font-semibold duration-300">+ Add Event</button>
                </div>
                <Timeline />
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    
                    
                    <h2 className="text-xl mb-4 font-light"> Event Name</h2>
                    <div className="mb-4 rounded-sm">
                        <input
                            type="text"
                            placeholder="Event Name "
                            className="w-full px-4 py-2 border bg-[#ffffff] shadow-md rounded-xl  border-[#436789] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <h2 className="text-xl mb-4 font-light">  Event Date</h2>
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
                            className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#e44949] hover:bg-[#af4747] hover:shadow-xl mb-5 mr-3 text-white text-[18px] w-[180px] ease-in font-semibold duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            </div>
        </>
     );
}
 
export default Events;