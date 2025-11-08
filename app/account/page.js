import Image from "next/image";

export const metadata = {
  title: "Guest area",
};

export default function page() {
  return (
    <div className=" bg-blue-200 p-4">
      <img
        src="/bg.png"
        alt="Next.js logo"
        width={0}
        height={0}
        className="w-full "
      />
      <h1>User Account</h1>
    </div>
  );
}
