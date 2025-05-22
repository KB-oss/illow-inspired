
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Home, List, LogIn, Plus } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Temporarily using a mock auth state until Supabase is connected
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 
      "text-primary font-semibold" : 
      "text-foreground hover:text-primary transition-colors";
  };

  return (
    <nav className="sticky top-0 bg-background z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">RealEstate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isActive('/')}`}>
              Home
            </Link>
            <Link to="/listings" className={`${isActive('/listings')}`}>
              Listings
            </Link>
            {isLoggedIn && (
              <Link to="/sell" className={`${isActive('/sell')}`}>
                Sell
              </Link>
            )}
          </div>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline"
                  className="flex gap-2 items-center"
                  onClick={toggleLogin}
                >
                  <User size={18} />
                  Account
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" className="flex gap-2 items-center">
                    <LogIn size={18} />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="flex gap-2 items-center">
                    <Plus size={18} />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              className="px-2"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t mt-2 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`flex items-center gap-2 p-2 rounded-md ${isActive('/')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} />
                Home
              </Link>
              <Link 
                to="/listings" 
                className={`flex items-center gap-2 p-2 rounded-md ${isActive('/listings')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <List size={18} />
                Listings
              </Link>
              {isLoggedIn && (
                <Link 
                  to="/sell" 
                  className={`flex items-center gap-2 p-2 rounded-md ${isActive('/sell')}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Plus size={18} />
                  Sell
                </Link>
              )}
              {isLoggedIn ? (
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 justify-start"
                  onClick={() => {
                    toggleLogin();
                    setIsMenuOpen(false);
                  }}
                >
                  <User size={18} />
                  Account
                </Button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center gap-2 justify-center"
                    >
                      <LogIn size={18} />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full flex items-center gap-2 justify-center">
                      <Plus size={18} />
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
