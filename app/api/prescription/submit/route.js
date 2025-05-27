import { connectDB } from "@/app/lib/mongodb";
import Prescription from "@/app/models/Prescription";

export async function POST(request) {
  await connectDB();

  const body = await request.json();
  const { _id, complaints, investigation, diagnosis, medication } = body;

  if (!_id) {
    return new Response(JSON.stringify({ message: "Prescription ID is required" }), {
      status: 400,
    });
  }

  try {
    const updated = await Prescription.findByIdAndUpdate(
      _id,
      { complaints, investigation, diagnosis, medication },
      { new: true }
    );

    if (!updated) {
      return new Response(JSON.stringify({ message: "Prescription not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Prescription updated", prescription: updated }), {
      status: 200,
    });
  } catch (error) {
    console.error("Update error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
