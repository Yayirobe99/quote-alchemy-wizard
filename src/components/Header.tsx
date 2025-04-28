
import React from 'react';
import { Wand2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b border-wizard-neutral-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wand2 className="h-8 w-8 text-wizard-gold" />
          <div>
            <h1 className="text-xl font-bold text-wizard-neutral-800">LSquote Wizard</h1>
            <p className="text-xs text-wizard-neutral-500">Transform client data into perfect proposals</p>
          </div>
        </div>
        <div className="text-right">
          <img 
            src="/lovable-uploads/f242b7e8-3aa5-490e-af45-0307b906c560.png" 
            alt="Lang & Schwander Logo" 
            className="h-12 object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
