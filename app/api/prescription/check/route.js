import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Prescription from "@/app/models/Prescription";

export async function POST(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Prescription ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const prescription = await Prescription.findById(id).lean();
    if (!prescription) {
      return NextResponse.json(
        { success: false, message: "Prescription not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: prescription,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
