"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filterButtons = [
  { label: `All cabins`, value: "all" },
  { label: `1\u20133 guests`, value: "small" },
  { label: `4\u20137 guests`, value: "medium" },
  { label: `8\u201312 guests`, value: "large" },
];

export default function Filter() {
const searchParams = useSearchParams()  
const router = useRouter()
const pathname = usePathname()
const activeFilter = searchParams.get('capacity') ?? 'all'

function handleFilter(filter){
const params = new URLSearchParams(searchParams.toString())
params.set('capacity', filter)

  router.replace(`${pathname}?${params.toString()}`,{scroll:false})
}

  return (
    <div className='border border-primary-700'>
      {filterButtons.map((button) => (
        <button onClick={()=>handleFilter(button.value)} className={`px-5 py-2 hover:bg-primary-700 cursor-pointer ${activeFilter === button.value ? 'bg-primary-700 text-primary-100':''}`} key={button.value}>
          {button.label}
        </button>
      ))}
    </div>
  );
}
