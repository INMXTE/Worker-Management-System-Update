import { useState, useRef } from "react";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Check, AlertTriangle } from "lucide-react";

export default function Headcount() {
  const { user, profile } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'success' | 'failed' | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsScanning(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const verifyFace = async () => {
    // TODO: Implement actual facial recognition verification
    // For now, we'll simulate the verification process
    setIsScanning(false);
    setVerificationResult(Math.random() > 0.5 ? 'success' : 'failed');
    stopCamera();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Headcount Verification</h1>
        <p className="text-muted-foreground">
          Verify your presence using facial recognition
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Face Verification</CardTitle>
            <CardDescription>
              Scan your face to verify your presence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${isScanning ? 'opacity-100' : 'opacity-0'}`}
                />
                {!isScanning && !verificationResult && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>

              {verificationResult && (
                <div className={`p-4 rounded-lg ${
                  verificationResult === 'success' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <div className="flex items-center space-x-2">
                    {verificationResult === 'success' ? (
                      <>
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-green-600 font-medium">Verification successful</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span className="text-red-600 font-medium">Verification failed</span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {!isScanning ? (
                <Button onClick={startCamera} className="w-full">
                  <Camera className="w-4 h-4 mr-2" />
                  Start Verification
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button onClick={verifyFace} className="w-full" variant="default">
                    Verify Face
                  </Button>
                  <Button onClick={stopCamera} className="w-full" variant="outline">
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guidelines</CardTitle>
            <CardDescription>
              Follow these guidelines for accurate verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Ensure proper lighting - avoid backlighting</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Remove glasses, masks, or other face coverings</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Keep a neutral expression</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Face the camera directly</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Stay still during the verification process</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}