import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, Check, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import * as faceapi from 'face-api.js';

interface FacialRecognitionProps {
  onVerificationComplete?: (success: boolean) => void;
  mode?: 'enroll' | 'verify';
  showGuidelines?: boolean;
}

export default function FacialRecognition({ 
  onVerificationComplete, 
  mode = 'verify',
  showGuidelines = true 
}: FacialRecognitionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'success' | 'failed' | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading face-api models:", error);
      }
      setIsLoading(false);
    };
    loadModels();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsScanning(true);
      startFaceDetection();
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  }, []);

  const startFaceDetection = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !modelsLoaded) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const detectFace = async () => {
      if (!isScanning) return;

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, detections);
        faceapi.draw.drawFaceLandmarks(canvas, detections);
      }

      if (isScanning) {
        requestAnimationFrame(detectFace);
      }
    };

    video.addEventListener('play', detectFace);
  }, [isScanning, modelsLoaded]);

  const verifyFace = async () => {
    setIsLoading(true);
    try {
      if (!videoRef.current) return;

      // Capture the current frame
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      // For demo purposes, we'll consider it successful if a face is detected
      // In a real implementation, you would compare with stored face descriptors
      const success = !!detection;
      
      setVerificationResult(success ? 'success' : 'failed');
      onVerificationComplete?.(success);
      stopCamera();
    } catch (error) {
      console.error("Error during face verification:", error);
      setVerificationResult('failed');
      onVerificationComplete?.(false);
    }
    setIsLoading(false);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle>{mode === 'enroll' ? 'Face Enrollment' : 'Face Verification'}</CardTitle>
          <CardDescription>
            {mode === 'enroll' 
              ? 'Register your face for future verification' 
              : 'Scan your face to verify your presence'}
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
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />
              {!isScanning && !verificationResult && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {isLoading ? (
                    <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
                  ) : (
                    <Camera className="w-12 h-12 text-gray-400" />
                  )}
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
                      <span className="text-green-600 font-medium">
                        {mode === 'enroll' ? 'Enrollment successful' : 'Verification successful'}
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <span className="text-red-600 font-medium">
                        {mode === 'enroll' ? 'Enrollment failed' : 'Verification failed'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            {!isScanning ? (
              <Button 
                onClick={startCamera} 
                className="w-full"
                disabled={isLoading || !modelsLoaded}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Camera className="w-4 h-4 mr-2" />
                )}
                {mode === 'enroll' ? 'Start Enrollment' : 'Start Verification'}
              </Button>
            ) : (
              <div className="space-y-2">
                <Button 
                  onClick={verifyFace} 
                  className="w-full" 
                  variant="default"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {mode === 'enroll' ? 'Complete Enrollment' : 'Verify Face'}
                </Button>
                <Button 
                  onClick={stopCamera} 
                  className="w-full" 
                  variant="outline"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {showGuidelines && (
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Guidelines</CardTitle>
            <CardDescription>
              Follow these guidelines for accurate {mode === 'enroll' ? 'enrollment' : 'verification'}
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
                <span>Stay still during the {mode === 'enroll' ? 'enrollment' : 'verification'} process</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
