"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, CheckCircle } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Appointments = () => {
  const router = useRouter();
  const { user } = useAuth();
  const patientId = user.id;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // NEW: "all" | "upcoming" | "completed"

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`/api/appointment/${patientId}`);
        if (!res.ok) throw new Error("Failed to fetch appointments");

        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;

  // 🧠 Filter logic
  const filteredAppointments = appointments.filter((appt) => {
    if (filter === "all") return true;
    if (filter === "completed") return appt.status === "completed";
    if (filter === "upcoming") return appt.status !== "completed";
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>My Appointments</CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              className={filter === "all" ? "bg-blue-500 text-white" : ""}
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              size="sm"
              className={filter === "upcoming" ? "bg-blue-500 text-white" : ""}
              variant={filter === "upcoming" ? "default" : "outline"}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </Button>
            <Button
              size="sm"
              className={filter === "completed" ? "bg-blue-500 text-white" : ""}
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {filteredAppointments.length === 0 && <p>No appointments found.</p>}

        {filteredAppointments.map((appt) => {
          const isCompleted = appt.status === "completed";
          const doctor = appt.docId || {};

          return (
            <Card
              key={appt._id}
              onClick={() => router.push(`user/appoint/${appt._id}`)}
              className={`border-l-4 ${
                isCompleted ? "border-l-green-400" : "border-l-orange-400"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      {doctor.profileImage ? (
                        <AvatarImage src={doctor.profileImage} />
                      ) : (
                        <AvatarFallback>
                          {doctor.firstName
                            ? doctor.firstName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "DR"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">
                        {doctor.firstName + " " + doctor.lastName ||
                          "Unknown Doctor"}
                      </h3>
                      <p className="text-gray-600">
                        {doctor.specialization || "N/A"}
                      </p>
                    </div>
                  </div>

                  {isCompleted ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Completed</span>
                    </div>
                  ) : (
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={(e) => {
                        e.stopPropagation(); // prevents the click from bubbling to Link
                        e.preventDefault(); // prevents Link navigation
                        router.push(
                          `/call?room=${encodeURIComponent(appt.callLink)}`
                        );
                      }}
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Join Call
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <span className="text-gray-600">Date: </span>
                    <span>{new Date(appt.date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Time: </span>
                    <span>
                      {appt.interval.start} - {appt.interval.end}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status: </span>
                    <span
                      className={`font-medium ${
                        isCompleted ? "text-green-500" : "text-orange-500"
                      }`}
                    >
                      {isCompleted ? "Completed" : "Upcoming"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Payment: </span>
                    <span
                      className={`font-medium ${
                        appt.paymentStatus ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {appt.paymentStatus ? "Paid" : "Pending"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Appointments;
