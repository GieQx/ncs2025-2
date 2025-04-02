const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Empowering Data-Driven Decision Making</h2>
          <p className="text-lg text-neutral-600">
            The National Convention on Statistics 2025 brings together industry leaders, policymakers, researchers, and data scientists to explore the transformative power of statistics in shaping national policies and strategies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-neutral-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <i className="fas fa-brain text-primary"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Expert Insights</h3>
            <p className="text-neutral-600">
              Learn from renowned statisticians, data scientists, and industry leaders sharing cutting-edge methodologies and applications.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-neutral-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 rounded-lg bg-green-600/10 flex items-center justify-center mb-4">
              <i className="fas fa-handshake text-green-600"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Networking Opportunities</h3>
            <p className="text-neutral-600">
              Connect with peers, mentors, and potential collaborators through dedicated networking sessions and interactive platforms.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-neutral-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 rounded-lg bg-violet-600/10 flex items-center justify-center mb-4">
              <i className="fas fa-laptop-code text-violet-600"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Hands-On Workshops</h3>
            <p className="text-neutral-600">
              Participate in practical sessions exploring the latest statistical tools, software, and methodologies through guided exercises.
            </p>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-bold mb-4">What to Expect</h3>
            <p className="text-neutral-600 mb-6">
              NCS 2025 offers a comprehensive program designed to educate, inspire, and connect professionals in the field of statistics and data science.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                  <i className="fas fa-check text-xs"></i>
                </div>
                <div>
                  <h4 className="font-medium">Keynote Presentations</h4>
                  <p className="text-sm text-neutral-600">Thought-provoking talks from leaders in statistics and data science</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                  <i className="fas fa-check text-xs"></i>
                </div>
                <div>
                  <h4 className="font-medium">Panel Discussions</h4>
                  <p className="text-sm text-neutral-600">Engaging debates on current trends and future directions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                  <i className="fas fa-check text-xs"></i>
                </div>
                <div>
                  <h4 className="font-medium">Technical Workshops</h4>
                  <p className="text-sm text-neutral-600">Practical sessions on statistical methodologies and tools</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                  <i className="fas fa-check text-xs"></i>
                </div>
                <div>
                  <h4 className="font-medium">Networking Events</h4>
                  <p className="text-sm text-neutral-600">Structured opportunities to connect with fellow professionals</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                  <i className="fas fa-check text-xs"></i>
                </div>
                <div>
                  <h4 className="font-medium">Exhibition Area</h4>
                  <p className="text-sm text-neutral-600">Showcase of the latest statistical tools and technologies</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Virtual Tour Preview */}
              <div className="rounded-xl overflow-hidden bg-neutral-200 aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-transparent flex items-end p-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">Virtual Venue Tour</h4>
                    <p className="text-white/80 text-sm mb-4">Explore the convention center before you arrive</p>
                    <button className="bg-white text-primary rounded-full py-2 px-4 text-sm font-medium hover:bg-primary/10 hover:text-white transition-colors duration-300 flex items-center">
                      <i className="fas fa-vr-cardboard mr-2"></i>
                      <span>Start Tour</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center h-full">
                  <i className="fas fa-building text-neutral-300 text-5xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
