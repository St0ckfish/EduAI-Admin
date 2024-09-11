"use client"
import { RootState } from "@/GlobalRedux/store";
import React from "react";
import { useSelector } from "react-redux";

const staticDays = [
  { id: 1, name: "Sat" },
  { id: 2, name: "Sun" },
  { id: 3, name: "Mon" },
  { id: 4, name: "Tue" },
  { id: 5, name: "Wed" },
  { id: 6, name: "Thu" },
  { id: 7, name: "Fri" },
];


const timeToPosition = (time: { split: (arg0: string) => { (): any; new(): any; map: { (arg0: NumberConstructor): [any, any]; new(): any; }; }; }) => {
  const [hour, minute] = time.split(":").map(Number);
  
  const totalMinutes = hour * 60 + minute;
  const startOfDay = 7 * 60;
  const minutesSinceStartOfDay = totalMinutes - startOfDay;
  
  return (minutesSinceStartOfDay / 540) * 100; 
};

const calculateHeight = (startTime: { split: (arg0: string) => { (): any; new(): any; map: { (arg0: NumberConstructor): [any, any]; new(): any; }; }; }, endTime: { split: (arg0: string) => { (): any; new(): any; map: { (arg0: NumberConstructor): [any, any]; new(): any; }; }; }) => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  
  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;
  
  const durationInMinutes = endInMinutes - startInMinutes;
  
  return (durationInMinutes / 540) * 100; 
};

const TimeTable = ({ scheduleData }: { scheduleData: any[] }) => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  return (
    <div className="grid w-full overflow-x-auto">
    <div className=" w-full grid overflow-x-auto">
      <div className={`p-6 bg-white rounded-xl mr-3 ${booleanValue ? "w-[1750px]" : "w-[1570px]"}`}>
        {/* Day headers */}
        <div className="flex justify-between">
          <div className="w-1/12"></div>
          {staticDays.map((day) => (
            <div key={day.id} className="text-center py-2 px-4 rounded-lg w-20 shadow-lg -translate-x-[85px]">
              <div className="font-semibold">{day.name}</div>
            </div>
          ))}
        </div>

        {/* Time slots and events */}
        <div className="flex mt-4 relative h-[540px]">
          <div className="flex flex-col">
            {[
              "07:00 AM",
              "08:00 AM",
              "09:00 AM",
              "10:00 AM",
              "11:00 AM",
              "12:00 PM",
              "01:00 PM",
              "02:00 PM",
              "03:00 PM",
              "04:00 PM",
            ].map((time, idx) => (
              <div key={idx} className="text-right pr-4 py-2 h-[60px] border-b-2 border-dashed mt-1">
                {time}
              </div>
            ))}
          </div>

          {/* Events for each day */}
          {staticDays.map((day) => (
            <div key={day.id} className="flex-1 relative border-l">
              {scheduleData
                .filter((event) => event.day.toUpperCase().startsWith(day.name.toUpperCase()))
                .map((event, idx) => {
                  const top = timeToPosition(event.startTime);
                  const height = calculateHeight(event.startTime, event.endTime);
                  return (
                    <div
                      key={idx}
                      className="absolute left-0 right-0 mx-2 p-4 rounded-lg bg-[#d9e3f8] text-[#004eeb]  border-l-4 border-[#004eeb]"
                      style={{ top: `${top}%`, height: `${height}%` }}
                    >
                      <div className="font-bold">{event.courseName}</div>
                      <div className="text-sm">{`${event.startTime} - ${event.endTime}`}</div>
                      <div className="text-xs">{event.classroomName}</div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default TimeTable;
