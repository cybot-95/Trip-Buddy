import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, LogIn, LogOut } from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState(localStorage.getItem('uid') || '');

  const handleLogout = () => {
    localStorage.removeItem('uid');
    setUid('');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    setUid(localStorage.getItem('uid') || '');
  }, []);

  return (
    <nav className="fixed w-full bg-transparent  z-50 shadow-sm">
      <div className="max-w mx-2 px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-white mix-blend-differnce">TripBuddy</span>
          </Link>
          <div className='flex items-center space-x-4'>
          <Link
              to="/"
              className="flex items-center space-x-1 text-inherit hover:text-blue-600 border-2 border-gray-700 rounded-full px-3 py-1 transition duration-300 ease-in-out"
            >
              <span>Home</span>
            </Link>          
          {uid ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-inherit hover:text-blue-600 border-2 border-gray-700 rounded-full px-3 py-1 transition duration-300 ease-in-out"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-1 text-inherit hover:text-blue-600 border-2 border-gray-700 rounded-full px-3 py-1 transition duration-300 ease-in-out"
            >
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
};