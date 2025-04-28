
import React from 'react';
import { CheckCircle2, CircleDashed, CircleEllipsis } from 'lucide-react';

type StepStatus = 'inactive' | 'active' | 'completed';

type Step = {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
};

type ProcessingStepsProps = {
  steps: Step[];
  currentStep: string;
};

const ProcessingSteps = ({ steps, currentStep }: ProcessingStepsProps) => {
  return (
    <div className="w-full">
      <ul className="space-y-4">
        {steps.map((step, index) => (
          <li 
            key={step.id}
            className={`relative pl-10 pb-4 ${
              index < steps.length - 1 ? 'border-l-2 ml-4' : ''
            } ${
              step.status === 'completed' 
                ? 'border-wizard-gold' 
                : step.status === 'active' 
                  ? 'border-wizard-blue' 
                  : 'border-wizard-neutral-300'
            }`}
          >
            <div className="absolute -left-4 top-0">
              {step.status === 'completed' ? (
                <CheckCircle2 className="h-8 w-8 text-wizard-gold-dark" />
              ) : step.status === 'active' ? (
                <CircleEllipsis className="h-8 w-8 text-wizard-blue animate-pulse" />
              ) : (
                <CircleDashed className="h-8 w-8 text-wizard-neutral-300" />
              )}
            </div>
            
            <div 
              className={`wizard-card ${
                step.status === 'active' 
                  ? 'border-l-4 border-l-wizard-blue' 
                  : step.status === 'completed'
                    ? 'border-l-4 border-l-wizard-gold' 
                    : ''
              }`}
            >
              <h3 
                className={`font-bold text-lg mb-1 ${
                  step.status === 'active' 
                    ? 'text-wizard-blue' 
                    : step.status === 'completed' 
                      ? 'text-wizard-gold-dark' 
                      : 'text-wizard-neutral-500'
                }`}
              >
                {step.title}
              </h3>
              <p className="text-wizard-neutral-600">{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcessingSteps;
