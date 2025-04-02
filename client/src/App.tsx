import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import ExhibitorListPage from "@/pages/ExhibitorListPage";
import AttendeeGuidePage from "@/pages/AttendeeGuidePage";
import { useEffect, useState } from "react";
import ChatWidget from "@/components/chat/ChatWidget";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/exhibitors" component={ExhibitorListPage} />
      <Route path="/attendee-guide" component={AttendeeGuidePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add delay to ensure CSS is fully loaded
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
          <i className="fas fa-chart-bar text-white text-2xl"></i>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ChatWidget />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
