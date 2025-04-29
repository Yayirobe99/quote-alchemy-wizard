
import React from 'react';
import { ImageIcon } from 'lucide-react';
import { Item } from './ItemDisplay';

type ItemDetailViewProps = {
  selectedItem: Item | null;
};

const ItemDetailView = ({ selectedItem }: ItemDetailViewProps) => {
  if (!selectedItem) return null;
  
  // Function to determine which image to show for a specific item
  const getItemImage = (item: Item) => {
    if (!item.hasImage) return null;
    
    // Map item code to specific images - in a real app, you would use actual item images
    const imageMapping: Record<string, string> = {
      "LB-AC-101": "/lovable-uploads/67d27905-e0f7-4b23-af2b-1f2880fbb36b.png",
      "LB-FF-100": "/lovable-uploads/bb1568c2-0c5d-4c2e-9735-7c4eb8673c7c.png",
      "LB-LT-101": "/lovable-uploads/f242b7e8-3aa5-490e-af45-0307b906c560.png"
    };
    
    // Use specific image if available, otherwise use a default
    return imageMapping[item.code] || "/lovable-uploads/67d27905-e0f7-4b23-af2b-1f2880fbb36b.png";
  };
  
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
      
      {/* Special instructions and image */}
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
                src={getItemImage(selectedItem)} 
                alt={selectedItem.name} 
                className="max-h-[200px] object-contain"
              />
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <ImageIcon className="h-12 w-12" />
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

export default ItemDetailView;
