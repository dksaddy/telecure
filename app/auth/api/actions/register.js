"use server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import dayjs from "dayjs";

export async function createUser(currentState, formdata) {
  if (currentState.success) return { success: false, error: null };

  await connectDB();
  const fname = formdata.get("fname");
  const lname = formdata.get("lname");
  const date = formdata.get("date");
  const email = formdata.get("email");
  const password = formdata.get("password");
  console.log(fname, lname, date, email, password);

  const exisiting = await User.findOne({ email });
  if (exisiting) {
    return { success: false, error: "User already exists with this email" };
  }
  const user = new User({
    firstName: fname,
    lastName: lname,
    dateOfBirth: date,
    email,
    password,
  });
  await user.save();
  const userData = {
    name: user.firstName + " " + user.lastName,
    dateOfBirth: dayjs(user.dateOfBirth).format("D MMMM YYYY"),
    email: user.email,
    role: user.role,
    id: user._id.toString(),
    profileImage: user.profileImage,
  };
  return { success: true, error: null, user: userData };
}
