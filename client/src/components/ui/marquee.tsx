import React, { ReactNode, useRef, useEffect, useState } from 'react';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: number; // pixels per second
  pauseOnHover?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  className = '',
  speed = 40,
  pauseOnHover = true,
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasEnoughContent, setHasEnoughContent] = useState(false);
  const speedRef = useRef(speed);
  
  // Set initial dimensions
  useEffect(() => {
    const calculateDimensions = () => {
      if (marqueeRef.current && containerRef.current) {
        const contentWidth = marqueeRef.current.offsetWidth;
        const containerWidth = containerRef.current.offsetWidth;
        
        setContentWidth(contentWidth);
        setContainerWidth(containerWidth);
        setHasEnoughContent(contentWidth > containerWidth);
      }
    };
    
    calculateDimensions();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateDimensions);
    
    return () => {
      window.removeEventListener('resize', calculateDimensions);
    };
  }, [children]);
  
  // Update speed reference if speed prop changes
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);
  
  // Calculate animation duration based on content width and speed
  const calculateDuration = () => {
    if (contentWidth <= 0) return 0;
    return contentWidth / speedRef.current;
  };
  
  const duration = calculateDuration();
  
  // Style for the animation
  const animationStyle = hasEnoughContent
    ? {
        animationDuration: `${duration}s`,
        animationPlayState: isPaused ? 'paused' : 'running',
      }
    : {};
  
  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="inline-flex">
        <div 
          ref={marqueeRef}
          className={hasEnoughContent ? "animate-marquee inline-flex" : "inline-flex"}
          style={animationStyle}
        >
          {children}
        </div>
        
        {hasEnoughContent && (
          <div 
            className="animate-marquee inline-flex" 
            style={{
              ...animationStyle,
              animationDelay: `-${duration / 2}s`,
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};