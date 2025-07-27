"use client";

import Doctor from "./Doctor";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import useFilterStore from "@/app/store/useFilterStore";

const fetchDoctors = async ({ queryKey }) => {
  const [_key, filters] = queryKey;

  const params = new URLSearchParams();

  if (filters.selectedCategory) {
    params.append("category", filters.selectedCategory);
  }
  if (filters.searchTerm) {
    params.append("search", filters.searchTerm);
  }
  if (filters.ratingValue) {
    params.append("rating", filters.ratingValue);
  }
  if (filters.experience) {
    params.append("experience", filters.experience);
  }
  if (filters.availableToday) {
    params.append("availableToday", "true");
  }
  if (filters.gender != "") {
    params.append("gender", filters.gender);
  }

  const res = await fetch(`../api/doctors?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

const DoctorList = () => {
  const {
    selectedCategory,
    searchTerm,
    ratingValue,
    experience,
    availableToday,
    gender,
  } = useFilterStore();

  const filters = {
    selectedCategory,
    searchTerm,
    ratingValue,
    experience,
    availableToday,
    gender,
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["doctors", filters],
    queryFn: fetchDoctors,
  });

  if (isLoading) return <p>Loading doctors...</p>;
  if (error) return <p>Error fetching doctors: {error.message}</p>;

  return (
    <div className="mt-5">
      <h2 className="text-2xl text-gray-500 mb-4">Doctor Lists</h2>
      <div className="grid grid-cols-4 gap-4">
        {data?.map((doctor, index) => (
          <Doctor key={index} {...doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
