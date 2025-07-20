"use server";
import { connectDB } from "@/app/lib/mongodb";
import Doctor from "@/app/models/Doctor"; // Make sure this import is correct

export async function GET(req) {
  await connectDB();

  try {
    const uniqueSpecializations = await Doctor.distinct("specialization");

    const categories = uniqueSpecializations.map((spec) => ({
      value: spec,
      label: spec,
    }));

    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching specializations:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch specializations" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
