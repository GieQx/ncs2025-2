import { useState } from 'react';

// Sample data for attendees
const attendeesData = [
  {
    id: 1,
    name: 'Emma Thompson',
    role: 'Data Scientist, National Research Institute'
  },
  {
    id: 2,
    name: 'David Kim',
    role: 'Statistical Analyst, Department of Economics'
  },
  {
    id: 3,
    name: 'Maria Garcia',
    role: 'Research Statistician, Global Health Initiative'
  }
];

// Sample data for live Q&A sessions
const qaSessionsData = [
  {
    id: 1,
    speaker: 'Dr. Rebecca Chen',
    topic: 'Statistical Methods in Public Policy',
    status: 'live',
    viewers: 125
  },
  {
    id: 2,
    speaker: 'Prof. Michael Johnson',
    topic: 'Climate Data Analysis Techniques',
    status: 'upcoming',
    timeToStart: '2h 15m'
  }
];

// Sample data for networking events
const networkingEventsData = [
  {
    id: 1,
    title: 'Young Statisticians Meetup',
    time: 'Day 1, 6:00 PM',
    description: 'Networking event for early-career statisticians and data scientists to connect and share experiences.',
    attendees: 42
  },
  {
    id: 2,
    title: 'Industry & Academia Collaboration Forum',
    time: 'Day 2, 7:30 PM',
    description: 'Structured networking session to foster partnerships between academic researchers and industry practitioners.',
    attendees: 78
  }
];

const Networking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(['Data Science', 'Public Policy']);

  const removeFilter = (filter: string) => {
    setFilters(filters.filter(f => f !== filter));
  };

  const addFilter = () => {
    // In a real implementation, this would open a filter selection modal
    alert('Add filter functionality would be implemented here');
  };

  return (
    <section id="networking" className="py-20 px-4 bg-neutral-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Connect & Collaborate</h2>
          <p className="text-lg text-neutral-600">
            Build valuable professional relationships and find collaboration opportunities with fellow attendees.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Attendee Networking */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-2xl font-bold mb-6">Attendee Networking Hub</h3>
            <p className="text-neutral-600 mb-8">
              Connect with other professionals based on shared interests, expertise, or research areas.
            </p>
            
            {/* Search and Filter */}
            <div className="mb-8">
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="Search attendees by name, organization, or expertise" 
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-10 pr-4 py-3 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"></i>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {filters.map((filter, index) => (
                  <span key={index} className="bg-neutral-100 text-neutral-700 rounded-full px-3 py-1 text-xs flex items-center">
                    {filter}
                    <button 
                      className="ml-2 text-neutral-500 hover:text-neutral-700"
                      onClick={() => removeFilter(filter)}
                      aria-label={`Remove ${filter} filter`}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
                <button 
                  className="bg-white border border-neutral-300 text-neutral-700 rounded-full px-3 py-1 text-xs hover:border-primary hover:text-primary transition-colors"
                  onClick={addFilter}
                >
                  + Add Filter
                </button>
              </div>
            </div>
            
            {/* Attendee List */}
            <div className="space-y-4 mb-8">
              {attendeesData.map((attendee) => (
                <div key={attendee.id} className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg hover:border-primary hover:bg-neutral-50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="flex items-center justify-center h-full">
                      <i className="fas fa-user text-neutral-300"></i>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{attendee.name}</h4>
                    <p className="text-sm text-neutral-600">{attendee.role}</p>
                  </div>
                  <button className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <i className="fas fa-plus text-xs"></i>
                  </button>
                </div>
              ))}
            </div>
            
            <button className="w-full bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 rounded-full py-2 px-6 text-sm font-medium">
              View All Attendees
            </button>
          </div>
          
          {/* Live Sessions & Networking Events */}
          <div className="space-y-8">
            {/* Live Q&A */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold">Live Q&A Sessions</h3>
                <span className="bg-violet-500/10 text-violet-600 text-xs px-3 py-1 rounded-full">Live Now</span>
              </div>
              <p className="text-neutral-600 mb-6">
                Join ongoing Q&A sessions with speakers and experts to ask questions and participate in discussions.
              </p>
              
              <div className="space-y-4 mb-8">
                {qaSessionsData.map((session) => (
                  session.status === 'live' ? (
                    <div key={session.id} className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-neutral-200 rounded-full overflow-hidden">
                          <div className="flex items-center justify-center h-full">
                            <i className="fas fa-user text-neutral-300 text-sm"></i>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">{session.speaker}</h4>
                          <p className="text-xs text-neutral-600">Discussing "{session.topic}"</p>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">LIVE</span>
                          <span className="text-xs text-neutral-600">{session.viewers} viewers</span>
                        </div>
                      </div>
                      <button className="w-full bg-primary text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition-colors">
                        Join Session
                      </button>
                    </div>
                  ) : (
                    <div key={session.id} className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-neutral-200 rounded-full overflow-hidden">
                          <div className="flex items-center justify-center h-full">
                            <i className="fas fa-user text-neutral-300 text-sm"></i>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">{session.speaker}</h4>
                          <p className="text-xs text-neutral-600">Q&A on "{session.topic}"</p>
                        </div>
                        <div className="ml-auto">
                          <span className="text-xs text-neutral-600">Starts in {session.timeToStart}</span>
                        </div>
                      </div>
                      <button className="w-full bg-white border border-primary text-primary rounded-lg py-2 text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                        Set Reminder
                      </button>
                    </div>
                  )
                ))}
              </div>
            </div>
            
            {/* Networking Events */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-2xl font-bold mb-6">Networking Events</h3>
              <p className="text-neutral-600 mb-6">
                Join scheduled networking sessions designed to connect professionals with similar interests.
              </p>
              
              <div className="space-y-4">
                {networkingEventsData.map((event) => (
                  <div key={event.id} className="border border-neutral-200 rounded-lg p-4 hover:border-green-600 hover:bg-green-500/5 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <span className="text-xs text-neutral-600">{event.time}</span>
                    </div>
                    <p className="text-sm text-neutral-600 mb-3">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-500">{event.attendees} attending</span>
                      <button className="bg-green-600 text-white rounded-full py-1 px-4 text-xs font-medium hover:bg-green-700 transition-colors">
                        Join Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Networking;
