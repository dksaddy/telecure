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
You are a medical assistant. A patient described their symptoms in Bengali (or English). Your task is to:

1️⃣ Identify the **one most likely doctor's specialty** the patient should consult (e.g., "Cardiology", "Dermatology").

2️⃣ List **2-5 possible diseases or conditions** based on the symptoms.

⚠️ Important:
- Each disease must include its name in both English and Bengali.
- Format as **strict JSON** (no extra commentary).

---

Symptoms: ${symptoms}

---

✅ Respond in this exact JSON format:

{
  "specialization": "<doctor_specialty>",
  "possibleDiseases": [
    { "english": "<Disease Name in English>", "bengali": "<Disease Name in Bengali>" },
    { "english": "<Disease Name in English>", "bengali": "<Disease Name in Bengali>" }
  ]
}
`;

    const chatResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // Update for production
          "X-Title": "Symptom Checker",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful doctor assistant." },
            { role: "user", content: prompt },
          ],
        }),
      }
    );

    const result = await chatResponse.json();
    console.log("Chat result:", result);

    let content = result.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new Error("No response from model");
    }

    // Parse the JSON returned by the model
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      console.error("Failed to parse JSON from AI:", content);
      throw new Error("Failed to parse AI response");
    }

    let { specialization, possibleDiseases } = parsed;

    if (!specialization || !Array.isArray(possibleDiseases)) {
      throw new Error("Invalid AI response format");
    }

    // Capitalize specialization properly
    specialization =
      specialization.charAt(0).toUpperCase() +
      specialization.slice(1).toLowerCase();
    console.log("Specialization predicted:", specialization);
    console.log("Possible diseases:", possibleDiseases);

    // Find doctors matching that specialization
    const doctors = await Doctor.find({
      specialization: { $in: [specialization] },
    }).select("-password -__v");

    console.log(`Found ${doctors.length} doctor(s)`);

    return new Response(
      JSON.stringify({
        specialization,
        possibleDiseases,
        doctors,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in POST /api/symptom:", error);
    return new Response(
      JSON.stringify({
        message: "Server error",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
