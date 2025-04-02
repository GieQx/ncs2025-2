import { useState } from "react";
import { Link } from "wouter";

// SDG Colors - Sustainable Development Goals
const SDG_COLORS = {
  primary: "#00689D", // SDG Blue
  secondary: "#4C9F38", // SDG Green
  accent: "#FD6925", // SDG Orange
  highlight: "#FCC30B", // SDG Yellow
  red: "#E5243B", // SDG Red
  purple: "#8F1838", // SDG Burgundy
  teal: "#009688" // Teal
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#4C9F38] to-[#00689D] flex items-center justify-center">
              <i className="fas fa-chart-bar text-white"></i>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-neutral-800">NCS<span style={{color: SDG_COLORS.primary}}>2025</span></h1>
              <p className="text-xs text-neutral-600 hidden md:block">National Convention on Statistics</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-neutral-700 hover:text-[#4C9F38] font-medium text-sm">About</a>
            <a href="#speakers" className="text-neutral-700 hover:text-[#4C9F38] font-medium text-sm">Speakers</a>
            <a href="#agenda" className="text-neutral-700 hover:text-[#4C9F38] font-medium text-sm">Agenda</a>
            <a href="#visualizations" className="text-neutral-700 hover:text-[#4C9F38] font-medium text-sm">Data Insights</a>
            <a href="#resources" className="text-neutral-700 hover:text-[#4C9F38] font-medium text-sm">Resources</a>
            <a href="#networking" className="text-neutral-700 hover:text-[#4C9F38] font-medium text-sm">Networking</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <a href="https://example.com/register" target="_blank" rel="noopener noreferrer">
              <button className="bg-gradient-to-r from-[#4C9F38] to-[#00689D] text-white rounded-full py-2 px-4 md:px-6 text-sm font-medium hover:shadow-lg transition-shadow duration-300">
                Register Now
              </button>
            </a>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-neutral-800"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white border-t border-neutral-200 absolute w-full shadow-md`}>
        <div className="container mx-auto px-4 py-4 space-y-3">
          <a href="#about" className="block text-neutral-700 hover:text-[#4C9F38] font-medium text-sm py-2" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#speakers" className="block text-neutral-700 hover:text-[#4C9F38] font-medium text-sm py-2" onClick={() => setIsMobileMenuOpen(false)}>Speakers</a>
          <a href="#agenda" className="block text-neutral-700 hover:text-[#4C9F38] font-medium text-sm py-2" onClick={() => setIsMobileMenuOpen(false)}>Agenda</a>
          <a href="#visualizations" className="block text-neutral-700 hover:text-[#4C9F38] font-medium text-sm py-2" onClick={() => setIsMobileMenuOpen(false)}>Data Insights</a>
          <a href="#resources" className="block text-neutral-700 hover:text-[#4C9F38] font-medium text-sm py-2" onClick={() => setIsMobileMenuOpen(false)}>Resources</a>
          <a href="#networking" className="block text-neutral-700 hover:text-[#4C9F38] font-medium text-sm py-2" onClick={() => setIsMobileMenuOpen(false)}>Networking</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
