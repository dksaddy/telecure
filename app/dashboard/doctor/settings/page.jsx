"use client";

import { useState, useRef } from "react";
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
import { useAuth } from "@/app/context/AuthContext";
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
  const { user } = useAuth();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [browserNotifications, setBrowserNotifications] = useState(true);
  const [theme, setTheme] = useState("light");
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  return (
    <div>
      {/* Main Content */}
      <main>
        <div className="grid lg:grid-cols-4 gap-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex  space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 bg-transparent"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="w-4 h-4" />
                    <span>Change Photo</span>
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Name</Label>
                    <Input
                      id="firstName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={async () => {
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append("email", email);
                    if (selectedFile) {
                      formData.append("profileImage", selectedFile);
                    }

                    const res = await fetch(`/api/doctor/${user.id}`, {
                      method: "PATCH",
                      body: formData,
                    });

                    const result = await res.json();
                    if (res.ok) {
                      alert("Profile updated!");
                      // Optional: refresh UI state with result.user
                    } else {
                      alert("Error: " + result.error);
                    }
                  }}
                >
                  Save Changes
                </Button>
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
          <div className="space-y-6 lg:col-span-2">
            {/* Billing & Subscription */}

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
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                >
                  <UserX className="w-4 h-4 mr-2" />
                  Deactivate Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
