import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";

const Payroll = () => {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Payroll</h1>
        <button
          onClick={() => console.log("Download report clicked")}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download Report</span>
        </button>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 glass-card">
          <h3 className="text-lg font-medium">Total Payroll</h3>
          <p className="text-3xl font-bold mt-2">$245,000</p>
          <p className="text-sm text-muted-foreground mt-1">This month</p>
        </Card>
        <Card className="p-6 glass-card">
          <h3 className="text-lg font-medium">Average Salary</h3>
          <p className="text-3xl font-bold mt-2">$65,000</p>
          <p className="text-sm text-muted-foreground mt-1">Per employee</p>
        </Card>
        <Card className="p-6 glass-card">
          <h3 className="text-lg font-medium">Next Payday</h3>
          <p className="text-3xl font-bold mt-2">15th</p>
          <p className="text-sm text-muted-foreground mt-1">7 days remaining</p>
        </Card>
      </div>
    </div>
  );
};

export default Payroll;
