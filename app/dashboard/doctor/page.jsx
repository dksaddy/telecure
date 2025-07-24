import {
  Bell,
  Calendar,
  FileText,
  BarChart3,
  Clock,
  Users,
  DollarSign,
  Star,
  Phone,
  MoreVertical,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen container">
      <div className="py-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Today's Appointments
                  </p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                  <p className="text-sm text-green-600">+2 from yesterday</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Patients
                  </p>
                  <p className="text-3xl font-bold text-gray-900">248</p>
                  <p className="text-sm text-green-600">+10 this month</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Today's Earnings
                  </p>
                  <p className="text-3xl font-bold text-gray-900">$420</p>
                  <p className="text-sm text-green-600">+8% from last week</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Satisfaction Rate
                  </p>
                  <p className="text-3xl font-bold text-gray-900">4.8</p>
                  <p className="text-sm text-green-600">+0.2 this month</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
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
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">Sarah Johnson</p>
                      <p className="text-sm text-gray-600">
                        10:30 AM - General Consultation
                      </p>
                      <p className="text-sm text-gray-500">
                        Age: 34, ID: #P2048
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Phone className="w-4 h-4 mr-1" />
                      Start Call
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">Michael Chen</p>
                      <p className="text-sm text-gray-600">
                        11:15 AM - Follow-up
                      </p>
                      <p className="text-sm text-gray-500">
                        Age: 45, ID: #P2049
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Confirm
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Patients */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Recent Patients
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>EW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">Emma Wilson</p>
                      <p className="text-sm text-gray-600">
                        Last consultation: 2 days ago
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

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>DB</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">David Brown</p>
                      <p className="text-sm text-gray-600">
                        Last consultation: 1 week ago
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
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  >
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <span className="text-sm">Schedule</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  >
                    <Clock className="w-6 h-6 text-blue-600" />
                    <span className="text-sm">Reschedule</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  >
                    <FileText className="w-6 h-6 text-blue-600" />
                    <span className="text-sm">Notes</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  >
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                    <span className="text-sm">Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600">
                      10:30 AM
                    </span>
                    <span className="text-sm text-gray-900">Sarah Johnson</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600">
                      11:15 AM
                    </span>
                    <span className="text-sm text-gray-900">Michael Chen</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Pending
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600">
                      2:00 PM
                    </span>
                    <span className="text-sm text-gray-900">Lisa Davis</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <User className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      New patient registered
                    </p>
                    <p className="text-xs text-gray-600">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Appointment confirmed
                    </p>
                    <p className="text-xs text-gray-600">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Lab results pending
                    </p>
                    <p className="text-xs text-gray-600">1 hour ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
