
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

// Updated Item type with new fields based on provided image
export type Item = {
  id: string;
  code: string;                    // Item Identifier (Item #)
  name: string;                    // Item Name
  description: string;             // Description
  category: string;                // Item Category
  drawingReference: string;        // Drawing Reference Designator
  vendor: string;                  // Vendor
  manufacturer: string;            // Manufacturer
  vendorItemId: string;            // Vendor Item ID / Vendor SKU
  marriottDescription: string;     // Marriott Description
  dimensions: {                    // Dimensions split into components
    height: string;
    width: string;
    depth: string;
  };
  finishes: string;                // Finishes
  finishCategory: string;          // Finish Category
  finishSelection: string;         // Finish Selection
  location: string;                // Area / Location
  quantity: number;
  unit: string;
  accessories: string[];
  specialInstructions: string[];   // Special Instructions
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
        item.location.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.vendor.toLowerCase().includes(term) ||
        item.manufacturer.toLowerCase().includes(term)
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
      
      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader className="bg-wizard-neutral-100">
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Item Category</TableHead>
              <TableHead>Item # (Code)</TableHead>
              <TableHead>Drawing Reference</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Vendor Item ID</TableHead>
              <TableHead>Marriott Description</TableHead>
              <TableHead>Height</TableHead>
              <TableHead>Width</TableHead>
              <TableHead>Depth</TableHead>
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
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>{item.drawingReference}</TableCell>
                  <TableCell>{item.vendor}</TableCell>
                  <TableCell>{item.manufacturer}</TableCell>
                  <TableCell>{item.vendorItemId}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{item.marriottDescription || item.description}</div>
                  </TableCell>
                  <TableCell>{item.dimensions.height}</TableCell>
                  <TableCell>{item.dimensions.width}</TableCell>
                  <TableCell>{item.dimensions.depth}</TableCell>
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
                <TableCell colSpan={14} className="text-center py-8 text-wizard-neutral-500">
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
