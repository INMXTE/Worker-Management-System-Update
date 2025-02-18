import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Account Settings</h1>
        <p className="text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start font-medium text-primary"
            >
              My Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600"
            >
              Security
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600"
            >
              Teams
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600"
            >
              Notifications
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600"
            >
              Billing
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600"
            >
              Data Export
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Delete Account
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-9 space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user?.avatar_url} />
                  <AvatarFallback>
                    {user?.email?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {profile?.full_name || user?.email}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {profile?.role || "Team Member"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {profile?.location || "Location not set"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    value={profile?.first_name || ""}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    value={profile?.last_name || ""}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    value={user?.email || ""}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    value={profile?.phone || ""}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <Input
                    value={profile?.role || ""}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Country</label>
                  <Input
                    value={profile?.country || ""}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">City/State</label>
                  <Input
                    value={profile?.city || ""}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Postal Code</label>
                  <Input
                    value={profile?.postal_code || ""}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tax ID</label>
                  <Input
                    value={profile?.tax_id || ""}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button>Save Changes</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
