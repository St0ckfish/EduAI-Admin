"use client"
import React, { useState } from 'react';

const ViewStudent = () => {
    const currentDate = new Date();

    // State for selected date
    const [selectedDate, setSelectedDate] = useState(currentDate);
  
    // Function to handle date selection
    const handleDateClick = (date:any) => {
      setSelectedDate(date);
    };
  
    // Function to generate an array of dates for the current month
    const generateMonthDates = () => {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
  
      const days = [];
      for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const date = new Date(year, month, i);
        days.push(date);
      }
  
      // Add empty slots for days before the first day of the month
      for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        days.unshift(null);
      }
  
      return days;
    };
  
    // Generate the array of dates for the current month
    const monthDates = generateMonthDates();

    // Function to handle moving to the previous month
    const goToPreviousMonth = () => {
      setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
    };

    // Function to handle moving to the next month
    const goToNextMonth = () => {
      setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
    };

    return ( 
        <>
            <div className="lg:ml-[290px]">
                <div className="grid w-[400px] h-[300px] bg-white rounded-xl p-5">
                    {/* Display month and year */}
                    <div className="flex justify-between mb-7">
                      <button className='text-[25px] font-sans text-gray-800 font-semibold	' onClick={goToPreviousMonth}>&lt;</button>
                      <h2 className="mb-3 font-sans text-gray-800 font-semibold	">{selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}</h2>
                      <button className='text-[25px] font-sans text-gray-800 font-semibold	' onClick={goToNextMonth}>&gt;</button>
                    </div>
                    {/* Display calendar */}
                        {/* Day names */}
                        <div className="grid grid-cols-7 ">
                            <p className="font-sans text-gray-300 font-medium	">SUN</p>
                            <p className="font-sans text-gray-300 font-medium	">MON</p>
                            <p className="font-sans text-gray-300 font-medium	">TUE</p>
                            <p className="font-sans text-gray-300 font-medium	">WED</p>
                            <p className="font-sans text-gray-300 font-medium	">THU</p>
                            <p className="font-sans text-gray-300 font-medium	">FRI</p>
                            <p className="font-sans text-gray-300 font-medium	">SAT</p>
                        </div>
                    <div className="grid grid-cols-7 ">
                        {monthDates.map((date, index) => (
                            <div
                            key={index}
                            className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold	 ${
                                date ? 'cursor-pointer' : ''
                            } ${date && date.getDate() === selectedDate.getDate() ? 'bg-blue-500 text-white' : ''}`}
                            onClick={() => date && handleDateClick(date)}
                            >
                            
                            {date ? date.getDate() : ''}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewStudent;
