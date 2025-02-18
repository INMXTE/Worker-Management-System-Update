import { useState } from "react";
import { Card } from "@/components/ui/card";
import WorkerList from "@/components/WorkerList";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface WorkerFormData {
  email: string;
  full_name: string;
  department: string;
  role: "worker" | "hr_admin";
  status: "active" | "inactive" | "on leave";
}

const Workers = () => {
  const [isAddingWorker, setIsAddingWorker] = useState(false);
  const [formData, setFormData] = useState<WorkerFormData>({
    email: "",
    full_name: "",
    department: "",
    role: "worker",
    status: "active",
  });

  const handleAddWorker = async () => {
    try {
      // First create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: Math.random().toString(36).slice(-8), // Generate random password
        options: {
          data: {
            role: formData.role,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Failed to create user");

      // Then create profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        role: formData.role,
        email: formData.email,
        full_name: formData.full_name,
        department: formData.department,
        status: formData.status,
      });

      if (profileError) throw profileError;

      toast({
        title: "Worker Added",
        description: "The worker has been successfully added to the system.",
      });

      setIsAddingWorker(false);
      setFormData({
        email: "",
        full_name: "",
        department: "",
        role: "worker",
        status: "active",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Worker Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage your workforce and their information
          </p>
        </div>

        <Dialog open={isAddingWorker} onOpenChange={setIsAddingWorker}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Worker
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Worker</DialogTitle>
              <DialogDescription>
                Add a new worker to the system. They will receive an email to
                set their password.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      full_name: e.target.value,
                    }))
                  }
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Input
                  value={formData.department}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      department: e.target.value,
                    }))
                  }
                  placeholder="Engineering"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "active" | "inactive" | "on leave") =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on leave">On Leave</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsAddingWorker(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddWorker}>Add Worker</Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <WorkerList />
    </div>
  );
};

export default Workers;
