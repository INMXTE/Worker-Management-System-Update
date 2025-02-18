import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Check, X } from "lucide-react";
import { format } from "date-fns";

export default function ClockIn() {
  const { user, profile } = useAuth();
  const [clockedIn, setClockedIn] = useState(false);
  const [lastClockIn, setLastClockIn] = useState<Date | null>(null);

  const handleClockIn = async () => {
    // TODO: Implement actual clock-in functionality with facial recognition
    const now = new Date();
    setLastClockIn(now);
    setClockedIn(true);
  };

  const handleClockOut = async () => {
    // TODO: Implement actual clock-out functionality
    setClockedIn(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Clock In/Out</h1>
        <p className="text-muted-foreground">
          Record your daily attendance with facial verification
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Status</CardTitle>
            <CardDescription>Your current clock-in status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className={`h-3 w-3 rounded-full ${clockedIn ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="font-medium">{clockedIn ? 'Clocked In' : 'Clocked Out'}</span>
              </div>
              {lastClockIn && (
                <p className="text-sm text-muted-foreground">
                  Last clock-in: {format(lastClockIn, 'PPpp')}
                </p>
              )}
              <Button
                className="w-full"
                onClick={clockedIn ? handleClockOut : handleClockIn}
              >
                {clockedIn ? (
                  <>
                    <Clock className="w-4 h-4 mr-2" />
                    Clock Out
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4 mr-2" />
                    Clock In
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Activity</CardTitle>
            <CardDescription>Your attendance records for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lastClockIn ? (
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Clock In</p>
                    <p className="text-sm text-muted-foreground">
                      {format(lastClockIn, 'PPpp')}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <X className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">No Activity</p>
                    <p className="text-sm text-muted-foreground">
                      You haven't clocked in today
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
