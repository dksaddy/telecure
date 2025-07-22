"use client";
import React, { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/app/context/AuthContext";
import { Edit } from "lucide-react";
const Profile = () => {
  const { user, logout } = useAuth();
  console.log(user);
  if (!user) return null;
  return (
    <>
      <Card>
        <CardContent className="p-6 text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src={user ? user.profileImage : "/dp/default.jpg"} />
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
          <p className="text-gray-600 mb-3">{user.email}</p>
          <Badge className="bg-blue-500 capitalize hover:bg-blue-600 mb-6">
            {user.role}
          </Badge>

          <div className="space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600">Date of Birth:</span>
              <span>{user.dateOfBirth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Member Since:</span>
              <span>{user.started}</span>
            </div>
          </div>
          <Link href="user/settings">
            <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;
