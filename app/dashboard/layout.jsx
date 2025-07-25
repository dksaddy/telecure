"use client";
import React from "react";
import Header from "../global_components/Header";
import LoadingModal from "@/app/global_components/LoadingModal";
import { useAuth } from "../context/AuthContext";
const layout = ({ children }) => {
  const { user } = useAuth();
  if (user == null) return <LoadingModal></LoadingModal>;
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default layout;
