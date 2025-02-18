import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, FileText, Clock, MoreVertical, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface Worker {
  id: string;
  created_at: string;
  email: string;
  full_name: string;
  department: string;
  role: string;
  status: string;
  avatar_url?: string;
}

const WorkerList = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "worker");

      if (error) throw error;
      setWorkers(data || []);
    } catch (error) {
      console.error("Error fetching workers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredWorkers = workers.filter(
    (worker) =>
      worker.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.role?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "on leave":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

          <Input
            placeholder="Search workers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">Export</Button>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Worker</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading workers...
                </TableCell>
              </TableRow>
            ) : filteredWorkers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No workers found
                </TableCell>
              </TableRow>
            ) : (
              filteredWorkers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={worker.avatar_url} />

                        <AvatarFallback>{worker.full_name?.[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{worker.full_name}</p>
                        <p className="text-sm text-gray-500">{worker.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{worker.department}</TableCell>
                  <TableCell>{worker.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(worker.status)}
                    >
                      {worker.status || "Unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => navigate(`/workers/${worker.id}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/workers/${worker.id}/documents`)
                          }
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Documents
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/workers/${worker.id}/attendance`)
                          }
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Attendance Log
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default WorkerList;
