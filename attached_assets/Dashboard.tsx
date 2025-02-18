import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import WorkerList from "@/components/WorkerList";

const Dashboard = () => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Searching for:", e.target.value);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />

            <input
              type="text"
              placeholder="Search workers..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-input bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              onChange={handleSearch}
            />
          </div>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 glass-card hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-medium">Total Workers</h3>
          <p className="text-3xl font-bold mt-2">150</p>
          <p className="text-sm text-muted-foreground mt-1">Active employees</p>
        </Card>
        <Card className="p-6 glass-card hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-medium">Departments</h3>
          <p className="text-3xl font-bold mt-2">8</p>
          <p className="text-sm text-muted-foreground mt-1">
            Across organization
          </p>
        </Card>
        <Card className="p-6 glass-card hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-medium">New Hires</h3>
          <p className="text-3xl font-bold mt-2">12</p>
          <p className="text-sm text-muted-foreground mt-1">This month</p>
        </Card>
      </div>

      <WorkerList />
    </div>
  );
};

export default Dashboard;
