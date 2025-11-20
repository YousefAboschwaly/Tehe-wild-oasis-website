"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import {
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";

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
export async function updateReservation(formData) {
  const session = await auth();
  const guestBookings = await getBookings(session.user.guestId);
  if (!session.user) throw new Error("You must be Logged in");

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations").slice(0,1000);
  const reservationId = formData.get("reservationId");
  const bookingIds = guestBookings.map((booking) => booking.id);

  if (!session.user) throw new Error("You must be Logged in");
  if (!bookingIds.includes(Number(reservationId)))
    throw new Error("You are not allowed to Edit this booking ");

  const updatedData = { numGuests, observations };
  await updateBooking(reservationId, updatedData);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}
export async function SignInAction() {
  return signIn("google", { redirectTo: "/account" });
}
export async function SignOutAction() {
  return signOut({ redirectTo: "/" });
}
