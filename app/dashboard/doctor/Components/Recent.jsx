"use client";
import React, { useEffect, useState } from "react";
import { FileText, Phone, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow, parseISO } from "date-fns"; // or import dayjs if you prefer
import { useAuth } from "@/app/context/AuthContext";

const Recent = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`../api/doctors/patients/${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading recent patients...</p>;
  if (error) return <p>Error loading patients: {error}</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Patients</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {patients.length === 0 && <p>No recent patients found.</p>}
        {patients.map(({ patient, lastConsultation }) => (
          <div
            key={patient._id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <Avatar>
                {patient.profileImage ? (
                  <AvatarImage src={patient.profileImage} />
                ) : (
                  <AvatarFallback>
                    {(patient.firstName[0] + patient.lastName[0]).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">
                  {patient.firstName} {patient.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  Last consultation:{" "}
                  {formatDistanceToNow(parseISO(lastConsultation), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <FileText className="w-4 h-4 text-blue-600" />
              </Button>
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4 text-blue-600" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4 text-blue-600" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Recent;
