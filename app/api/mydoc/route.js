// app/api/mydoc/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '../../lib/mongodb'; 
import Doctor from '../../models/Doctor';

export async function POST(request) {
  try {
    // Connect to MongoDB using your existing connection logic
    await connectDB();
    
    // Parse the request body
    const { docId } = await request.json();
    
    // Validate the doctor ID
    if (!docId) {
      return NextResponse.json(
        { error: 'Doctor ID is required in request body' },
        { status: 400 }
      );
    }


    // Fetch doctor data
    const doctor = await Doctor.findById(docId)
      .select('-password -__v') // Exclude sensitive fields
      .lean();

    if (!doctor) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(doctor);
    
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  } 
}