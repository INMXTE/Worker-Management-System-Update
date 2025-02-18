import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Search, MoreVertical, Eye, Edit, Trash, FileText } from "lucide-react";
import { Profile } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function WorkerList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWorker, setSelectedWorker] = useState<Profile | null>(null);

  const { data: workers, isLoading } = useQuery<Profile[]>({
    queryKey: ["/api/workers"],
  });

  const filteredWorkers = workers?.filter(
    (worker) =>
      worker.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string = "active") => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "on_leave":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, department, position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  Loading workers...
                </TableCell>
              </TableRow>
            ) : filteredWorkers?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  No workers found
                </TableCell>
              </TableRow>
            ) : (
              filteredWorkers?.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={worker.avatar_url || undefined} />
                        <AvatarFallback>
                          {worker.full_name?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{worker.full_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {worker.phone}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{worker.department}</TableCell>
                  <TableCell>{worker.position}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(worker.status)}
                    >
                      {worker.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Files
                    </Button>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedWorker(worker)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedWorker} onOpenChange={() => setSelectedWorker(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Worker Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-center mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={selectedWorker?.avatar_url || undefined} />
                <AvatarFallback>
                  {selectedWorker?.full_name?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Name:</span>
              <span className="col-span-3">{selectedWorker?.full_name}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Department:</span>
              <span className="col-span-3">{selectedWorker?.department}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Position:</span>
              <span className="col-span-3">{selectedWorker?.position}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Phone:</span>
              <span className="col-span-3">{selectedWorker?.phone}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Address:</span>
              <span className="col-span-3">{selectedWorker?.address}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Status:</span>
              <span className="col-span-3">
                <Badge
                  variant="secondary"
                  className={getStatusColor(selectedWorker?.status)}
                >
                  {selectedWorker?.status}
                </Badge>
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}