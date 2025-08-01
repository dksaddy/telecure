"use client";
import { useAuth } from "@/app/context/AuthContext";
import Header from "../global_components/Header";

export default function AppointmentLayout({ children }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
          Please Sign in to book an appointment
        </h1>
      </div>
    );
  }
  if (user.role === "doctor") {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
          You are not authorized to book an appointment
        </h1>
      </div>
    );
  }
  return (
    <>
      <Header />
      <div className="mx-auto block w-[400px]">
        <h2 className="text-5xl my-3 text-center pb-2  border-b-2 border-primary">
          Book Apponitment
        </h2>
      </div>
      {children}
    </>
  );
}
