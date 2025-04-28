
import { Item } from "@/components/ItemDisplay";

// Mock data - in a real implementation this would process actual files
export const processFiles = (files: File[]): Promise<Item[]> => {
  // This is a simulation - in a real app, you would process the files' contents
  return new Promise((resolve) => {
    // Simulate processing delay
    setTimeout(() => {
      // Generate mock data based on the number of files
      const items: Item[] = [];
      
      for (let i = 0; i < 15 + Math.floor(Math.random() * 10); i++) {
        const itemCategory = getRandomItemCategory();
        const itemName = getRandomItemName();
        
        items.push({
          id: `item-${i}`,
          code: `FF-${1000 + i}`,
          name: itemName,
          category: itemCategory,
          drawingReference: `DR-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${100 + i}`,
          description: getRandomDescription(),
          dimensions: {
            height: `${Math.floor(Math.random() * 40) + 30}`,
            width: `${Math.floor(Math.random() * 60) + 20}`,
            depth: `${Math.floor(Math.random() * 30) + 20}`
          },
          finishes: getRandomFinish(),
          finishCategory: getRandomFinishCategory(),
          finishSelection: getRandomFinishSelection(),
          location: getRandomLocation(),
          quantity: Math.floor(Math.random() * 10) + 1,
          unit: "EA",
          vendor: getRandomVendor(),
          manufacturer: getRandomManufacturer(),
          vendorItemId: `KGA${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 9000) + 1000}P`,
          marriottDescription: i % 2 === 0 ? `MARRIOTT ${itemName.toUpperCase()}` : "",
          accessories: i % 3 === 0 ? getRandomAccessories() : [],
          specialInstructions: i % 4 === 0 ? getRandomSpecialInstructions() : [],
          hasImage: i % 4 === 0,
          hasDuplicate: i % 5 === 0
        });
      }
      
      resolve(items);
    }, 2000); // 2 second delay to simulate processing
  });
};

export const exportToExcel = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would generate an Excel file
      resolve(true);
    }, 1000); 
  });
};

export const consolidateDuplicates = (items: Item[]): Promise<Item[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would actually analyze and consolidate duplicates
      const consolidated = [...items];
      resolve(consolidated);
    }, 1500);
  });
};

// Helper functions to generate mock data
function getRandomItemCategory(): string {
  const categories = [
    "FF", "AC", "CASEGOODS", "SEATING", "LIGHTING", "DECORATIVE", "WALL DECOR", "FLOOR COVERING"
  ];
  return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomItemName(): string {
  const items = [
    "Lounge Chair", "Coffee Table", "Side Table", "Desk Chair", 
    "Console Table", "Ottoman", "Desk", "Nightstand", "Headboard",
    "Sofa", "Loveseat", "Dining Chair", "Bar Stool", "Armchair",
    "Pillow", "Decorative Pillow", "Throw", "Vase", "Art Piece"
  ];
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomDescription(): string {
  return "Custom-made " + getRandomItemName().toLowerCase() + " with " + getRandomFinish().toLowerCase();
}

function getRandomManufacturer(): string {
  const manufacturers = [
    "Surya", "Restoration Hardware", "West Elm", "Crate & Barrel", 
    "Herman Miller", "Knoll", "Steelcase", "Kimball", "HON",
    "Global", "Bernhardt", "Baker", "Arteriors", "Visual Comfort"
  ];
  return manufacturers[Math.floor(Math.random() * manufacturers.length)];
}

function getRandomFinishCategory(): string {
  const categories = [
    "TXT", "WOOD", "METAL", "GLASS", "STONE", "LAMINATE", "COMPOSITE", "LEATHER", "FABRIC"
  ];
  return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomFinishSelection(): string {
  const selections = [
    "TEXTILE", "VENEER", "SOLID", "PAINTED", "BRUSHED", "POLISHED", 
    "NATURAL", "ENGINEERED", "UPHOLSTERED", "LACQUERED"
  ];
  return selections[Math.floor(Math.random() * selections.length)];
}

function getRandomSpecialInstructions(): string[] {
  const instructions = [
    "PILLOW SHELL WITH POLYESTER INSERT",
    "MODEL: KANGA",
    "FRONT: 100% POLYESTER, BACK: 100% POLYESTER",
    "JACQUARD",
    "KNIFE EDGE",
    "COLORS: FRONT: DARK BLUE, CREAM, BACK: GRAY",
    "TPX: FRONT: 19-4318, 11-0604, BACK: 16-5803"
  ];
  
  const count = Math.floor(Math.random() * 4) + 1;
  const result: string[] = [];
  
  for (let i = 0; i < count; i++) {
    result.push(instructions[Math.floor(Math.random() * instructions.length)]);
  }
  
  return result;
}

function getRandomFinish(): string {
  const finishes = [
    "Walnut Veneer", "Oak Finish", "Mahogany", "White Lacquer", 
    "Black Matte", "Brushed Brass", "Chrome", "Marble Top",
    "Upholstered in Fabric", "Leather Upholstery", "Glass Top"
  ];
  return finishes[Math.floor(Math.random() * finishes.length)];
}

function getRandomLocation(): string {
  const locations = [
    "Lobby", "Guest Room", "Suite", "Meeting Room", "Restaurant", 
    "Bar Area", "Reception", "Lounge", "Corridor", "Executive Suite",
    "Entry Seating", "Main Lounge", "Breakfast Area", "Pool Deck"
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

function getRandomVendor(): string {
  const vendors = [
    "Acme Furniture", "Modern Designs", "Luxury Living", "Hotel Furnishings Co.", 
    "Elite Interiors", "Custom Creations", "Designer's Choice", "Premium Contract",
    "Hospitality Concepts", "Lang & Schwander"
  ];
  return vendors[Math.floor(Math.random() * vendors.length)];
}

function getRandomAccessories(): string[] {
  const accessories = [
    "Power Hub", "LED Lighting", "Fabric Cushion", "Glass Shelf",
    "Metal Legs", "Wood Base", "Stone Top", "Cable Management"
  ];
  
  const count = Math.floor(Math.random() * 3) + 1;
  const result: string[] = [];
  
  for (let i = 0; i < count; i++) {
    result.push(accessories[Math.floor(Math.random() * accessories.length)]);
  }
  
  return result;
}
