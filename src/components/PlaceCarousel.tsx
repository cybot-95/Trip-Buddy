import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  places: Place[];
}

export const PlaceCarousel = ({ places }: PlaceCarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 3 >= places.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 3 < 0 ? Math.max(0, places.length - 3) : prevIndex - 3
    );
  };

  return (
    <div className="relative w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <motion.div
            className="flex space-x-6 overflow-hidden"
            initial={false}
            animate={{ x: `-${currentIndex * (288 + 24)}px` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {places.map((place) => (
              <PlaceCard key={`${place.latitude}-${place.longitude}`} place={place} />
            ))}
          </motion.div>
          
          {places.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};