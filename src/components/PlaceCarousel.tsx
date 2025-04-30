import React from 'react';
import { PlaceCard } from './PlaceCard';
import { motion } from 'framer-motion';

interface Place {
  name: string;
  latitude: number;
  longitude: number;
  image?: string;
  rating?: number;
  type?: string;
}

interface PlaceCarouselProps {
  places?: Place[];
}

const dummyPlaces: Place[] = [
  {
    name: "Central Park",
    latitude: 40.785091,
    longitude: -73.968285,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
    rating: 4.8,
    type: "Park"
  },
  {
    name: "Eiffel Tower",
    latitude: 48.8584,
    longitude: 2.2945,
    image: "https://images.unsplash.com/photo-1431274172761-fca41d930114",
    rating: 4.7,
    type: "Landmark"
  },
  {
    name: "Tokyo Skytree",
    latitude: 35.7101,
    longitude: 139.8107,
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989",
    rating: 4.5,
    type: "Observation Deck"
  },
  {
    name: "Sydney Opera House",
    latitude: -33.8568,
    longitude: 151.2153,
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be",
    rating: 4.9,
    type: "Performing Arts Center"
  },
  {
    name: "Grand Canyon",
    latitude: 36.1070,
    longitude: -112.1130,
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35",
    rating: 4.9,
    type: "Natural Wonder"
  },
  {
    name: "Statue of Liberty",
    latitude: 40.6892,
    longitude: -74.0445,
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216",
    rating: 4.6,
    type: "Monument"
  }
];

export const PlaceCarousel = ({ places }: PlaceCarouselProps) => {
  return (
    <div className="w-full py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="space-y-4 overflow-y-auto no-scrollbar" 
          style={{ height: '305px' }} // Fixed height
        >
          {places.map((place, index) => (
            <motion.div
              key={`${place.latitude}-${place.longitude}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <PlaceCard place={place} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};