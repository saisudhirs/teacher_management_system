import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings, User, Lock, Bell, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@school.edu",
    phone: "+1 (555) 987-6543",
    department: "Administration",
    role: "Administrator"
  });
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
            {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{userData.firstName} {userData.lastName}</h3>
          <p className="text-gray-600">{userData.role}</p>
          <Button variant="outline" size="sm" className="mt-2">
            Change Photo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={userData.firstName}
            onChange={(e) => setUserData({...userData, firstName: e.target.value})}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={userData.lastName}
            onChange={(e) => setUserData({...userData, lastName: e.target.value})}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={userData.phone}
            onChange={(e) => setUserData({...userData, phone: e.target.value})}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            value={userData.department}
            onChange={(e) => setUserData({...userData, department: e.target.value})}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            value={userData.role}
            disabled
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );

  const renderAccountTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Session Timeout</h4>
              <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
            </div>
            <select className="rounded border px-3 py-1">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>Never</option>
            </select>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Data Export</h4>
              <p className="text-sm text-gray-600">Download your data</p>
            </div>
            <Button variant="outline">Export</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "New teacher registrations", enabled: true },
            { label: "System updates", enabled: true },
            { label: "Report generation", enabled: false },
            { label: "Email notifications", enabled: true },
            { label: "Push notifications", enabled: false }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span>{item.label}</span>
              <input 
                type="checkbox" 
                defaultChecked={item.enabled}
                className="rounded"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Button>Update Password</Button>
          
          <Separator className="my-6" />
          
          <div className="space-y-2">
            <h4 className="font-medium">Active Sessions</h4>
            <div className="border rounded p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Current Session</p>
                  <p className="text-sm text-gray-600">Chrome on Windows • Last active now</p>
                </div>
                <span className="text-green-600 text-sm">Active</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile": return renderProfileTab();
      case "account": return renderAccountTab();
      case "notifications": return renderNotificationsTab();
      case "security": return renderSecurityTab();
      default: return renderProfileTab();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Settings & Profile</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row h-[70vh]">
          {/* Sidebar */}
          <div className="w-full md:w-64 border-r border-gray-200 pr-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
              
              <Separator className="my-4" />
              
              <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-red-50 text-red-600">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
          
          {/* Content */}
          <div className="flex-1 pl-4 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}