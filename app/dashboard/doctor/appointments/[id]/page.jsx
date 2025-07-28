"use client";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  Download,
  Eye,
  FileText,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AppointmentDetails() {
  const { id } = useParams();
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAppointment = async () => {
      try {
        const res = await fetch(`/api/appointment/indi/${id}`);
        const data = await res.json();
        setAppointmentData(data);
      } catch (err) {
        console.error("Failed to fetch appointment:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);
  const router = useRouter();

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!appointmentData)
    return <p className="text-center py-10">No data found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5" />
          <h1 className="text-2xl font-semibold">Appointment Details</h1>
        </div>
        <Button
          variant="ghost"
          className="text-blue-600 hover:text-blue-700"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Appointments
        </Button>
      </div>

      {/* Appointment Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Appointment Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{appointmentData.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{appointmentData.time}</span>
              </div>
              <Badge className="bg-blue-100 text-blue-700 capitalize">
                {appointmentData.status}
              </Badge>
              <Badge
                className={`bg-${
                  appointmentData.paymentStatus === "complete"
                    ? "green"
                    : "yellow"
                }-100 text-${
                  appointmentData.paymentStatus === "complete"
                    ? "green"
                    : "yellow"
                }-700 capitalize`}
              >
                Payment {appointmentData.paymentStatus}
              </Badge>
            </div>
            {appointmentData.status !== "completed" && (
              <Button className="bg-slate-800 hover:bg-slate-700">
                <Video className="h-4 w-4 mr-2" />
                Join Video Call
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Doctor and Patient Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doctor Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-blue-600">
              Doctor Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={appointmentData.doctor.avatar || "/placeholder.svg"}
                  alt={appointmentData.doctor.name}
                />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">
                  {appointmentData.doctor.name}
                </h3>
                <p className="text-blue-600 text-sm">
                  {appointmentData.doctor.email}
                </p>
                <p className="text-gray-600">
                  {appointmentData.doctor.specialty}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-blue-600">
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Info
                label="Full Name"
                value={appointmentData.patient.fullName}
              />
              <Info label="Age" value={appointmentData.patient.age} />
              <Info label="Gender" value={appointmentData.patient.gender} />
              <Info label="Phone" value={appointmentData.patient.phone} />
              <Info label="Height" value={appointmentData.patient.height} />
              <Info label="Weight" value={appointmentData.patient.weight} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prescription */}
      {appointmentData.prescription && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Prescription Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Info
                label="Complaints"
                value={appointmentData.prescription.complaints}
              />
              <Info
                label="Diagnosis"
                value={appointmentData.prescription.diagnosis}
              />
              <Info
                label="Investigations"
                value={appointmentData.prescription.investigations}
              />
            </div>

            <div>
              <h4 className="font-medium mb-4">Prescribed Medications</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Instructions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointmentData.prescription.medications.map(
                    (med, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {med.medication}
                        </TableCell>
                        <TableCell>{med.dosage}</TableCell>
                        <TableCell>{med.frequency}</TableCell>
                        <TableCell>{med.duration}</TableCell>
                        <TableCell>{med.instructions}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Files */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Uploaded Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {appointmentData.files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.size}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-gray-500 pt-4 border-t">
        <div className="flex gap-4">
          <span>Created: {appointmentData.createdAt}</span>
          <span>Last Updated: {appointmentData.updatedAt}</span>
        </div>
        <span>Appointment ID: {appointmentData.id}</span>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
