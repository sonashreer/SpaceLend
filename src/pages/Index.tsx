
import React, { useState } from 'react';
import { Search, Star, Users, Shield, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import AuthModal from '@/components/AuthModal';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    // Default to Sophia Carter
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userEmail', 'sophia.carter@example.com');
    localStorage.setItem('userName', 'Sophia Carter');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  };

  const handleListSpace = () => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
    } else {
      navigate('/list-space');
    }
  };

  const handleFindSpace = () => {
    if (searchQuery) {
      navigate(`/explore?location=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/explore');
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFindSpace();
    }
  };

  React.useEffect(() => {
    const loggedIn = localStorage.getItem('userLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div className="min-h-screen">
      <Header 
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onListSpace={handleListSpace}
        userEmail={isLoggedIn ? 'sophia.carter@example.com' : undefined}
        userAvatar={isLoggedIn ? 'https://images.unsplash.com/photo-1494790108755-2616b332c1b5?w=50&h=50&fit=crop&crop=face' : undefined}
      />
      
      {/* Hero Section with Background Image */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-20 lg:py-32"
        style={{
          backgroundImage: 'url(/lovable-uploads/956d7f44-6ece-45ac-9ecb-ee85bc5555d3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Rent the perfect space.<br />
            Earn from yours.
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Connect space owners with renters. From parking spots to event venues, 
            find what you need or monetize what you have.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={handleListSpace}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
            >
              List your space
            </Button>
            <Button 
              onClick={handleFindSpace}
              variant="outline" 
              className="bg-white/90 hover:bg-white text-gray-900 border-white px-8 py-3 text-lg font-semibold"
            >
              Find a space
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative flex bg-white rounded-lg shadow-lg overflow-hidden">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                placeholder="Enter location (ZIP code, city, etc.)"
                className="pl-12 pr-4 py-4 flex-1 border-0 text-lg focus:ring-0"
              />
              <Button 
                onClick={handleFindSpace}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-none"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why choose SpaceLend?</h2>
            <p className="text-xl text-gray-600">The easiest way to rent and list spaces</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted Community</h3>
              <p className="text-gray-600">Verified users and secure transactions for peace of mind</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600">Protected transactions with instant payouts</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance for all your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What our users say</h2>
            <p className="text-xl text-gray-600">Real experiences from our community</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Review 1 - Fixed profile picture */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" 
                  alt="Michael Johnson" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Michael Johnson</h4>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">"Found the perfect parking spot for my daily commute. The process was seamless and the owner was very accommodating."</p>
            </div>

            {/* Review 2 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b332c1b5?w=50&h=50&fit=crop&crop=face" 
                  alt="Sarah Williams" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Williams</h4>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">"Listing my garage space was so easy! I'm earning extra income every month with minimal effort."</p>
            </div>

            {/* Review 3 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" 
                  alt="David Chen" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">David Chen</h4>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">"Great platform for finding event spaces. Booked a perfect venue for my daughter's birthday party at an amazing price."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spaces Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Spaces</h2>
            <p className="text-xl text-gray-600">Discover amazing spaces in your area</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Featured Space 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" 
                alt="Secure Garage" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Downtown Garage</h3>
                <p className="text-gray-600 mb-4">Perfect for daily parking in the heart of the city</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">$35/day</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Space 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop" 
                alt="Cozy Room" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cozy Guest Room</h3>
                <p className="text-gray-600 mb-4">Comfortable accommodation in a quiet neighborhood</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">$80/night</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Space 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop" 
                alt="Event Space" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Modern Event Space</h3>
                <p className="text-gray-600 mb-4">Elegant venue for special occasions and gatherings</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">$200/day</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/explore">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                View All Spaces
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;
