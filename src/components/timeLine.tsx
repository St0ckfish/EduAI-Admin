"use client";
import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  startOfWeek,
  addDays,
  parseISO,
} from "date-fns";

interface Meeting {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isAttendee: boolean;
}

interface TimelineProps {
  meetings: Meeting[];
}

const Timeline: React.FC<TimelineProps> = ({ meetings }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startOfCurrentMonth = startOfMonth(currentMonth);
  const endOfCurrentMonth = endOfMonth(currentMonth);
  const startOfFirstWeek = startOfWeek(startOfCurrentMonth, {
    weekStartsOn: 6,
  }); // week starts on Saturday
  const daysInMonth = eachDayOfInterval({
    start: startOfFirstWeek,
    end: addDays(endOfCurrentMonth, 6 - endOfCurrentMonth.getDay()),
  });

  const handlePrevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="grid overflow-auto">
      <div className="mx-auto w-full overflow-auto">
        <div className="wrapper w-full overflow-auto rounded bg-bgPrimary shadow">
          <div className="header flex w-full justify-between border-b border-borderPrimary p-2 max-[1500px]:w-[1185px]">
            <button onClick={handlePrevMonth} className="p-2">
              <svg
                className="h-6 w-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <polyline points="15 6 9 12 15 18" />
              </svg>
            </button>
            <span className="text-lg font-bold">
              {format(currentMonth, "yyyy MMMM")}
            </span>
            <button onClick={handleNextMonth} className="p-2">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
          <table className="w-full overflow-auto">
            <thead>
              <tr>
                {[
                  "Saturday",
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ].map(day => (
                  <th
                    key={day}
                    className="h-10 w-40 border-r border-borderPrimary p-2 text-xs xl:text-sm"
                  >
                    <span className="hidden sm:block md:block lg:block xl:block">
                      {day}
                    </span>
                    <span className="block sm:hidden md:hidden lg:hidden xl:hidden">
                      {day.slice(0, 3)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.ceil(daysInMonth.length / 7) }).map(
                (_, weekIndex) => (
                  <tr key={weekIndex} className="h-20 text-center">
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const day = daysInMonth[weekIndex * 7 + dayIndex];
                      return (
                        <td
                          key={dayIndex}
                          className={`ease h-40 w-40 cursor-pointer overflow-auto border p-1 border-borderPrimary transition duration-500 hover:bg-bgSecondary ${
                            !isSameMonth(day, currentMonth) ? "bg-bgSecondary" : ""
                          } ${
                            isToday(day)
                              ? "scale-90 bg-blue-300 shadow-2xl"
                              : ""
                          }`}
                        >
                          {day && (
                            <div className="mx-auto flex h-40 w-40 flex-col overflow-hidden">
                              <div className="top h-5 w-full">
                                <span className="text-gray-500">
                                  {format(day, "d")}
                                </span>
                              </div>
                              <div className="bottom h-30 w-full flex-grow cursor-pointer overflow-auto py-1">
                                {meetings
                                  .filter(
                                    meeting =>
                                      format(
                                        parseISO(meeting.startDate),
                                        "yyyy-MM-dd",
                                      ) === format(day, "yyyy-MM-dd"),
                                  )
                                  .map(meeting => (
                                    <div
                                      key={meeting.id}
                                      className="event mb-1 flex flex-col justify-center gap-1 rounded bg-primary px-3 py-1.5 text-center text-sm text-white"
                                    >
                                      <span className="event-name text-[18px] font-semibold">
                                        {meeting.title}
                                      </span>
                                      {/* <span className="description">
                                        {meeting.description}
                                      </span> */}
                                      <span className="time">
                                        {format(
                                          parseISO(meeting.startDate),
                                          "hh:mm a",
                                        )}{" "}
                                        -{" "}
                                        {format(
                                          parseISO(meeting.endDate),
                                          "hh:mm a",
                                        )}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
