import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-cyan-800 to-blue-950 text-white py-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <img 
            src="/logo-large-no-bg.png" 
            alt="Aquameter Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="text-lg font-bold tracking-wider">AQUAMETER</span>
        </div>

        {/* Middle */}
        <div className="text-center text-xl md:text-base">
          Made with <FaHeart className="inline text-red-500 mx-1 animate-pulse"  /> by <span className="font-semibold text-cyan-300 cursor-pointer" onClick={() => (window.open('https://github.com/aqua-meter', '_blank'))} >AQUAMETER Team</span> <br />
          © {new Date().getFullYear()} All Rights Reserved.
        </div>

        {/* Right */}
        <div className="flex gap-4 text-sm md:text-base">
          <Link to="/privacy-policy" className="hover:text-cyan-300 transition">Privacy</Link>
          <Link to="/terms" className="hover:text-cyan-300 transition">Terms</Link>
          <Link to="/contact" className="hover:text-cyan-300 transition">Contact</Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
