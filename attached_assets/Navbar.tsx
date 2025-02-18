import { Link } from "react-router-dom";
import { UserCircle, Search, Bell } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 ml-16">
            <span className="text-xl font-semibold">e-HR System</span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              onClick={() => console.log("Search clicked")}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              onClick={() => console.log("Notifications clicked")}
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              onClick={() => console.log("Profile clicked")}
            >
              <UserCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
