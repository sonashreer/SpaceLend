import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AuthModal from '@/components/AuthModal';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Earnings = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleListSpace = () => {
    navigate('/list-space');
  };

  const earningsSummary = {
    totalEarnings: 8800,
    thisMonth: 1240,
    pendingPayouts: 350,
    nextPayout: '2024-01-15'
  };

  const recentTransactions = [
    { date: '2024-12-28', description: 'Downtown Parking - John D.', amount: 75, status: 'Completed' },
    { date: '2024-12-25', description: 'Storage Unit - Jane S.', amount: 120, status: 'Completed' },
    { date: '2024-12-22', description: 'Event Space - Mike J.', amount: 200, status: 'Pending' },
    { date: '2024-12-20', description: 'Parking Spot - Lisa K.', amount: 50, status: 'Completed' }
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          isLoggedIn={isLoggedIn}
          onLogin={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          onListSpace={handleListSpace}
        />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view earnings</h1>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Sign In
            </button>
          </div>
        </div>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onListSpace={handleListSpace}
      />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Earnings</h1>
            <p className="text-gray-600">Track your income and payouts</p>
          </div>

          {/* Earnings Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">${earningsSummary.totalEarnings.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">${earningsSummary.thisMonth.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Payouts</p>
                  <p className="text-2xl font-bold text-gray-900">${earningsSummary.pendingPayouts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Next Payout</p>
                  <p className="text-2xl font-bold text-gray-900">{earningsSummary.nextPayout}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Description</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-4 text-sm text-gray-900">{transaction.date}</td>
                      <td className="py-4 text-sm text-gray-900">{transaction.description}</td>
                      <td className="py-4 text-sm font-semibold text-green-600">${transaction.amount}</td>
                      <td className="py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          transaction.status === 'Completed' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
