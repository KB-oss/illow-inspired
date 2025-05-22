
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CategorySection from '@/components/CategorySection';
import { fetchAllProperties, getPropertiesByCategory, Property } from '@/data/properties';
import { Search, Home } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [newListings, setNewListings] = useState<Property[]>([]);
  const [popularListings, setPopularListings] = useState<Property[]>([]);
  const [soldListings, setSoldListings] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        // Fetch properties by category
        const newProps = await getPropertiesByCategory('new');
        const popularProps = await getPropertiesByCategory('popular');
        const soldProps = await getPropertiesByCategory('sold');
        
        setNewListings(newProps);
        setPopularListings(popularProps);
        setSoldListings(soldProps);
      } catch (error) {
        console.error("Error loading properties:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In real implementation, this would navigate to listings page with search params
    console.log('Search for:', searchTerm);
  };

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1470&auto=format&fit=crop"
            alt="Beautiful home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Find Your Dream Home
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Explore our curated selection of properties for sale and rent in top locations
            </p>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="City, address, ZIP code..."
                  className="pl-10 bg-white/95 text-foreground h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="container mx-auto px-4 py-10">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading properties...</p>
          </div>
        ) : (
          <>
            <CategorySection
              title="New Listings"
              properties={newListings}
              viewAllLink="/listings?category=new"
            />

            <CategorySection
              title="Popular Properties"
              properties={popularListings}
              viewAllLink="/listings?category=popular"
            />

            <CategorySection
              title="Sold Properties"
              properties={soldListings}
              viewAllLink="/listings?category=sold"
            />
          </>
        )}

        {/* CTA Section */}
        <section className="my-16 bg-gradient-to-r from-primary-light to-primary p-8 rounded-lg shadow-lg text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h2 className="text-3xl font-bold mb-2">Ready to sell your property?</h2>
              <p className="text-lg opacity-90">
                List your property with us and reach thousands of potential buyers
              </p>
            </div>
            <Link to={user ? "/sell" : "/login"}>
              <Button 
                size="lg"
                variant="secondary"
                className="whitespace-nowrap"
              >
                <Home className="mr-2 h-5 w-5" />
                {user ? "List Your Property" : "Login to List Property"}
              </Button>
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-secondary py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">RealEstate</h3>
              <p className="text-muted-foreground">
                Find your dream property with our extensive listings of homes for sale and rent.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/listings" className="text-muted-foreground hover:text-primary transition-colors">All Listings</Link></li>
                <li><Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">Log In</Link></li>
                <li><Link to="/signup" className="text-muted-foreground hover:text-primary transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-muted-foreground mb-2">123 Main St, New York, NY 10001</p>
              <p className="text-muted-foreground mb-2">info@realestate.com</p>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} RealEstate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
