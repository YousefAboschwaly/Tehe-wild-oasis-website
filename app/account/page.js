import Image from "next/image";
import bg from "@/public/bg.png";


export const metadata = {
  title: "Guest area",
};

export default function page() {
  return (
    <div className=" bg-blue-200 p-4">
      <Image
        src={bg}
        alt="Next.js logo"
        width={0}
        height={0}
        placeholder="blur"
        quality={100}

      />
      <h1>User Account</h1>
    </div>
  );
}
