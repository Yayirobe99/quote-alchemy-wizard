
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  Image, 
  FileText, 
  Package, 
  Tag,
  Check,
  X
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data - in a real app this would come from file processing
export type Item = {
  id: string;
  code: string;
  name: string;
  description: string;
  dimensions: string;
  finishes: string;
  location: string;
  quantity: number;
  unit: string;
  vendor: string;
  accessories: string[];
  hasImage: boolean;
  hasDuplicate: boolean;
};

type ItemDisplayProps = {
  items: Item[];
  onExport: () => void;
};

const ItemDisplay = ({ items = [], onExport }: ItemDisplayProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => 
        item.code.toLowerCase().includes(term) || 
        item.name.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term) ||
        item.location.toLowerCase().includes(term)
      );
      setFilteredItems(filtered);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilteredItems(items);
  };

  return (
    <Card className="w-full p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="font-bold text-xl text-wizard-blue">Extracted Items ({filteredItems.length})</h2>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-wizard-neutral-500 h-4 w-4" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={handleSearchChange}
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
              <DropdownMenuItem onClick={resetFilters}>
                Reset Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            onClick={onExport}
            className="bg-wizard-gold hover:bg-wizard-gold-dark"
          >
            Export to Excel
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader className="bg-wizard-neutral-100">
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Dimensions</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <TableRow key={item.id} className="group hover:bg-wizard-blue-light">
                  <TableCell className="py-2">
                    <div className="flex space-x-1">
                      {item.hasImage && (
                        <Badge variant="outline" className="h-6 w-6 p-0 flex items-center justify-center">
                          <Image className="h-3 w-3" />
                        </Badge>
                      )}
                      {item.hasDuplicate && (
                        <Badge variant="outline" className="h-6 w-6 p-0 flex items-center justify-center text-wizard-gold-dark border-wizard-gold-dark">
                          <FileText className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{item.description}</div>
                  </TableCell>
                  <TableCell>{item.dimensions}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.quantity} {item.unit}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" title="View Details">
                        <Package className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit Item">
                        <Tag className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-wizard-neutral-500">
                  No items found. Try adjusting your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default ItemDisplay;
