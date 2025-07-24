"use client";

import { useState } from "react";
import {
  Bell,
  User,
  ChevronDown,
  Camera,
  Shield,
  Download,
  UserX,
  Globe,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function TelemedicinePortal() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [browserNotifications, setBrowserNotifications] = useState(true);
  const [theme, setTheme] = useState("light");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600">
            Manage your account preferences and security settings
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Change Photo</span>
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Sarah" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Johnson" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="sarah.johnson@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select defaultValue="female">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Select defaultValue="cardiology">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Password</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Last changed 3 months ago
                  </p>
                  <Button variant="outline">Change Password</Button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      checked={twoFactorEnabled}
                      onCheckedChange={setTwoFactorEnabled}
                    />
                  </div>
                  <p className="text-sm text-green-600">Enabled</p>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Login History</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Globe className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Chrome on Windows</p>
                          <p className="text-sm text-gray-600">
                            Jul 15, 2024 • 2 hours ago
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Current
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs font-bold">
                            M
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">Mobile App</p>
                          <p className="text-sm text-gray-600">
                            Jul 14, 2024 • Yesterday
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">Theme</h4>
                      <p className="text-sm text-gray-600">
                        Choose your preferred theme
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4" />
                      <Switch
                        checked={theme === "dark"}
                        onCheckedChange={(checked) =>
                          setTheme(checked ? "dark" : "light")
                        }
                      />
                      <Moon className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 capitalize">{theme}</p>
                </div>

                <div>
                  <Label htmlFor="language">Language</Label>
                  <p className="text-sm text-gray-600 mb-2">
                    Select your preferred language
                  </p>
                  <Select defaultValue="english">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Notification Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">
                          Receive appointment reminders and updates
                        </p>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-600">
                          Get text messages for urgent updates
                        </p>
                      </div>
                      <Switch
                        checked={smsNotifications}
                        onCheckedChange={setSmsNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Browser Notifications</p>
                        <p className="text-sm text-gray-600">
                          Browser and mobile app notifications
                        </p>
                      </div>
                      <Switch
                        checked={browserNotifications}
                        onCheckedChange={setBrowserNotifications}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Billing & Subscription */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>💳</span>
                  <span>Billing & Subscription</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Professional Plan</h4>
                    <Badge className="bg-blue-600">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Unlimited • Renews on Dec 15, 2024
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                  >
                    Manage Plan
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Payment Methods</h4>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 1234</p>
                          <p className="text-sm text-gray-600">Expires 12/26</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Default</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    + Add Payment Method
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Billing History</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border-b">
                      <div>
                        <p className="font-medium">Dec 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$49.00</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 p-0 h-auto"
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2">
                      <div>
                        <p className="font-medium">Nov 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$49.00</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 p-0 h-auto"
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>⚙️</span>
                  <span>Account Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Your Data
                  <span className="ml-auto text-sm text-gray-500">
                    Export your account information
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                >
                  <UserX className="w-4 h-4 mr-2" />
                  Deactivate Account
                  <span className="ml-auto text-sm text-gray-500">
                    Temporarily disable your account
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
