import Cabin from "@/app/_components/Cabin";
import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getCabin, getCabins } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
}

export default async function Page({ params }) {
  const { cabinId } = await params;

  const cabin = await getCabin(cabinId);


  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin}/>
      
      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-400 mb-10">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>

      <div className="grid grid-cols-2 border  border-primary-800 min-h-[400px] overflow-hidden">
        {" "}
        <DateSelector />
        <ReservationForm />
      </div>
    </div>
  );
}
