import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const tran_id = formData.get("tran_id");

    // Redirect to success page with tran_id as query param
    return NextResponse.redirect(`http://localhost:3000/payment/success?tran_id=${tran_id}`, 303);
  } catch (error) {
    console.error("POST /api/payment/success error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
