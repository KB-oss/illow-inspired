
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { properties, Property } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import FilterSidebar, { FilterOptions } from '@/components/FilterSidebar';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';

const Listings = () => {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const categoryParam = searchParams.get('category');

  // Initialize with all properties or filtered by category if provided in URL
  useEffect(() => {
    let filtered = [...properties];
    
    if (categoryParam) {
      filtered = filtered.filter(p => p.category === categoryParam);
    }
    
    setFilteredProperties(filtered);
  }, [categoryParam]);

  const handleFilterApply = (filters: FilterOptions) => {
    let results = [...properties];
    
    // Filter by category if in URL
    if (categoryParam) {
      results = results.filter(p => p.category === categoryParam);
    }
    
    // Filter by price range
    results = results.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );
    
    // Filter by property type if not "all"
    if (filters.propertyType !== 'all') {
      // In real app, property would have a propertyType field
      // This is a placeholder check
      // results = results.filter(p => p.propertyType === filters.propertyType);
    }
    
    // Filter by status (sale/rent)
    if (filters.status !== 'all') {
      results = results.filter(p => p.type === filters.status);
    }
    
    // Filter by location (text search)
    if (filters.location) {
      const searchTerm = filters.location.toLowerCase();
      results = results.filter(p => 
        p.location.city.toLowerCase().includes(searchTerm) || 
        p.location.state.toLowerCase().includes(searchTerm) || 
        p.location.zip.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by bedrooms
    if (filters.bedrooms !== 'any') {
      const minBedrooms = parseInt(filters.bedrooms);
      results = results.filter(p => p.bedrooms >= minBedrooms);
    }
    
    // Filter by bathrooms
    if (filters.bathrooms !== 'any') {
      const minBathrooms = parseInt(filters.bathrooms);
      results = results.filter(p => p.bathrooms >= minBathrooms);
    }
    
    setFilteredProperties(results);
    setIsFilterOpen(false);
  };

  const getCategoryTitle = () => {
    switch (categoryParam) {
      case 'new':
        return 'New Listings';
      case 'popular':
        return 'Popular Properties';
      case 'sold':
        return 'Sold Properties';
      default:
        return 'All Properties';
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onFilter={handleFilterApply}
            className="md:w-1/4"
          />

          {/* Main Content */}
          <div className="md:w-3/4 w-full">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">{getCategoryTitle()}</h1>
              <Button 
                variant="outline"
                className="md:hidden flex items-center gap-2"
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal size={16} />
                Filters
              </Button>
            </div>

            {/* Results Count & Sort */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProperties.length} properties
              </p>
            </div>

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-secondary/30 rounded-lg">
                <p className="text-xl font-semibold mb-2">No properties found</p>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
