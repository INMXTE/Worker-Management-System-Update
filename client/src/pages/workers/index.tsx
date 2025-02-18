import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import WorkerList from "@/components/WorkerList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Workers() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Workers</h1>
          <p className="text-muted-foreground">
            Manage your organization's workforce
          </p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Worker
        </Button>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Worker List</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card className="p-6">
            <WorkerList />
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Document Management</h2>
            <p className="text-muted-foreground">
              View and manage worker documents
            </p>
            {/* Document management component will go here */}
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Attendance Records</h2>
            <p className="text-muted-foreground">
              View worker attendance and headcount records
            </p>
            {/* Attendance records component will go here */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}