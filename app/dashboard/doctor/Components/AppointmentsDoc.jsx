"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Video,
  Phone,
  Check,
  MoreHorizontal,
  User,
  CreditCard,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/app/context/AuthContext";

// TEMP: Replace this with a dynamic doctor ID (from session, route, etc.)
const doctorId = "64cc9a1234567890abcdef12";

export default function AppointmentManagement() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (statusFilter !== "all") params.append("status", statusFilter);

        const res = await fetch(
          `/api/appointment/doctor/${user.id}?${params.toString()}`
        );
        const data = await res.json();
        console.log(data);

        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          console.error("Fetch failed:", data.error);
          setAppointments([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [searchTerm, statusFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
            Confirmed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
            Pending
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPaymentInfo = (appointment) => {
    const amount = appointment.paymentAmount || 0;

    if (appointment.paymentStatus === true) {
      return (
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <CreditCard className="h-3 w-3" />
          Paid - ${amount}
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 text-sm text-orange-600">
          <CreditCard className="h-3 w-3" />
          Payment Pending
        </div>
      );
    }
  };

  const router = useRouter();

  return (
    <div className="w-full py-6 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by patient name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Select defaultValue="time">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="time">Sort by Time</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="status">Sort by Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-500">No appointments found.</p>
        ) : (
          appointments.map((appointment) => (
            <Card
              key={appointment._id?.$oid || appointment._id}
              className="p-4 cursor-pointer!"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  {/* Time */}
                  <div className="text-left">
                    <div className="text-lg font-semibold text-slate-800">
                      {appointment.interval?.start?.slice(0, 5)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.interval?.end?.slice(0, 5)}
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-800">
                        {appointment.name}
                      </h3>
                      {getStatusBadge(appointment.status)}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {appointment.age} years, {appointment.gender}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {appointment.phone}
                      </div>
                      {getPaymentInfo(appointment)}
                      {appointment.files?.length > 0 && (
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {appointment.files.length} Files
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {appointment.status !== "completed" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        router.push(
                          `/call?room=${encodeURIComponent(
                            appointment.callLink
                          )}`
                        );
                      }}
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                  )}

                  <Button
                    size="sm"
                    onClick={() => {
                      router.push(
                        "/dashboard/doctor/appointments/" + appointment._id
                      );
                    }}
                  >
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
