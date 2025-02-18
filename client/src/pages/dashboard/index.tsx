import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { Users, Building2, Calendar, CreditCard } from "lucide-react";

export default function Dashboard() {
  const { user, profile } = useAuth();

  const stats = [
    {
      title: "Total Employees",
      value: "124",
      icon: Users,
      change: "+4% from last month",
    },
    {
      title: "Departments",
      value: "12",
      icon: Building2,
      change: "No change",
    },
    {
      title: "On Leave",
      value: "8",
      icon: Calendar,
      change: "+2 from last week",
    },
    {
      title: "Payroll",
      value: "$284,545.66",
      icon: CreditCard,
      change: "+2.3% from last month",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {profile?.full_name || user?.email}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your team today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 border-b pb-4 last:border-0"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">New employee onboarded</p>
                    <p className="text-sm text-muted-foreground">
                      Sarah Johnson joined Engineering team
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">2h ago</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 border-b pb-4 last:border-0"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Team Meeting</p>
                    <p className="text-sm text-muted-foreground">
                      10:00 AM - 11:00 AM
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
