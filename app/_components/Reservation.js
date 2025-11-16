import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

export default async function Reservation({cabin}) {
 const [bookedDates , settings] =  await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings()
  ])
  return (
    <div className="grid grid-cols-2 border  border-primary-800 min-h-[400px] overflow-hidden">
      <DateSelector cabin={cabin} bookedDates={bookedDates} settings={settings}  />
      <ReservationForm cabin={cabin}  />
    </div>
  );
}
