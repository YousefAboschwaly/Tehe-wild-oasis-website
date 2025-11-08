import Image from 'next/image';

export default function page() {
  return (
    <div className=" bg-blue-200 p-4">
      <Image src="/next.svg" alt="Next.js logo"  width={0} height={0} className="w-99 h-99" />
      <h1>User Account</h1>
    </div>
  );
}
