"use client";
import { useAuth } from "@/app/context/AuthContext";

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
  return <div>{children}</div>;
}
