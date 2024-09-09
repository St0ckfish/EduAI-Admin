import React from "react";

// Helper function to get the next 7 days starting from today
const today = new Date();
const getNext7Days = () => {
  const today = new Date();
  const days = [];
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    const dayName = nextDay.toLocaleString("en-US", { weekday: "short" });
    const date = nextDay.getDate();
    days.push({ id: i + 1, name: dayName, date });
  }
  return days;
};

const days = getNext7Days();

// Function to convert time string "07:00AM" to the top position (in percentage)
const timeToPosition = (time: string) => {
  const match = time.match(/\d+/g);
  const hourStr = match ? match[0] : "";
  const minuteStr = match ? match[1] : "";
  const isPM = time.includes("PM");
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  if (isPM && hour !== 12) hour += 12; // Convert PM hours to 24-hour format
  if (!isPM && hour === 12) hour = 0; // Adjust for 12 AM

  // Calculate the total minutes from 7:00 AM
  const startOfDay = 7 * 60; // 7:00 AM in minutes
  const totalMinutes = hour * 60 + minute;
  const minutesSinceStartOfDay = totalMinutes - startOfDay;

  // Calculate the top position in percentage based on total minutes
  return (minutesSinceStartOfDay / (9 * 60)) * 90; // Convert to percentage for 9 hours
};

// Function to calculate the height of the event block (based on the duration)
const calculateHeight = (startTime: string, endTime: string) => {
  const [startHour, startMinute] = startTime?.match(/\d+/g)?.map(Number) || [0, 0];
  const [endHour, endMinute] = endTime?.match(/\d+/g)?.map(Number) || [0, 0];

  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;

  // Calculate the duration in minutes and convert to percentage
  return ((endInMinutes - startInMinutes) / (9 * 60)) * 130; // Height in percentage
};

const timetable = [
  {
    name: "Class A2",
    time: "07:00AM - 08:00AM",
    day: 1, // Monday
    color: "bg-red-100 text-red-600",
    startTime: "07:00AM",
    endTime: "09:00AM",
  },
  {
    name: "Class B2",
    time: "08:00AM - 10:00AM",
    day: 7, // Sunday
    color: "bg-gray-200 text-gray-600",
    startTime: "08:00AM",
    endTime: "10:00AM",
  },
  {
    name: "Class B4",
    time: "10:00AM - 11:00AM",
    day: 3, // Wednesday
    color: "bg-blue-100 text-blue-600",
    startTime: "10:00AM",
    endTime: "11:00AM",
  },
  {
    name: "Class C3",
    time: "11:00AM - 01:00PM",
    day: 4, // Thursday
    color: "bg-orange-100 text-orange-600",
    startTime: "11:00AM",
    endTime: "01:00PM",
  },
  {
    name: "Class C4",
    time: "01:00PM - 03:00PM",
    day: 5, // Friday
    color: "bg-green-100 text-green-600",
    startTime: "01:00PM",
    endTime: "03:00PM",
  },
];

const Timetable = () => {
  return (
    <div className="grid w-full overflow-x-auto">
    <div className=" w-full grid overflow-x-auto">

    <div className="p-6 bg-white rounded-xl mr-3 w-[1570px]">
      {/* Day headers */}
      <div className="flex justify-between">
        {/* Empty space for time slots */}
        <div className="w-1/12"></div>
        {days.map((day) => (
          <div
          key={day.id}
          className={`text-center py-2 px-4 rounded-lg w-20 -translate-x-[80px] shadow-lg ${day.date === today.getDate() ? "border border-blue-400" : ""}`}
          >
            <div>{day.date}</div>
            <div className="font-semibold">{day.name}</div>
          </div>
        ))}
      </div>

      {/* Time slots and events */}
      <div className="flex mt-4 relative h-[540px]"> {/* 540px represents 9 hours from 7AM to 4PM */}
        {/* Time slots */}
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
            <div key={idx} className="text-right pr-4 py-2 h-[60px] border-b">
              {time}
            </div>
          ))}
        </div>

        {/* Events for each day */}
        {days.map((day) => (
          <div key={day.id} className="flex-1 relative border-l">
            {timetable
              .filter((event) => event.day === day.id)
              .map((event, idx) => {
                const top = timeToPosition(event.startTime);
                const height = calculateHeight(event.startTime, event.endTime);
                return (
                  <div
                  key={idx}
                  className={`absolute left-0 right-0 mx-2 p-4 rounded-lg ${event.color}`}
                  style={{
                    top: `${top}%`,
                    height: `${height}%`,
                  }}
                  >
                    <div className="font-bold">{event.name}</div>
                    <div className="text-sm">{event.time}</div>
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

export default Timetable;
