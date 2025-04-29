
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SearchFilterBarProps = {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
  onResetFilters: () => void;
  itemCount: number;
};

const SearchFilterBar = ({ 
  searchTerm, 
  onSearchChange, 
  onExport, 
  onResetFilters,
  itemCount 
}: SearchFilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
      <h2 className="font-bold text-xl text-wizard-neutral-800">
        Extracted Items ({itemCount})
      </h2>
      
      <div className="flex gap-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-wizard-neutral-500 h-4 w-4" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={onSearchChange}
            className="pl-8 w-full sm:w-64"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Has Duplicates</DropdownMenuItem>
            <DropdownMenuItem>Has Images</DropdownMenuItem>
            <DropdownMenuItem>Has Accessories</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onResetFilters}>
              Reset Filters
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          onClick={onExport}
          className="bg-wizard-gold hover:bg-wizard-gold-dark text-white"
        >
          Export to Excel
        </Button>
      </div>
    </div>
  );
};

export default SearchFilterBar;
