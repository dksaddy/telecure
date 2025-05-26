"use server";
import { connectDB } from "@/app/lib/mongodb";
import Doctor from "@/app/models/Doctor";
import dayjs from "dayjs";

export async function doctorLogin(currentState, formdata) {
  await connectDB();
  const email = formdata.get("email");
  const password = formdata.get("password");

  const existingUser = await Doctor.findOne({ email });
  if (!existingUser) {
    return { success: false, error: "Doctor already not found" };
  }
  if (existingUser.password !== password) {
    return { success: false, error: "Incorrect password." };
  }
  const doctorData = {
    id: existingUser._id.toString(),
    name: existingUser.firstName + " " + existingUser.lastName,
    email: existingUser.email,

    dateOfBirth: dayjs(existingUser.dateOfBirth).format("D MMMM YYYY"),
    profileImage: existingUser.profileImage,
    role: "doctor",
  };
  return { success: true, error: null, doctor: doctorData };
}
