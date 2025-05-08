"use client";

import Doctor from "./Doctor";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const fetchDoctors = async ({ queryKey }) => {
  const [_key, category, searchQuery] = queryKey;

  const params = new URLSearchParams();

  if (category) {
    params.append("category", category);
  }
  if (searchQuery) {
    params.append("search", searchQuery);
  }

  const res = await fetch(
    `http://localhost:3000/api/doctors?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const DoctorList = ({ selectedCategory, setSelectedCategory }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: ["doctors", selectedCategory, searchQuery],
    queryFn: fetchDoctors,
  });

  if (isLoading) return <p>Loading doctors...</p>;
  if (error) return <p>Error fetching doctors: {error.message}</p>;

  return (
    <div className="my-5">
      <h4 className="text-xl mb-5 text-gray-500 text-medium">
        Home Page / <span className="text-primary">Find a doctor</span>
      </h4>
      <div className="mb-10">
        <h2 className="text-3xl">Select Doctor</h2>
        <div className="flex gap-4 mb-10 justify-between">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border-2 border-blue-200 bg-blue-200 font-semibold text-lg rounded-md p-2 mt-3 w-1/4"
          >
            <option value="">Select Specialist or Category</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Gynecology">Gynecology</option>
            <option value="Ophthalmology">Ophthalmology</option>
            <option value="Psychiatry">Psychiatry</option>
            <option value="Oncology">Oncology</option>
            <option value="Endocrinology">Endocrinology</option>
            <option value="Gastroenterology">Gastroenterology</option>
            <option value="Hematology">Hematology</option>
            <option value="Nephrology">Nephrology</option>
            <option value="Pulmonology">Pulmonology</option>
            <option value="Rheumatology">Rheumatology</option>
            <option value="ENT (Otolaryngology)">ENT (Otolaryngology)</option>
            <option value="General Surgery">General Surgery</option>
            <option value="Plastic Surgery">Plastic Surgery</option>
            <option value="Urology">Urology</option>
            <option value="Anesthesiology">Anesthesiology</option>
            <option value="Radiology">Radiology</option>
            <option value="Pathology">Pathology</option>
            <option value="Emergency Medicine">Emergency Medicine</option>
            <option value="Family Medicine">Family Medicine</option>
            <option value="Infectious Disease">Infectious Disease</option>
          </select>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2 mt-3 placeholder:font-light focus:outline-primary w-1/4"
            placeholder="Search by name"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data?.map((doctor, index) => (
          <Doctor key={index} {...doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
