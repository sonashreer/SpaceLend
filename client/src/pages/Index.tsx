
import React, { useState } from 'react';
import { Search, ArrowRight, Star, Shield, Clock, DollarSign, MapPin, Users, CheckCircle, MessageCircle, Calendar, Phone, Mail, MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useLocation } from 'wouter';
import Header from '@/components/layout/Header';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { isLoggedIn, login, logout, userAvatar, userEmail } = useAuth();

  const handleLogin = (email: string, password: string) => {
    login(email, password);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const handleListSpace = () => {
    if (isLoggedIn) {
      setLocation('/list-space');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onListSpace={handleListSpace}
        userAvatar={isLoggedIn ? userAvatar : undefined}
        userEmail={userEmail}
      />

      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat pt-16 pb-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/new-city-street-background.jpg')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Rent the perfect space.<br />
              <span className="text-blue-300">Earn from yours.</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Connect space owners with renters. From parking spots to event venues, find what you need or monetize what you have.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-2xl shadow-lg">
                <Input
                  type="text"
                  placeholder="Where do you need space?"
                  className="flex-1 border-0 text-lg py-6"
                />
                <Link to="/explore">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl">
                    <Search className="w-5 h-5 mr-2" />
                    Find Space
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/explore">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                  Find a Space
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg border-2"
                onClick={handleListSpace}
              >
                List Your Space
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose SpaceLend Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SpaceLend?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make renting and listing spaces simple, secure, and profitable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Safe</h3>
              <p className="text-gray-600">
                All transactions are protected with bank-level security. Identity verification and insurance coverage included.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Earnings</h3>
              <p className="text-gray-600">
                Start earning from your unused space immediately. Set your price, availability, and watch the bookings roll in.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated support team is here to help you succeed. Get assistance anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started is simple. Follow these easy steps to start earning or find the perfect space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* For Space Owners */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">For Space Owners</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">List Your Space</h4>
                    <p className="text-gray-600">Add photos, set your price, and describe your available space in minutes.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Get Bookings</h4>
                    <p className="text-gray-600">Receive booking requests from verified users looking for space.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Earn Money</h4>
                    <p className="text-gray-600">Get paid securely through our platform. Payments are processed automatically.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Space Seekers */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">For Space Seekers</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Search & Browse</h4>
                    <p className="text-gray-600">Find the perfect space by location, size, price, and availability.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Book Instantly</h4>
                    <p className="text-gray-600">Reserve your space with instant booking or send a request to the owner.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Access & Use</h4>
                    <p className="text-gray-600">Get access details and start using your rented space immediately.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spaces Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Spaces
            </h2>
            <p className="text-xl text-gray-600">
              Discover popular spaces in your area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: "Downtown Parking Garage",
                location: "123 Main St, Downtown",
                price: 15,
                rating: 4.8,
                reviews: 24,
                image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop"
              },
              {
                id: 2,
                title: "Secure Storage Unit",
                location: "456 Oak Ave, Midtown",
                price: 25,
                rating: 4.9,
                reviews: 18,
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
              },
              {
                id: 3,
                title: "Private Driveway",
                location: "789 Pine St, Suburbs",
                price: 12,
                rating: 4.7,
                reviews: 31,
                image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
              }
            ].map((space) => (
              <div key={space.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{space.title}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{space.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{space.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({space.reviews})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">${space.price}</span>
                      <span className="text-sm text-gray-500">/day</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/explore">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2">
                View All Spaces
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* List Your Space Today Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            List Your Space Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Turn your unused space into a reliable income stream. Join thousands of hosts already earning with SpaceLend.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">$500+</div>
              <div className="text-blue-100">Average monthly earnings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-blue-100">Active hosts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-100">Host satisfaction rate</div>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
            onClick={handleListSpace}
          >
            Start Earning Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real reviews from real users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Space Owner",
                rating: 5,
                comment: "I've been earning $600+ monthly from my garage space. SpaceLend made it so easy to get started!",
                avatar: "/lovable-uploads/956d7f44-6ece-45ac-9ecb-ee85bc5555d3.png"
              },
              {
                name: "Mike Chen",
                role: "Frequent Renter",
                rating: 5,
                comment: "Perfect for storing my RV when I'm not traveling. Safe, secure, and affordable spaces every time.",
                avatar: "/lovable-uploads/3e946b5a-df7a-4a3d-bed6-7c42a4d12b8d.png"
              },
              {
                name: "Emily Rodriguez",
                role: "Small Business Owner",
                rating: 5,
                comment: "Found the perfect warehouse space for my inventory. SpaceLend saved me thousands compared to traditional storage.",
                avatar: "/lovable-uploads/956d7f44-6ece-45ac-9ecb-ee85bc5555d3.png"
              }
            ].map((review, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about SpaceLend
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "How do I get paid as a space owner?",
                answer: "Payments are processed automatically through our secure platform. You'll receive your earnings within 24 hours after each booking is completed."
              },
              {
                question: "Is my space insured during rentals?",
                answer: "Yes, all bookings include liability coverage. We also verify all renters to ensure your space is in good hands."
              },
              {
                question: "Can I set my own availability and pricing?",
                answer: "Absolutely! You have complete control over your space's availability, pricing, and booking requirements."
              },
              {
                question: "What types of spaces can I list?",
                answer: "You can list parking spots, garages, storage units, warehouses, driveways, basements, and any other unused space you have."
              },
              {
                question: "How do I cancel a booking?",
                answer: "Both renters and space owners can cancel bookings according to our cancellation policy. Free cancellation is available up to 24 hours before the booking starts."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users already earning and saving with SpaceLend
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
              onClick={handleListSpace}
            >
              List Your Space
            </Button>
            <Link to="/explore">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Find a Space
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/lovable-uploads/31401a05-e202-44df-b450-17dbd7b60472.png" 
                  alt="SpaceLend Logo" 
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold">SpaceLend</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Transform your unused space into income. The trusted platform for space rental and storage solutions.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <Users className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <Mail className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">1-800-SPACELEND</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">hello@spacelend.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapIcon className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 SpaceLend. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;
