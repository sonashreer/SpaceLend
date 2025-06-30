
import React from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';

interface HeroProps {
  onListSpace: () => void;
}

const Hero = ({ onListSpace }: HeroProps) => {
  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat pt-16 pb-20"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/hero-bg.jpg')`,
        backgroundAttachment: 'fixed'
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
              onClick={onListSpace}
            >
              List Your Space
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
