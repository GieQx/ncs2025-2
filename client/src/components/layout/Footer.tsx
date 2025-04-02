const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <i className="fas fa-chart-bar text-white"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">NCS<span className="text-blue-400">2025</span></h2>
                <p className="text-xs text-neutral-400">National Convention on Statistics</p>
              </div>
            </div>
            
            <p className="text-neutral-400 mb-6">
              Empowering data-driven decision-making through statistical innovation and collaboration.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-neutral-400 hover:text-white transition-colors">About the Event</a></li>
              <li><a href="#speakers" className="text-neutral-400 hover:text-white transition-colors">Speakers & Presenters</a></li>
              <li><a href="#agenda" className="text-neutral-400 hover:text-white transition-colors">Event Schedule</a></li>
              <li><a href="#visualizations" className="text-neutral-400 hover:text-white transition-colors">Data Insights</a></li>
              <li><a href="#resources" className="text-neutral-400 hover:text-white transition-colors">Resources</a></li>
              <li><a href="#networking" className="text-neutral-400 hover:text-white transition-colors">Networking</a></li>
              <li><a href="#register" className="text-neutral-400 hover:text-white transition-colors">Registration</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-neutral-400 mt-1"></i>
                <span className="text-neutral-400">National Convention Center<br/>123 Statistical Avenue<br/>Data City, DC 10101</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-neutral-400"></i>
                <a href="mailto:info@ncs2025.org" className="text-neutral-400 hover:text-white transition-colors">info@ncs2025.org</a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone text-neutral-400"></i>
                <a href="tel:+11234567890" className="text-neutral-400 hover:text-white transition-colors">+1 (123) 456-7890</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Subscribe to Updates</h3>
            <p className="text-neutral-400 mb-4">
              Stay informed about speaker announcements, early bird deadlines, and special offers.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-2 text-white"
                  aria-label="Email for newsletter subscription"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            &copy; 2025 National Convention on Statistics. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
