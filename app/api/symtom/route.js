"use server";
import { connectDB } from "@/app/lib/mongodb";
import Doctor from "@/app/models/Doctor";

export async function POST(req) {
  await connectDB();
  console.log("POST /api/symptom called");

  try {
    const body = await req.json();
    const { symptoms } = body;

    console.log("Received symptoms:", symptoms);

    const prompt = `
You are a medical assistant. A patient described their symptoms in Bengali (or English). Based on that, suggest the **one** most likely doctor specialty the patient should consult.

Symptoms: ${symptoms}

Respond with only one word: the doctor's specialty. Example: "Cardiology"
`;

    const chatResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", // Update for production
        "X-Title": "Symptom Checker"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful doctor assistant." },
          { role: "user", content: prompt }
        ]
      })
    });

    const result = await chatResponse.json();
    let specialization = result.choices?.[0]?.message?.content?.trim();

    if (!specialization) {
      throw new Error("No specialization returned from model");
    }

    // Capitalize properly
    specialization = specialization.charAt(0).toUpperCase() + specialization.slice(1).toLowerCase();
    console.log("Specialization predicted:", specialization);

    // Find doctors matching that specialization
    const doctors = await Doctor.find({
      specialization: { $in: [specialization] }
    }).select("-password -__v"); // exclude sensitive fields

    console.log(`Found ${doctors.length} doctor(s)`);

    return new Response(JSON.stringify({
      specialization,
      doctors
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Error in POST /api/symptom:", error);
    return new Response(JSON.stringify({
      message: "Server error",
      error: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
