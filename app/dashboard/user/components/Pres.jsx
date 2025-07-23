"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

const Pres = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await fetch(`/api/prescription/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch prescriptions");
        const data = await res.json();
        setPrescriptions(data);
      } catch (err) {
        console.error("Failed to fetch prescriptions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchPrescriptions();
    }
  }, [user]);

  if (loading) return <p>Loading prescriptions...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Prescriptions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {prescriptions.length === 0 && <p>No prescriptions found.</p>}

        {prescriptions.map((prescription) => {
          const {
            _id,
            diagnosis,
            medication,
            investigation,
            createdAt,
            doctor,
          } = prescription;

          const formattedDate = new Date(createdAt).toLocaleDateString();

          const medicationSummary =
            medication
              ?.map((m) => `${m.name} (${m.duration} days)`)
              .join(", ") || "N/A";

          const diagnosisText = diagnosis?.join(", ") || "N/A";
          const investigationText = investigation?.join(", ") || "N/A";

          return (
            <Card key={_id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">
                      Prescription - {formattedDate}
                    </h3>
                    <p className="text-gray-600">
                      {doctor?.name || "Dr. Unknown"}
                    </p>
                  </div>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Diagnosis: </span>
                    <span>{diagnosisText}</span>
                  </div>
                  <div>
                    <span className="font-medium">Medications: </span>
                    <span>{medicationSummary}</span>
                  </div>
                  <div>
                    <span className="font-medium">Investigations: </span>
                    <span>{investigationText}</span>
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

export default Pres;
