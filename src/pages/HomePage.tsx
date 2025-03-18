import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Search, ChevronRight } from 'lucide-react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { PlaceCarousel } from '../components/PlaceCarousel';
import { motion } from 'framer-motion';

const placeTypes = ["tourist_attraction", "amusement_park", "museum", "zoo", "aquarium", "art_gallery", "park"];

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.75rem'
};

export const HomePage = () => {
  const [center, setCenter] = useState({ lat: 12.971599, lng: 77.594566 });
  const [zoom, setZoom] = useState(11);
  const [selectedType, setSelectedType] = useState(placeTypes[0]);
  const [places, setPlaces] = useState([]);
  const [uid, setUid] = useState(localStorage.getItem('uid') || '');
  const { ref: scrollRef, inView } = useInView();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  // Function to fetch recommendations
  const fetchPlaces = async (type: string | null = null) => {
    try {
      if (!uid) return; // Ensure user is logged in

      const url = type 
        ? `https://trip-buddy-server.onrender.com/recommend?uid=${uid}&type=${type}`
        : `https://trip-buddy-server.onrender.com/recommend?uid=${uid}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data && Array.isArray(data.recommendations)) {
        setPlaces(data.recommendations);
        console.log(places);
      } else {
        setPlaces([]);
        console.error('Unexpected API response:', data);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
      setPlaces([]);
    }
  };

  // Fetch recommendations on login (runs once when `uid` is set)
  useEffect(() => {
    if (uid) fetchPlaces();
  }, [uid]);

  // Search button click handler
  const handleSearch = () => {
    fetchPlaces(selectedType);
  };

  const scrollToMap = () => {
    document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="h-screen relative bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-20 left-10 text-white max-w-xl">
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Your Next Adventure
          </motion.h1>
          <motion.p 
            className="text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore handpicked destinations tailored just for you
          </motion.p>
        </div>
        <motion.button
          onClick={scrollToMap}
          className="absolute bottom-20 right-10 bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-white transition-colors"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span>Go</span>
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Map Section */}
      <div id="map-section" ref={scrollRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <div className="w-3/4">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={zoom}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: true,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    cameraControl: false,
                    colorScheme: "LIGHT",
                    gestureHandling: 'greedy',
                  }}
                >
                  {places.map((place: any, index) => (
                    <MarkerF
                      key={index}
                      position={{
                        lat: place.latitude,
                        lng: place.longitude
                      }}
                    />
                  ))}
                </GoogleMap>
              </div>
            </div>
            
            <div className="w-1/4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Filter Places</h3>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {placeTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <button 
                  onClick={handleSearch}
                  className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recommended Places
            </h2>
            <PlaceCarousel places={places} />
          </div>
        </div>
      </div>
    </div>
  );
};
