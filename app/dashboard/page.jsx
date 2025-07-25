"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";
const page = () => {
  const { user } = useAuth();
  if (user == null) return null;
};

export default page;
