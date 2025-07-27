"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/app/context/AuthContext";
const doctorId = "6801d6e09abade27caa69466"; // Replace with dynamic doc ID

const Schedule = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayAppointments = async () => {
      try {
        const res = await fetch(`/api/doctors/recent/${doctorId}`);
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to load today's appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayAppointments();
  }, []);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Today's Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading && <p className="text-sm text-gray-500">Loading...</p>}
        {!loading && appointments.length === 0 && (
          <p className="text-sm text-gray-500">No appointments for today.</p>
        )}

        {appointments.map((appt) => (
          <div
            key={appt._id}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-600">
                {appt.patient.firstName + " " + appt.patient.lastName || "N/A"}
              </span>
            </div>
            <Badge className={getStatusStyle(appt.status)}>{appt.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Schedule;
