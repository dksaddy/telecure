// MedicalPrescription.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  User,
  ClipboardList,
  Stethoscope,
  FlaskConical,
  Pill,
  CalendarClock,
  Heart,
  Droplet,
  Weight,
  Ruler,
  CalendarDays,
  RefreshCw,
  Download,
  Printer,
  Info,
  Syringe,
  ClipboardCheck,
  Clock,
} from "lucide-react";

export default function MedicalPrescription() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/prescription/single/${id}`);
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        console.error("Failed to fetch prescription", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!data) return <div className="p-4 text-red-600">No data found.</div>;

  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col text-lg justify-between sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span>{data.doctor.name}</span>
            <span className="font-medium text-gray-800">
              - {data.doctor.specialization}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-gray-500" />
            <span>
              Appointment: {data.appointment.date}, {data.appointment.time}
            </span>
          </div>
        </div>

        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <User className="w-5 h-5 text-gray-700" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium text-gray-900">
                  {data.patient.name}
                </div>
                <div className="text-gray-600">
                  {data.patient.age} years • {data.patient.gender}
                </div>
              </div>
            </div>
            <div>
              <div className="text-gray-500">Patient ID</div>
              <div className="font-medium text-gray-900">
                {data.patient.patientId}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Blood Group</div>
              <div className="font-medium text-gray-900">
                {data.patient.bloodGroup}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Weight</div>
              <div className="font-medium text-gray-900 flex items-center gap-1">
                <Weight className="w-4 h-4 text-gray-500" />
                {data.patient.weight} kg
              </div>
            </div>
            <div>
              <div className="text-gray-500">Height</div>
              <div className="font-medium text-gray-900 flex items-center gap-1">
                <Ruler className="w-4 h-4 text-gray-500" />
                {data.patient.height}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Complaints & Diagnosis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <ClipboardList className="w-5 h-5 text-gray-700" />
                Chief Complaints
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {data.complaints.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700">
                  <ClipboardCheck className="w-4 h-4 text-gray-500" />
                  {c}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Stethoscope className="w-5 h-5 text-gray-700" />
                Diagnosis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {data.diagnosis.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700">
                  <ClipboardCheck className="w-4 h-4 text-gray-500" />
                  {d}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Investigations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <FlaskConical className="w-5 h-5 text-gray-700" />
              Suggested Investigations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700">
            {data.investigation.map((test, i) => (
              <div key={i} className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-gray-500" />
                {test}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Medications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Pill className="w-5 h-5 text-gray-700" />
              Prescribed Medications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {data.medications.map((med, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="flex items-center gap-3 py-4 text-base font-medium text-gray-900 hover:no-underline">
                    <Pill className="w-6 h-6 text-gray-700" />
                    {med.name}
                    <span className="text-sm text-gray-600">
                      {med.fullData.type} • {med.fullData.strength} •{" "}
                      {med.fullData.dosageForm}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Frequency</div>
                        <div className="font-medium text-gray-900 flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          {med.frequency}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Duration</div>
                        <div className="font-medium text-gray-900 flex items-center gap-1">
                          <CalendarDays className="w-4 h-4 text-gray-500" />
                          {med.duration}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Instructions</div>
                        <div className="font-medium text-gray-900 flex items-center gap-1">
                          <Info className="w-4 h-4 text-gray-500" />
                          {med.instruction}
                        </div>
                      </div>
                      <div className="col-span-full sm:col-span-1">
                        <div className="text-gray-500">Brand Name</div>
                        <div className="font-medium text-gray-900">
                          {med.fullData.brandName}
                        </div>
                      </div>
                      <div className="col-span-full sm:col-span-1">
                        <div className="text-gray-500">Generic Name</div>
                        <div className="font-medium text-gray-900">
                          {med.fullData.generic}
                        </div>
                      </div>
                      <div className="col-span-full sm:col-span-1">
                        <div className="text-gray-500">Manufacturer</div>
                        <div className="font-medium text-gray-900">
                          {med.fullData.manufacturer}
                        </div>
                      </div>
                      <div className="col-span-full sm:col-span-1">
                        <div className="text-gray-500">Packaging</div>
                        <div className="font-medium text-gray-900">
                          {med.fullData.packageSize}{" "}
                          {med.fullData.packageContainer}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Syringe className="w-5 h-5 text-gray-700" />
              Additional Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            {data.notes}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <Printer className="w-4 h-4" />
            Print Prescription
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Request Refill
          </Button>
        </div>
      </div>
    </div>
  );
}
