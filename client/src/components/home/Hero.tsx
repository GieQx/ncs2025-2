import { useCountdown } from "@/hooks/useCountdown";
import { useState } from "react";

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

const Hero = () => {
  const { days, hours, minutes, seconds } = useCountdown(new Date('September 15, 2025 00:00:00'));
  const [showTourModal, setShowTourModal] = useState(false);

  const handleStartTour = () => {
    setShowTourModal(true);
  };

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden text-white">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://via.placeholder.com/1920x1080?text=Convention+Video+Placeholder"
        >
          <source 
            src="https://static.videezy.com/system/resources/previews/000/043/143/original/F-DATAP0016.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Overlay patterns */}
      <div className="absolute inset-0 opacity-40 z-10 mix-blend-soft-light" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23F1F1F1'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat"
      }}></div>
      
      <div className="container mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
              <i className="fas fa-calendar-alt mr-2" style={{color: SDG_COLORS.highlight}}></i>
              <span>September 15-17, 2025</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              National Convention on <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4C9F38] to-[#00689D]">Statistics 2025</span>
            </h1>
            
            <p className="text-lg text-white/90 mb-8 max-w-xl">
              Join us for a transformative experience empowering data-driven decision-making and showcasing innovation in the field of statistics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="https://example.com/register" target="_blank" rel="noopener noreferrer">
                <button className="bg-gradient-to-r from-[#4C9F38] to-[#00689D] text-white rounded-full py-3 px-8 text-base font-medium hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
                  <span>Register Now</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </a>
              <button 
                onClick={handleStartTour}
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-full py-3 px-8 text-base font-medium hover:bg-white/20 transition-colors duration-300 flex items-center justify-center"
              >
                <i className="fas fa-vr-cardboard mr-2"></i>
                <span>Start 3D Tour</span>
              </button>
            </div>
            
            {/* Countdown Timer */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h3 className="text-sm font-semibold text-white/80 mb-4">Event Starts In:</h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl md:text-3xl font-mono font-bold text-white" id="days">{days}</div>
                  <div className="text-xs text-white/80">Days</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl md:text-3xl font-mono font-bold text-white" id="hours">{hours}</div>
                  <div className="text-xs text-white/80">Hours</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl md:text-3xl font-mono font-bold text-white" id="minutes">{minutes}</div>
                  <div className="text-xs text-white/80">Minutes</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl md:text-3xl font-mono font-bold text-white" id="seconds">{seconds}</div>
                  <div className="text-xs text-white/80">Seconds</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Interactive 3D Chart Teaser */}
            <div className="relative rounded-2xl overflow-hidden bg-black/50 backdrop-blur-md border border-white/20 p-6 shadow-lg aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full"></div>
              </div>
              <div className="relative z-10 h-full flex flex-col justify-center items-center">
                <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col justify-center items-center">
                  <i className="fas fa-chart-line text-white text-6xl mb-6" style={{color: SDG_COLORS.highlight}}></i>
                  <p className="text-white text-center font-medium">Interactive Data Visualization</p>
                  <p className="text-white/80 text-center text-sm mt-2">Explore statistical trends and insights</p>
                  <button className="mt-6 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full py-2 px-6 text-sm font-medium transition-colors duration-300">
                    Start Tour
                  </button>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#4C9F38]/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#00689D]/30 rounded-full blur-xl"></div>
            </div>
            
            {/* Event Highlights */}
            <div className="absolute -bottom-10 -left-10 bg-black/60 backdrop-blur-md rounded-xl shadow-lg p-4 w-48 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4C9F38]/20 flex items-center justify-center text-[#4C9F38]">
                  <i className="fas fa-users"></i>
                </div>
                <div>
                  <p className="text-xs text-white/80">Attendees</p>
                  <p className="text-lg font-bold font-mono text-white">2,500+</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-black/60 backdrop-blur-md rounded-xl shadow-lg p-4 w-48 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00689D]/20 flex items-center justify-center text-[#00689D]">
                  <i className="fas fa-microphone"></i>
                </div>
                <div>
                  <p className="text-xs text-white/80">Speakers</p>
                  <p className="text-lg font-bold font-mono text-white">50+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Partners/Sponsors */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <p className="text-white/80 text-center text-sm mb-6">Supported by leading organizations in statistics and data science</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="w-20 h-12 bg-white/10 backdrop-blur-sm rounded flex items-center justify-center border border-white/20">
              <span className="text-white/80 text-xs">Partner 1</span>
            </div>
            <div className="w-20 h-12 bg-white/10 backdrop-blur-sm rounded flex items-center justify-center border border-white/20">
              <span className="text-white/80 text-xs">Partner 2</span>
            </div>
            <div className="w-20 h-12 bg-white/10 backdrop-blur-sm rounded flex items-center justify-center border border-white/20">
              <span className="text-white/80 text-xs">Partner 3</span>
            </div>
            <div className="w-20 h-12 bg-white/10 backdrop-blur-sm rounded flex items-center justify-center border border-white/20">
              <span className="text-white/80 text-xs">Partner 4</span>
            </div>
            <div className="w-20 h-12 bg-white/10 backdrop-blur-sm rounded flex items-center justify-center border border-white/20">
              <span className="text-white/80 text-xs">Partner 5</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 3D Tour Modal */}
      {showTourModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Interactive 3D Venue Tour</h3>
              <button
                onClick={() => setShowTourModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                <i className="fas fa-cube text-5xl mb-4 text-gray-400 dark:text-gray-500"></i>
                <p className="text-gray-600 dark:text-gray-300">3D Tour would load here</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Experience the National Convention Center in 3D</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Explore the National Convention Center in an immersive 3D environment. Navigate through various halls, view the setup for different sessions, and get familiar with the venue before your arrival.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowTourModal(false)}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 py-2 px-4 rounded-lg mr-3"
              >
                Close
              </button>
              <button className="bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded-lg">
                Enter Full Screen
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
