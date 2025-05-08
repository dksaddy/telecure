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

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const query = {};

  if (category) {
    query.specialization = category;
  }

  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
    ];
  }

  try {
    const doctors = await Doctor.find(query);
    return new Response(JSON.stringify(doctors), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch doctors" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
