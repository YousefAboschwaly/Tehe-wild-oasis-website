"use client";
import { differenceInDays, isPast, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "../_context/ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ cabin, settings, bookedDates }) {
  // CHANGE
  const { range, setRange, resetRange } = useReservation();
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(range.to, range.from);
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  console.log(range);
  return (
    <div className="flex-1  gap-2 flex flex-col justify-between w-full h-full ">
      <DayPicker
        onSelect={setRange}
        selected={range}
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) => isPast(curDate)}
        className="pt-12 place-items-center"
        classNames={{
          months: "flex gap-3  ",
          nav: "hidden",
          today: "text-accent-500 ",
          month_caption: " mb-3",
          dropdowns: " flex justify-center gap-4 cursor-pointer ",
          day: "hover:rounded-full hover:bg-accent-400 hover:text-primary-900 transition-all",
          day_button: "h-10 w-10 ",
          selected: "hover:rounded-none bg-accent-500 text-primary-900",
          range_start: "rounded-l-full",
          range_middle: "bg-accent-500 ",
          range_end: "rounded-r-full",
        }}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold cursor-pointer"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
