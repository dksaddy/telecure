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
import Schedule from "./Components/Schedule";
import { Badge } from "@/components/ui/badge";
import Shots from "./Components/Shots";
import Upcoming from "./Components/Upcoming";
import Recent from "./Components/Recent";

export default function DoctorDashboard() {
  return (
    <div>
      <div>
        {/* Metrics Cards */}
        <Shots />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <Upcoming />

            {/* Recent Patients */}
            <Recent />
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
            <Schedule />
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
