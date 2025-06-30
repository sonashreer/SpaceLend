
import React from 'react';

interface Host {
  name: string;
  avatar: string;
  joinedDate: string;
  rating: number;
}

interface HostInfoProps {
  host: Host;
}

const HostInfo = ({ host }: HostInfoProps) => {
  return (
    <div className="border-t border-b border-gray-200 py-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">About the host</h2>
      <div className="flex items-center space-x-4">
        <img 
          src={host.avatar}
          alt={host.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-gray-900">Hosted by {host.name}</p>
          <p className="text-sm text-gray-600">Joined in {host.joinedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default HostInfo;
