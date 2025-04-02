import React, { useState } from 'react';
import { Link } from 'wouter';
import { Search, Filter, Eye, ExternalLink, Download, BarChart4, MapPin, Users, Building, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/useTheme';

// SDG Colors
const SDG_COLORS = {
  primary: "#00689D", // SDG Blue
  secondary: "#4C9F38", // SDG Green
  accent: "#FD6925", // SDG Orange
  highlight: "#FCC30B", // SDG Yellow
  red: "#E5243B", // SDG Red
  purple: "#8F1838", // SDG Burgundy
};

// Types for exhibitors
type ExhibitorCategory = 'Government' | 'Academic' | 'Private' | 'NGO' | 'International';
type ExhibitorTier = 'Platinum' | 'Gold' | 'Silver' | 'Bronze' | 'Partner';

interface Exhibitor {
  id: number;
  name: string;
  logo: string;
  description: string;
  category: ExhibitorCategory;
  tier: ExhibitorTier;
  boothNumber: string;
  website?: string;
  specialEvents?: string[];
  resources?: {
    name: string;
    type: 'pdf' | 'data' | 'brochure' | 'video';
    url: string;
  }[];
  tags: string[];
  floor: number;
}

// Mock data for exhibitors
const exhibitors: Exhibitor[] = [
  {
    id: 1,
    name: "National Statistics Office",
    logo: "https://via.placeholder.com/150?text=NSO",
    description: "The central statistical authority of the government, providing quality statistics for evidence-based decision making.",
    category: 'Government',
    tier: 'Platinum',
    boothNumber: 'A1',
    website: 'https://example.com/nso',
    specialEvents: [
      'Data Visualization Workshop (Day 1, 13:00)',
      'Open Data Portal Launch (Day 2, 10:00)'
    ],
    resources: [
      { name: 'Annual Statistical Report', type: 'pdf', url: '#' },
      { name: 'Census Data Explorer', type: 'data', url: '#' }
    ],
    tags: ['Official Statistics', 'Census', 'Demographic Data'],
    floor: 1
  },
  {
    id: 2,
    name: "DataViz Solutions",
    logo: "https://via.placeholder.com/150?text=DataViz",
    description: "Leading provider of data visualization tools and services for statistical analysis and reporting.",
    category: 'Private',
    tier: 'Gold',
    boothNumber: 'B3',
    website: 'https://example.com/dataviz',
    specialEvents: [
      'Interactive Dashboard Demo (Day 1, 15:30)',
      'Data Storytelling Masterclass (Day 2, 14:00)'
    ],
    resources: [
      { name: 'Product Catalog', type: 'pdf', url: '#' },
      { name: 'Demo Videos', type: 'video', url: '#' }
    ],
    tags: ['Visualization', 'Analytics', 'Business Intelligence'],
    floor: 1
  },
  {
    id: 3,
    name: "University Statistical Research Center",
    logo: "https://via.placeholder.com/150?text=USRC",
    description: "Academic research center specializing in advanced statistical methodologies and their applications.",
    category: 'Academic',
    tier: 'Silver',
    boothNumber: 'C2',
    website: 'https://example.com/usrc',
    specialEvents: [
      'Research Methods Panel (Day 2, 11:00)',
      'Student Research Showcase (Day 3, 09:30)'
    ],
    resources: [
      { name: 'Research Papers Collection', type: 'pdf', url: '#' },
      { name: 'Statistical Software Tools', type: 'data', url: '#' }
    ],
    tags: ['Research', 'Academic', 'Methodology'],
    floor: 1
  },
  {
    id: 4,
    name: "Global Data Foundation",
    logo: "https://via.placeholder.com/150?text=GDF",
    description: "International non-profit organization promoting data literacy and statistical capacity building worldwide.",
    category: 'NGO',
    tier: 'Bronze',
    boothNumber: 'D5',
    website: 'https://example.com/gdf',
    specialEvents: [
      'Data for Development Forum (Day 1, 11:00)',
      'Global Statistics Challenges (Day 3, 13:30)'
    ],
    resources: [
      { name: 'Impact Report', type: 'pdf', url: '#' },
      { name: 'Training Materials', type: 'brochure', url: '#' }
    ],
    tags: ['International', 'Development', 'Capacity Building'],
    floor: 2
  },
  {
    id: 5,
    name: "Statistical Computing Institute",
    logo: "https://via.placeholder.com/150?text=SCI",
    description: "Specializing in computational statistics and machine learning algorithms for complex data analysis.",
    category: 'Academic',
    tier: 'Gold',
    boothNumber: 'B1',
    website: 'https://example.com/sci',
    specialEvents: [
      'AI in Statistics Workshop (Day 2, 15:00)',
      'Coding Competition (Day 3, 10:00)'
    ],
    resources: [
      { name: 'Algorithm Repository', type: 'data', url: '#' },
      { name: 'Tutorial Videos', type: 'video', url: '#' }
    ],
    tags: ['Computing', 'Machine Learning', 'Algorithms'],
    floor: 1
  },
  {
    id: 6,
    name: "United Nations Statistical Division",
    logo: "https://via.placeholder.com/150?text=UNSD",
    description: "International organization working to develop and implement global statistical standards and methods.",
    category: 'International',
    tier: 'Platinum',
    boothNumber: 'A2',
    website: 'https://example.com/unsd',
    specialEvents: [
      'SDG Monitoring Workshop (Day 1, 14:00)',
      'International Statistics Cooperation Forum (Day 2, 09:00)'
    ],
    resources: [
      { name: 'Global Statistical Standards', type: 'pdf', url: '#' },
      { name: 'SDG Data Explorer', type: 'data', url: '#' }
    ],
    tags: ['International', 'Standards', 'SDG'],
    floor: 1
  },
  {
    id: 7,
    name: "Survey Systems Inc.",
    logo: "https://via.placeholder.com/150?text=SSI",
    description: "Leading provider of survey software and methodologies for quantitative and qualitative research.",
    category: 'Private',
    tier: 'Silver',
    boothNumber: 'C4',
    website: 'https://example.com/ssi',
    specialEvents: [
      'Mobile Survey Innovations (Day 1, 16:00)',
      'Real-time Data Collection Demo (Day 3, 11:30)'
    ],
    resources: [
      { name: 'Product Brochure', type: 'brochure', url: '#' },
      { name: 'Case Studies', type: 'pdf', url: '#' }
    ],
    tags: ['Surveys', 'Data Collection', 'Research'],
    floor: 1
  },
  {
    id: 8,
    name: "Economic Analysis Bureau",
    logo: "https://via.placeholder.com/150?text=EAB",
    description: "Government agency responsible for economic statistics, analysis, and forecasting.",
    category: 'Government',
    tier: 'Gold',
    boothNumber: 'B2',
    website: 'https://example.com/eab',
    specialEvents: [
      'Economic Indicators Briefing (Day 2, 13:00)',
      'Forecasting Models Workshop (Day 3, 14:00)'
    ],
    resources: [
      { name: 'Economic Reports', type: 'pdf', url: '#' },
      { name: 'Data Dashboards', type: 'data', url: '#' }
    ],
    tags: ['Economics', 'Forecasting', 'Policy'],
    floor: 1
  },
  {
    id: 9,
    name: "Health Statistics Association",
    logo: "https://via.placeholder.com/150?text=HSA",
    description: "Professional association dedicated to improving health statistics and their application in healthcare policy.",
    category: 'NGO',
    tier: 'Silver',
    boothNumber: 'C5',
    website: 'https://example.com/hsa',
    specialEvents: [
      'Health Data Ethics Panel (Day 1, 09:30)',
      'Public Health Indicators Workshop (Day 2, 16:00)'
    ],
    resources: [
      { name: 'Journal Publications', type: 'pdf', url: '#' },
      { name: 'Policy Briefs', type: 'brochure', url: '#' }
    ],
    tags: ['Health', 'Policy', 'Epidemiology'],
    floor: 2
  },
  {
    id: 10,
    name: "GeoStats Technologies",
    logo: "https://via.placeholder.com/150?text=GeoStats",
    description: "Specializing in geospatial statistics and location-based analytics solutions.",
    category: 'Private',
    tier: 'Bronze',
    boothNumber: 'D2',
    website: 'https://example.com/geostats',
    specialEvents: [
      'Spatial Analysis Demo (Day 2, 11:30)',
      'Mapping Workshop (Day 3, 15:30)'
    ],
    resources: [
      { name: 'Solution Overview', type: 'pdf', url: '#' },
      { name: 'Map Gallery', type: 'data', url: '#' }
    ],
    tags: ['Geospatial', 'Mapping', 'Location Analysis'],
    floor: 2
  },
  {
    id: 11,
    name: "Regional Development Institute",
    logo: "https://via.placeholder.com/150?text=RDI",
    description: "Research institution focused on regional economic and social development statistics.",
    category: 'Academic',
    tier: 'Partner',
    boothNumber: 'E3',
    website: 'https://example.com/rdi',
    specialEvents: [
      'Regional Inequality Forum (Day 1, 10:30)',
      'Development Metrics Workshop (Day 3, 09:00)'
    ],
    resources: [
      { name: 'Research Reports', type: 'pdf', url: '#' },
      { name: 'Regional Database Access', type: 'data', url: '#' }
    ],
    tags: ['Regional', 'Development', 'Economics'],
    floor: 2
  },
  {
    id: 12,
    name: "Statistical Software Solutions",
    logo: "https://via.placeholder.com/150?text=SSS",
    description: "Developer of specialized statistical software packages for various industries and applications.",
    category: 'Private',
    tier: 'Gold',
    boothNumber: 'B4',
    website: 'https://example.com/sss',
    specialEvents: [
      'New Software Release Demo (Day 1, 14:30)',
      'Advanced Analytics Tutorial (Day 2, 15:30)'
    ],
    resources: [
      { name: 'Software Catalog', type: 'brochure', url: '#' },
      { name: 'Tutorial Videos', type: 'video', url: '#' }
    ],
    tags: ['Software', 'Analytics', 'Programming'],
    floor: 1
  }
];

// Tier badge styling
const tierStyles: Record<ExhibitorTier, {color: string, bg: string}> = {
  'Platinum': { color: 'text-gray-800', bg: 'bg-gray-200' },
  'Gold': { color: 'text-amber-800', bg: 'bg-amber-100' },
  'Silver': { color: 'text-gray-700', bg: 'bg-gray-100' },
  'Bronze': { color: 'text-orange-800', bg: 'bg-orange-100' },
  'Partner': { color: 'text-purple-800', bg: 'bg-purple-100' }
};

// Category styling
const categoryStyles: Record<ExhibitorCategory, {color: string}> = {
  'Government': { color: 'text-sdg-blue' },
  'Academic': { color: 'text-sdg-green' },
  'Private': { color: 'text-sdg-orange' },
  'NGO': { color: 'text-sdg-burgundy' },
  'International': { color: 'text-sdg-red' }
};

// Component to display individual exhibitor card
const ExhibitorCard: React.FC<{ exhibitor: Exhibitor }> = ({ exhibitor }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();
  
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        {/* Logo Section */}
        <div className="w-full md:w-32 h-32 flex items-center justify-center p-4 bg-muted/30">
          <img 
            src={exhibitor.logo} 
            alt={`${exhibitor.name} logo`} 
            className="max-w-full max-h-full object-contain" 
          />
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold">{exhibitor.name}</h3>
                <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${tierStyles[exhibitor.tier].bg} ${tierStyles[exhibitor.tier].color}`}>
                  {exhibitor.tier}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-sm ${categoryStyles[exhibitor.category].color}`}>
                  {exhibitor.category}
                </span>
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>Booth {exhibitor.boothNumber}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                  <Building className="w-3 h-3" />
                  <span>Floor {exhibitor.floor}</span>
                </div>
              </div>
            </div>
            
            {exhibitor.website && (
              <a 
                href={exhibitor.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary flex items-center gap-1 hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                Visit Website
              </a>
            )}
          </div>
          
          <p className="text-sm text-card-foreground mb-3 line-clamp-2">
            {exhibitor.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {exhibitor.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-primary flex items-center gap-1 hover:underline"
            >
              <Eye className="w-3 h-3" />
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
            
            {exhibitor.specialEvents && (
              <div className="text-xs text-muted-foreground">
                {exhibitor.specialEvents.length} special events
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-border p-4 bg-muted/20">
          {/* Special Events Section */}
          {exhibitor.specialEvents && exhibitor.specialEvents.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary" />
                Special Events
              </h4>
              <ul className="space-y-1">
                {exhibitor.specialEvents.map((event, index) => (
                  <li key={index} className="text-xs flex items-start gap-1.5 text-card-foreground">
                    <CheckCircle2 className="w-3 h-3 text-secondary mt-0.5 flex-shrink-0" />
                    {event}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Resources Section */}
          {exhibitor.resources && exhibitor.resources.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-primary" />
                Available Resources
              </h4>
              <div className="flex flex-wrap gap-2">
                {exhibitor.resources.map((resource, index) => (
                  <a 
                    key={index}
                    href={resource.url}
                    className="text-xs px-3 py-1.5 rounded-md bg-background border border-border flex items-center gap-1.5 hover:bg-muted transition-colors"
                  >
                    {resource.type === 'pdf' && <i className="fas fa-file-pdf text-red-500"></i>}
                    {resource.type === 'data' && <BarChart4 className="w-3 h-3 text-primary" />}
                    {resource.type === 'brochure' && <i className="fas fa-book text-blue-500"></i>}
                    {resource.type === 'video' && <i className="fas fa-video text-purple-500"></i>}
                    {resource.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ExhibitorListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExhibitorCategory | 'All'>('All');
  const [selectedFloor, setSelectedFloor] = useState<number | 'All'>('All');
  
  // Filter exhibitors based on search, category, and floor
  const filteredExhibitors = exhibitors.filter(exhibitor => {
    const matchesSearch = exhibitor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          exhibitor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exhibitor.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || exhibitor.category === selectedCategory;
    const matchesFloor = selectedFloor === 'All' || exhibitor.floor === selectedFloor;
    
    return matchesSearch && matchesCategory && matchesFloor;
  });

  // Group exhibitors by tier for "Featured" tab
  const exhibitorsByTier = {
    'Platinum': exhibitors.filter(e => e.tier === 'Platinum'),
    'Gold': exhibitors.filter(e => e.tier === 'Gold'),
    'Silver': exhibitors.filter(e => e.tier === 'Silver'),
    'Bronze': exhibitors.filter(e => e.tier === 'Bronze'),
    'Partner': exhibitors.filter(e => e.tier === 'Partner')
  };
  
  return (
    <div className="py-16 px-4 bg-background min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span>Exhibitors & Sponsors</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Explore Our Exhibitors</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with leading organizations in statistics, data science, and research. 
            Visit their booths to discover the latest tools, research, and opportunities in the field.
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="mb-8 bg-card p-6 rounded-xl border border-border">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search exhibitors by name, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ExhibitorCategory | 'All')}
                className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
              >
                <option value="All">All Categories</option>
                <option value="Government">Government</option>
                <option value="Academic">Academic</option>
                <option value="Private">Private</option>
                <option value="NGO">NGO</option>
                <option value="International">International</option>
              </select>
              
              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
              >
                <option value="All">All Floors</option>
                <option value="1">Floor 1</option>
                <option value="2">Floor 2</option>
              </select>
              
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedFloor('All');
                }}
                className="px-3 py-2 border border-input rounded-md hover:bg-muted transition-colors flex items-center gap-1.5 bg-background"
              >
                <Filter className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Showing {filteredExhibitors.length} of {exhibitors.length} exhibitors
          </div>
        </div>
        
        {/* Tabs for different views */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Exhibitors</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="byCategory">By Category</TabsTrigger>
          </TabsList>
          
          {/* All Exhibitors Tab */}
          <TabsContent value="all">
            <div className="grid gap-6">
              {filteredExhibitors.length > 0 ? (
                filteredExhibitors.map(exhibitor => (
                  <ExhibitorCard key={exhibitor.id} exhibitor={exhibitor} />
                ))
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-lg border border-border">
                  <p className="text-muted-foreground">No exhibitors match your search criteria</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                      setSelectedFloor('All');
                    }}
                    className="mt-3 text-primary hover:underline text-sm"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Featured Tab */}
          <TabsContent value="featured">
            <div className="space-y-12">
              {Object.entries(exhibitorsByTier).map(([tier, tierExhibitors]) => (
                tierExhibitors.length > 0 && (
                  <div key={tier} className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border">
                      {tier} Exhibitors
                    </h2>
                    <div className="grid gap-6">
                      {tierExhibitors.map(exhibitor => (
                        <ExhibitorCard key={exhibitor.id} exhibitor={exhibitor} />
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </TabsContent>
          
          {/* By Category Tab */}
          <TabsContent value="byCategory">
            <div className="space-y-12">
              {(['Government', 'Academic', 'Private', 'NGO', 'International'] as ExhibitorCategory[]).map(category => {
                const categoryExhibitors = exhibitors.filter(e => e.category === category);
                return categoryExhibitors.length > 0 && (
                  <div key={category} className="space-y-4">
                    <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b border-border ${categoryStyles[category].color}`}>
                      {category} Organizations
                    </h2>
                    <div className="grid gap-6">
                      {categoryExhibitors.map(exhibitor => (
                        <ExhibitorCard key={exhibitor.id} exhibitor={exhibitor} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Floor Plan Integration */}
        <div className="mt-16 bg-card p-6 rounded-xl border border-border">
          <h2 className="text-2xl font-semibold mb-4">Exhibition Floor Plan</h2>
          <div className="p-8 border border-dashed border-border rounded-lg bg-muted/20 flex flex-col items-center justify-center">
            <BuildingIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground mb-3">
              Interactive floor plan with exhibitor locations will be available closer to the event
            </p>
            <Link href="/virtual-tour">
              <a className="text-primary hover:underline text-sm font-medium flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                Take a virtual tour instead
              </a>
            </Link>
          </div>
        </div>
        
        {/* Registration Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Want to exhibit at NCS 2025?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Showcase your organization's products, services, and research to over 2,500 statistics professionals, policy makers, and data scientists.
          </p>
          <Link href="/contact">
            <a className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-medium transition-colors hover:bg-primary/90">
              Contact Us About Exhibiting
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

const BuildingIcon = (props: any) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M1 22V7l10-5 10 5v15" />
    <path d="M4 10v12" />
    <path d="M7 10v12" />
    <path d="M10 10v12" />
    <path d="M13 10v12" />
    <path d="M16 10v12" />
    <path d="M19 10v12" />
    <path d="M1 22h22" />
  </svg>
);

export default ExhibitorListPage;