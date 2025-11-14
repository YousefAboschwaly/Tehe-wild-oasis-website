import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

// IS to make Component to be Dynamic (no SSG)
// import {unstable_noStore as noStore} from 'next/cache'

export default async function CabinList({filter}) {
  // noStore()
  const cabins = await getCabins();
  let filteredCabins 
  if (cabins.length === 0) return null;

  if(filter === 'all') filteredCabins= cabins 
  else if (filter === 'small') filteredCabins = cabins.filter(cabin => cabin.maxCapacity <=3)
  else if (filter === 'medium') filteredCabins = cabins.filter(cabin => cabin.maxCapacity >=4 && cabin.maxCapacity <=7)
  else if (filter === 'large') filteredCabins = cabins.filter(cabin => cabin.maxCapacity >=8)  
console.log(filter,filteredCabins)
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
