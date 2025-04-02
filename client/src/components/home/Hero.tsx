import { useCountdown } from "@/hooks/useCountdown";

const Hero = () => {
  const { days, hours, minutes, seconds } = useCountdown(new Date('September 15, 2025 00:00:00'));

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden bg-neutral-50">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23F1F1F1'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat"
      }}></div>
      <div className="absolute -top-64 -right-64 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-accent/10 blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <i className="fas fa-calendar-alt mr-2"></i>
              <span>September 15-17, 2025</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              National Convention on <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Statistics 2025</span>
            </h1>
            
            <p className="text-lg text-neutral-600 mb-8 max-w-xl">
              Join us for a transformative experience empowering data-driven decision-making and showcasing innovation in the field of statistics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="#register">
                <button className="bg-gradient-to-r from-primary to-accent text-white rounded-full py-3 px-8 text-base font-medium hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
                  <span>Register Now</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </a>
              <button className="bg-white border border-neutral-300 text-neutral-800 rounded-full py-3 px-8 text-base font-medium hover:border-primary hover:text-primary transition-colors duration-300 flex items-center justify-center">
                <i className="fas fa-play-circle mr-2"></i>
                <span>Watch Teaser</span>
              </button>
            </div>
            
            {/* Countdown Timer */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <h3 className="text-sm font-semibold text-neutral-600 mb-4">Event Starts In:</h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-neutral-50 rounded-lg p-3">
                  <div className="text-2xl md:text-3xl font-mono font-bold text-primary" id="days">{days}</div>
                  <div className="text-xs text-neutral-600">Days</div>
                </div>
                <div className="bg-neutral-50 rounded-lg p-3">
                  <div className="text-2xl md:text-3xl font-mono font-bold text-primary" id="hours">{hours}</div>
                  <div className="text-xs text-neutral-600">Hours</div>
                </div>
                <div className="bg-neutral-50 rounded-lg p-3">
                  <div className="text-2xl md:text-3xl font-mono font-bold text-primary" id="minutes">{minutes}</div>
                  <div className="text-xs text-neutral-600">Minutes</div>
                </div>
                <div className="bg-neutral-50 rounded-lg p-3">
                  <div className="text-2xl md:text-3xl font-mono font-bold text-primary" id="seconds">{seconds}</div>
                  <div className="text-xs text-neutral-600">Seconds</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Interactive 3D Chart Placeholder */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-accent p-6 shadow-lg aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
              </div>
              <div className="relative z-10 h-full flex flex-col justify-center items-center">
                <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col justify-center items-center">
                  <i className="fas fa-chart-line text-white text-6xl mb-6"></i>
                  <p className="text-white text-center font-medium">Interactive Data Visualization</p>
                  <p className="text-white/80 text-center text-sm mt-2">Explore statistical trends and insights</p>
                  <button className="mt-6 bg-white text-primary rounded-full py-2 px-6 text-sm font-medium hover:bg-primary/10 hover:text-white transition-colors duration-300">
                    Explore Data
                  </button>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-violet-500/30 rounded-full blur-xl"></div>
            </div>
            
            {/* Event Highlights */}
            <div className="absolute -bottom-10 -left-10 bg-white rounded-xl shadow-lg p-4 w-48">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-600">
                  <i className="fas fa-users"></i>
                </div>
                <div>
                  <p className="text-xs text-neutral-600">Attendees</p>
                  <p className="text-lg font-bold font-mono">2,500+</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 w-48">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-600">
                  <i className="fas fa-microphone"></i>
                </div>
                <div>
                  <p className="text-xs text-neutral-600">Speakers</p>
                  <p className="text-lg font-bold font-mono">50+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Partners/Sponsors */}
        <div className="mt-16 pt-8 border-t border-neutral-200">
          <p className="text-neutral-600 text-center text-sm mb-6">Supported by leading organizations in statistics and data science</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="w-20 h-12 bg-neutral-200 rounded flex items-center justify-center">
              <span className="text-neutral-500 text-xs">Partner 1</span>
            </div>
            <div className="w-20 h-12 bg-neutral-200 rounded flex items-center justify-center">
              <span className="text-neutral-500 text-xs">Partner 2</span>
            </div>
            <div className="w-20 h-12 bg-neutral-200 rounded flex items-center justify-center">
              <span className="text-neutral-500 text-xs">Partner 3</span>
            </div>
            <div className="w-20 h-12 bg-neutral-200 rounded flex items-center justify-center">
              <span className="text-neutral-500 text-xs">Partner 4</span>
            </div>
            <div className="w-20 h-12 bg-neutral-200 rounded flex items-center justify-center">
              <span className="text-neutral-500 text-xs">Partner 5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
