import React from 'react';
import { MapPin, Star, Navigation } from 'lucide-react';

interface PlaceCardProps {
  place: {
    name: string;
    latitude: number;
    longitude: number;
    image?: string;
    rating?: number;
    type?: string;
  };
}

export const PlaceCard = ({ place }: PlaceCardProps) => {
  const handleDirectionsClick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden w-72 transform transition-transform hover:scale-105">
      <div className="relative h-48">
        <img
          src={place.image || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        {place.rating && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{place.rating}</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{place.name}</h3>
        <div className="flex items-center space-x-1 text-gray-600 mb-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">
            {`${place.latitude.toFixed(4)}, ${place.longitude.toFixed(4)}`}
          </span>
        </div>
        {place.type && (
          <div className="mb-3">
            <span className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              {place.type}
            </span>
          </div>
        )}
        <button
          onClick={handleDirectionsClick}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Navigation className="h-4 w-4" />
          <span>Get Directions</span>
        </button>
      </div>
    </div>
  );
};