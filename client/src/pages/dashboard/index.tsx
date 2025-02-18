import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { Users, Building2, Calendar, CreditCard, TrendingUp, Clock } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const { user, profile } = useAuth();

  // Mock data for charts - Replace with actual API data
  const departmentData = [
    { name: "Engineering", value: 30 },
    { name: "Sales", value: 25 },
    { name: "Marketing", value: 20 },
    { name: "HR", value: 15 },
    { name: "Finance", value: 10 },
  ];

  const attendanceData = [
    { date: "Mon", present: 115, absent: 9, late: 6 },
    { date: "Tue", present: 120, absent: 5, late: 3 },
    { date: "Wed", present: 118, absent: 7, late: 5 },
    { date: "Thu", present: 116, absent: 8, late: 4 },
    { date: "Fri", present: 122, absent: 3, late: 2 },
  ];

  const payrollTrend = [
    { month: "Jan", amount: 280000 },
    { month: "Feb", amount: 285000 },
    { month: "Mar", amount: 284545 },
    { month: "Apr", amount: 290000 },
    { month: "May", amount: 292000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

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
      title: "Monthly Payroll",
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
          Here's an overview of your organization's metrics
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
        {/* Attendance Trends */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Attendance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" fill="#10B981" />
                  <Bar dataKey="absent" fill="#EF4444" />
                  <Bar dataKey="late" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Department Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payroll Trends */}
        <Card className="col-span-7">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payroll Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={payrollTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Activity
            </CardTitle>
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
      </div>
    </div>
  );
}