
import { Link } from 'react-router-dom';
import { Property } from '@/data/properties';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number, priceUnit: 'total' | 'monthly') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price) + (priceUnit === 'monthly' ? '/mo' : '');
  };

  return (
    <Link to={`/listings/${property.id}`}>
      <Card className="property-card overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="relative h-52 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/600x400?text=No+Image';
            }}
          />
          <Badge 
            className="absolute top-2 right-2"
            variant={property.type === 'sale' ? 'default' : 'secondary'}
          >
            {property.type === 'sale' ? 'For Sale' : 'For Rent'}
          </Badge>
          
          {property.category === 'new' && (
            <Badge 
              className="absolute top-2 left-2 bg-green-500 hover:bg-green-600"
            >
              New
            </Badge>
          )}
          
          {property.category === 'sold' && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-xl">SOLD</span>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="mb-2">
            <h3 className="text-lg font-semibold mb-1 truncate">{property.title}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {property.location.city}, {property.location.state}
            </p>
          </div>

          <div className="flex justify-between items-center mt-2">
            <p className="font-bold text-lg text-primary">
              {formatPrice(property.price, property.priceUnit)}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{property.bedrooms} bd</span>
              <span>•</span>
              <span>{property.bathrooms} ba</span>
              <span>•</span>
              <span>{property.squareFeet.toLocaleString()} sqft</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
