
import React, { useState } from 'react';
import Header from '@/components/Header';
import FileUpload from '@/components/FileUpload';
import ProcessingSteps from '@/components/ProcessingSteps';
import ItemDisplay, { Item } from '@/components/ItemDisplay';
import { processFiles, exportToExcel, consolidateDuplicates } from '@/services/dataProcessing';
import { useToast } from '@/components/ui/use-toast';

type StepStatus = 'inactive' | 'active' | 'completed';

type Step = {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
};

const steps: Step[] = [
  {
    id: 'upload',
    title: 'Upload Files',
    description: 'Upload client specification documents, spreadsheets, and PDFs',
    status: 'active',
  },
  {
    id: 'extract',
    title: 'Extract Data',
    description: 'Automatically extract items, specifications, quantities, and accessories',
    status: 'inactive',
  },
  {
    id: 'consolidate',
    title: 'Consolidate Items',
    description: 'Identify and merge duplicate items with identical specifications',
    status: 'inactive',
  },
  {
    id: 'export',
    title: 'Generate Proposal',
    description: 'Export a clean, organized Excel file ready for pricing and client submission',
    status: 'inactive',
  }
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState('upload');
  const [processedItems, setProcessedItems] = useState<Item[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSteps, setCurrentSteps] = useState<Step[]>(steps);
  const { toast } = useToast();

  const updateStepStatus = (stepId: string, status: StepStatus) => {
    setCurrentSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId ? { ...step, status } : step
      )
    );
  };

  const handleFilesUploaded = async (files: File[]) => {
    try {
      setIsProcessing(true);
      updateStepStatus('upload', 'completed');
      updateStepStatus('extract', 'active');
      setCurrentStep('extract');
      
      const items = await processFiles(files);
      setProcessedItems(items);
      
      updateStepStatus('extract', 'completed');
      updateStepStatus('consolidate', 'active');
      setCurrentStep('consolidate');
      
      const consolidated = await consolidateDuplicates(items);
      setProcessedItems(consolidated);
      
      updateStepStatus('consolidate', 'completed');
      updateStepStatus('export', 'active');
      setCurrentStep('export');
      
      setIsProcessing(false);
      
      toast({
        title: "Processing Complete",
        description: `Successfully extracted ${items.length} items from the uploaded files.`,
      });
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Processing Error",
        description: "An error occurred while processing the files. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExport = async () => {
    try {
      const success = await exportToExcel();
      if (success) {
        updateStepStatus('export', 'completed');
        toast({
          title: "Export Successful",
          description: "Your proposal has been exported to Excel successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "An error occurred during export. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-wizard-neutral-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="wizard-container">
          <div className="mb-8">
            <h1 className="wizard-heading">LSquote Wizard</h1>
            <p className="wizard-subheading">Transform client data into perfect proposals</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ProcessingSteps steps={currentSteps} currentStep={currentStep} />
            </div>
            
            <div className="lg:col-span-2">
              {currentStep === 'upload' && (
                <FileUpload onFilesUploaded={handleFilesUploaded} />
              )}
              
              {(currentStep === 'extract' || currentStep === 'consolidate' || currentStep === 'export') && (
                <div className="space-y-6">
                  <ItemDisplay 
                    items={processedItems} 
                    onExport={handleExport}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-auto py-4 bg-wizard-blue text-white text-center text-sm">
        <p>© 2025 Lang & Schwander Hotel Interiors - LSquote Wizard</p>
      </footer>
    </div>
  );
};

export default Index;
