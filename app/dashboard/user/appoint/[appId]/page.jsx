"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Calendar,
  Clock,
  User,
  FileText,
  Download,
  Video,
  X,
  RotateCcw,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AppointmentDashboard() {
  const { appId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await fetch(`/api/appointment/appoint/${appId}`);
        const result = await res.json();

        if (!res.ok) throw new Error(result.error || "Failed to load data");

        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (appId) fetchAppointment();
  }, [appId]);

  if (loading) return <CircularProgress />;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!data) return <p className="p-4">No appointment found.</p>;
  const deleteAppointment = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/appointment/appoint/${appId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete appointment");
      }

      // Handle successful deletion (redirect, show success message, etc.)
      // You might want to redirect to appointments list or show a success message
      window.location.href = "/dashboard/user"; // or use router.push()
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const {
    name,
    phone,
    age,
    gender,
    weight,
    heightFeet,
    heightInch,
    date,
    interval,
    status,
    paymentStatus,
    transactionId,
    doctorInfo,
    createdAt,
    callLink,
    files,
  } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appointment Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Appointment Status
              </CardTitle>
              <div className="flex gap-2">
                <Badge
                  variant="secondary"
                  className={`bg-${
                    status === "pending" ? "yellow" : "green"
                  }-100 text-${status === "pending" ? "yellow" : "green"}-800`}
                >
                  {status}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`bg-${paymentStatus ? "blue" : "red"}-100 text-${
                    paymentStatus ? "blue" : "red"
                  }-800`}
                >
                  {paymentStatus ? "Paid" : "Unpaid"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem icon={<Calendar />} label="Date" value={date} />
                <InfoItem
                  icon={<Clock />}
                  label="Time"
                  value={interval?.start + " - " + interval?.end}
                />
                <InfoItem
                  icon={<User />}
                  label="Doctor"
                  value={`Dr. ${doctorInfo?.firstName || ""} ${
                    doctorInfo?.lastName || "Unknown"
                  }`}
                />
                <InfoItem
                  icon={<Video />}
                  label="Consultation Type"
                  value="Video Call"
                />
              </div>
              <Separator />
              <div className="space-y-3">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={(e) => {
                    // prevents Link navigation
                    router.push(`/call?room=${encodeURIComponent(callLink)}`);
                  }}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Join Video Call
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Available 15 minutes before appointment time
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Full Name" value={name} />
                <Field label="Phone Number" value={phone} />
                <Field label="Age" value={`${age} years`} />
                <Field label="Gender" value={gender} />
                <Field label="Weight" value={`${weight} kg`} />
                <Field label="Height" value={`${heightFeet}' ${heightInch}"`} />
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  label="Payment Status"
                  value={paymentStatus ? "Paid" : "Unpaid"}
                />
                <Field label="Amount" value="$150.00" />
                <Field label="Transaction ID" value={transactionId} />
                <Field label="Payment Method" value="N/A" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Section */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <SidebarButton icon={<RotateCcw />} label="Reschedule" />
              <SidebarButton
                icon={<X />}
                label="Cancel"
                onClick={() => setShowDeleteModal(true)}
              />
              <SidebarButton icon={<Download />} label="Download Receipt" />
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Field label="Appointment ID" value={appId} />
              <Field
                label="Created On"
                value={new Date(createdAt).toDateString()}
              />
              <Field label="Booking Source" value="Mobile App" />
            </CardContent>
          </Card>

          {/* Uploaded Files */}
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {files?.length === 0 ? (
                <p className="text-sm text-gray-500">No files uploaded.</p>
              ) : (
                files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 border rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Pre-Appointment Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {[
                  "Join the video call 5 minutes early",
                  "Ensure stable internet connection",
                  "Have your medical records ready",
                  "Find a quiet, well-lit space",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <X className="w-5 h-5 text-red-500" />
              Cancel Appointment
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">
                <strong>Appointment Details:</strong>
              </p>
              <p className="text-sm text-red-700 mt-1">
                Date: {date} | Time: {interval?.start} - {interval?.end}
              </p>
              <p className="text-sm text-red-700">
                Doctor: Dr. {doctorInfo?.firstName} {doctorInfo?.lastName}
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 ">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            >
              Keep Appointment
            </Button>
            <Button
              variant="destructive"
              onClick={deleteAppointment}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Canceling...
                </>
              ) : (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel Appointment
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Utility components
const Field = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value || "—"}</p>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    {icon}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || "—"}</p>
    </div>
  </div>
);

const SidebarButton = ({ icon, label, onClick }) => (
  <Button
    variant="outline"
    onClick={onClick && onClick}
    className="w-full justify-start bg-transparent"
  >
    {icon}
    {label}
  </Button>
);
