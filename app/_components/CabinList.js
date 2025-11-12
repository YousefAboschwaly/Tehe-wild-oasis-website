import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

// IS to make Component to be Dynamic (no SSG)
// import {unstable_noStore as noStore} from 'next/cache'

export default async function CabinList() {
  // noStore()
  console.log("Starting...");
  const cabins = await getCabins();
  console.log(cabins);

  if (cabins.length === 0) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
