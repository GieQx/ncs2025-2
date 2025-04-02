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
  Info,
  MapPin,
  Map,
  Compass,
  Camera,
  Users,
  Coffee,
  Presentation,
  LayoutGrid
} from 'lucide-react';

type Room = {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  capacity?: string;
  equipment?: string[];
  layout?: string;
  floor: number;
  hotspots?: {
    position: { x: number; y: number };
    label: string;
    description?: string;
    goesToRoom?: string;
  }[];
};

type Floor = {
  number: number;
  name: string;
  rooms: string[]; // Room IDs on this floor
};

export default function VirtualTour() {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [viewMode, setViewMode] = useState<'room' | 'floorplan'>('room');
  const [currentFloor, setCurrentFloor] = useState(1);
  const [showHotspots, setShowHotspots] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<{
    label: string;
    description?: string;
  } | null>(null);
  const tourContainerRef = useRef<HTMLDivElement>(null);
  
  // Define the floor plans
  const floors: Floor[] = [
    {
      number: 1,
      name: 'Ground Floor',
      rooms: ['entrance', 'plenary', 'exhibition']
    },
    {
      number: 2,
      name: 'Upper Floor',
      rooms: ['breakout', 'dining']
    }
  ];
  
  // Room data with more details
  const rooms: Room[] = [
    {
      id: 'entrance',
      name: 'Main Entrance Hall',
      description: 'The grand entrance to the National Convention Center welcomes attendees with modern architecture and digital displays featuring real-time convention information and session schedules.',
      color: 'from-[#00689D]/30 to-[#4C9F38]/30',
      icon: <MapPin className="w-5 h-5" />,
      capacity: '300 standing',
      equipment: ['Digital Displays', 'Registration Desks', 'Information Kiosks'],
      layout: 'Open Plan',
      floor: 1,
      hotspots: [
        { 
          position: { x: 70, y: 50 }, 
          label: 'Information Desk',
          description: 'Visit for any questions about the convention schedule or venue.'
        },
        { 
          position: { x: 30, y: 70 }, 
          label: 'Registration Area',
          description: 'Check-in and collect your attendee badge and materials.'
        },
        { 
          position: { x: 80, y: 30 }, 
          label: 'To Plenary Hall',
          goesToRoom: 'plenary' 
        }
      ]
    },
    {
      id: 'plenary',
      name: 'Plenary Session Hall',
      description: 'The largest space in the venue with seating capacity for 1,500 attendees, featuring state-of-the-art presentation equipment, multiple large projection screens, and professional audio-visual capabilities.',
      color: 'from-[#E5243B]/30 to-[#FCC30B]/30',
      icon: <Presentation className="w-5 h-5" />,
      capacity: '1,500 seated',
      equipment: ['Multiple Projection Screens', 'Professional Audio System', 'Stage Lighting', 'Podium'],
      layout: 'Auditorium Style',
      floor: 1,
      hotspots: [
        { 
          position: { x: 50, y: 30 }, 
          label: 'Main Stage',
          description: 'Where keynote speakers and panels will present.'
        },
        { 
          position: { x: 20, y: 60 }, 
          label: 'AV Control Booth',
          description: 'Technical support and presentation management.'
        },
        { 
          position: { x: 80, y: 80 }, 
          label: 'To Exhibition Area',
          goesToRoom: 'exhibition' 
        }
      ]
    },
    {
      id: 'exhibition',
      name: 'Exhibition Area',
      description: 'Browse through 60+ displays from leading statistical software providers, research institutions, and government agencies. Interactive demos and presentations run throughout the day.',
      color: 'from-[#FD6925]/30 to-[#8F1838]/30',
      icon: <LayoutGrid className="w-5 h-5" />,
      capacity: '800 circulating',
      equipment: ['Exhibitor Booths', 'Demo Stations', 'Digital Signage'],
      layout: 'Open Exhibition Hall',
      floor: 1,
      hotspots: [
        { 
          position: { x: 40, y: 40 }, 
          label: 'Data Visualization Zone',
          description: 'Live demonstrations of cutting-edge visualization tools.'
        },
        { 
          position: { x: 60, y: 70 }, 
          label: 'Government Agencies Section',
          description: 'National statistical organizations showcasing their work.'
        },
        { 
          position: { x: 85, y: 50 }, 
          label: 'To Breakout Rooms',
          goesToRoom: 'breakout' 
        }
      ]
    },
    {
      id: 'breakout',
      name: 'Breakout Rooms',
      description: 'Six flexible conference spaces for workshops, specialized presentations, and hands-on training sessions. Each room can be configured for different teaching and collaboration styles.',
      color: 'from-[#4C9F38]/30 to-[#FCC30B]/30',
      icon: <Users className="w-5 h-5" />,
      capacity: '60-120 per room',
      equipment: ['Projectors', 'Whiteboards', 'Roundtables', 'Laptop Connections'],
      layout: 'Flexible Configuration',
      floor: 2,
      hotspots: [
        { 
          position: { x: 30, y: 30 }, 
          label: 'Workshop Room A',
          description: 'Configured for hands-on software training.'
        },
        { 
          position: { x: 70, y: 40 }, 
          label: 'Workshop Room B',
          description: 'Set up for panel discussions and Q&A sessions.'
        },
        { 
          position: { x: 50, y: 80 }, 
          label: 'To Dining & Networking',
          goesToRoom: 'dining' 
        }
      ]
    },
    {
      id: 'dining',
      name: 'Dining & Networking Lounge',
      description: 'Spacious area for refreshments, conversations, and informal networking between sessions. Featuring comfortable seating arrangements, charging stations, and catering services throughout the day.',
      color: 'from-[#00689D]/30 to-[#FD6925]/30',
      icon: <Coffee className="w-5 h-5" />,
      capacity: '400 seated',
      equipment: ['Catering Stations', 'Lounge Seating', 'Charging Points', 'Background Music'],
      layout: 'Mixed Dining and Lounge',
      floor: 2,
      hotspots: [
        { 
          position: { x: 40, y: 60 }, 
          label: 'Catering Area',
          description: 'Serving refreshments and meals throughout the day.'
        },
        { 
          position: { x: 70, y: 30 }, 
          label: 'Networking Pods',
          description: 'Semi-private areas for small group discussions.'
        },
        { 
          position: { x: 20, y: 80 }, 
          label: 'Back to Entrance',
          goesToRoom: 'entrance' 
        }
      ]
    }
  ];
  
  // Current room object and helper functions
  const currentRoom = rooms[currentRoomIndex];
  
  // Find room index by id
  const getRoomIndexById = (id: string): number => {
    return rooms.findIndex(room => room.id === id);
  };
  
  // Navigate to a room by id
  const navigateToRoom = (roomId: string) => {
    const roomIndex = getRoomIndexById(roomId);
    if (roomIndex !== -1) {
      setCurrentRoomIndex(roomIndex);
      // Update floor if room is on a different floor
      const roomFloor = rooms[roomIndex].floor;
      if (roomFloor !== currentFloor) {
        setCurrentFloor(roomFloor);
      }
    }
  };
  
  // Get rooms for the current floor
  const getRoomsForCurrentFloor = () => {
    return rooms.filter(room => room.floor === currentFloor);
  };
  
  // Toggle view between room and floor plan
  const toggleViewMode = () => {
    setViewMode(viewMode === 'room' ? 'floorplan' : 'room');
  };
  
  // Navigate through the rooms sequentially
  const navigateRoom = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentRoomIndex(prev => (prev === rooms.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentRoomIndex(prev => (prev === 0 ? rooms.length - 1 : prev - 1));
    }
  };
  
  // Handle hotspot click
  const handleHotspotClick = (hotspot: {
    label: string;
    description?: string;
    goesToRoom?: string;
  }) => {
    if (hotspot.goesToRoom) {
      navigateToRoom(hotspot.goesToRoom);
    } else {
      setActiveHotspot({
        label: hotspot.label,
        description: hotspot.description
      });
    }
  };
  
  // Handle floor change
  const handleFloorChange = (floorNumber: number) => {
    setCurrentFloor(floorNumber);
    // Navigate to the first room on that floor
    const roomsOnFloor = rooms.filter(room => room.floor === floorNumber);
    if (roomsOnFloor.length > 0) {
      navigateToRoom(roomsOnFloor[0].id);
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
  
  // Toggle showing hotspots
  const toggleHotspots = () => {
    setShowHotspots(!showHotspots);
    setActiveHotspot(null);
  };
  
  // Toggle showing detailed room info
  const toggleDetails = () => {
    setShowDetails(!showDetails);
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
      setCurrentRoomIndex(0);
      setShowInfo(false);
      setViewMode('room');
      setActiveHotspot(null);
    }, 180000); // 3 minutes of inactivity
    
    return () => clearTimeout(inactivityTimer);
  }, [currentRoomIndex, showInfo, viewMode]);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Take a Virtual Tour</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the National Convention Center before you arrive. Navigate through different halls, preview the setup, and get familiar with the venue.
          </p>
        </div>
        
        {/* Floor Selection Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          {floors.map((floor) => (
            <Button
              key={floor.number}
              onClick={() => handleFloorChange(floor.number)}
              variant={currentFloor === floor.number ? "default" : "outline"}
              className="bg-gradient-to-r from-primary/80 to-secondary/80 text-white border-white/20"
            >
              {floor.name}
            </Button>
          ))}
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={toggleViewMode}
            variant="outline"
            className="bg-white/10 border-white/20 text-foreground"
          >
            {viewMode === 'room' ? (
              <>
                <Map className="mr-2 w-4 h-4" />
                View Floor Plan
              </>
            ) : (
              <>
                <Camera className="mr-2 w-4 h-4" />
                View Rooms
              </>
            )}
          </Button>
          
          <Button
            onClick={toggleHotspots}
            variant="outline"
            className="bg-white/10 border-white/20 text-foreground"
          >
            <MapPin className="mr-2 w-4 h-4" />
            {showHotspots ? 'Hide Hotspots' : 'Show Hotspots'}
          </Button>
        </div>
        
        <div 
          ref={tourContainerRef}
          className={`relative mx-auto rounded-xl overflow-hidden shadow-xl border border-white/10 
            ${isFullscreen ? 'w-full h-full' : 'max-w-4xl aspect-[16/9]'}`}
        >
          {viewMode === 'room' ? (
            // Room View
            <div className={`w-full h-full relative bg-gradient-to-br ${currentRoom.color} flex items-center justify-center`}>
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
              
              {/* Hotspots */}
              {showHotspots && currentRoom.hotspots && currentRoom.hotspots.map((hotspot, index) => (
                <button
                  key={index}
                  onClick={() => handleHotspotClick(hotspot)}
                  className={`absolute z-20 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 
                    flex items-center justify-center transition-all hover:scale-110 hover:bg-white/30
                    ${hotspot.goesToRoom ? 'animate-pulse' : ''}`}
                  style={{
                    left: `${hotspot.position.x}%`,
                    top: `${hotspot.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <MapPin className="w-4 h-4 text-white" />
                </button>
              ))}
              
              {/* Active Hotspot Info */}
              {activeHotspot && (
                <div 
                  className="absolute z-30 bg-black/70 backdrop-blur-md p-4 rounded-lg border border-white/20 text-white max-w-xs"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <h4 className="font-bold mb-2">{activeHotspot.label}</h4>
                  {activeHotspot.description && (
                    <p className="text-sm text-white/80">{activeHotspot.description}</p>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveHotspot(null)}
                    className="mt-3 bg-white/10 border-white/20 text-white w-full"
                  >
                    Close
                  </Button>
                </div>
              )}
              
              {/* Room Info Card */}
              <div className="relative z-10 text-center p-8 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 max-w-md">
                {currentRoom.icon ? 
                  React.cloneElement(currentRoom.icon as React.ReactElement, { className: "w-16 h-16 mx-auto mb-6 text-white opacity-80" })
                  : <Box className="w-16 h-16 mx-auto mb-6 text-white opacity-80" />
                }
                <h3 className="text-2xl font-bold text-white mb-2">{currentRoom.name}</h3>
                
                {showInfo && (
                  <p className="text-white/80 mb-6">{currentRoom.description}</p>
                )}
                
                {showDetails && (
                  <div className="bg-black/30 p-4 rounded-lg mb-4 text-left text-sm text-white/90">
                    <div className="flex items-start mb-2">
                      <span className="font-semibold mr-2 min-w-20">Capacity:</span>
                      <span>{currentRoom.capacity || 'Not specified'}</span>
                    </div>
                    {currentRoom.layout && (
                      <div className="flex items-start mb-2">
                        <span className="font-semibold mr-2 min-w-20">Layout:</span>
                        <span>{currentRoom.layout}</span>
                      </div>
                    )}
                    {currentRoom.equipment && currentRoom.equipment.length > 0 && (
                      <div className="flex items-start">
                        <span className="font-semibold mr-2 min-w-20">Equipment:</span>
                        <div>
                          {currentRoom.equipment.map((item, i) => (
                            <div key={i} className="mb-1 last:mb-0">• {item}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 justify-center">
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
                    onClick={toggleDetails}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    {showDetails ? 'Hide Details' : 'View Details'}
                  </Button>
                </div>
              </div>
              
              {/* Floor Indicator */}
              <div className="absolute top-4 left-4 px-4 py-2 bg-black/50 backdrop-blur-md text-white rounded-lg text-sm">
                Floor {currentRoom.floor}: {floors.find(f => f.number === currentRoom.floor)?.name}
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
                  {currentRoomIndex + 1} / {rooms.length}
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
                  onClick={toggleHotspots}
                  className="bg-black/30 backdrop-blur-md border-white/10 text-white hover:bg-black/50"
                >
                  <MapPin className="w-4 h-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={toggleViewMode}
                  className="bg-black/30 backdrop-blur-md border-white/10 text-white hover:bg-black/50"
                >
                  <Map className="w-4 h-4" />
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
          ) : (
            // Floor Plan View
            <div className="w-full h-full relative bg-black/80 flex items-center justify-center">
              <div className="absolute inset-4 rounded-lg border border-white/20 overflow-hidden">
                <div className="absolute inset-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">
                    Floor {currentFloor} Plan: {floors.find(f => f.number === currentFloor)?.name}
                  </h3>
                  
                  <div className="relative w-full h-[calc(100%-4rem)] border-2 border-white/30 rounded-lg overflow-hidden">
                    {/* Simplified floor plan layout - would be replaced with real floor plans */}
                    <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-2 p-4">
                      {/* Render room boxes based on current floor */}
                      {getRoomsForCurrentFloor().map((room) => {
                        // Generate a random position for each room (in a real app, these would be predefined)
                        const position = room.hotspots && room.hotspots[0] ? {
                          x: Math.min(Math.max(room.hotspots[0].position.x, 15), 85),
                          y: Math.min(Math.max(room.hotspots[0].position.y, 15), 85),
                        } : { x: Math.random() * 70 + 15, y: Math.random() * 70 + 15 };
                        
                        // Generate a random size for each room
                        const width = room.id === 'plenary' ? 40 : (room.id === 'entrance' || room.id === 'exhibition' ? 30 : 20);
                        const height = room.id === 'plenary' ? 30 : (room.id === 'entrance' || room.id === 'exhibition' ? 25 : 20);
                        
                        return (
                          <button
                            key={room.id}
                            onClick={() => navigateToRoom(room.id)}
                            className={`absolute rounded-lg border-2 flex flex-col items-center justify-center p-2
                              backdrop-blur-sm transition-all hover:scale-105 active:scale-95
                              ${currentRoom.id === room.id ? 'border-white bg-white/30' : 'border-white/50 bg-white/10'}`}
                            style={{
                              left: `${position.x - width/2}%`,
                              top: `${position.y - height/2}%`,
                              width: `${width}%`,
                              height: `${height}%`,
                            }}
                          >
                            <div className="flex items-center justify-center mb-1">
                              {React.cloneElement(room.icon as React.ReactElement, { 
                                className: "w-6 h-6 text-white" 
                              })}
                            </div>
                            <span className="text-white text-xs font-medium text-center">
                              {room.name}
                            </span>
                          </button>
                        );
                      })}
                      
                      {/* Floor connectivity */}
                      {currentFloor === 1 && (
                        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/40 p-2 rounded-lg">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFloorChange(2)}
                            className="bg-white/10 border-white/30 text-white"
                          >
                            <Compass className="mr-2 w-4 h-4" />
                            To Upper Floor
                          </Button>
                        </div>
                      )}
                      
                      {currentFloor === 2 && (
                        <div className="absolute left-8 bottom-8 bg-white/20 backdrop-blur-md border border-white/40 p-2 rounded-lg">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFloorChange(1)}
                            className="bg-white/10 border-white/30 text-white"
                          >
                            <Compass className="mr-2 w-4 h-4" />
                            To Ground Floor
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Back to Room View Button */}
              <div className="absolute bottom-4 right-4">
                <Button
                  variant="outline"
                  onClick={toggleViewMode}
                  className="bg-black/30 backdrop-blur-md border-white/10 text-white"
                >
                  <Camera className="mr-2 w-4 h-4" />
                  Back to Room View
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Room Selector Thumbnails */}
        <div className="flex overflow-x-auto gap-3 mt-6 pb-4 mx-auto max-w-4xl">
          {rooms.map((room, index) => (
            <button
              key={index}
              onClick={() => setCurrentRoomIndex(index)}
              className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all
                ${currentRoomIndex === index 
                  ? 'border-[#00689D] shadow-lg scale-105' 
                  : 'border-transparent opacity-70'}`}
            >
              <div className={`w-32 h-20 bg-gradient-to-br ${room.color} flex items-center justify-center`}>
                <div className="flex flex-col items-center">
                  {React.cloneElement(room.icon as React.ReactElement, { 
                    className: "w-4 h-4 mb-1 text-white" 
                  })}
                  <span className="text-xs text-white bg-black/50 px-2 py-1 rounded font-medium">
                    {room.name.split(' ')[0]}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}