import { useState } from 'react';

// Sample speaker data
const speakersData = [
  {
    id: 1,
    name: 'Dr. Rebecca Chen',
    role: 'Chief Data Scientist, National Statistics Office',
    bio: 'Expert in computational statistics and machine learning applications in public policy.',
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
    social: {
      twitter: '#',
      linkedin: '#',
      website: '#'
    }
  }
];

const Speakers = () => {
  const [displayedSpeakers, setDisplayedSpeakers] = useState(4);
  
  const handleViewAll = () => {
    setDisplayedSpeakers(speakersData.length);
  };

  return (
    <section id="speakers" className="py-20 px-4 bg-neutral-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Speakers</h2>
          <p className="text-lg text-neutral-600">
            Learn from leading experts in statistics, data science, and policy implementation from around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakersData.slice(0, displayedSpeakers).map((speaker) => (
            <div key={speaker.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="h-48 bg-neutral-200 relative overflow-hidden">
                <div className="flex items-center justify-center h-full">
                  <i className="fas fa-user text-neutral-300 text-5xl"></i>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">{speaker.name}</h3>
                <p className="text-sm text-primary mb-2">{speaker.role}</p>
                <p className="text-sm text-neutral-600 mb-4">{speaker.bio}</p>
                <div className="flex gap-2">
                  <a href={speaker.social.twitter} className="text-neutral-400 hover:text-primary transition-colors">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href={speaker.social.linkedin} className="text-neutral-400 hover:text-primary transition-colors">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href={speaker.social.website} className="text-neutral-400 hover:text-primary transition-colors">
                    <i className="fas fa-globe"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {displayedSpeakers < speakersData.length && (
          <div className="text-center mt-10">
            <button 
              onClick={handleViewAll}
              className="bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 rounded-full py-2 px-6 text-sm font-medium"
            >
              View All Speakers <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Speakers;
