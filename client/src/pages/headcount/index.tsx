import { useState } from "react";
import { useAuth } from "@/lib/auth";
import FacialRecognition from "@/components/FacialRecognition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, AlertTriangle } from "lucide-react";

export default function Headcount() {
  const { user, profile } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'failed' | null>(null);

  const handleVerificationComplete = (success: boolean) => {
    setVerificationStatus(success ? 'success' : 'failed');
    // TODO: Send verification result to backend
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Headcount Verification</h1>
        <p className="text-muted-foreground">
          Verify your presence using facial recognition
        </p>
      </div>

      {/* Status Card */}
      {verificationStatus && (
        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg ${
              verificationStatus === 'success' ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <div className="flex items-center space-x-2">
                {verificationStatus === 'success' ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <div className="space-y-1">
                      <p className="text-green-600 font-medium">Verification successful</p>
                      <p className="text-sm text-green-500">
                        Your presence has been recorded for {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <div className="space-y-1">
                      <p className="text-red-600 font-medium">Verification failed</p>
                      <p className="text-sm text-red-500">
                        Please try again or contact your supervisor if the issue persists
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Facial Recognition Component */}
      <FacialRecognition 
        onVerificationComplete={handleVerificationComplete}
        mode="verify"
        showGuidelines={true}
      />
    </div>
  );
}