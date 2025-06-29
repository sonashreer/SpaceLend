
import React, { useState } from 'react';
import { Upload, Car, Home, Building2, Calendar, MapPin, DollarSign, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import Header from '@/components/layout/Header';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const ListSpace = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    spaceType: '',
    title: '',
    description: '',
    location: '',
    price: '',
    photos: [] as File[],
    availableDates: {from: undefined, to: undefined} as {from: Date | undefined, to: Date | undefined}
  });
  const navigate = useNavigate();

  const spaceTypes = [
    { value: 'driveway', label: 'Driveway', icon: Car },
    { value: 'garage', label: 'Garage', icon: Building2 },
    { value: 'room', label: 'Room', icon: Home },
    { value: 'storage', label: 'Storage Unit', icon: Building2 },
    { value: 'event', label: 'Event Space', icon: Building2 },
    { value: 'other', label: 'Other', icon: MoreHorizontal }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
      console.log('Photos uploaded:', files.length);
    }
  };

  const handleDateSelect = (range: {from: Date | undefined, to: Date | undefined} | undefined) => {
    setFormData(prev => ({
      ...prev,
      availableDates: range || {from: undefined, to: undefined}
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.spaceType !== '';
      case 2:
        return formData.photos.length > 0;
      case 3:
        return formData.title && formData.location && formData.description && formData.price;
      case 4:
        return formData.availableDates.from !== undefined;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    // Save to localStorage for demo purposes
    const existingListings = JSON.parse(localStorage.getItem('myListings') || '[]');
    const newListing = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      rating: (4 + Math.random()).toFixed(1),
      reviewCount: Math.floor(Math.random() * 100) + 1,
      totalEarnings: 0,
      image: formData.photos.length > 0 ? URL.createObjectURL(formData.photos[0]) : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop'
    };
    
    existingListings.push(newListing);
    localStorage.setItem('myListings', JSON.stringify(existingListings));
    
    toast({
      title: "Listing Published!",
      description: "Your space has been successfully listed and is now live.",
    });

    // Navigate to my listings page
    navigate('/my-listings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">List Your Space</h1>
            <span className="text-sm text-gray-500">Step {currentStep} of 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Step 1: Space Type */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">What type of space are you listing?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {spaceTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() => setFormData(prev => ({ ...prev, spaceType: type.value }))}
                      className={`p-6 border-2 rounded-lg text-center transition-colors ${
                        formData.spaceType === type.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                      <span className="font-medium text-gray-900">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Photos */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Add photos of your space</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Upload photos to showcase your space</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Choose Files</span>
                  </Button>
                </label>
              </div>
              
              {formData.photos.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-2">
                    {formData.photos.length} photo(s) selected
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {formData.photos.map((file, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Tell us about your space</h2>
              
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Secure downtown parking spot"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter address or area"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your space, access instructions, and any special features..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="price">Price per day</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="25"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Availability */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Set your availability</h2>
              <p className="text-gray-600 mb-4">Select the date range when your space is available for rent</p>
              
              <div className="flex justify-center">
                <CalendarComponent
                  mode="range"
                  selected={formData.availableDates}
                  onSelect={handleDateSelect}
                  className="rounded-md border p-3 pointer-events-auto"
                  disabled={(date) => {
                    // Disable past dates
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
                  }}
                />
              </div>

              {formData.availableDates.from && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Selected availability:</strong>
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    From: {formData.availableDates.from.toLocaleDateString()}
                    {formData.availableDates.to && formData.availableDates.to !== formData.availableDates.from && 
                      ` - To: ${formData.availableDates.to.toLocaleDateString()}`
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            
            {currentStep === 4 ? (
              <Button
                onClick={handlePublish}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!canProceed()}
              >
                Publish Listing
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!canProceed()}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSpace;
