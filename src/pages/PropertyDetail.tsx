
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { getPropertyById } from '@/data/properties';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Bed,
  Bath,
  Home,
  Square,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const property = getPropertyById(id || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
        <p className="text-muted-foreground mb-8">The property you are looking for doesn't exist or has been removed.</p>
        <Link to="/listings">
          <Button>View All Properties</Button>
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number, priceUnit: 'total' | 'monthly') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price) + (priceUnit === 'monthly' ? '/mo' : '');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-6 text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/listings" className="hover:text-primary">Listings</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{property.title}</span>
        </div>

        {/* Property Title and Price */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <div className="flex items-center mt-2">
              <MapPin size={18} className="text-muted-foreground mr-1" />
              <span className="text-muted-foreground">
                {property.location.address}, {property.location.city}, {property.location.state} {property.location.zip}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-3xl font-bold text-primary">
              {formatPrice(property.price, property.priceUnit)}
            </div>
            <Badge className="mt-1" variant={property.type === 'sale' ? 'default' : 'secondary'}>
              {property.type === 'sale' ? 'For Sale' : 'For Rent'}
            </Badge>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative mb-8 h-[400px] lg:h-[600px] overflow-hidden rounded-lg">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
            onClick={prevImage}
          >
            <ChevronLeft size={24} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
            onClick={nextImage}
          >
            <ChevronRight size={24} />
          </Button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Overview */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-4 bg-secondary/30 rounded-lg">
                  <Bed size={24} className="mb-2 text-primary" />
                  <span className="text-sm text-muted-foreground">Bedrooms</span>
                  <span className="font-semibold">{property.bedrooms}</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-secondary/30 rounded-lg">
                  <Bath size={24} className="mb-2 text-primary" />
                  <span className="text-sm text-muted-foreground">Bathrooms</span>
                  <span className="font-semibold">{property.bathrooms}</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-secondary/30 rounded-lg">
                  <Square size={24} className="mb-2 text-primary" />
                  <span className="text-sm text-muted-foreground">Square Feet</span>
                  <span className="font-semibold">{property.squareFeet.toLocaleString()}</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-secondary/30 rounded-lg">
                  <Calendar size={24} className="mb-2 text-primary" />
                  <span className="text-sm text-muted-foreground">Listed On</span>
                  <span className="font-semibold">{formatDate(property.createdAt)}</span>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </section>

            {/* Features */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Location */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <div className="bg-secondary/30 h-64 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map view would be integrated here</p>
              </div>
            </section>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white shadow-md rounded-lg p-6 border border-border">
              <h3 className="font-bold text-lg mb-4">Interested in this property?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Fill out the form below and our agent will get in touch with you shortly.
              </p>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    defaultValue={`Hi, I'm interested in ${property.title} at ${property.location.address}.`}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <Button className="w-full" size="lg">
                  Send Message
                </Button>
              </form>

              <Separator className="my-6" />

              <div className="text-center">
                <p className="text-sm text-muted-foreground">or call us directly</p>
                <a href="tel:+1-555-123-4567" className="font-bold text-primary text-lg">
                  (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
