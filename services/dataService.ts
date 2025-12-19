import { Print } from '../types';

// ============================================================================
// CONFIGURATION
// ============================================================================
// STEP 1: When you are ready, paste your published Google Sheet CSV URL here.
// Example: "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv"
// Until then, leave it empty ("") and the app will use the Demo Data below.
const SHEET_URL = ""; 
// ============================================================================

const FALLBACK_DATA: Print[] = [
  {
    slug: 'geometric-planter',
    title: 'Low-Poly Planter',
    description: 'A modern geometric planter designed for succulents. Features internal drainage mesh.',
    category: 'Decorative',
    material: 'Matte PLA',
    purpose: 'gift',
    notes: '0.2mm layer height, 15% infill',
    featured: true,
    images: ['https://picsum.photos/id/106/800/600', 'https://picsum.photos/id/106/800/800'],
    imageAlts: ['Front view of planter', 'Top detail view']
  },
  {
    slug: 'headphone-stand',
    title: 'Desk Clamp Headphone Stand',
    description: 'Rugged screw-clamp headphone holder to save desk space.',
    category: 'Functional',
    material: 'PETG',
    purpose: 'personal',
    notes: 'Printed with 4 perimeters for strength',
    featured: true,
    images: ['https://picsum.photos/id/250/800/600'],
    imageAlts: ['Mounted on desk']
  },
  {
    slug: 'golf-ball-marker',
    title: 'Custom Golf Marker',
    description: 'Personalized monogram ball marker for the green.',
    category: 'Sports',
    material: 'PLA Silk',
    purpose: 'custom',
    notes: 'Multi-color print swap at layer 15',
    featured: true,
    images: ['https://picsum.photos/id/433/800/600'],
    imageAlts: ['Marker on grass']
  },
  {
    slug: 'lithophane-box',
    title: 'Lithophane Light Box',
    description: 'A personalized photo box that reveals a detailed image when lit from within. Perfect for weddings or memorials.',
    category: 'Gifts',
    material: 'White PLA',
    purpose: 'gift',
    notes: 'Printed vertically at 0.12mm layer height for high resolution.',
    featured: true,
    images: ['https://picsum.photos/id/30/800/800'],
    imageAlts: ['Lit lithophane showing a family portrait']
  },
  {
    slug: 'controller-mount',
    title: 'Universal Controller Mount',
    description: 'Wall-mounted holder for Xbox and PlayStation controllers. Includes screw holes and adhesive backing area.',
    category: 'Functional',
    material: 'PETG',
    purpose: 'personal',
    notes: 'Needs support for the hook section.',
    featured: true,
    images: ['https://picsum.photos/id/96/800/600'],
    imageAlts: ['Controller resting on wall mount']
  },
  {
    slug: 'voronoi-vase',
    title: 'Twisted Voronoi Vase',
    description: 'An organic, cellular structure vase that casts beautiful shadows. Strictly decorative, not water tight.',
    category: 'Decorative',
    material: 'Silk Gold PLA',
    purpose: 'custom',
    notes: 'Slow print speed required for overhangs.',
    featured: true,
    images: ['https://picsum.photos/id/113/800/1000'],
    imageAlts: ['Gold vase with holes pattern']
  },
  {
    slug: 'cable-clips',
    title: 'Under-Desk Cable Clips',
    description: 'Snap-fit cable organizers to keep charging cords tidy under the desk.',
    category: 'Functional',
    material: 'ABS',
    purpose: 'personal',
    notes: 'Printed in batches of 10 for efficiency.',
    featured: false,
    images: ['https://picsum.photos/id/20/800/600'],
    imageAlts: ['Black clips organizing USB cables']
  }
];

export const parseGoogleDriveLink = (url: string): string => {
  if (!url) return '';
  // Convert view/sharing links to direct thumbnail/image links
  const driveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  if (match && match[1]) {
    // using lh3.googleusercontent.com is often more reliable for direct hotlinking than drive export=view
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`; 
  }
  return url;
};

const parseCSVLine = (line: string): string[] => {
  // Simple CSV parser that handles basic quoted strings
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
};

// Helper to escape fields for CSV
const toCSVCell = (val: string | boolean | undefined) => {
    const stringVal = String(val ?? '');
    if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n')) {
        return `"${stringVal.replace(/"/g, '""')}"`;
    }
    return stringVal;
}

export const getCSVTemplate = (): string => {
  const headers = ['slug', 'title', 'description', 'category', 'material', 'purpose', 'notes', 'featured', 'images', 'imageAlts'];
  
  const rows = FALLBACK_DATA.map(print => {
    return [
      toCSVCell(print.slug),
      toCSVCell(print.title),
      toCSVCell(print.description),
      toCSVCell(print.category),
      toCSVCell(print.material),
      toCSVCell(print.purpose),
      toCSVCell(print.notes),
      toCSVCell(print.featured ? 'TRUE' : 'FALSE'),
      toCSVCell(print.images.join('|')),
      toCSVCell(print.imageAlts.join('|'))
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
};

export const fetchPrints = async (): Promise<Print[]> => {
  // 1. If no sheet is connected, return demo data immediately
  if (!SHEET_URL) {
    console.log("No Sheet URL configured - Using Demo Mode");
    // Simulate a small network delay for a realistic feel
    await new Promise(resolve => setTimeout(resolve, 600));
    return FALLBACK_DATA;
  }

  try {
    const response = await fetch(SHEET_URL);
    if (!response.ok) throw new Error(`Failed to fetch sheet: ${response.statusText}`);
    
    const text = await response.text();
    const rows = text.split('\n').slice(1); // Skip header

    const parsedPrints = rows.map(row => {
        const cols = parseCSVLine(row);
        // Ensure we have enough columns (approx 10 columns as per spec)
        if (cols.length < 5) return null;

        return {
            slug: cols[0],
            title: cols[1],
            description: cols[2],
            category: cols[3],
            material: cols[4],
            purpose: cols[5],
            notes: cols[6],
            // varied truthy checks for safety in case of "true", "TRUE", "True"
            featured: cols[7]?.trim().toUpperCase() === 'TRUE',
            images: cols[8]?.split('|').map(url => parseGoogleDriveLink(url.trim())) || [],
            imageAlts: cols[9]?.split('|').map(alt => alt.trim()) || []
        } as Print;
    }).filter((p): p is Print => p !== null);

    return parsedPrints;

  } catch (error) {
    console.warn("Failed to load Google Sheet data. Falling back to Demo Data.", error);
    return FALLBACK_DATA;
  }
};