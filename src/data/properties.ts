
import { supabase } from '@/integrations/supabase/client';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  priceUnit: 'total' | 'monthly';
  type: 'sale' | 'rent';
  category: 'new' | 'popular' | 'luxury' | 'affordable' | 'sold';
  location: {
    address?: string;
    city: string;
    state: string;
    zip?: string;
  };
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  features: string[];
  images: string[];
  createdAt: Date;
  userId?: string;
  views?: number;
}

// This is for backward compatibility with any existing code
export const properties: Property[] = [];

// Fetch all properties from Supabase
export const fetchAllProperties = async (): Promise<Property[]> => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_images (image_url, is_primary)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching properties:', error);
      return [];
    }

    // Transform the data to match the Property interface
    return data.map(formatPropertyData);
  } catch (error) {
    console.error('Error in fetchAllProperties:', error);
    return [];
  }
};

// Fetch properties by category
export const getPropertiesByCategory = async (category: string): Promise<Property[]> => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_images (image_url, is_primary)
      `)
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching ${category} properties:`, error);
      return [];
    }

    // Transform the data to match the Property interface
    return data.map(formatPropertyData);
  } catch (error) {
    console.error(`Error in getPropertiesByCategory(${category}):`, error);
    return [];
  }
};

// Fetch a single property by ID
export const getPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_images (image_url, is_primary)
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching property ${id}:`, error);
      return null;
    }

    // Increment view count
    const { error: updateError } = await supabase
      .from('properties')
      .update({ views_count: (data.views_count || 0) + 1 })
      .eq('id', id);
    
    if (updateError) {
      console.error(`Error updating view count for property ${id}:`, updateError);
    }

    // Transform the data to match the Property interface
    return formatPropertyData(data);
  } catch (error) {
    console.error(`Error in getPropertyById(${id}):`, error);
    return null;
  }
};

// Helper function to format property data from Supabase to match our interface
function formatPropertyData(data: any): Property {
  const images = data.property_images
    ? data.property_images
        .sort((a: any, b: any) => (a.is_primary ? -1 : 1))
        .map((img: any) => img.image_url)
    : [];

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    price: data.price,
    priceUnit: data.property_type === 'rent' ? 'monthly' : 'total',
    type: data.property_type,
    category: data.category,
    location: {
      address: data.street_address,
      city: data.city,
      state: data.state,
      zip: data.zip_code
    },
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    squareFeet: data.square_feet,
    features: data.features || [],
    images: images.length > 0 ? images : ['https://placehold.co/600x400?text=No+Image'],
    createdAt: new Date(data.created_at),
    userId: data.user_id,
    views: data.views_count || 0
  };
}
