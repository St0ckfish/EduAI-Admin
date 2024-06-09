"use client";
import React from 'react';
import { format, startOfMonth, endOfMonth, addDays, eachDayOfInterval, isSameMonth } from 'date-fns';

interface Event {
  date: Date;
  name: string;
  time: string;
  color: string;
}

const events: Event[] = [
  {
    date: new Date(2024, 5, 2),
    name: 'Meeting',
    time: '12:00~14:00',
    color: 'bg-black'
  },
  {
    date: new Date(2024, 5, 2),
    name: 'Meeting',
    time: '12:00~14:00',
    color: 'bg-blue-500'
  },
  {
    date: new Date(2024, 5, 2),
    name: 'Meeting',
    time: '12:00~14:00',
    color: 'bg-gray-400'
  },
  {
    date: new Date(2024, 5, 2),
    name: 'Meeting',
    time: '12:00~14:00',
    color: 'bg-red-500'
  },
  {
    date: new Date(2024, 5, 2),
    name: 'LOL',
    time: '12:00~14:00',
    color: 'bg-orange-400'
  },
  {
    date: new Date(2024, 5, 5),
    name: 'Conference',
    time: '18:00~20:00',
    color: 'bg-red-400'
  },
  {
    date: new Date(2024, 5, 5),
    name: 'sdfkjsdf',
    time: '18:00~20:00',
    color: 'bg-black'
  },
  {
    date: new Date(2024, 5, 18),
    name: 'Workshop',
    time: '09:00~12:00',
    color: 'bg-green-400'
  }
];

const Timeline: React.FC = () => {
  const today = new Date();
  const startOfCurrentMonth = startOfMonth(today);
  const endOfCurrentMonth = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({
    start: startOfCurrentMonth,
    end: endOfCurrentMonth
  });

  return (
    <div className="container mx-auto">
      <div className="wrapper bg-white rounded shadow w-full">
        <div className="header flex justify-between border-b p-2">
          <span className="text-lg font-bold">
            {format(today, 'yyyy MMMM')}
          </span>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                <th
                  key={day}
                  className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs"
                >
                  <span className="xl:block lg:block md:block sm:block hidden">
                    {day}
                  </span>
                  <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                    {day.slice(0, 3)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(daysInMonth.length / 7) }).map((_, weekIndex) => (
              <tr key={weekIndex} className="text-center h-20">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const day = daysInMonth[weekIndex * 7 + dayIndex];
                  return (
                    <td
                      key={dayIndex}
                      className={`border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300 ${
                        !isSameMonth(day, today) ? 'bg-gray-100' : ''
                      }`}
                    >
                      {day && (
                        <div className="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                          <div className="top h-5 w-full">
                            <span className="text-gray-500">{format(day, 'd')}</span>
                          </div>
                          <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer overflow-auto">
                            {events
                              .filter(event => format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
                              .map((event, idx) => (
                                <div
                                  key={idx}
                                  className={`event ${event.color} text-white rounded px-3 py-1.5 justify-center text-center text-sm mb-1 flex gap-1`}
                                >
                                  <span className="event-name">{event.name}</span>
                                  <span className="time">{event.time}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Timeline;
