
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';

export interface FilterOptions {
  priceRange: [number, number];
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  location: string;
  status: string;
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: FilterOptions) => void;
  className?: string;
}

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  onFilter,
  className = '' 
}: FilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 5000000],
    propertyType: 'all',
    bedrooms: 'any',
    bathrooms: 'any',
    location: '',
    status: 'all',
  });

  const handlePriceChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: [value[0], value[1]],
    });
  };

  const handleChange = (field: keyof FilterOptions, value: any) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      priceRange: [0, 5000000],
      propertyType: 'all',
      bedrooms: 'any',
      bathrooms: 'any',
      location: '',
      status: 'all',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <aside 
      className={`
        bg-white border-r border-border h-full overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-300 ease-in-out
        fixed md:sticky top-0 md:translate-x-0
        w-[300px] z-30 p-4
        ${className}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="md:hidden"
          onClick={onClose}
        >
          <X size={20} />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Price Range</Label>
          <div className="pt-6 px-2">
            <Slider
              defaultValue={[0, 5000000]}
              max={5000000}
              step={50000}
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              className="mb-4"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <Label htmlFor="propertyType">Property Type</Label>
          <Select
            value={filters.propertyType}
            onValueChange={(value) => handleChange('propertyType', value)}
          >
            <SelectTrigger id="propertyType">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => handleChange('status', value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, State or ZIP"
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>

        {/* Bedrooms */}
        <div>
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Select
            value={filters.bedrooms}
            onValueChange={(value) => handleChange('bedrooms', value)}
          >
            <SelectTrigger id="bedrooms">
              <SelectValue placeholder="Select bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div>
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Select
            value={filters.bathrooms}
            onValueChange={(value) => handleChange('bathrooms', value)}
          >
            <SelectTrigger id="bathrooms">
              <SelectValue placeholder="Select bathrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={handleReset} 
            variant="outline" 
            className="flex-1"
          >
            Reset
          </Button>
          <Button 
            onClick={handleApplyFilters}
            className="flex-1"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
