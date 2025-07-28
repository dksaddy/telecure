"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Calendar,
  Users,
  UserCheck,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Star,
  MoreHorizontal,
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

const statsCards = [
  {
    title: "Total Doctors",
    value: "247",
    change: "+12% from last month",
    icon: Users,
    positive: true,
  },
  {
    title: "Total Patients",
    value: "1,842",
    change: "+8% from last month",
    icon: UserCheck,
    positive: true,
  },
  {
    title: "Appointments Today",
    value: "124",
    change: "-3% from yesterday",
    icon: Calendar,
    positive: false,
  },
];

const verificationStatus = [
  {
    label: "Verified Doctors",
    count: 198,
    percentage: 80,
    color: "text-green-600",
  },
  {
    label: "Pending Verification",
    count: 34,
    percentage: 14,
    color: "text-yellow-600",
  },
  { label: "Unverified", count: 15, percentage: 6, color: "text-red-600" },
];

const paymentStatus = [
  {
    label: "Paid Appointments",
    count: 892,
    percentage: 72,
    color: "text-green-600",
  },
  {
    label: "Pending Payment",
    count: 234,
    percentage: 19,
    color: "text-yellow-600",
  },
  { label: "Unpaid", count: 112, percentage: 9, color: "text-red-600" },
];

const doctorsData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@email.com",
    specialization: "Cardiology",
    status: "Verified",
    rating: 4.8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    email: "michael.chen@email.com",
    specialization: "Neurology",
    status: "Pending",
    rating: 4.6,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const appointmentsData = [
  {
    id: 1,
    date: "Jan 15, 2025",
    time: "10:30 AM",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    patient: "John Smith",
    email: "john.smith@email.com",
    status: "Completed",
    payment: "Paid",
  },
];

export default function HealthcareAdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const router = useRouter();
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard Overview
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p
                      className={`text-sm ${
                        stat.positive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <stat.icon className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Status Cards */}

        {/* Doctors Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Doctors Management</CardTitle>
              <Button
                className="bg-slate-800 hover:bg-slate-700"
                onClick={() => {
                  router.push("/dashboard/admin/add");
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Doctor
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedSpecialization}
                onValueChange={setSelectedSpecialization}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Specializations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>DOCTOR</TableHead>
                  <TableHead>SPECIALIZATION</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>RATING</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctorsData.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={doctor.avatar || "/placeholder.svg"}
                            alt={doctor.name}
                          />
                          <AvatarFallback>
                            {doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{doctor.name}</p>
                          <p className="text-sm text-gray-500">
                            {doctor.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{doctor.specialization}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          doctor.status === "Verified" ? "default" : "secondary"
                        }
                      >
                        {doctor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{doctor.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">
                Showing 1 to 10 of 247 doctors
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-800 text-white"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
