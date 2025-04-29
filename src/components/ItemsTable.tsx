
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ImageIcon, 
  FileText, 
  Eye,
  Tag 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Item } from './ItemDisplay';
import ItemDetailView from './ItemDetailView';

type ItemsTableProps = {
  items: Item[];
  onViewItem: (item: Item) => void;
  selectedItem: Item | null;
};

const ItemsTable = ({ items, onViewItem, selectedItem }: ItemsTableProps) => {
  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader className="bg-wizard-neutral-100">
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Item Code</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Image</TableHead>
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
          {items.length > 0 ? (
            items.map(item => (
              <TableRow key={item.id} className="group hover:bg-wizard-blue-light">
                <TableCell className="py-2">
                  <div className="flex space-x-1">
                    {item.hasImage && (
                      <Badge variant="outline" className="h-6 w-6 p-0 flex items-center justify-center">
                        <ImageIcon className="h-3 w-3" />
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
                  {item.hasImage ? (
                    <div className="h-12 w-12 rounded overflow-hidden border">
                      <img 
                        src="/lovable-uploads/67d27905-e0f7-4b23-af2b-1f2880fbb36b.png" 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded border flex items-center justify-center bg-gray-100">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </TableCell>
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
                          onClick={() => onViewItem(item)}
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
                          <ItemDetailView selectedItem={selectedItem} />
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
              <TableCell colSpan={15} className="text-center py-8 text-wizard-neutral-500">
                No items found. Try adjusting your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ItemsTable;
