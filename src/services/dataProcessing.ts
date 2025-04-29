
import { Item } from "@/components/ItemDisplay";

// Mock data - in a real implementation this would process actual files
export const processFiles = (files: File[]): Promise<Item[]> => {
  // This is a simulation - in a real app, you would process the files' contents
  return new Promise((resolve) => {
    // Simulate processing delay
    setTimeout(() => {
      // Generate mock data based on the template example
      const items: Item[] = [
        {
          id: "LB-AC-101",
          code: "LB-AC-101",
          name: "PILLOW LOUNGE CHAIR",
          category: "AC",
          area: "ENTRY SEATING",
          drawingReference: "N/A",
          description: "DECORATIVE PILLOW",
          dimensions: {
            height: "20",
            width: "20",
            depth: "5"
          },
          dimensionsMm: {
            height: "508",
            width: "508",
            depth: "127"
          },
          finishes: "TEXTILE",
          finishCategory: "TXT",
          finishSelection: "TEXTILE",
          location: "INDOOR",
          quantity: 6,
          unit: "EA",
          vendor: "Surya",
          manufacturer: "Surya",
          vendorItemId: "KGA005-2020P",
          marriottDescription: "",
          accessories: [],
          specialInstructions: [
            "PILLOW SHELL WITH POLYESTER INSERT",
            "MODEL: KANGA",
            "FRONT: 100% POLYESTER, BACK: 100% POLYESTER",
            "JACQUARD",
            "KNIFE EDGE",
            "COLORS: FRONT: DARK BLUE, CREAM, BACK: GRAY",
            "TPX: FRONT: 19-4318, 11-0604, BACK: 16-5803"
          ],
          hasImage: true,
          hasDuplicate: false,
          contactInfo: {
            representative: "Aldo Altieri",
            phone: "",
            email: "contract@surya.com"
          },
          projectInfo: {
            issueDate: "2023-07-20",
            projectName: "HYATT HOUSE ORLANDO FLORIDA",
            projectNumber: "HHOF"
          }
        }
      ];
      
      // Add more mock items with variations
      const additionalItems = generateAdditionalItems(files.length * 3);
      items.push(...additionalItems);
      
      resolve(items);
    }, 2000); // 2 second delay to simulate processing
  });
};

function generateAdditionalItems(count: number): Item[] {
  const items: Item[] = [];
  const categories = ["FF", "AC", "LT", "DW", "CG"];
  const areas = ["GUEST ROOM", "LOBBY", "CORRIDOR", "RESTAURANT", "BAR", "MEETING ROOM", "ENTRY SEATING"];
  
  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const itemNumber = 100 + i;
    const hasImage = Math.random() > 0.4;
    const hasDuplicate = Math.random() > 0.8;
    
    items.push({
      id: `LB-${category}-${itemNumber}`,
      code: `LB-${category}-${itemNumber}`,
      name: getRandomItemName(),
      category: category,
      area: areas[Math.floor(Math.random() * areas.length)],
      drawingReference: Math.random() > 0.5 ? `DR-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${100 + i}` : "N/A",
      description: getRandomDescription(),
      dimensions: {
        height: `${Math.floor(Math.random() * 40) + 20}`,
        width: `${Math.floor(Math.random() * 60) + 20}`,
        depth: `${Math.floor(Math.random() * 30) + 5}`
      },
      dimensionsMm: {
        height: `${Math.floor((parseInt(`${Math.floor(Math.random() * 40) + 20}`) * 25.4))}`,
        width: `${Math.floor((parseInt(`${Math.floor(Math.random() * 60) + 20}`) * 25.4))}`,
        depth: `${Math.floor((parseInt(`${Math.floor(Math.random() * 30) + 5}`) * 25.4))}`
      },
      finishes: getRandomFinish(),
      finishCategory: getRandomFinishCategory(),
      finishSelection: getRandomFinishSelection(),
      location: Math.random() > 0.2 ? "INDOOR" : "OUTDOOR",
      quantity: Math.floor(Math.random() * 10) + 1,
      unit: "EA",
      vendor: getRandomVendor(),
      manufacturer: getRandomManufacturer(),
      vendorItemId: `KGA${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 9000) + 1000}P`,
      marriottDescription: i % 2 === 0 ? `MARRIOTT ${getRandomItemName().toUpperCase()}` : "",
      accessories: i % 3 === 0 ? getRandomAccessories() : [],
      specialInstructions: i % 4 === 0 ? getRandomSpecialInstructions() : [],
      hasImage,
      hasDuplicate,
      contactInfo: {
        representative: getRandomRepresentative(),
        phone: getRandomPhoneNumber(),
        email: getRandomEmail()
      },
      projectInfo: {
        issueDate: "2023-07-20",
        projectName: "HYATT HOUSE ORLANDO FLORIDA",
        projectNumber: "HHOF"
      }
    });
  }
  
  return items;
}

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
    "LOUNGE CHAIR", "COFFEE TABLE", "SIDE TABLE", "DESK CHAIR", 
    "CONSOLE TABLE", "OTTOMAN", "DESK", "NIGHTSTAND", "HEADBOARD",
    "SOFA", "LOVESEAT", "DINING CHAIR", "BAR STOOL", "ARMCHAIR",
    "PILLOW", "DECORATIVE PILLOW", "THROW", "VASE", "ART PIECE"
  ];
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomDescription(): string {
  return "CUSTOM-MADE " + getRandomItemName() + " WITH " + getRandomFinish();
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
    "TXT", "WOOD", "MTL", "GLASS", "STONE", "LAM", "COMP", "LTH", "FAB"
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
    "WALNUT VENEER", "OAK FINISH", "MAHOGANY", "WHITE LACQUER", 
    "BLACK MATTE", "BRUSHED BRASS", "CHROME", "MARBLE TOP",
    "UPHOLSTERED IN FABRIC", "LEATHER UPHOLSTERY", "GLASS TOP"
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

function getRandomRepresentative(): string {
  const names = [
    "Aldo Altieri", "Sarah Johnson", "Michael Chen", "Jessica Rodriguez", 
    "David Smith", "Emma Wilson", "Robert Taylor", "Amanda Brown"
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomPhoneNumber(): string {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 9000) + 1000;
  return Math.random() > 0.3 ? `${areaCode}-${prefix}-${lineNumber}` : "";
}

function getRandomEmail(): string {
  const domains = ["surya.com", "furnishings.com", "interiors.com", "design.co", "contract.net"];
  const names = ["sales", "contact", "info", "support", "contract", "design"];
  
  const name = names[Math.floor(Math.random() * names.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  
  return Math.random() > 0.2 ? `${name}@${domain}` : "";
}
