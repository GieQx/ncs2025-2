import React from 'react';
import { Marquee } from '@/components/ui/marquee';
import { 
  Calendar, 
  Landmark, 
  Presentation, 
  Users, 
  Lightbulb, 
  Award, 
  Globe, 
  BookOpen 
} from 'lucide-react';

type MarqueeItem = {
  icon: React.ReactNode;
  text: string;
  highlight?: string;
};

export default function MarqueeSection() {
  const marqueeItems: MarqueeItem[] = [
    {
      icon: <Calendar className="w-5 h-5 text-[#FCC30B]" />,
      text: "Event dates: September 15-17, 2025",
    },
    {
      icon: <Landmark className="w-5 h-5 text-[#4C9F38]" />,
      text: "Venue: National Convention Center",
    },
    {
      icon: <Presentation className="w-5 h-5 text-[#00689D]" />,
      text: "50+ speakers from around the globe",
    },
    {
      icon: <Users className="w-5 h-5 text-[#FD6925]" />,
      text: "Expected attendance: 2,500+ statisticians and data scientists",
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-[#E5243B]" />,
      text: "100+ presentations on cutting-edge statistical methods",
    },
    {
      icon: <Award className="w-5 h-5 text-[#FCC30B]" />,
      text: "Annual statistical excellence awards ceremony",
    },
    {
      icon: <Globe className="w-5 h-5 text-[#4C9F38]" />,
      text: "International representation from 30+ countries",
    },
    {
      icon: <BookOpen className="w-5 h-5 text-[#00689D]" />,
      text: "Publishing opportunities in leading journals",
    },
  ];

  const MarqueeCard = ({ item }: { item: MarqueeItem }) => {
    return (
      <div className="flex items-center bg-black/40 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 mx-4">
        <span className="mr-3">{item.icon}</span>
        <span className="text-white whitespace-nowrap font-medium">
          {item.text}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-r from-[#00689D]/80 to-[#4C9F38]/80 py-2 relative overflow-hidden">
      {/* Overlays for fade effect */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#00689D] to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#4C9F38] to-transparent z-10"></div>
      
      <Marquee speed={25} className="py-2">
        {marqueeItems.map((item, index) => (
          <MarqueeCard key={index} item={item} />
        ))}
      </Marquee>
    </div>
  );
}