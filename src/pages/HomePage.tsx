import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Search, ChevronRight } from 'lucide-react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { PlaceCarousel } from '../components/PlaceCarousel';
import { motion } from 'framer-motion';

const placeTypes = [
  { label: "Tourist Attraction", value: "tourist_attraction" },
  { label: "Amusement Park", value: "amusement_park" },
  { label: "Museum", value: "museum" },
  { label: "Zoo", value: "zoo" },
  { label: "Aquarium", value: "aquarium" },
  { label: "Art Gallery", value: "art_gallery" },
  { label: "Park", value: "park" }
];

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.75rem'
};

export const HomePage = () => {
  const [center, setCenter] = useState({ lat: 12.971599, lng: 77.594566 });
  const [zoom, setZoom] = useState(11);
  const [selectedType, setSelectedType] = useState(placeTypes[0].value);
  const [places, setPlaces] = useState<any[]>([]);
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
      {/* New Hero Section */}
      <div
        className="h-screen relative bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-white text-center px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Let's go somewhere new,
            <br />
            where adventure awaits
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Finding the hidden gems of Bengaluru
          </motion.p>
          <motion.button
            onClick={scrollToMap}
            className="bg-white text-gray-900 px-8 py-3 rounded-full flex items-center space-x-2 hover:bg-gray-100 transition-colors mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span>Explore</span>
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Map Section */}
      <div id="map-section" ref={scrollRef} className="py-16 bg-gray-50">
        <div className="max-w mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-sky-950">
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

            <div className="w-1/2">
              <div className="bg-cyan-800/10 rounded-3xl shadow-lg p-6 border-2 border-sky-950">
                <h3 className="text-lg font-semibold mb-4">Something on mind ?</h3>

                <div className="flex items-center gap-2">
                  {/* Dropdown Select */}
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-sky-950"
                  >
                    {placeTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>

                  {/* Compact Search Button */}
                  <button
                    onClick={handleSearch}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>

                {/* Recommendations Section */}
                <div className="mt-8">
                  <PlaceCarousel places={places} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
