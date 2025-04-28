
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, FileCheck, FileX } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type FileUploadProps = {
  onFilesUploaded: (files: File[]) => void;
  acceptedFileTypes?: string;
};

const FileUpload = ({ onFilesUploaded, acceptedFileTypes = ".xlsx,.xls,.csv,.doc,.docx,.pdf" }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const fileList = e.dataTransfer.files;
    processFiles(fileList);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      processFiles(fileList);
    }
  };

  const processFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    setFiles(prev => [...prev, ...newFiles]);
    toast({
      title: "Files Added",
      description: `${newFiles.length} files have been added.`,
    });
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = () => {
    if (files.length > 0) {
      onFilesUploaded(files);
      toast({
        title: "Processing Files",
        description: `Starting to extract data from ${files.length} files.`,
      });
    } else {
      toast({
        title: "No Files",
        description: "Please upload at least one file to continue.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={`w-full transition-all ${isDragging ? 'border-wizard-blue border-2' : ''}`}>
      <CardHeader>
        <CardTitle>Upload Client Files</CardTitle>
        <CardDescription>
          Upload specification documents, spreadsheets, or PDFs containing item data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${isDragging ? 'bg-wizard-blue-light border-wizard-blue' : 'border-wizard-neutral-300 hover:border-wizard-blue'}`}
        >
          <FileUp className="mx-auto h-12 w-12 text-wizard-neutral-400 mb-4" />
          <p className="text-wizard-neutral-600 mb-2">
            Drag and drop your files here, or
          </p>
          <label className="cursor-pointer">
            <span className="bg-wizard-blue text-white px-4 py-2 rounded hover:bg-wizard-blue-dark transition-colors">
              Browse files
            </span>
            <input
              type="file"
              multiple
              accept={acceptedFileTypes}
              onChange={handleFileInputChange}
              className="hidden"
            />
          </label>
          <p className="mt-2 text-sm text-wizard-neutral-500">
            Accepted formats: Excel, CSV, Word, PDF
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Uploaded Files ({files.length}):</h3>
            <div className="max-h-60 overflow-y-auto">
              {files.map((file, index) => (
                <div 
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between py-2 px-3 bg-wizard-neutral-50 rounded mb-2 animate-fade-in"
                >
                  <div className="flex items-center">
                    <FileCheck className="h-5 w-5 text-wizard-blue mr-2" />
                    <span className="text-sm truncate max-w-xs">{file.name}</span>
                  </div>
                  <button 
                    onClick={() => removeFile(index)}
                    className="text-wizard-neutral-500 hover:text-destructive"
                  >
                    <FileX className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={files.length === 0}
          className="w-full bg-wizard-blue hover:bg-wizard-blue-dark"
        >
          Process Files
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileUpload;
