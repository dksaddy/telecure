'use client';

import React from 'react';

export default function PrescriptionHeader({ doctor, appointment }) {
  return (
    <>
      {/* Top Row: Doctor & Appointment Info */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4 font-sans text-gray-800">
        {/* Doctor Info */}
        <div className="w-full sm:w-1/2 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-purple-700 mb-1">Dr. {doctor.name}</h2>
          <p className="text-sm"><strong>Specialization:</strong> {doctor.specialization}</p>
          <p className="text-sm"><strong>Education:</strong> {doctor.education}</p>
        </div>

        {/* Appointment Info */}
        <div className="w-full sm:w-1/2 bg-white rounded-lg p-4 border border-gray-200 shadow-sm text-sm sm:text-end">
          <p><strong>Appointment ID:</strong> {appointment._id}</p>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.interval.start} - {appointment.interval.end}</p>
          <p><strong>Patient Phone:</strong> {appointment.phone}</p>
        </div>
      </div>

      {/* Patient Info */}
      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm font-sans text-sm text-gray-800 space-y-2 mb-6">
        <h2 className="text-lg font-semibold text-purple-700 mb-2">Patient Details</h2>
        <div className="flex flex-wrap gap-x-12 gap-y-2">
          <div><strong>Name:</strong> {appointment.name}</div>
          <div><strong>Age:</strong> {appointment.age}</div>
          <div><strong>Sex:</strong> {appointment.gender}</div>
          <div><strong>Weight:</strong> {appointment.weight} kg</div>
          <div><strong>Height:</strong> {appointment.heightFeet}' {appointment.heightInch}"</div>
        </div>
      </div>
    </>
  );
}
