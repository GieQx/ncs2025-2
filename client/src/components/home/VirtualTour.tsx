import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Box,
  RotateCcw,
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut,
  Maximize,
  Info
} from 'lucide-react';

export default function VirtualTour() {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const tourContainerRef = useRef<HTMLDivElement>(null);
  
  // Simulated 3D tour rooms
  const rooms = [
    {
      name: 'Main Entrance Hall',
      description: 'The grand entrance to the National Convention Center welcomes attendees with modern architecture and digital displays.',
      color: 'from-[#00689D]/30 to-[#4C9F38]/30'
    },
    {
      name: 'Plenary Session Hall',
      description: 'The largest space in the venue with seating capacity for 1,500 attendees, featuring state-of-the-art presentation equipment.',
      color: 'from-[#E5243B]/30 to-[#FCC30B]/30'
    },
    {
      name: 'Exhibition Area',
      description: 'Browse through displays from leading statistical software providers, research institutions, and government agencies.',
      color: 'from-[#FD6925]/30 to-[#8F1838]/30'
    },
    {
      name: 'Breakout Rooms',
      description: 'Smaller conference spaces for workshops, specialized presentations, and networking events.',
      color: 'from-[#4C9F38]/30 to-[#FCC30B]/30'
    },
    {
      name: 'Dining & Networking Lounge',
      description: 'Spacious area for refreshments, conversations, and informal networking between sessions.',
      color: 'from-[#00689D]/30 to-[#FD6925]/30'
    }
  ];
  
  const navigateRoom = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentRoom((prev) => (prev === rooms.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentRoom((prev) => (prev === 0 ? rooms.length - 1 : prev - 1));
    }
  };
  
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (tourContainerRef.current?.requestFullscreen) {
        tourContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  
  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Reset tour if it's been inactive
  useEffect(() => {
    const inactivityTimer = setTimeout(() => {
      setCurrentRoom(0);
      setShowInfo(false);
    }, 180000); // 3 minutes of inactivity
    
    return () => clearTimeout(inactivityTimer);
  }, [currentRoom, showInfo]);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Take a Virtual Tour</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the National Convention Center before you arrive. Navigate through different halls, preview the setup, and get familiar with the venue.
          </p>
        </div>
        
        <div 
          ref={tourContainerRef}
          className={`relative mx-auto rounded-xl overflow-hidden shadow-xl border border-white/10 
            ${isFullscreen ? 'w-full h-full' : 'max-w-4xl aspect-[16/9]'}`}
        >
          {/* 3D Tour Placeholder - This would be replaced with an actual 3D tour implementation */}
          <div className={`w-full h-full relative bg-gradient-to-br ${rooms[currentRoom].color} flex items-center justify-center`}>
            {/* 3D Effect Elements */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-0.5 opacity-20">
              {Array.from({ length: 48 }).map((_, index) => (
                <div key={index} className="border border-white/10 backdrop-blur-sm"></div>
              ))}
            </div>
            
            <div className="absolute inset-0 perspective-[1000px]">
              <div className="w-full h-full relative transform-style-3d rotate-x-2 rotate-y-2">
                <div className="absolute inset-16 border border-white/20 rounded-lg transform-3d translate-z-20"></div>
                <div className="absolute inset-32 border border-white/15 rounded-lg transform-3d translate-z-10"></div>
                <div className="absolute inset-48 border border-white/10 rounded-lg transform-3d translate-z-0"></div>
              </div>
            </div>
            
            {/* Center Element */}
            <div className="relative z-10 text-center p-8 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 max-w-md">
              <Box className="w-16 h-16 mx-auto mb-6 text-white opacity-80" />
              <h3 className="text-2xl font-bold text-white mb-2">{rooms[currentRoom].name}</h3>
              
              {showInfo && (
                <p className="text-white/80 mb-6">{rooms[currentRoom].description}</p>
              )}
              
              <div className="flex gap-3 justify-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowInfo(!showInfo)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Info className="mr-2 w-4 h-4" />
                  {showInfo ? 'Hide Info' : 'Show Info'}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentRoom(0)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <RotateCcw className="mr-2 w-4 h-4" />
                  Reset Tour
                </Button>
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => navigateRoom('prev')}
                className="bg-black/30 backdrop-blur-md border-white/10 text-white hover:bg-black/50"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="px-4 py-2 bg-black/30 backdrop-blur-md border border-white/10 rounded-full text-white text-sm">
                {currentRoom + 1} / {rooms.length}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => navigateRoom('next')}
                className="bg-black/30 backdrop-blur-md border-white/10 text-white hover:bg-black/50"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Controls Toolbar */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-black/30 backdrop-blur-md border-white/10 text-white hover:bg-black/50"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-black/30 backdrop-blur-md border-white/10 text-white hover:bg-black/50"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleFullscreen}
                className="bg-black/30 backdrop-blur-md border-white/10 text-white hover:bg-black/50"
              >
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Room Selector Thumbnails */}
        <div className="flex overflow-x-auto gap-3 mt-6 pb-4 mx-auto max-w-4xl">
          {rooms.map((room, index) => (
            <button
              key={index}
              onClick={() => setCurrentRoom(index)}
              className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all
                ${currentRoom === index 
                  ? 'border-[#00689D] shadow-lg scale-105' 
                  : 'border-transparent opacity-70'}`}
            >
              <div className={`w-32 h-20 bg-gradient-to-br ${room.color} flex items-center justify-center`}>
                <span className="text-xs text-white bg-black/50 px-2 py-1 rounded font-medium">
                  {room.name.split(' ')[0]}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}