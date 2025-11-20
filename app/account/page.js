import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function page() {
  const session = await auth()
  return (
    <div>
      <h1 className="text-accent-400  text-2xl">Welcome {session.user.name}</h1>
    </div>
  );
}
