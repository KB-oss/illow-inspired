
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  priceUnit: 'total' | 'monthly'; // total for sale, monthly for rent
  type: 'sale' | 'rent';
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  images: string[];
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  features: string[];
  category: 'new' | 'popular' | 'sold';
  createdAt: string;
  userId: string;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    description: 'This stunning modern villa offers panoramic views and luxurious finishes throughout. Featuring an open floor plan, gourmet kitchen, and resort-style primary suite.',
    price: 1250000,
    priceUnit: 'total',
    type: 'sale',
    location: {
      address: '123 Luxury Lane',
      city: 'Beverly Hills',
      state: 'CA',
      zip: '90210'
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1471&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1453&auto=format&fit=crop'
    ],
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 4200,
    features: ['Pool', 'Smart Home', 'Home Theater', 'Wine Cellar', 'Mountain View'],
    category: 'new',
    createdAt: '2023-05-01T12:00:00Z',
    userId: 'user1'
  },
  {
    id: '2',
    title: 'Downtown Luxury Loft',
    description: 'Stunning industrial-chic loft in the heart of downtown. High ceilings, exposed brick, and floor-to-ceiling windows provide abundant natural light.',
    price: 850000,
    priceUnit: 'total',
    type: 'sale',
    location: {
      address: '456 Urban Ave',
      city: 'Austin',
      state: 'TX',
      zip: '78701'
    },
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=1465&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470&auto=format&fit=crop'
    ],
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1800,
    features: ['Rooftop Access', 'Concierge', 'Fitness Center', 'Pet Friendly'],
    category: 'popular',
    createdAt: '2023-04-10T12:00:00Z',
    userId: 'user2'
  },
  {
    id: '3',
    title: 'Seaside Retreat',
    description: 'Breathtaking oceanfront property with private beach access. The ultimate coastal living experience with stunning sunsets and sea breezes.',
    price: 3200000,
    priceUnit: 'total',
    type: 'sale',
    location: {
      address: '789 Shoreline Dr',
      city: 'Malibu',
      state: 'CA',
      zip: '90265'
    },
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1399&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=1470&auto=format&fit=crop'
    ],
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 3800,
    features: ['Beachfront', 'Infinity Pool', 'Outdoor Kitchen', 'Guest House'],
    category: 'popular',
    createdAt: '2023-05-15T12:00:00Z',
    userId: 'user3'
  },
  {
    id: '4',
    title: 'Cozy Downtown Apartment',
    description: 'Modern apartment in the heart of the city with all amenities nearby. Perfect for young professionals.',
    price: 2200,
    priceUnit: 'monthly',
    type: 'rent',
    location: {
      address: '101 Main St',
      city: 'Seattle',
      state: 'WA',
      zip: '98101'
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1630699144867-37acec97df5a?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1470&auto=format&fit=crop'
    ],
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 750,
    features: ['Dishwasher', 'In-unit Laundry', 'Fitness Center', 'Rooftop Lounge'],
    category: 'new',
    createdAt: '2023-05-22T12:00:00Z',
    userId: 'user4'
  },
  {
    id: '5',
    title: 'Classic Victorian Home',
    description: 'Beautifully restored Victorian home with modern updates. Original hardwood floors, crown molding, and charming details throughout.',
    price: 950000,
    priceUnit: 'total',
    type: 'sale',
    location: {
      address: '202 Heritage Ln',
      city: 'San Francisco',
      state: 'CA',
      zip: '94117'
    },
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1365&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1373&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470&auto=format&fit=crop'
    ],
    bedrooms: 4,
    bathrooms: 2.5,
    squareFeet: 2800,
    features: ['Original Features', 'Garden', 'Bay Windows', 'Period Details'],
    category: 'sold',
    createdAt: '2023-04-05T12:00:00Z',
    userId: 'user5'
  },
  {
    id: '6',
    title: 'Modern Farmhouse',
    description: 'Stunning modern farmhouse on 5 acres. Gourmet kitchen with top-of-the-line appliances, hardwood floors, and shiplap details.',
    price: 875000,
    priceUnit: 'total',
    type: 'sale',
    location: {
      address: '303 Country Road',
      city: 'Nashville',
      state: 'TN',
      zip: '37205'
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?q=80&w=1470&auto=format&fit=crop'
    ],
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3200,
    features: ['Acreage', 'Barn', 'Wood Beams', 'Fireplace'],
    category: 'popular',
    createdAt: '2023-03-28T12:00:00Z',
    userId: 'user1'
  },
  {
    id: '7',
    title: 'Luxury High-Rise Condo',
    description: 'Exclusive high-floor condo with stunning city views. Floor-to-ceiling windows, high-end finishes, and building amenities.',
    price: 1100000,
    priceUnit: 'total',
    type: 'sale',
    location: {
      address: '404 Skyline Blvd',
      city: 'Chicago',
      state: 'IL',
      zip: '60601'
    },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617104678502-cde12cc2f3cb?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1484&auto=format&fit=crop'
    ],
    bedrooms: 2,
    bathrooms: 2.5,
    squareFeet: 1600,
    features: ['Doorman', 'Pool', 'Terrace', 'Parking'],
    category: 'sold',
    createdAt: '2023-02-18T12:00:00Z',
    userId: 'user2'
  },
  {
    id: '8',
    title: 'Family Home with Pool',
    description: 'Spacious family home in a quiet neighborhood. Large yard with pool, updated kitchen, and comfortable living spaces.',
    price: 650000,
    priceUnit: 'total',
    type: 'sale',
    location: {
      address: '505 Maple Ave',
      city: 'Phoenix',
      state: 'AZ',
      zip: '85004'
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1453&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1374&auto=format&fit=crop'
    ],
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2500,
    features: ['Swimming Pool', 'Patio', 'BBQ Area', 'Family Room'],
    category: 'new',
    createdAt: '2023-05-10T12:00:00Z',
    userId: 'user3'
  },
  {
    id: '9',
    title: 'Lake House Retreat',
    description: 'Serene lake house with private dock and stunning water views. Perfect for year-round living or as a vacation home.',
    price: 780000,
    priceUnit: 'total',
    type: 'sale',
    location: {
      address: '606 Lakeside Dr',
      city: 'Lake Tahoe',
      state: 'NV',
      zip: '89449'
    },
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1453&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?q=80&w=1470&auto=format&fit=crop'
    ],
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2100,
    features: ['Waterfront', 'Dock', 'Deck', 'Mountain Views'],
    category: 'popular',
    createdAt: '2023-04-22T12:00:00Z',
    userId: 'user4'
  },
  {
    id: '10',
    title: 'Urban Townhouse',
    description: 'Contemporary townhouse in walkable neighborhood. Modern design, rooftop terrace, and energy-efficient features.',
    price: 725000,
    priceUnit: 'total',
    type: 'sale',
    location: {
      address: '707 City Lane',
      city: 'Boston',
      state: 'MA',
      zip: '02108'
    },
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1470&auto=format&fit=crop'
    ],
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1950,
    features: ['Rooftop Deck', 'Garage', 'Energy Star Appliances', 'Walkable Location'],
    category: 'sold',
    createdAt: '2023-03-15T12:00:00Z',
    userId: 'user5'
  },
  {
    id: '11',
    title: 'Luxury Penthouse',
    description: 'Spectacular penthouse with panoramic city views. Private elevator, designer finishes, and expansive outdoor terrace.',
    price: 3500000,
    priceUnit: 'total',
    type: 'sale',
    location: {
      address: '808 Skyview Dr',
      city: 'Miami',
      state: 'FL',
      zip: '33131'
    },
    images: [
      'https://images.unsplash.com/photo-1600047508788-26bb71e4f9ed?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=1470&auto=format&fit=crop'
    ],
    bedrooms: 3,
    bathrooms: 3.5,
    squareFeet: 3500,
    features: ['Private Elevator', 'Wine Room', 'Chef\'s Kitchen', 'Smart Home'],
    category: 'new',
    createdAt: '2023-05-20T12:00:00Z',
    userId: 'user1'
  },
  {
    id: '12',
    title: 'Charming Cottage',
    description: 'Quaint cottage with beautiful gardens. Updated interior with original character and modern conveniences.',
    price: 450000,
    priceUnit: 'total',
    type: 'sale',
    location: {
      address: '909 Garden St',
      city: 'Portland',
      state: 'OR',
      zip: '97205'
    },
    images: [
      'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1609766856960-58c5be5eb889?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=1465&auto=format&fit=crop'
    ],
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 1200,
    features: ['Gardens', 'Hardwood Floors', 'Fireplace', 'Updated Kitchen'],
    category: 'sold',
    createdAt: '2023-02-28T12:00:00Z',
    userId: 'user2'
  }
];

export const getPropertiesByCategory = (category: Property['category']) => {
  return properties.filter(property => property.category === category);
};

export const getPropertyById = (id: string) => {
  return properties.find(property => property.id === id);
};
