
import { Property } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CategorySectionProps {
  title: string;
  properties: Property[];
  viewAllLink?: string;
  emptyMessage?: string;
}

const CategorySection = ({
  title,
  properties,
  viewAllLink,
  emptyMessage = 'No properties available in this category.',
}: CategorySectionProps) => {
  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {viewAllLink && (
          <Link to={viewAllLink}>
            <Button variant="outline">View All</Button>
          </Link>
        )}
      </div>

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-secondary/30 rounded-lg">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      )}
    </section>
  );
};

export default CategorySection;
