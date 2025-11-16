import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

export default async function Reservation({ cabin }) {
  const [bookedDates, settings, session] = await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings(),
    auth(),
  ]);
  return (
    <div className="grid grid-cols-2 border  border-primary-800 min-h-[400px] overflow-hidden">
      <DateSelector
        cabin={cabin}
        bookedDates={bookedDates}
        settings={settings}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
