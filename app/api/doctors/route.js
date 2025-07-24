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
  const experience = searchParams.get("experience");
  const gender = searchParams.get("gender");
  const country = searchParams.get("country");
  const city = searchParams.get("city");
  const district = searchParams.get("district");
  const availableToday = searchParams.get("availableToday");
  const education = searchParams.get("education");
  const ratingValue = searchParams.get("rating");

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

  if (experience) {
    query.experience = { $gte: Number(experience) };
  }

  if (ratingValue) {
    query.ratings = { $gte: Number(ratingValue) };
  }

  if (gender) {
    query.gender = gender;
  }

  if (country || city || district) {
    if (country) query["address.country"] = country;
    if (city) query["address.city"] = city;
    if (district) query["address.district"] = district;
  }

  if (availableToday === "true") {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    query["availableSlots.day"] = today;
    console.log(today);
  }

  if (education) {
    query.education = { $regex: education, $options: "i" };
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
