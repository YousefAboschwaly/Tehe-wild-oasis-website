"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { deleteBooking, getBookings, updateGuest } from "./data-service";

export async function updateGuestProfile(formData) {
  const session = await auth();
  if (!session.user) throw new Error("You must be Logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,14}$/.test(nationalID))
    throw new Error("Please provide an valid national ID");
  const updatedData = { nationality, countryFlag, nationalID };
  console.log(updatedData);
  await updateGuest(session.user.guestId, updatedData);
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  const guestBookings = await getBookings(session.user.guestId);

  const bookingIds = guestBookings.map((booking) => booking.id);
  if (!session.user) throw new Error("You must be Logged in");

  if (!bookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking ");

  await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}
export async function SignInAction() {
  return signIn("google", { redirectTo: "/account" });
}
export async function SignOutAction() {
  return signOut({ redirectTo: "/" });
}
