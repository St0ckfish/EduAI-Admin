"use client"
import React, { useState } from 'react';

interface Event {
  start: string;
  end: string;
  title: string;
  color: string;
}

interface EventsData {
  [key: string]: Event[];
}

const eventsData: EventsData = {
  '2024-06-06': [
    { start: '07:00', end: '08:00', title: 'English', color: 'bg-orange-200 text-orange-800' },
    { start: '11:00', end: '13:00', title: 'Science', color: 'bg-orange-200 text-orange-800' },
    { start: '13:00', end: '15:00', title: 'French', color: 'bg-green-200 text-green-800' },
  ],
  '2024-06-07': [
    { start: '08:00', end: '10:00', title: 'Math', color: 'bg-gray-200 text-gray-800' },
  ],
  '2024-06-09': [
    { start: '10:00', end: '11:00', title: 'Arabic', color: 'bg-blue-200 text-blue-800' },
  ],
};

const Timeline: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2024-06-06');
  const events = eventsData[selectedDate] || [];

  const days = Object.keys(eventsData);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Schedule</h1>
      <div className="flex mb-4 justify-center space-x-4">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDate(day)}
            className={`px-4 py-2 text-sm rounded-lg ${
              selectedDate === day ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {new Date(day).getDate()}
            <br />
            {new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-24 gap-1 ">
        {Array.from({ length: 24 }).map((_, hour) => (
          <div key={hour} className="col-span-1 border-t border-l border-gray-200 text-left h-16">
            {hour}:00
          </div>
        ))}
        {events.map((event, index) => {
          const startHour = parseInt(event.start.split(':')[0]);
          const endHour = parseInt(event.end.split(':')[0]);
          return (
            <div
              key={index}
              className={`col-start-${startHour + 1} col-end-${endHour + 1} ${event.color} border-l border-gray-200 text-center`}
            >
              <div className="flex flex-col h-full justify-center">
                <span>{event.title}</span>
                <span className="text-xs ">
                  {event.start} - {event.end}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;