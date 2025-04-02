import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Speakers from "@/components/home/Speakers";
import Agenda from "@/components/home/Agenda";
import DataVisualization from "@/components/home/DataVisualization";
import Resources from "@/components/home/Resources";
import Networking from "@/components/home/Networking";
import Registration from "@/components/home/Registration";
import { useEffect } from "react";

const HomePage = () => {
  // Smooth scroll to sections when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Handle hash on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="font-sans text-neutral-800 bg-white">
      <Header />
      <Hero />
      <About />
      <Speakers />
      <Agenda />
      <DataVisualization />
      <Resources />
      <Networking />
      <Registration />
      <Footer />
    </div>
  );
};

export default HomePage;
