"use client";

import React, { useEffect, useState } from "react";
import { Phone, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const doctorId = "6801d6e09abade27caa69466"; // Replace with logged-in doctor ID dynamically

const Upcoming = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`/api/doctors/upcoming/${user.id}`);
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Upcoming Appointments
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-blue-600">
          View All
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading && <p>Loading appointments...</p>}
        {!loading && appointments.length === 0 && (
          <p className="text-sm text-gray-500">No upcoming appointments.</p>
        )}

        {appointments.map((appt) => {
          const patient = appt.patientId || {};
          const fullName = `${patient.firstName || "Unknown"} ${
            patient.lastName || ""
          }`;
          const age = patient.dateOfBirth
            ? new Date().getFullYear() -
              new Date(patient.dateOfBirth).getFullYear()
            : "N/A";

          return (
            appt.status !== "completed" && (
              <div
                key={appt._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={patient.profileImage || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {patient.firstName?.[0] || "U"}
                      {patient.lastName?.[0] || ""}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{fullName}</p>
                    <p className="text-sm text-gray-600">
                      {appt.interval?.start + " - " + appt.interval?.end ||
                        "No time"}{" "}
                      | {appt.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      Age: {age}, ID: #{patient._id?.slice(-4) || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() =>
                      router.push(
                        `/call?room=${encodeURIComponent(appt.callLink)}`
                      )
                    }
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Start Call
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Upcoming;
