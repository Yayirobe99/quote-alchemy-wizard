
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
        items.push({
          id: `item-${i}`,
          code: `FF-${1000 + i}`,
          name: getRandomItemName(),
          description: getRandomDescription(),
          dimensions: getRandomDimensions(),
          finishes: getRandomFinish(),
          location: getRandomLocation(),
          quantity: Math.floor(Math.random() * 10) + 1,
          unit: "EA",
          vendor: getRandomVendor(),
          accessories: i % 3 === 0 ? getRandomAccessories() : [],
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
function getRandomItemName(): string {
  const items = [
    "Lounge Chair", "Coffee Table", "Side Table", "Desk Chair", 
    "Console Table", "Ottoman", "Desk", "Nightstand", "Headboard",
    "Sofa", "Loveseat", "Dining Chair", "Bar Stool", "Armchair"
  ];
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomDescription(): string {
  return "Custom-made " + getRandomItemName().toLowerCase() + " with " + getRandomFinish().toLowerCase();
}

function getRandomDimensions(): string {
  const width = Math.floor(Math.random() * 60) + 20;
  const depth = Math.floor(Math.random() * 30) + 20;
  const height = Math.floor(Math.random() * 40) + 30;
  return `${width}"W x ${depth}"D x ${height}"H`;
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
    "Bar Area", "Reception", "Lounge", "Corridor", "Executive Suite"
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

function getRandomVendor(): string {
  const vendors = [
    "Acme Furniture", "Modern Designs", "Luxury Living", "Hotel Furnishings Co.", 
    "Elite Interiors", "Custom Creations", "Designer's Choice", "Premium Contract"
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
