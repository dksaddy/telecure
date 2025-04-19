"use server";
import { connectDB } from "@/app/lib/mongodb";
import Doctor from "@/app/models/Doctor";

export async function POST(req) {
  await connectDB();

  const body = await req.json(); // important to parse the request body!
  const { email } = body; // extract the email

  const existing = await Doctor.findOne({ email });
  if (existing) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "User already exists with this email",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const newDoctor = new Doctor(body);
  await newDoctor.save();

  return new Response(JSON.stringify({ success: true, error: null }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
export async function GET(req) {
  await connectDB();
  const doctors = await Doctor.find({});
  return new Response(JSON.stringify(doctors), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
