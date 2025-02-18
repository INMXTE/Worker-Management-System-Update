import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const departments = [
  {
    id: 1,
    name: "Engineering",
    employees: 45,
    head: "John Smith",
    budget: "$500,000",
  },
  {
    id: 2,
    name: "Design",
    employees: 20,
    head: "Sarah Johnson",
    budget: "$250,000",
  },
  {
    id: 3,
    name: "Marketing",
    employees: 15,
    head: "Michael Brown",
    budget: "$300,000",
  },
];

const Departments = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Departments</h1>
      </header>

      <Card className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Head</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead>Budget</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((dept) => (
              <TableRow
                key={dept.id}
                className="hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <TableCell className="font-medium">{dept.name}</TableCell>
                <TableCell>{dept.head}</TableCell>
                <TableCell>{dept.employees}</TableCell>
                <TableCell>{dept.budget}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Departments;
