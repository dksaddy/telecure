import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Calendar,
  Edit,
  LogOut,
  Pill,
  Search,
  Settings,
  Stethoscope,
  Video,
  Eye,
  CheckCircle,
} from "lucide-react";

export default function TelemedicinePortal() {
  return (
    <div className="min-h-screen container pt-[80px] bg-gray-50">
      {/* Header */}

      <div className="flex gap-6 p-6">
        {/* Left Sidebar */}
        <div className="w-80 space-y-6">
          {/* Patient Profile Card */}
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold mb-1">Nadib Ahsan</h2>
              <p className="text-gray-600 mb-3">nadib.ahsan@email.com</p>
              <Badge className="bg-blue-500 hover:bg-blue-600 mb-6">
                Patient
              </Badge>

              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date of Birth:</span>
                  <span>March 15, 1990</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since:</span>
                  <span>January 2023</span>
                </div>
              </div>

              <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Pill className="w-4 h-4 mr-2" />
                View Prescriptions
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="destructive" className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* My Appointments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Appointments</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                    All
                  </Button>
                  <Button size="sm" variant="outline">
                    Upcoming
                  </Button>
                  <Button size="sm" variant="outline">
                    Completed
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upcoming Appointment */}
              <Card className="border-l-4 border-l-orange-400">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>DS</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Dr. Sadik Saddy</h3>
                        <p className="text-gray-600">Cardiologist</p>
                      </div>
                    </div>
                    <Button className="bg-green-500 hover:bg-green-600">
                      <Video className="w-4 h-4 mr-2" />
                      Join Call
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-gray-600">Date: </span>
                      <span>Jan 25, 2024</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Time: </span>
                      <span>10:00 - 10:30 AM</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Status: </span>
                      <span className="text-orange-500 font-medium">
                        Upcoming
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment: </span>
                      <span className="text-green-500 font-medium">Paid</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Completed Appointment */}
              <Card className="border-l-4 border-l-green-400">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Dr. Sarah Johnson</h3>
                        <p className="text-gray-600">General Physician</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Completed</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-gray-600">Date: </span>
                      <span>Jan 20, 2024</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Time: </span>
                      <span>2:00 - 2:30 PM</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Status: </span>
                      <span className="text-green-500 font-medium">
                        Completed
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment: </span>
                      <span className="text-green-500 font-medium">Paid</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* My Prescriptions */}
          <Card>
            <CardHeader>
              <CardTitle>My Prescriptions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">
                        Prescription - Jan 20, 2024
                      </h3>
                      <p className="text-gray-600">Dr. Sarah Johnson</p>
                    </div>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Diagnosis: </span>
                      <span>Common Cold, Fever</span>
                    </div>
                    <div>
                      <span className="font-medium">Medications: </span>
                      <span>A-Cold Syrup 4 mg/5 ml, Paracetamol 500mg</span>
                    </div>
                    <div>
                      <span className="font-medium">Investigations: </span>
                      <span>ECG, Blood Test</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">
                        Prescription - Jan 15, 2024
                      </h3>
                      <p className="text-gray-600">Dr. Mike Wilson</p>
                    </div>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Diagnosis: </span>
                      <span>Hypertension</span>
                    </div>
                    <div>
                      <span className="font-medium">Medications: </span>
                      <span>Amlodipine 5mg, Losartan 50mg</span>
                    </div>
                    <div>
                      <span className="font-medium">Investigations: </span>
                      <span>Blood Pressure Monitoring</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Medicines Lookup */}
          <Card>
            <CardHeader>
              <CardTitle>Medicines Lookup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search medicines..." className="pl-10" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">A-Cold Syrup</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Generic: </span>
                        <span>Acetaminophen</span>
                      </div>
                      <div>
                        <span className="font-medium">Dosage: </span>
                        <span>4 mg/5 ml</span>
                      </div>
                      <div>
                        <span className="font-medium">Manufacturer: </span>
                        <span>ABC Pharma</span>
                      </div>
                      <div>
                        <span className="font-medium">Price: </span>
                        <span className="text-blue-600 font-semibold">
                          $12.50
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Paracetamol</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Generic: </span>
                        <span>Acetaminophen</span>
                      </div>
                      <div>
                        <span className="font-medium">Dosage: </span>
                        <span>500mg</span>
                      </div>
                      <div>
                        <span className="font-medium">Manufacturer: </span>
                        <span>XYZ Pharma</span>
                      </div>
                      <div>
                        <span className="font-medium">Price: </span>
                        <span className="text-blue-600 font-semibold">
                          $8.75
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}
