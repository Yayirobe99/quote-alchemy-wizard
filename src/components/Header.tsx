
import React from 'react';
import { Wand2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-wizard-blue shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wand2 className="h-8 w-8 text-wizard-gold" />
          <div>
            <h1 className="text-xl font-bold text-white">Quote Alchemy Wizard</h1>
            <p className="text-xs text-wizard-neutral-100">Transform client data into perfect proposals</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-white font-semibold">Lang & Schwander</p>
          <p className="text-xs text-wizard-neutral-200">Hotel Interiors</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
