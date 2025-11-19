"use server";

import { auth, signIn, signOut } from "./auth";

export async function updateGuestProfile(formData) {
  const session = await auth();
  if (!session.user) throw new Error("You must Login");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,14}$/.test(nationalID))
    throw new Error("Please provide an valid national ID");
  const updatedData = { nationality, countryFlag, nationalID };
  console.log(updatedData);
}

export async function SignInAction() {
  return signIn("google", { redirectTo: "/account" });
}
export async function SignOutAction() {
  return signOut({ redirectTo: "/" });
}
