import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  Search,
  Bell,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { signOut, user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Users, label: "Workers", path: "/workers" },
    { icon: FileText, label: "Documents", path: "/documents" },
    { icon: CreditCard, label: "Payment", path: "/payment" },
  ];

  const organizationItems = [
    { icon: Settings, label: "Team Settings", path: "/settings" },
    { icon: FileText, label: "Apps & Perks", path: "/apps" },
    { icon: FileText, label: "Tax Forms", path: "/tax-forms" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="h-16 fixed top-0 left-0 right-0 bg-white border-b z-50 flex items-center px-4">
        <div className="flex-1 flex items-center gap-8">
          <Link to="/" className="font-semibold text-xl">
            ProDeel
          </Link>
          <div className="relative max-w-md w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

            <Input
              placeholder="Search here..."
              className="pl-9 bg-gray-50 border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar_url} />
            <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r transition-all duration-300 z-40",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
          id="sidebar"
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex items-center gap-2 px-2 py-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar_url} />
                <AvatarFallback>
                  {user?.email?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {profile?.full_name || user?.email}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {profile?.role || "User"}
                </p>
              </div>
            </div>

            <nav className="mt-8 flex-1 flex flex-col gap-1">
              <p className="px-2 text-xs font-medium text-gray-500 mb-2">
                MENU
              </p>
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-2 py-2 text-sm rounded-lg transition-colors",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-600 hover:bg-gray-100",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}

              <p className="px-2 text-xs font-medium text-gray-500 mb-2 mt-8">
                ORGANIZATION
              </p>
              {organizationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-2 py-2 text-sm rounded-lg transition-colors",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-600 hover:bg-gray-100",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            <Button
              variant="ghost"
              className="mt-auto flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300 min-h-[calc(100vh-4rem)]",
            isSidebarOpen ? "ml-64" : "ml-0",
          )}
        >
          <div className="container mx-auto p-6">{children}</div>
        </main>

        {/* Mobile Sidebar Toggle */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-expanded={isSidebarOpen}
          aria-controls="sidebar"
          aria-label="Toggle mobile sidebar"
          className={cn(
            "fixed md:hidden z-50 p-2 rounded-full bg-white shadow-md transition-all duration-300",
            isSidebarOpen ? "left-64 top-20" : "left-4 top-20",
          )}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Layout;
