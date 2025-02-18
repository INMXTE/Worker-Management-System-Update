import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";

const Messages = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Messages</h1>
      </header>

      <Card className="p-6 glass-card">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">New Message</h3>
            <textarea
              placeholder="Type your message here..."
              className="w-full h-32 p-3 rounded-lg border border-input bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => console.log("Send message clicked")}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Messages;
