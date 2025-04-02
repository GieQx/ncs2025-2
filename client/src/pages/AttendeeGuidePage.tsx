import React, { useState } from 'react';
import { Link } from 'wouter';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Coffee, 
  Users, 
  Wifi, 
  Utensils, 
  Car, 
  Phone, 
  Clock as AlarmClock, 
  Bus, 
  Luggage as Suitcase, 
  Bed as BedDouble, 
  Landmark, 
  BadgeInfo, 
  HelpCircle, 
  Lightbulb, 
  PenTool, 
  Star, 
  Download,
  X,
  Check
} from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useTheme } from '@/hooks/useTheme';
import { EVENT_DATE, EVENT_END_DATE, EVENT_LOCATION } from '@/lib/constants';

// SDG Colors
const SDG_COLORS = {
  primary: "#00689D", // SDG Blue
  secondary: "#4C9F38", // SDG Green
  accent: "#FD6925", // SDG Orange
  highlight: "#FCC30B", // SDG Yellow
  red: "#E5243B", // SDG Red
  purple: "#8F1838", // SDG Burgundy
};

// Format date to display day and month
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

// Game system for attendee engagement
interface GameMission {
  id: number;
  title: string;
  description: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'networking' | 'learning' | 'exploration' | 'social';
  icon: React.ReactNode;
  isCompleted?: boolean;
}

const AttendeeGuidePage: React.FC = () => {
  const { theme } = useTheme();
  const [tabValue, setTabValue] = useState('essentials');
  const [showGameModal, setShowGameModal] = useState(false);
  const [missions, setMissions] = useState<GameMission[]>([
    {
      id: 1,
      title: "Meet 5 Attendees",
      description: "Introduce yourself to at least 5 other attendees and exchange contact information.",
      points: 100,
      difficulty: 'easy',
      category: 'networking',
      icon: <Users className="h-5 w-5" />,
      isCompleted: false
    },
    {
      id: 2,
      title: "Visit 3 Exhibitors",
      description: "Visit at least 3 exhibitor booths and learn about their products or services.",
      points: 150,
      difficulty: 'easy',
      category: 'exploration',
      icon: <MapPin className="h-5 w-5" />,
      isCompleted: false
    },
    {
      id: 3,
      title: "Attend a Workshop",
      description: "Participate in one of the interactive workshops during the convention.",
      points: 200,
      difficulty: 'medium',
      category: 'learning',
      icon: <PenTool className="h-5 w-5" />,
      isCompleted: false
    },
    {
      id: 4,
      title: "Share on Social Media",
      description: "Post about something you learned at the conference with the official hashtag #NCS2025.",
      points: 100,
      difficulty: 'easy',
      category: 'social',
      icon: <Star className="h-5 w-5" />,
      isCompleted: false
    },
    {
      id: 5,
      title: "Ask a Question",
      description: "Ask a meaningful question during a presentation or panel discussion.",
      points: 150,
      difficulty: 'medium',
      category: 'learning',
      icon: <HelpCircle className="h-5 w-5" />,
      isCompleted: false
    },
    {
      id: 6,
      title: "Complete Virtual Tour",
      description: "Go through the entire virtual tour of the convention venue.",
      points: 100,
      difficulty: 'easy',
      category: 'exploration',
      icon: <Landmark className="h-5 w-5" />,
      isCompleted: false
    },
    {
      id: 7,
      title: "Contribute to Discussion",
      description: "Contribute to a discussion board or forum topic on the convention platform.",
      points: 125,
      difficulty: 'medium',
      category: 'networking',
      icon: <Lightbulb className="h-5 w-5" />,
      isCompleted: false
    }
  ]);
  
  // Toggle mission completion status
  const toggleMissionCompletion = (id: number) => {
    setMissions(prev => 
      prev.map(mission => 
        mission.id === id 
          ? { ...mission, isCompleted: !mission.isCompleted } 
          : mission
      )
    );
  };
  
  // Calculate total points
  const totalPoints = missions.reduce((sum, mission) => {
    return sum + (mission.isCompleted ? mission.points : 0);
  }, 0);
  
  // Calculate progress percentage
  const completedMissions = missions.filter(m => m.isCompleted).length;
  const progressPercentage = (completedMissions / missions.length) * 100;
  
  return (
    <div className="py-16 px-4 bg-background min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(EVENT_DATE)} - {formatDate(EVENT_END_DATE)}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Attendee Guide</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know to make the most of your experience at the National Convention on Statistics 2025.
          </p>
        </div>
        
        {/* Game System Button */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => setShowGameModal(true)}
            className="px-5 py-3 rounded-full bg-gradient-to-r from-[#4C9F38] to-[#00689D] text-white font-medium flex items-center gap-2 hover:shadow-lg transition-shadow"
          >
            <Star className="h-5 w-5" />
            <span>Convention Challenge</span>
            <Badge variant="outline" className="bg-white/10 border-white/20 text-white ml-1">
              {completedMissions}/{missions.length}
            </Badge>
          </button>
        </div>
        
        {/* Navigation Tabs */}
        <Tabs value={tabValue} onValueChange={setTabValue} className="mb-8">
          <div className="flex justify-center">
            <TabsList className="mb-8">
              <TabsTrigger value="essentials">Essentials</TabsTrigger>
              <TabsTrigger value="venue">Venue</TabsTrigger>
              <TabsTrigger value="travel">Travel & Accommodation</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Essentials Tab */}
          <TabsContent value="essentials">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Registration & Check-in */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BadgeInfo className="h-5 w-5 text-primary" />
                    Registration & Check-in
                  </CardTitle>
                  <CardDescription>Important information for arriving at the convention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Registration Hours</h4>
                        <ul className="text-sm text-muted-foreground">
                          <li>September 14 (Pre-day): 2:00 PM - 7:00 PM</li>
                          <li>September 15-17: 7:30 AM - 5:00 PM</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Registration Location</h4>
                        <p className="text-sm text-muted-foreground">Main Lobby, Ground Floor</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Suitcase className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium">What to Bring</h4>
                        <ul className="text-sm text-muted-foreground">
                          <li>Photo ID</li>
                          <li>Registration confirmation email (printed or on mobile)</li>
                          <li>Payment receipt (if applicable)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/registration">
                    <a className="text-primary text-sm hover:underline">Need to register? Click here</a>
                  </Link>
                </CardFooter>
              </Card>
              
              {/* Daily Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Daily Schedule
                  </CardTitle>
                  <CardDescription>General schedule of activities each day</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="border-l-2 border-primary/30 pl-4 py-1">
                      <p className="text-sm font-medium">7:30 AM - 9:00 AM</p>
                      <p className="text-muted-foreground">Registration & Breakfast</p>
                    </div>
                    
                    <div className="border-l-2 border-primary/30 pl-4 py-1">
                      <p className="text-sm font-medium">9:00 AM - 10:30 AM</p>
                      <p className="text-muted-foreground">Morning Keynote Sessions</p>
                    </div>
                    
                    <div className="border-l-2 border-primary/30 pl-4 py-1">
                      <p className="text-sm font-medium">10:45 AM - 12:15 PM</p>
                      <p className="text-muted-foreground">Concurrent Sessions & Workshops</p>
                    </div>
                    
                    <div className="border-l-2 border-primary/30 pl-4 py-1">
                      <p className="text-sm font-medium">12:15 PM - 1:30 PM</p>
                      <p className="text-muted-foreground">Lunch & Networking</p>
                    </div>
                    
                    <div className="border-l-2 border-primary/30 pl-4 py-1">
                      <p className="text-sm font-medium">1:30 PM - 4:30 PM</p>
                      <p className="text-muted-foreground">Afternoon Sessions & Panel Discussions</p>
                    </div>
                    
                    <div className="border-l-2 border-primary/30 pl-4 py-1">
                      <p className="text-sm font-medium">4:45 PM - 6:00 PM</p>
                      <p className="text-muted-foreground">Special Events & Networking Reception</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/agenda">
                    <a className="text-primary text-sm hover:underline">View detailed agenda</a>
                  </Link>
                </CardFooter>
              </Card>
              
              {/* What to Bring */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Suitcase className="h-5 w-5 text-primary" />
                    What to Bring
                  </CardTitle>
                  <CardDescription>Essential items for a productive convention experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                        <span className="text-xs">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Business Cards</p>
                        <p className="text-sm text-muted-foreground">For easy networking and contact exchange</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                        <span className="text-xs">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Laptop/Tablet & Charger</p>
                        <p className="text-sm text-muted-foreground">For note-taking and accessing digital materials</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                        <span className="text-xs">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Reusable Water Bottle</p>
                        <p className="text-sm text-muted-foreground">Water stations are available throughout the venue</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                        <span className="text-xs">4</span>
                      </div>
                      <div>
                        <p className="font-medium">Comfortable Shoes</p>
                        <p className="text-sm text-muted-foreground">You'll be on your feet exploring the convention</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                        <span className="text-xs">5</span>
                      </div>
                      <div>
                        <p className="font-medium">Power Bank</p>
                        <p className="text-sm text-muted-foreground">Keep your devices charged throughout the day</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Digital Access */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wifi className="h-5 w-5 text-primary" />
                    Digital Access
                  </CardTitle>
                  <CardDescription>How to stay connected during the convention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="font-medium">Wi-Fi Information</p>
                      <div className="text-sm">
                        <p>Network: <span className="font-mono">NCS2025-Guest</span></p>
                        <p>Password: <span className="font-mono">Stats2025</span></p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">Mobile App</p>
                      <p className="text-sm text-muted-foreground">
                        Download our official conference app for session schedules, speaker information, networking features, and real-time updates.
                      </p>
                      <div className="flex gap-2 mt-2">
                        <button className="text-xs bg-primary/10 px-3 py-1 rounded-full text-primary">iOS App</button>
                        <button className="text-xs bg-secondary/10 px-3 py-1 rounded-full text-secondary">Android App</button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">Digital Program</p>
                      <p className="text-sm text-muted-foreground">
                        Access all conference materials, including presentation slides and supplementary resources.
                      </p>
                      <button className="text-primary text-sm flex items-center gap-1 mt-2 hover:underline">
                        <Download className="h-4 w-4" />
                        Download Program PDF
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Venue Tab */}
          <TabsContent value="venue">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Venue Overview */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Landmark className="h-5 w-5 text-primary" />
                      Venue Overview
                    </CardTitle>
                    <CardDescription>National Convention Center, 123 Statistical Avenue, Data City</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                      <img 
                        src="https://via.placeholder.com/1200x600?text=Convention+Center+Map" 
                        alt="Convention Center Map" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-muted-foreground">
                      The National Convention Center features state-of-the-art facilities, including multiple presentation halls, workshop rooms, exhibition spaces, and networking areas spread across two floors.
                    </p>
                    <div className="mt-4">
                      <Link href="/virtual-tour">
                        <a className="text-primary flex items-center gap-1 hover:underline">
                          <MapPin className="h-4 w-4" />
                          Take a Virtual Tour
                        </a>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coffee className="h-5 w-5 text-primary" />
                    Amenities
                  </CardTitle>
                  <CardDescription>Services and facilities available at the venue</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Wifi className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Free Wi-Fi</p>
                        <p className="text-sm text-muted-foreground">High-speed internet throughout the venue</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-3">
                      <Utensils className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Food & Beverages</p>
                        <p className="text-sm text-muted-foreground">Multiple cafes and food stations on both floors</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Information Desks</p>
                        <p className="text-sm text-muted-foreground">Located at the main entrance and on each floor</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Meeting Lounges</p>
                        <p className="text-sm text-muted-foreground">Quiet spaces for networking and discussion</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-3">
                      <i className="fas fa-charging-station text-primary" style={{fontSize: '20px'}}></i>
                      <div>
                        <p className="font-medium">Charging Stations</p>
                        <p className="text-sm text-muted-foreground">Available throughout the venue</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Accessibility */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <i className="fas fa-universal-access text-primary" style={{fontSize: '20px'}}></i>
                    Accessibility
                  </CardTitle>
                  <CardDescription>Ensuring everyone can participate fully</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <i className="fas fa-wheelchair text-primary" style={{fontSize: '20px'}}></i>
                      <div>
                        <p className="font-medium">Wheelchair Access</p>
                        <p className="text-sm text-muted-foreground">All areas are wheelchair accessible with ramps and elevators</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-3">
                      <i className="fas fa-american-sign-language-interpreting text-primary" style={{fontSize: '20px'}}></i>
                      <div>
                        <p className="font-medium">Sign Language Interpretation</p>
                        <p className="text-sm text-muted-foreground">Available for all keynote sessions (request in advance)</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-3">
                      <i className="fas fa-assistive-listening-systems text-primary" style={{fontSize: '20px'}}></i>
                      <div>
                        <p className="font-medium">Assistive Listening Devices</p>
                        <p className="text-sm text-muted-foreground">Available at the information desk</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-3">
                      <i className="fas fa-baby text-primary" style={{fontSize: '20px'}}></i>
                      <div>
                        <p className="font-medium">Nursing Room</p>
                        <p className="text-sm text-muted-foreground">Private space available on the second floor</p>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="mt-4 bg-muted/30 p-3 rounded-lg">
                    <p className="text-sm">
                      If you require any accessibility accommodations not listed here, please contact us at <span className="text-primary">accessibility@ncs2025.org</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Travel & Accommodation Tab */}
          <TabsContent value="travel">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Getting There */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bus className="h-5 w-5 text-primary" />
                    Getting to the Venue
                  </CardTitle>
                  <CardDescription>Transportation options to reach the convention center</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-plane text-primary" style={{fontSize: '20px'}}></i>
                      <div>
                        <p className="font-medium">From the Airport</p>
                        <ul className="text-sm text-muted-foreground">
                          <li>Taxi: Approximately 30 minutes, $35-45</li>
                          <li>Airport Shuttle: Available hourly, $15 one-way</li>
                          <li>Public Transit: Take Airport Express Bus to Central Station, then Metro Line B to Convention Center Station</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Bus className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Public Transportation</p>
                        <ul className="text-sm text-muted-foreground">
                          <li>Metro: Convention Center Station (Line B), adjacent to venue</li>
                          <li>Bus: Routes 42, 67, and 103 stop directly outside</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Car className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Parking</p>
                        <p className="text-sm text-muted-foreground">
                          On-site parking available for $20/day. Early arrival recommended as spaces fill quickly. Additional parking available at nearby Central Garage ($15/day).
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Accommodation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BedDouble className="h-5 w-5 text-primary" />
                    Accommodation
                  </CardTitle>
                  <CardDescription>Hotel recommendations and special rates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    The following hotels offer special rates for convention attendees. Use code <span className="font-mono bg-primary/10 text-primary px-1 py-0.5 rounded">NCS2025</span> when booking.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-3 border border-border rounded-lg">
                      <p className="font-medium">Statistics Grand Hotel</p>
                      <div className="text-sm text-muted-foreground">
                        <p>Adjacent to the convention center</p>
                        <p>$189/night (special rate, includes breakfast)</p>
                        <a href="#" className="text-primary text-xs hover:underline">Book Now</a>
                      </div>
                    </div>
                    
                    <div className="p-3 border border-border rounded-lg">
                      <p className="font-medium">City Center Suites</p>
                      <div className="text-sm text-muted-foreground">
                        <p>0.5 miles from venue, shuttle service available</p>
                        <p>$149/night (special rate)</p>
                        <a href="#" className="text-primary text-xs hover:underline">Book Now</a>
                      </div>
                    </div>
                    
                    <div className="p-3 border border-border rounded-lg">
                      <p className="font-medium">Academic Lodge</p>
                      <div className="text-sm text-muted-foreground">
                        <p>Budget-friendly option, 1 mile from venue</p>
                        <p>$99/night (special rate)</p>
                        <a href="#" className="text-primary text-xs hover:underline">Book Now</a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm">
                    <p className="font-medium">Booking Deadline</p>
                    <p className="text-muted-foreground">Special rates available until August 15, 2025</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Local Information */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Local Information
                  </CardTitle>
                  <CardDescription>Useful information about the area around the venue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium flex items-center gap-1 mb-2">
                        <Utensils className="h-4 w-4 text-primary" />
                        Dining Options
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>Statistical Cafe (in venue) - Quick bites</li>
                        <li>Data Diner (across street) - Casual dining</li>
                        <li>Analytics Bistro (0.3 miles) - Fine dining</li>
                        <li>Regression Restaurant (0.5 miles) - Local cuisine</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium flex items-center gap-1 mb-2">
                        <i className="fas fa-building text-primary" style={{fontSize: '16px'}}></i>
                        Nearby Attractions
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>Science Museum (0.7 miles)</li>
                        <li>Central Park (0.4 miles)</li>
                        <li>Art Gallery (1 mile)</li>
                        <li>Historical District (1.2 miles)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium flex items-center gap-1 mb-2">
                        <i className="fas fa-briefcase-medical text-primary" style={{fontSize: '16px'}}></i>
                        Practical Information
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>Nearest Pharmacy: HealthPoint (0.2 miles)</li>
                        <li>Urgent Care: City Medical Center (0.8 miles)</li>
                        <li>ATM: In main lobby of venue</li>
                        <li>Convenience Store: Quick Mart (adjacent to venue)</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-muted/30 p-3 rounded-lg">
                    <p className="text-sm">
                      Download our City Guide PDF for more detailed information on local attractions, restaurants, and services.
                    </p>
                    <button className="text-primary text-sm flex items-center gap-1 mt-2 hover:underline">
                      <Download className="h-4 w-4" />
                      Download City Guide
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* FAQ Tab */}
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Answers to common questions about the convention</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What's included in my registration?</AccordionTrigger>
                    <AccordionContent>
                      <p>Your registration includes:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                        <li>Access to all general sessions and keynotes</li>
                        <li>Entry to concurrent sessions and workshops (space permitting)</li>
                        <li>Access to the exhibition hall</li>
                        <li>Conference materials and digital program</li>
                        <li>Breakfast, lunch, and refreshments during breaks</li>
                        <li>Networking events</li>
                        <li>Access to post-convention presentations and materials</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What's the dress code for the convention?</AccordionTrigger>
                    <AccordionContent>
                      <p>The recommended dress code is business casual for all convention sessions and events. The venue is fully air-conditioned, so we recommend bringing a light jacket or sweater as meeting rooms can be cool.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Are meals provided during the convention?</AccordionTrigger>
                    <AccordionContent>
                      <p>Yes, your registration includes:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                        <li>Continental breakfast each morning</li>
                        <li>Buffet lunch each day</li>
                        <li>Coffee, tea, and refreshments during scheduled breaks</li>
                        <li>Welcome reception appetizers (Day 1 evening)</li>
                      </ul>
                      <p className="mt-2">Please note any dietary restrictions during registration so we can accommodate your needs.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I get a certificate of attendance?</AccordionTrigger>
                    <AccordionContent>
                      <p>Yes, certificates of attendance will be available to all registered participants. You can request your certificate at the registration desk or download it from your profile on the convention website after the event.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Is there Wi-Fi available at the venue?</AccordionTrigger>
                    <AccordionContent>
                      <p>Yes, complimentary high-speed Wi-Fi is available throughout the convention center. Network details will be provided in your welcome packet and displayed throughout the venue.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6">
                    <AccordionTrigger>Will presentations be available after the convention?</AccordionTrigger>
                    <AccordionContent>
                      <p>Yes, presentations will be made available to registered attendees via our online portal approximately one week after the convention ends. You'll receive an email with access instructions.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-7">
                    <AccordionTrigger>What if I need to cancel my registration?</AccordionTrigger>
                    <AccordionContent>
                      <p>Cancellation requests received before August 15, 2025 will receive a full refund minus a $50 processing fee. Cancellations between August 16 and September 1, 2025 will receive a 50% refund. No refunds will be issued for cancellations after September 1, 2025, but you may transfer your registration to a colleague at no additional cost.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-8">
                    <AccordionTrigger>How can I get involved as a volunteer?</AccordionTrigger>
                    <AccordionContent>
                      <p>We welcome volunteer assistance! Volunteers receive discounted registration and special recognition. Please email volunteers@ncs2025.org for information on volunteer opportunities and requirements.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-9">
                    <AccordionTrigger>Is there a mobile app for the convention?</AccordionTrigger>
                    <AccordionContent>
                      <p>Yes, our official mobile app will be available for download two weeks before the convention. The app includes the full program, personalized schedule builder, speaker information, venue maps, networking features, and real-time updates.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-10">
                    <AccordionTrigger>Who do I contact if I have additional questions?</AccordionTrigger>
                    <AccordionContent>
                      <p>For additional questions, please contact:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                        <li>Registration questions: registration@ncs2025.org</li>
                        <li>Program inquiries: program@ncs2025.org</li>
                        <li>Exhibitor information: exhibits@ncs2025.org</li>
                        <li>General information: info@ncs2025.org</li>
                        <li>Phone support: +1 (555) 123-4567 (M-F, 9am-5pm EST)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Can't find an answer to your question? Contact us at <span className="text-primary">info@ncs2025.org</span>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Contact Information */}
        <div className="mt-16 bg-card p-6 rounded-xl border border-border">
          <h2 className="text-2xl font-semibold mb-4">Need Assistance?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Attendee Support</h3>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                <p className="text-sm text-muted-foreground">attendees@ncs2025.org</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <AlarmClock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Convention Hours</h3>
                <p className="text-sm text-muted-foreground">September 15-17, 2025</p>
                <p className="text-sm text-muted-foreground">7:30 AM - 6:00 PM Daily</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">On-Site Assistance</h3>
                <p className="text-sm text-muted-foreground">Information Desks at Main Entrance</p>
                <p className="text-sm text-muted-foreground">Volunteer Staff (look for blue badges)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Game Modal */}
      {showGameModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">NCS2025 Convention Challenge</h2>
                <button 
                  onClick={() => setShowGameModal(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Your Progress</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{completedMissions}/{missions.length} Missions Completed</span>
                    <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
                      {totalPoints} Points
                    </Badge>
                  </div>
                </div>
                
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">{Math.round(progressPercentage)}%</span>
                  </div>
                  <svg className="h-16 w-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 28}
                      strokeDashoffset={2 * Math.PI * 28 * (1 - progressPercentage / 100)}
                      className="text-primary"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-2">Missions</h3>
                {missions.map((mission) => (
                  <div 
                    key={mission.id} 
                    className={`p-4 rounded-lg border ${mission.isCompleted ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${mission.isCompleted ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}>
                          {mission.icon}
                        </div>
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            {mission.title}
                            <Badge className={`${
                              mission.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                              mission.difficulty === 'medium' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                              'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                            }`}>
                              {mission.difficulty}
                            </Badge>
                          </h4>
                          <p className="text-sm text-muted-foreground">{mission.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-lg">{mission.points} pts</span>
                        <div 
                          onClick={() => toggleMissionCompletion(mission.id)}
                          className={`h-6 w-6 rounded-full border flex items-center justify-center cursor-pointer ${
                            mission.isCompleted ? 'bg-primary border-primary text-white' : 'border-muted-foreground'
                          }`}
                        >
                          {mission.isCompleted && <Check size={16} />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 border-t border-border pt-4">
                <h3 className="text-lg font-medium mb-2">Rewards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg border ${totalPoints >= 250 ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${totalPoints >= 250 ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}>
                        <i className="fas fa-coffee"></i>
                      </div>
                      <div>
                        <h4 className="font-medium">Free Coffee Voucher</h4>
                        <p className="text-sm text-muted-foreground">Earn 250 points to unlock</p>
                        {totalPoints >= 250 && (
                          <span className="text-xs text-primary mt-1 inline-block">Unlocked! Show this to cafe staff</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${totalPoints >= 500 ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${totalPoints >= 500 ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}>
                        <i className="fas fa-book"></i>
                      </div>
                      <div>
                        <h4 className="font-medium">Digital Resource Pack</h4>
                        <p className="text-sm text-muted-foreground">Earn 500 points to unlock</p>
                        {totalPoints >= 500 && (
                          <span className="text-xs text-primary mt-1 inline-block">Unlocked! Check your email</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${totalPoints >= 750 ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${totalPoints >= 750 ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}>
                        <i className="fas fa-ticket-alt"></i>
                      </div>
                      <div>
                        <h4 className="font-medium">VIP Lounge Access</h4>
                        <p className="text-sm text-muted-foreground">Earn 750 points to unlock</p>
                        {totalPoints >= 750 && (
                          <span className="text-xs text-primary mt-1 inline-block">Unlocked! Visit information desk</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${totalPoints >= 1000 ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${totalPoints >= 1000 ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}>
                        <i className="fas fa-award"></i>
                      </div>
                      <div>
                        <h4 className="font-medium">Convention Champion Badge</h4>
                        <p className="text-sm text-muted-foreground">Earn 1000 points to unlock</p>
                        {totalPoints >= 1000 && (
                          <span className="text-xs text-primary mt-1 inline-block">Unlocked! Added to your profile</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border p-4 flex justify-end gap-3">
              <button
                onClick={() => setShowGameModal(false)}
                className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                Close
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Share Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendeeGuidePage;