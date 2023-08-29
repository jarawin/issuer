"use client";
import { useEffect } from "react";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { Datepicker } from "flowbite-datepicker";

const DateRangePicker = (props: any) => {
  const [startDate, setStartDate] = props.startDate;
  const [endDate, setEndDate] = props.endDate;

  useEffect(() => {
    const datepickerStartEl = document?.getElementById("datepickerStartId");
    new Datepicker(datepickerStartEl, {
      format: "dd/mm/yyyy",
      autohide: true,
      todayHighlight: true,
      todayBtnMode: 1,
    });

    const datepickerEndEl = document?.getElementById("datepickerEndEl");
    new Datepicker(datepickerEndEl, {
      format: "dd/mm/yyyy",
      autohide: true,
      todayHighlight: true,
      todayBtnMode: 1,
    });
  }, []);

  return (
    <div className="App">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <div className="relative w-72">
            <input
              datepicker-format="dd/mm/yyyy"
              autoComplete="off"
              type="text"
              className="bg-gray-50 border border-gray-300 focus:border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-0 block w-full p-2.5"
              placeholder="Select start date"
              onBlur={(e: any) => setStartDate(e.target.value)}
              id="datepickerStartId"
              value={startDate}
            />

            <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
              <BsFillCalendarEventFill className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
        </div>

        <span className="mx-4 text-gray-500">to</span>

        <div className="relative">
          <div className="relative w-72">
            <input
              datepicker-format="dd/mm/yyyy"
              autoComplete="off"
              type="text"
              className="bg-gray-50 border border-gray-300 focus:border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-0 block w-full p-2.5"
              placeholder="Select end date"
              onBlur={(e: any) => setEndDate(e.target.value)}
              id="datepickerEndEl"
              value={endDate}
            />

            <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
              <BsFillCalendarEventFill className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
