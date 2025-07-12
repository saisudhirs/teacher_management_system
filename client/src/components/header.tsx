import { useState, useEffect, useRef } from "react";
import { Bell, Menu, X, GraduationCap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "wouter";
import UserProfile from "./user-profile";

const navigation = [
  { name: "Teachers", href: "/teachers" },
  { name: "Students", href: "/students" },
  { name: "Classes", href: "/classes" },
  { name: "Reports", href: "/reports" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [location] = useLocation();
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }

    if (notificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [notificationsOpen]);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="ml-3 text-xl font-semibold text-gray-900 hidden sm:block">
              Teacher Management
            </h1>
            <h1 className="ml-3 text-lg font-semibold text-gray-900 sm:hidden">
              TMS
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const isActive = location === item.href || (item.href === "/teachers" && location === "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-700"
                  } px-1 pb-4 text-sm font-medium transition-colors`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-gray-500 relative"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-500"
              onClick={() => setProfileOpen(true)}
            >
              <Settings className="h-5 w-5" />
            </Button>
            
            <button 
              onClick={() => setProfileOpen(true)}
              className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-1 transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                John Doe
              </span>
            </button>

            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => {
                    const isActive = location === item.href || (item.href === "/teachers" && location === "/");
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`${
                          isActive
                            ? "text-primary bg-primary/10"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        } block px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {notificationsOpen && (
        <div ref={notificationRef} className="absolute top-16 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {[
              { title: "New teacher added", desc: "Sarah Johnson joined Mathematics dept.", time: "2 min ago", unread: true },
              { title: "Report generated", desc: "Monthly teacher performance report is ready", time: "1 hour ago", unread: true },
              { title: "System update", desc: "Teacher management system updated successfully", time: "3 hours ago", unread: false }
            ].map((notif, index) => (
              <div key={index} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${notif.unread ? 'bg-blue-50' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{notif.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{notif.desc}</p>
                    <p className="text-xs text-gray-500 mt-2">{notif.time}</p>
                  </div>
                  {notif.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="text-sm text-primary hover:underline">View all notifications</button>
          </div>
        </div>
      )}

      <UserProfile isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </header>
  );
}
