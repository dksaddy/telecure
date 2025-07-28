"use client";
import React, { useState, useRef } from "react";
import { Upload, Plus, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const specializations = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
];

const Page = () => {
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [timeSlots, setTimeSlots] = useState([
    { day: "", startTime: "", endTime: "" },
  ]);
  const [profileImage, setProfileImage] = useState(null);
  const [gender, setGender] = useState("");

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const bioRef = useRef(null);
  const certificateRef = useRef(null);

  const handleSpecializationChange = (spec, checked) => {
    if (checked) {
      setSelectedSpecializations([...selectedSpecializations, spec]);
    } else {
      setSelectedSpecializations(
        selectedSpecializations.filter((s) => s !== spec)
      );
    }
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { day: "", startTime: "", endTime: "" }]);
  };

  const updateTimeSlot = (index, field, value) => {
    const updated = timeSlots.map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    setTimeSlots(updated);
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("firstName", firstNameRef.current?.value || "");
    formData.append("lastName", lastNameRef.current?.value || "");
    formData.append("email", emailRef.current?.value || "");
    formData.append("phone", phoneRef.current?.value || "");
    formData.append("password", passwordRef.current?.value || "");
    formData.append("gender", gender);
    formData.append("education", educationRef.current?.value || "");
    formData.append("experience", experienceRef.current?.value || "");
    formData.append("bio", bioRef.current?.value || "");

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    formData.append("specialization", JSON.stringify(selectedSpecializations));

    timeSlots.forEach((slot, index) => {
      formData.append(`availableSlots[${index}][day]`, slot.day);
      formData.append(`availableSlots[${index}][startTime]`, slot.startTime);
      formData.append(`availableSlots[${index}][endTime]`, slot.endTime);
    });

    if (certificateRef.current?.files) {
      for (let file of certificateRef.current.files) {
        formData.append("certificates", file);
      }
    }

    const res = await fetch("/api/doctor", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert("Doctor added successfully!");
    } else {
      alert("Failed to add doctor: " + data.error);
    }
  };

  return (
    <div className="flex-1 overflow-auto container">
      <div className="p-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Add New Doctor
          </h1>
          <p className="text-gray-600">Register a new doctor into the system</p>
        </div>

        <div className="space-y-8">
          {/* Profile Photo */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={
                      profileImage
                        ? URL.createObjectURL(profileImage)
                        : "/placeholder.svg"
                    }
                  />
                  <AvatarFallback>
                    <Camera className="h-8 w-8 text-gray-400" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Upload a professional photo (JPG, PNG, max 5MB)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="First Name"
                    ref={firstNameRef}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last Name"
                    ref={lastNameRef}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    ref={emailRef}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Phone" ref={phoneRef} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select onValueChange={(value) => setGender(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" ref={passwordRef} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="education">Education</Label>
                  <Input
                    id="education"
                    placeholder="Education"
                    ref={educationRef}
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience (Years)</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder="Years"
                    ref={experienceRef}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specializations */}
          <Card>
            <CardHeader>
              <CardTitle>Specializations</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specializations.map((spec) => (
                <div key={spec} className="flex items-center space-x-2">
                  <Checkbox
                    id={spec}
                    checked={selectedSpecializations.includes(spec)}
                    onCheckedChange={(checked) =>
                      handleSpecializationChange(spec, checked)
                    }
                  />
                  <Label htmlFor={spec}>{spec}</Label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Biography */}
          <Card>
            <CardHeader>
              <CardTitle>Biography</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter doctor's biography..."
                className="min-h-[120px]"
                ref={bioRef}
              />
            </CardContent>
          </Card>

          {/* Certificate Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Certificate Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="file"
                multiple
                ref={certificateRef}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <p className="text-sm text-gray-500 mt-2">
                Upload medical certificates (PDF, JPG, PNG)
              </p>
            </CardContent>
          </Card>

          {/* Schedule Setup */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule Setup (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {timeSlots.map((slot, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
                >
                  <div>
                    <Label>Day</Label>
                    <Select
                      value={slot.day}
                      onValueChange={(value) =>
                        updateTimeSlot(index, "day", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) =>
                        updateTimeSlot(index, "startTime", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) =>
                        updateTimeSlot(index, "endTime", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setTimeSlots(timeSlots.filter((_, i) => i !== index))
                    }
                    disabled={timeSlots.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addTimeSlot}>
                <Plus className="h-4 w-4 mr-2" />
                Add Time Slot
              </Button>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              className="bg-slate-800 hover:bg-slate-700 px-8"
              onClick={handleSubmit}
            >
              Add Doctor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
