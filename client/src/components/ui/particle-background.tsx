import React from 'react';

interface ParticleBackgroundProps {
  className?: string;
  colorMode?: 'light' | 'dark' | 'sdg';
  density?: 'low' | 'medium' | 'high';
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  className = '',
  colorMode = 'sdg',
  density = 'medium',
}) => {
  // Define color options based on colorMode
  const getGradient = () => {
    if (colorMode === 'light') {
      return 'from-slate-100/30 to-slate-200/50';
    } else if (colorMode === 'dark') {
      return 'from-slate-800/30 to-slate-900/50';
    } else if (colorMode === 'sdg') {
      // Sustainable Development Goals colors
      return 'from-[#00689D]/20 to-[#4C9F38]/20';
    }
    // Default fallback
    return 'from-[#00689D]/20 to-[#4C9F38]/20'; 
  };

  // Set number of particles based on density
  const getCount = () => {
    switch(density) {
      case 'low': return 30;
      case 'high': return 100;
      case 'medium':
      default: return 60;
    }
  };

  // Generate circles to simulate particles
  const renderParticles = () => {
    const count = getCount();
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      // Random positioning and sizing for each particle
      const size = Math.random() * 6 + 2; // between 2-8px
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const opacity = Math.random() * 0.5 + 0.1; // between 0.1-0.6
      const animationDelay = Math.random() * 10; // random animation delay
      const animationDuration = Math.random() * 10 + 10; // between 10-20s
      
      // Different colors based on colorMode
      let color = '#ffffff';
      if (colorMode === 'sdg') {
        // SDG Colors
        const sdgColors = [
          '#E5243B', // Red
          '#4C9F38', // Green
          '#00689D', // Blue
          '#FCC30B', // Yellow
          '#FD6925', // Orange
          '#8F1838'  // Burgundy
        ];
        color = sdgColors[Math.floor(Math.random() * sdgColors.length)];
      } else if (colorMode === 'dark') {
        color = '#ffffff';
      } else if (colorMode === 'light') {
        color = '#1e293b';
      }
      
      particles.push(
        <div 
          key={i}
          className="absolute rounded-full animate-pulse pointer-events-none"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            backgroundColor: color,
            opacity: opacity,
            animationDelay: `${animationDelay}s`,
            animationDuration: `${animationDuration}s`,
          }}
        />
      );
    }
    
    return particles;
  };
  
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()}`}></div>
      
      {/* Particle elements */}
      <div className="absolute inset-0">
        {renderParticles()}
      </div>
    </div>
  );
};

export default ParticleBackground;