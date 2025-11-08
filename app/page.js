import Image from "next/image";
import bg from "@/public/bg.png";


export default function page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />
    </main>
  );
}
