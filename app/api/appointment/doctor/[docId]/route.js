import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import Doctor from "@/app/models/Doctor";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  await connectDB();

  const { docId } = await params;
  const cleanDocId = docId.replace(/[^\da-fA-F]/g, "").slice(0, 24);

  if (!mongoose.Types.ObjectId.isValid(cleanDocId)) {
    return NextResponse.json({ error: "Invalid doctor ID" }, { status: 400 });
  }

  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const status = url.searchParams.get("status") || "all";

    const query = {
      docId: new mongoose.Types.ObjectId(cleanDocId),
    };

    if (status !== "all") {
      query.status = status;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const appointments = await Appointment.find(query).sort({
      date: 1,
      "interval.start": 1,
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctor appointments" },
      { status: 500 }
    );
  }
}
