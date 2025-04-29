
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import ItemsTable from './ItemsTable';
import SearchFilterBar from './SearchFilterBar';

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

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const viewItemDetails = (item: Item) => {
    setSelectedItem(item);
  };

  return (
    <Card className="w-full p-4">
      <SearchFilterBar 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onExport={onExport}
        onResetFilters={resetFilters}
        itemCount={filteredItems.length}
      />
      
      <ItemsTable 
        items={filteredItems}
        onViewItem={viewItemDetails}
        selectedItem={selectedItem}
      />
    </Card>
  );
};

export default ItemDisplay;
