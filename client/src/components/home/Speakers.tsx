import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

// Sample speaker data with placeholder images
const speakersData = [
  {
    id: 1,
    name: 'Dr. Rebecca Chen',
    role: 'Chief Data Scientist, National Statistics Office',
    bio: 'Expert in computational statistics and machine learning applications in public policy.',
    image: 'https://i.pravatar.cc/300?img=1',
    social: {
      twitter: '#',
      linkedin: '#',
      website: '#'
    }
  },
  {
    id: 2,
    name: 'Prof. Michael Johnson',
    role: 'Director, Institute for Advanced Analytics',
    bio: 'Pioneering researcher in statistical modeling for climate data and predictive analytics.',
    image: 'https://i.pravatar.cc/300?img=2',
    social: {
      twitter: '#',
      linkedin: '#',
      website: '#'
    }
  },
  {
    id: 3,
    name: 'Dr. Sarah Patel',
    role: 'Lead Statistician, World Health Organization',
    bio: 'Specialist in biostatistics and public health data analysis methodologies.',
    image: 'https://i.pravatar.cc/300?img=3',
    social: {
      twitter: '#',
      linkedin: '#',
      website: '#'
    }
  },
  {
    id: 4,
    name: 'Alex Rodriguez, PhD',
    role: 'Director of Data Science, TechStat Inc.',
    bio: 'Industry leader in business intelligence and statistical methods for market analysis.',
    image: 'https://i.pravatar.cc/300?img=4',
    social: {
      twitter: '#',
      linkedin: '#',
      website: '#'
    }
  },
  {
    id: 5,
    name: 'Dr. Mei Zhang',
    role: 'Professor of Statistical Science, Global University',
    bio: 'Researcher in advanced statistical methods and author of numerous publications on data science.',
    image: 'https://i.pravatar.cc/300?img=5',
    social: {
      twitter: '#',
      linkedin: '#',
      website: '#'
    }
  },
  {
    id: 6,
    name: 'Dr. James Wilson',
    role: 'Chief Economist, International Statistical Association',
    bio: 'Expert in econometrics and statistical modeling for economic forecasting and policy analysis.',
    image: 'https://i.pravatar.cc/300?img=6',
    social: {
      twitter: '#',
      linkedin: '#',
      website: '#'
    }
  }
];

const Speakers = () => {
  // Embla carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Mobile screen detection
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      if (emblaApi) {
        emblaApi.off('select', onSelect);
        emblaApi.off('reInit', onSelect);
      }
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="speakers" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Speakers</h2>
          <p className="text-lg text-neutral-600">
            Learn from leading experts in statistics, data science, and policy implementation from around the world.
          </p>
        </div>
        
        {/* Carousel for speakers */}
        <div className="relative px-4 md:px-10">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {speakersData.map((speaker) => (
                <div key={speaker.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden h-full transform transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="h-56 bg-gradient-to-r from-gray-200 to-gray-300 relative overflow-hidden">
                      <img 
                        src={speaker.image} 
                        alt={speaker.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 flex justify-center space-x-4 w-full">
                          <a href={speaker.social.twitter} className="text-white hover:text-[#FCC30B] transition-colors">
                            <i className="fab fa-twitter text-lg"></i>
                          </a>
                          <a href={speaker.social.linkedin} className="text-white hover:text-[#FCC30B] transition-colors">
                            <i className="fab fa-linkedin text-lg"></i>
                          </a>
                          <a href={speaker.social.website} className="text-white hover:text-[#FCC30B] transition-colors">
                            <i className="fas fa-globe text-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-1">{speaker.name}</h3>
                      <p className="text-sm text-[#00689D] mb-2">{speaker.role}</p>
                      <p className="text-sm text-neutral-600">{speaker.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-neutral-800 rounded-full p-2 shadow-md hover:bg-white transition-colors duration-200 z-10 hidden md:block"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-neutral-800 rounded-full p-2 shadow-md hover:bg-white transition-colors duration-200 z-10 hidden md:block"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Dots indicators for mobile */}
        {isMobile && (
          <div className="flex justify-center gap-2 mt-6">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === selectedIndex ? 'bg-[#00689D]' : 'bg-gray-300'
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        <div className="text-center mt-16">
          <a href="#register">
            <button 
              className="bg-white border border-[#00689D] text-[#00689D] hover:bg-[#00689D] hover:text-white transition-colors duration-300 rounded-full py-3 px-8 text-sm font-medium shadow-sm"
            >
              Become a Speaker <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Speakers;
