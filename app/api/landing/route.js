import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Doctor from "@/app/models/Doctor";

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch top 4 verified doctors
    const doctors = await Doctor.find({ isVerified: true })
      .sort({ ratings: -1, experience: -1 })
      .limit(4) // ← CHANGED FROM 8 TO 4
      .select(
        "firstName lastName profileImage experience specialization ratings"
      )
      .lean();

    // Transform data for frontend
    const formattedDoctors = doctors.map((doc) => ({
      name: `${doc.firstName} ${doc.lastName}`,
      avatar: doc.profileImage || "/placeholder.svg",
      specialty: doc.specialization[0] || "General",
      experience: `${doc.experience} years experience`,
      rating: doc.ratings || 5,
    }));

    return NextResponse.json(formattedDoctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
