"use server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import dayjs from "dayjs";

export async function loginUser(currentState, formdata) {
  await connectDB();
  const email = formdata.get("email");
  const password = formdata.get("password");

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return { success: false, error: "User already not found" };
  }
  if (existingUser.password !== password) {
    return { success: false, error: "Incorrect password." };
  }
  const userData = {
    id: existingUser._id.toString(),
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role,
    dateOfBirth: dayjs(existingUser.dateOfBirth).format("D MMMM YYYY"),
    profileImage: existingUser.profileImage,
  };
  return { success: true, error: null, user: userData };
}
