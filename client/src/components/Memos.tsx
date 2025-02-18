import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquarePlus, Check, Bell } from "lucide-react";
import { format } from "date-fns";

interface Memo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  isRead?: boolean;
}

export default function Memos() {
  const { user } = useAuth();
  const [memos, setMemos] = useState<Memo[]>([
    {
      id: "1",
      title: "Important Update: New Safety Protocols",
      content: "Please review the updated safety protocols...",
      createdAt: new Date().toISOString(),
      author: "HR Department",
      isRead: false,
    },
    {
      id: "2",
      title: "Upcoming Team Building Event",
      content: "Join us for the annual team building event...",
      createdAt: new Date().toISOString(),
      author: "Events Committee",
      isRead: true,
    },
  ]);

  const [newMemo, setNewMemo] = useState({
    title: "",
    content: "",
  });

  const handleCreateMemo = () => {
    const memo: Memo = {
      id: Math.random().toString(36).substr(2, 9),
      title: newMemo.title,
      content: newMemo.content,
      createdAt: new Date().toISOString(),
      author: user?.email || "Unknown",
      isRead: false,
    };

    setMemos([memo, ...memos]);
    setNewMemo({ title: "", content: "" });
  };

  const markAsRead = (memoId: string) => {
    setMemos(memos.map(memo =>
      memo.id === memoId ? { ...memo, isRead: true } : memo
    ));
  };

  return (
    <div className="space-y-6">
      {user?.role === "hr_admin" && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <MessageSquarePlus className="w-4 h-4 mr-2" />
              Create Memo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Memo</DialogTitle>
              <DialogDescription>
                Create a new memo to broadcast to all workers
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                  placeholder="Memo Title"
                  value={newMemo.title}
                  onChange={(e) =>
                    setNewMemo({ ...newMemo, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Memo Content"
                  value={newMemo.content}
                  onChange={(e) =>
                    setNewMemo({ ...newMemo, content: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleCreateMemo} className="w-full">
                Send Memo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <div className="grid gap-4">
        {memos.map((memo) => (
          <Card key={memo.id} className={memo.isRead ? "opacity-75" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base font-medium flex items-center">
                    {!memo.isRead && (
                      <Bell className="w-4 h-4 text-primary mr-2" />
                    )}
                    {memo.title}
                  </CardTitle>
                  <CardDescription>
                    From {memo.author} • {format(new Date(memo.createdAt), "PPp")}
                  </CardDescription>
                </div>
                {!memo.isRead && user?.role === "worker" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => markAsRead(memo.id)}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{memo.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
