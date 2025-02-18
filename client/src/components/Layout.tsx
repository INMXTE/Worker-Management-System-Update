import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import {
  Home,
  Users,
  Building2,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  FileText,
  Clock,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";


const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { signOut, user, profile } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Workers", path: "/workers" },
    { icon: Clock, label: "Clock In", path: "/clock-in" },
    { icon: Building2, label: "Headcount", path: "/headcount" },
    { icon: CreditCard, label: "Payroll", path: "/payroll" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = user?.role === "worker" 
    ? menuItems.filter(item => !["Dashboard", "Workers", "Headcount", "Payroll"].includes(item.label))
    : menuItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-white shadow-lg transition-transform duration-200 ease-in-out z-50 lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-primary">HR System</h1>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t bg-gray-50/80">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback>
                  {profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {profile?.full_name || user?.email}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {user?.role?.replace('_', ' ')}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "min-h-screen transition-all duration-200 ease-in-out",
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        )}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-white border-b">
          <div className="flex items-center justify-between px-4 h-16">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex-1 px-4 max-w-xl ml-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-9 w-full max-w-[300px]"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;