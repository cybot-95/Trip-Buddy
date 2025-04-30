import React from 'react';
import { MapPin, Star } from 'lucide-react';

interface PlaceCardProps {
  place: {
    name: string;
    latitude: number;
    longitude: number;
    image?: string;
    rating?: number;
    type?: string;
    distance?: number;
  };
}

export const PlaceCard = ({ place }: PlaceCardProps) => {
  
  const handleDirectionsClick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
    window.open(url, '_blank');
  };
  
  return (
    <div className="bg-cyan-700/15 rounded-3xl shadow-md overflow-hidden">
      <div className="flex">
        <div className="w-1/2 p-2 rounded-3xl">
          <img
            src={place.image || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"}
            alt={place.name}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        
        <div className="w-2/3 p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>
            {place.rating && (
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium ml-1">{place.rating}</span>
              </div>
            )}
          </div>

          {place.type && (
            <p className="text-sm text-gray-600 mb-1">{place.type}</p>
          )}

          {/* {place.distance && (
            <p className="text-xs text-gray-500 mb-2">{place.distance.toFixed(2)} km away</p>
          )} */}

          <button className="text-sm text-blue-600 hover:text-blue-800" onClick={handleDirectionsClick}>
            <MapPin className="h-4 w-4 inline-block mr-1" />
            View on map →
          </button>
        </div>
      </div>
    </div>
  );
};