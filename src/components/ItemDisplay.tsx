
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
  X,
  Eye,
  Download
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type Item = {
  id: string;
  code: string;                    // Item Identifier (Item #)
  name: string;                    // Item Name
  description: string;             // Description
  category: string;                // Item Category
  area?: string;                   // Area designation
  drawingReference: string;        // Drawing Reference Designator
  vendor: string;                  // Vendor
  manufacturer: string;            // Manufacturer
  vendorItemId: string;            // Vendor Item ID / Vendor SKU
  marriottDescription: string;     // Marriott Description
  dimensions: {                    // Dimensions in inches
    height: string;
    width: string;
    depth: string;
  };
  dimensionsMm?: {                 // Dimensions in millimeters
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
  contactInfo?: {                  // Contact information
    representative: string;
    phone: string;
    email: string;
  };
  projectInfo?: {                  // Project information
    issueDate: string;
    projectName: string;
    projectNumber: string;
  };
};

type ItemDisplayProps = {
  items: Item[];
  onExport: () => void;
};

const ItemDisplay = ({ items = [], onExport }: ItemDisplayProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  
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

  React.useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const viewItemDetails = (item: Item) => {
    setSelectedItem(item);
  };

  // Item detail view to mimic the provided template
  const ItemDetailView = () => {
    if (!selectedItem) return null;
    
    return (
      <div className="flex flex-col gap-4">
        {/* Header with project info */}
        <div className="flex justify-between border-b pb-4">
          <div className="space-y-1">
            <div className="flex gap-2">
              <span className="font-semibold">ISSUE DATE:</span>
              <span>{selectedItem.projectInfo?.issueDate || "N/A"}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">PROJECT:</span>
              <span>{selectedItem.projectInfo?.projectName || "N/A"}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">PROJECT #:</span>
              <span>{selectedItem.projectInfo?.projectNumber || "N/A"}</span>
            </div>
          </div>
          <div className="flex justify-end">
            {/* L&S Logo would go here in real implementation */}
            <div className="text-right text-sm text-gray-600">
              <div className="font-bold text-lg uppercase">Lang & Schwander</div>
              <div className="uppercase">Hotel Interiors</div>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Left column - item details */}
          <div className="md:col-span-3 space-y-2">
            <div className="grid grid-cols-2 gap-x-8">
              <div className="text-right font-semibold">AREA</div>
              <div>{selectedItem.area || selectedItem.location}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-8">
              <div className="text-right font-semibold">ITEM NAME</div>
              <div>{selectedItem.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-8">
              <div className="text-right font-semibold">DESCRIPTION</div>
              <div>{selectedItem.description}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-8">
              <div className="text-right font-semibold">VENDOR SKU</div>
              <div>{selectedItem.vendorItemId}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-8">
              <div className="text-right font-semibold">FINISH CATEGORY</div>
              <div>{selectedItem.finishCategory} | {selectedItem.finishes}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-8">
              <div className="text-right font-semibold">FINISH SELECTION</div>
              <div>{selectedItem.finishSelection}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-8">
              <div className="text-right font-semibold">SUITED FOR</div>
              <div>{selectedItem.location}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-8">
              <div className="text-right font-semibold">PROTOTYPE CODE</div>
              <div>{selectedItem.drawingReference !== "N/A" ? selectedItem.drawingReference : "N/A"}</div>
            </div>
          </div>
          
          {/* Right column - item code and category */}
          <div className="md:col-span-2 flex flex-col items-center">
            <div className="text-4xl font-bold">{selectedItem.code}</div>
            <div className="bg-black text-white w-full text-center py-2 mt-2">
              {selectedItem.category} | {selectedItem.category === "AC" ? "ACCESSORIES" : 
                selectedItem.category === "FF" ? "FURNITURE" : 
                selectedItem.category === "LT" ? "LIGHTING" : 
                selectedItem.category === "CG" ? "CASEGOODS" : 
                selectedItem.category === "DW" ? "DRAPERY & WALLCOVERING" : "MISC"}
            </div>
          </div>
        </div>
        
        {/* Dimensions table */}
        <div className="mt-6">
          <table className="w-full border border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-center">UNIT</th>
                <th className="border p-2 text-center">WIDTH</th>
                <th className="border p-2 text-center">HEIGHT</th>
                <th className="border p-2 text-center">DEPTH</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 text-center">INCH</td>
                <td className="border p-2 text-center">{selectedItem.dimensions.width}</td>
                <td className="border p-2 text-center">{selectedItem.dimensions.height}</td>
                <td className="border p-2 text-center">{selectedItem.dimensions.depth}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">MM</td>
                <td className="border p-2 text-center">{selectedItem.dimensionsMm?.width || Math.round(parseFloat(selectedItem.dimensions.width) * 25.4)}</td>
                <td className="border p-2 text-center">{selectedItem.dimensionsMm?.height || Math.round(parseFloat(selectedItem.dimensions.height) * 25.4)}</td>
                <td className="border p-2 text-center">{selectedItem.dimensionsMm?.depth || Math.round(parseFloat(selectedItem.dimensions.depth) * 25.4)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Special instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="col-span-1">
            <div className="bg-black text-white px-4 py-1">
              SPECIAL INSTRUCTIONS
            </div>
            <div className="border p-4 min-h-[200px]">
              {selectedItem.specialInstructions.length > 0 ? (
                <ul className="list-none space-y-1">
                  {selectedItem.specialInstructions.map((instruction, idx) => (
                    <li key={idx}>{instruction}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No special instructions</p>
              )}
            </div>
          </div>
          
          <div className="col-span-1 flex flex-col">
            {/* Product image */}
            <div className="flex-grow border flex items-center justify-center p-2">
              {selectedItem.hasImage ? (
                <img 
                  src="/lovable-uploads/67d27905-e0f7-4b23-af2b-1f2880fbb36b.png" 
                  alt={selectedItem.name} 
                  className="max-h-[200px] object-contain"
                />
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <Image className="h-12 w-12" />
                  <p>No image available</p>
                </div>
              )}
            </div>
            
            {/* Quantity */}
            <div className="mt-2">
              <div className="bg-black text-white px-4 py-1 text-center">
                QUANTITY
              </div>
              <div className="border p-2 text-center text-xl font-bold">
                {selectedItem.quantity}
              </div>
            </div>
            
            {/* Additional info */}
            <div className="mt-2 border p-2">
              <div className="flex gap-2">
                <span className="font-semibold">MFR:</span>
                <span>{selectedItem.manufacturer}</span>
              </div>
              
              {selectedItem.contactInfo && (
                <div className="mt-2">
                  <div className="font-semibold">CONTACT:</div>
                  <div className="ml-2">
                    <div>REP: {selectedItem.contactInfo.representative}</div>
                    {selectedItem.contactInfo.phone && <div>T: {selectedItem.contactInfo.phone}</div>}
                    {selectedItem.contactInfo.email && <div>E: {selectedItem.contactInfo.email}</div>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="font-bold text-xl text-wizard-neutral-800">Extracted Items ({filteredItems.length})</h2>
        
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
            className="bg-wizard-gold hover:bg-wizard-gold-dark text-white"
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
              <TableHead>Item Code</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Height</TableHead>
              <TableHead>Width</TableHead>
              <TableHead>Depth</TableHead>
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
                        <Badge variant="outline" className="h-6 w-6 p-0 flex items-center justify-center text-wizard-gold border-wizard-gold">
                          <FileText className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.area || item.location}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={item.name}>{item.name}</div>
                  </TableCell>
                  <TableCell>{item.vendor}</TableCell>
                  <TableCell>{item.manufacturer}</TableCell>
                  <TableCell>{item.vendorItemId}</TableCell>
                  <TableCell>{item.dimensions.height}″</TableCell>
                  <TableCell>{item.dimensions.width}″</TableCell>
                  <TableCell>{item.dimensions.depth}″</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="View Item Details"
                            onClick={() => viewItemDetails(item)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Item Specification</DialogTitle>
                            <DialogDescription>
                              Detailed information for {item.code}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4 max-h-[80vh] overflow-y-auto p-2">
                            <ItemDetailView />
                          </div>
                        </DialogContent>
                      </Dialog>
                      
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
