
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Home, Upload, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const Sell = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    price: '',
    propertyType: '',
    category: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    features: '',
    images: [] as File[],
  });

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to list a property.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFormState((prev) => ({
        ...prev,
        images: [...prev.images, ...fileList].slice(0, 5), // Limit to 5 images
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to list a property.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Format features as an array from comma-separated string
      const featuresArray = formState.features
        ? formState.features.split(',').map(feature => feature.trim())
        : [];

      // Format street address
      const streetAddress = formState.address;

      // Upload images to Supabase Storage
      const imageUrls = [];
      if (formState.images.length > 0) {
        for (const image of formState.images) {
          const fileExt = image.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          const filePath = `${user.id}/${fileName}`;

          const { error: uploadError, data } = await supabase.storage
            .from('property_images')
            .upload(filePath, image);

          if (uploadError) {
            throw new Error(`Error uploading image: ${uploadError.message}`);
          }

          const { data: { publicUrl } } = supabase.storage
            .from('property_images')
            .getPublicUrl(filePath);

          imageUrls.push(publicUrl);
        }
      }

      // Insert property data into Supabase
      const { error } = await supabase
        .from('properties')
        .insert({
          title: formState.title,
          description: formState.description,
          price: parseFloat(formState.price),
          property_type: formState.propertyType,
          category: formState.category,
          bedrooms: parseInt(formState.bedrooms),
          bathrooms: parseFloat(formState.bathrooms),
          square_feet: parseInt(formState.squareFeet),
          street_address: streetAddress,
          city: formState.city,
          state: formState.state,
          zip_code: formState.zip,
          features: featuresArray,
          user_id: user.id
        });

      if (error) throw error;

      // Get the newly created property to add images
      const { data: newProperty, error: fetchError } = await supabase
        .from('properties')
        .select()
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (fetchError) throw fetchError;

      // Insert images into property_images table
      if (imageUrls.length > 0) {
        const imagesToInsert = imageUrls.map((url, index) => ({
          property_id: newProperty.id,
          image_url: url,
          is_primary: index === 0 // First image is primary
        }));

        const { error: imageInsertError } = await supabase
          .from('property_images')
          .insert(imagesToInsert);

        if (imageInsertError) throw imageInsertError;
      }

      setSuccess(true);
      toast({
        title: "Listing created",
        description: "Your property has been successfully listed.",
      });
      
      // Redirect after successful submission
      setTimeout(() => {
        navigate('/listings');
      }, 2000);
    } catch (err) {
      console.error("Error submitting property:", err);
      setError(err instanceof Error ? err.message : 'An error occurred while creating your listing. Please try again.');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'An error occurred while creating your listing.',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/20 py-12 px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Listing Created Successfully!</h2>
          <p className="text-muted-foreground mt-2">
            Your property has been listed. You'll be redirected to the listings page shortly.
          </p>
          <Button className="mt-6" onClick={() => navigate('/listings')}>
            View Listings
          </Button>
        </div>
      </div>
    );
  }

  // Show loading or redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">List Your Property</h1>
            <p className="text-muted-foreground mt-2">
              Complete the form below to list your property for sale or rent
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Property Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Property Title*</Label>
                  <Input
                    id="title"
                    value={formState.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g. Modern Luxury Villa"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price*</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={formState.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    placeholder="e.g. 450000"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="propertyType">Property Type*</Label>
                  <Select
                    value={formState.propertyType}
                    onValueChange={(value) => handleChange('propertyType', value)}
                  >
                    <SelectTrigger id="propertyType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="category">Category*</Label>
                  <Select
                    value={formState.category}
                    onValueChange={(value) => handleChange('category', value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New Listing</SelectItem>
                      <SelectItem value="popular">Popular</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="affordable">Affordable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="squareFeet">Square Feet*</Label>
                  <Input
                    id="squareFeet"
                    type="number"
                    min="0"
                    value={formState.squareFeet}
                    onChange={(e) => handleChange('squareFeet', e.target.value)}
                    placeholder="e.g. 2000"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms*</Label>
                  <Select
                    value={formState.bedrooms}
                    onValueChange={(value) => handleChange('bedrooms', value)}
                  >
                    <SelectTrigger id="bedrooms">
                      <SelectValue placeholder="Select number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="bathrooms">Bathrooms*</Label>
                  <Select
                    value={formState.bathrooms}
                    onValueChange={(value) => handleChange('bathrooms', value)}
                  >
                    <SelectTrigger id="bathrooms">
                      <SelectValue placeholder="Select number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="1.5">1.5</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="2.5">2.5</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="3.5">3.5</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Property Description*</Label>
                <Textarea
                  id="description"
                  value={formState.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe your property in detail..."
                  rows={5}
                  required
                />
              </div>

              <div>
                <Label htmlFor="features">Features (Comma separated)</Label>
                <Input
                  id="features"
                  value={formState.features}
                  onChange={(e) => handleChange('features', e.target.value)}
                  placeholder="e.g. Pool, Garden, Fireplace, Smart Home"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate features with commas (e.g. Pool, Garden, Fireplace)
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Property Location</h2>
              
              <div>
                <Label htmlFor="address">Street Address*</Label>
                <Input
                  id="address"
                  value={formState.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="e.g. 123 Main St"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="city">City*</Label>
                  <Input
                    id="city"
                    value={formState.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="e.g. San Francisco"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="state">State*</Label>
                  <Input
                    id="state"
                    value={formState.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    placeholder="e.g. CA"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="zip">ZIP Code*</Label>
                  <Input
                    id="zip"
                    value={formState.zip}
                    onChange={(e) => handleChange('zip', e.target.value)}
                    placeholder="e.g. 94105"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Property Images</h2>
              
              <div className="space-y-4">
                <Label>Upload Images (Max 5)</Label>
                
                <div className="flex flex-wrap gap-4 mb-4">
                  {formState.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Property ${index + 1}`}
                        className="h-24 w-24 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center"
                        aria-label="Remove image"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  
                  {formState.images.length < 5 && (
                    <label className="h-24 w-24 border-2 border-dashed border-muted-foreground/30 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                      <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Upload up to 5 high-quality images of your property. First image will be used as the main image.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t flex justify-end">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="min-w-[150px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Home className="mr-2 h-5 w-5" /> List Property
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sell;
