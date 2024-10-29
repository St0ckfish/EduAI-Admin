"use client";
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

const timeToPosition = (time: {
  split: (arg0: string) => {
    (): any;
    new (): any;
    map: { (arg0: NumberConstructor): [any, any]; new (): any };
  };
}) => {
  const [hour, minute] = time.split(":").map(Number);

  const totalMinutes = hour * 60 + minute;
  const startOfDay = 7 * 60;
  const minutesSinceStartOfDay = totalMinutes - startOfDay;

  return (minutesSinceStartOfDay / 540) * 100;
};

const calculateHeight = (
  startTime: {
    split: (arg0: string) => {
      (): any;
      new (): any;
      map: { (arg0: NumberConstructor): [any, any]; new (): any };
    };
  },
  endTime: {
    split: (arg0: string) => {
      (): any;
      new (): any;
      map: { (arg0: NumberConstructor): [any, any]; new (): any };
    };
  },
) => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;

  const durationInMinutes = endInMinutes - startInMinutes;

  return (durationInMinutes / 540) * 100;
};

const TimeTable = ({ scheduleData }: { scheduleData: any[] }) => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const { language: currentLanguage } = useSelector((state: RootState) => state.language);
  return (
    <div dir={currentLanguage === "ar" ? "rtl" : "ltr"} className="grid w-full overflow-x-auto mb-20">
      <div className="grid w-full overflow-x-auto">
        <div
          className={`mx-3 rounded-xl bg-bgPrimary p-6 ${booleanValue ? "w-[1750px]" : "w-[1570px]"}`}
        >
          {/* Day headers */}
          <div className="flex justify-between">
            <div className="w-1/12"></div>
            {staticDays.map(day => (
              <div
                key={day.id}
                className="w-20 -translate-x-[85px] rounded-lg border border-borderPrimary px-4 py-2 text-center shadow-lg"
              >
                <div className="font-semibold">{day.name}</div>
              </div>
            ))}
          </div>

          {/* Time slots and events */}
          <div className="relative mt-4 flex h-[540px]">
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
                <div
                  key={idx}
                  className="mt-1 h-[60px] border-b-2 border-dashed border-borderPrimary py-2 pr-4 text-right"
                >
                  {time}
                </div>
              ))}
            </div>
            {/* Events for each day */}
            {staticDays.map(day => (
              <div
                key={day.id}
                className="relative flex-1 border-l border-borderPrimary"
              >
                {scheduleData
                  .filter(event =>
                    event.day.toUpperCase().startsWith(day.name.toUpperCase()),
                  )
                  .map((event, idx) => {
                    const top = timeToPosition(event.startTime);
                    const height = calculateHeight(
                      event.startTime,
                      event.endTime,
                    );
                    return (
                      <div
                        key={idx}
                        className="border-borderPrimary-4 absolute left-0 right-0 mx-2 rounded-lg border-l border-primary bg-thead p-4 text-primary overflow-auto"
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
