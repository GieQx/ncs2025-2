import { useState, useEffect } from "react";
import { Link } from "wouter";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

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
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for material design elevation
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed w-full bg-background/90 backdrop-blur-sm z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#4C9F38] to-[#00689D] flex items-center justify-center shadow-sm">
              <i className="fas fa-chart-bar text-white"></i>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-foreground">NCS<span className="text-sdg-blue">2025</span></h1>
              <p className="text-xs text-muted-foreground hidden md:block">National Convention on Statistics</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-foreground/80 hover:text-[#4C9F38] font-medium text-sm transition-colors duration-200">About</a>
            <a href="#speakers" className="text-foreground/80 hover:text-[#4C9F38] font-medium text-sm transition-colors duration-200">Speakers</a>
            <a href="#agenda" className="text-foreground/80 hover:text-[#4C9F38] font-medium text-sm transition-colors duration-200">Agenda</a>
            <Link href="/attendee-guide" className="text-foreground/80 hover:text-[#4C9F38] font-medium text-sm transition-colors duration-200">Attendee Guide</Link>
            <Link href="/exhibitors" className="text-foreground/80 hover:text-[#4C9F38] font-medium text-sm transition-colors duration-200">Exhibitors</Link>
            <a href="#resources" className="text-foreground/80 hover:text-[#4C9F38] font-medium text-sm transition-colors duration-200">Resources</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground hover:bg-muted transition-colors duration-200"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? (
                <MoonIcon className="w-5 h-5" />
              ) : (
                <SunIcon className="w-5 h-5" />
              )}
            </button>
            
            {/* Register Button */}
            <a href="https://example.com/register" target="_blank" rel="noopener noreferrer">
              <button className="bg-gradient-to-r from-[#4C9F38] to-[#00689D] text-white rounded-full py-2 px-4 md:px-6 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
                Register Now
              </button>
            </a>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-foreground bg-background/90 p-2 rounded-full hover:bg-muted/50 transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-background border-t border-border absolute w-full shadow-md`}>
        <div className="container mx-auto px-4 py-4 space-y-3">
          <a href="#about" className="block text-foreground/80 hover:text-[#4C9F38] font-medium text-sm py-2 transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#speakers" className="block text-foreground/80 hover:text-[#4C9F38] font-medium text-sm py-2 transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>Speakers</a>
          <a href="#agenda" className="block text-foreground/80 hover:text-[#4C9F38] font-medium text-sm py-2 transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>Agenda</a>
          <Link href="/attendee-guide" className="block text-foreground/80 hover:text-[#4C9F38] font-medium text-sm py-2 transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>Attendee Guide</Link>
          <Link href="/exhibitors" className="block text-foreground/80 hover:text-[#4C9F38] font-medium text-sm py-2 transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>Exhibitors</Link>
          <a href="#resources" className="block text-foreground/80 hover:text-[#4C9F38] font-medium text-sm py-2 transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>Resources</a>
          
          <div className="flex items-center space-x-4 pt-2 border-t border-border">
            <button
              onClick={toggleTheme}
              className="flex items-center text-foreground/80 hover:text-[#4C9F38] text-sm py-2 transition-colors duration-200"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? (
                <>
                  <MoonIcon className="w-4 h-4 mr-2" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <SunIcon className="w-4 h-4 mr-2" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
