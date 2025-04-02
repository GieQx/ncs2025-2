import { useState } from 'react';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';

// Sample agenda data
const agendaData = {
  day1: [
    {
      id: 1,
      time: '09:00 AM',
      duration: '60 min',
      title: 'Opening Keynote: The Future of Statistical Analysis',
      location: 'Main Hall',
      locationType: 'secondary',
      description: 'An inspiring talk on how statistical methodologies are evolving to meet the challenges of complex data environments.',
      speaker: {
        name: 'Dr. Rebecca Chen',
        role: 'Chief Data Scientist, National Statistics Office'
      }
    },
    {
      id: 2,
      time: '10:30 AM',
      duration: '90 min',
      title: 'Workshop: Advanced Techniques in Data Visualization',
      location: 'Workshop Room A',
      locationType: 'accent',
      description: 'A hands-on session exploring effective ways to communicate complex statistical findings through visualization techniques.',
      speaker: {
        name: 'Prof. Michael Johnson',
        role: 'Director, Institute for Advanced Analytics'
      }
    },
    {
      id: 3,
      time: '01:00 PM',
      duration: '60 min',
      title: 'Panel Discussion: Ethics in Data Science and Statistics',
      location: 'Main Hall',
      locationType: 'secondary',
      description: 'A critical conversation about ethical considerations in statistical analysis and data-driven decision making.',
      panelists: [
        { name: 'Dr. Sarah Patel' },
        { name: 'Alex Rodriguez, PhD' },
        { name: 'Dr. James Wilson' }
      ]
    }
  ],
  day2: [
    {
      id: 4,
      time: '09:00 AM',
      duration: '60 min',
      title: 'Keynote: Statistical Innovations in Public Health',
      location: 'Main Hall',
      locationType: 'secondary',
      description: 'Exploring the role of statistics in advancing public health initiatives globally.',
      speaker: {
        name: 'Dr. Sarah Patel',
        role: 'Lead Statistician, World Health Organization'
      }
    }
  ],
  day3: [
    {
      id: 7,
      time: '09:00 AM',
      duration: '60 min',
      title: 'Closing Keynote: The Future of Data-Driven Decision Making',
      location: 'Main Hall',
      locationType: 'secondary',
      description: 'A visionary talk on how statistics will continue to shape policy and strategy in the coming decade.',
      speaker: {
        name: 'Alex Rodriguez, PhD',
        role: 'Director of Data Science, TechStat Inc.'
      }
    }
  ]
};

const Agenda = () => {
  const [activeDay, setActiveDay] = useState('day1');
  const { addToGoogleCalendar } = useGoogleCalendar();

  const handleAddToCalendar = () => {
    addToGoogleCalendar({
      title: 'National Convention on Statistics 2025',
      description: 'A transformative experience empowering data-driven decision-making and showcasing innovation in the field of statistics.',
      location: 'National Convention Center, 123 Statistical Avenue, Data City',
      startDate: new Date('September 15, 2025 09:00:00'),
      endDate: new Date('September 17, 2025 17:00:00')
    });
  };

  const renderSessions = (day: string) => {
    const sessions = agendaData[day as keyof typeof agendaData] || [];
    
    return (
      <div className="max-w-4xl mx-auto">
        {sessions.map((session) => (
          <div key={session.id} className="flex gap-4 mb-8">
            <div className="w-24 flex-shrink-0">
              <div className="bg-primary/10 rounded-lg p-3 text-center">
                <p className="text-primary font-bold">{session.time}</p>
                <p className="text-xs text-neutral-600">{session.duration}</p>
              </div>
            </div>
            <div className="flex-grow bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg">{session.title}</h3>
                <span className={`bg-${session.locationType}/10 text-${session.locationType} text-xs px-3 py-1 rounded-full`}>
                  {session.location}
                </span>
              </div>
              <p className="text-neutral-600 mb-4">{session.description}</p>
              
              {session.speaker ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="flex items-center justify-center h-full">
                      <i className="fas fa-user text-neutral-300 text-sm"></i>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{session.speaker.name}</p>
                    <p className="text-xs text-neutral-600">{session.speaker.role}</p>
                  </div>
                </div>
              ) : session.panelists ? (
                <div className="flex flex-wrap gap-3">
                  {session.panelists.map((panelist, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-neutral-200 rounded-full overflow-hidden">
                        <div className="flex items-center justify-center h-full">
                          <i className="fas fa-user text-neutral-300 text-xs"></i>
                        </div>
                      </div>
                      <p className="text-sm font-medium">{panelist.name}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="agenda" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Event Agenda</h2>
          <p className="text-lg text-neutral-600">
            Browse the comprehensive schedule of keynotes, workshops, panel discussions, and networking opportunities.
          </p>
          <div className="flex justify-center mt-6">
            <button 
              onClick={handleAddToCalendar}
              className="bg-primary text-white rounded-full py-2 px-6 text-sm font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center"
            >
              <i className="fas fa-calendar-alt mr-2"></i>
              <span>Add to Google Calendar</span>
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-full bg-neutral-100 p-1">
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeDay === 'day1' ? 'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-200'}`}
              onClick={() => setActiveDay('day1')}
            >
              Day 1
            </button>
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeDay === 'day2' ? 'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-200'}`}
              onClick={() => setActiveDay('day2')}
            >
              Day 2
            </button>
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeDay === 'day3' ? 'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-200'}`}
              onClick={() => setActiveDay('day3')}
            >
              Day 3
            </button>
          </div>
        </div>
        
        {/* Timeline */}
        {renderSessions(activeDay)}
        
        <div className="text-center mt-10">
          <button className="bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 rounded-full py-2 px-6 text-sm font-medium">
            View Full Schedule <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Agenda;
