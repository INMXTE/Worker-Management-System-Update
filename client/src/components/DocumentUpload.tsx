import { useState } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  category: string;
  uploadDate: string;
}

export default function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [category, setCategory] = useState("certifications");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    // Convert FileList to array and add metadata
    const newFiles: UploadedFile[] = Array.from(uploadedFiles).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      category: category,
      uploadDate: new Date().toISOString()
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Management</CardTitle>
        <CardDescription>
          Upload and manage your documents. Supported formats: PDF, PNG, DOC (Max 10MB)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Document Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="certifications">Certifications</SelectItem>
                  <SelectItem value="contracts">Contracts</SelectItem>
                  <SelectItem value="identification">Identification</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Upload File</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.png"
                />
                <Button
                  onClick={() => document.getElementById("file")?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Uploaded Documents</h3>
          <div className="space-y-2">
            {files.map(file => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <File className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(file.uploadDate).toLocaleDateString()} - {file.category}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(file.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {files.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No documents uploaded yet
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
