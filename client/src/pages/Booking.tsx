import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/layout/Header';
import { toast } from '@/components/ui/use-toast';

const Booking = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [paymentType, setPaymentType] = useState('credit-card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: 'sophia.carter@example.com',
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  });

  // Get booking details from URL params
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const totalDays = searchParams.get('days') || '1';
  const pricePerDay = 25;
  const totalPrice = parseInt(totalDays) * pricePerDay;

  const space = {
    title: 'Private Parking Spot in Downtown',
    location: '456 Oak Ave, West Hollywood, CA',
    price: pricePerDay,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop'
  };

  const handleCompleteBooking = () => {
    if (!formData.fullName || !formData.email) {
      toast({
        title: "Please fill in required fields",
        description: "Full name and email are required.",
        variant: "destructive"
      });
      return;
    }

    if (paymentType === 'credit-card' && (!formData.cardNumber || !formData.cardHolderName || !formData.expiryDate || !formData.cvv)) {
      toast({
        title: "Please fill in credit card details",
        description: "All credit card fields are required.",
        variant: "destructive"
      });
      return;
    }

    setBookingComplete(true);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header isLoggedIn={isLoggedIn} />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Successful!</h1>
            <p className="text-gray-600 mb-2">Your booking has been confirmed.</p>
            <p className="text-gray-600 mb-8">A confirmation email has been sent to {formData.email}</p>
            <Button onClick={() => navigate('/my-bookings')}>
              View My Bookings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={isLoggedIn} />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Booking</h1>
              
              {/* Personal Information */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
                <RadioGroup value={paymentType} onValueChange={setPaymentType}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Credit Card Payment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                      <Wallet className="w-5 h-5 mr-2" />
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Credit Card Details */}
              {paymentType === 'credit-card' && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Credit Card Details</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardHolderName">Card Holder Name *</Label>
                      <Input
                        id="cardHolderName"
                        value={formData.cardHolderName}
                        onChange={(e) => setFormData(prev => ({ ...prev, cardHolderName: e.target.value }))}
                        placeholder="Name on card"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                        placeholder="1234 5678 9012 3456"
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                          placeholder="MM/YY"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value }))}
                          placeholder="123"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="billingAddress">Billing Address</Label>
                      <Textarea
                        id="billingAddress"
                        value={formData.billingAddress}
                        onChange={(e) => setFormData(prev => ({ ...prev, billingAddress: e.target.value }))}
                        placeholder="Enter your billing address"
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleCompleteBooking}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              >
                Complete Booking
              </Button>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
              
              <div className="mb-4">
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium text-gray-900">{space.title}</h3>
                <p className="text-sm text-gray-600">{space.location}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in:</span>
                  <span className="font-medium">{startDate ? new Date(startDate).toLocaleDateString() : 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out:</span>
                  <span className="font-medium">{endDate ? new Date(endDate).toLocaleDateString() : 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{totalDays} day{parseInt(totalDays) > 1 ? 's' : ''}</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">${pricePerDay} × {totalDays} day{parseInt(totalDays) > 1 ? 's' : ''}</span>
                  <span className="font-medium">${totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span className="font-medium">$5</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-semibold text-gray-900">${totalPrice + 5}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
