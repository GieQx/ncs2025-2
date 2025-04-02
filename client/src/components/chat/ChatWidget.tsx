import { useState, useRef, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { 
  AlertCircle, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Database, 
  Lightbulb, 
  Loader2, 
  Send, 
  X, 
  RefreshCw,
  Mic,
  MessageSquare,
  HelpCircle,
  ThumbsUp
} from 'lucide-react';



// SDG Colors - Sustainable Development Goals
const SDG_COLORS = {
  primary: "#00689D", // SDG Blue
  secondary: "#4C9F38", // SDG Green
  accent: "#FD6925", // SDG Orange
  highlight: "#FCC30B", // SDG Yellow
  red: "#E5243B", // SDG Red
  purple: "#8F1838", // SDG Burgundy
  teal: "#009688" // Teal
};

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: Source[];
};

type Source = {
  title: string;
  url?: string;
  snippet: string;
};

const initialMessage: Message = {
  id: '1',
  text: "Hello! I'm StatBot, your AI assistant for the National Convention on Statistics 2025. How can I help you with information about the event, speakers, agenda, or other details?",
  isUser: false,
  timestamp: new Date()
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [showSources, setShowSources] = useState<{[key: string]: boolean}>({});
  const [termsAgreed, setTermsAgreed] = useState(false);
  // Always show terms until agreed
  const [showTerms, setShowTerms] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    // Make sure terms are shown when chat is opened if not agreed yet
    if (!termsAgreed) {
      setShowTerms(true);
    }
  };

  const handleToggleSources = (messageId: string) => {
    setShowSources(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };
  
  const handleResetChat = () => {
    setMessages([initialMessage]);
    setInput('');
    setShowSources({});
  };
  
  const handleAgreeToTerms = () => {
    setTermsAgreed(true);
    setShowTerms(false);
  };
  
  const handleAboutChat = () => {
    alert('StatBot is powered by AI and provides information about the National Convention on Statistics 2025. It uses the official event documentation to answer your questions accurately.');
  };
  
  const handleFeedback = () => {
    alert('Thank you for your interest in providing feedback. The feedback feature will be available soon.');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Send message to AI and get response
      const response = await apiRequest('POST', '/api/chat', { message: input });
      const data = await response.json();
      
      // Mock sources for demonstration (this will come from the backend in the real implementation)
      const mockSources = [
        {
          title: "NCS 2025 - Speaker Information",
          url: "#speakers",
          snippet: "Information about conference speakers, including their backgrounds and presentation topics."
        },
        {
          title: "Convention Agenda",
          url: "#agenda",
          snippet: "Detailed schedule of all sessions, workshops, and networking events."
        }
      ];
      
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        isUser: false,
        timestamp: new Date(),
        sources: data.sources || mockSources // Use actual sources if available, otherwise use mock
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message to AI:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Suggested questions for easy access
  const suggestedQuestions = [
    "When is the convention?",
    "Who are the keynote speakers?",
    "What topics will be covered?",
    "How can I register?"
  ];

  const handleSuggestedQuestion = (question: string) => {
    // Set the input and immediately submit
    setInput(question);
    
    // Use setTimeout to ensure state update before submission
    setTimeout(() => {
      const formEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSendMessage(formEvent);
    }, 0);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-background rounded-2xl shadow-xl w-80 md:w-96 transition-all transform origin-bottom-right border border-border overflow-hidden flex flex-col" style={{ maxHeight: 'calc(100vh - 100px)' }}>
          {/* Header - Material UI Style */}
          <div className="p-4 bg-gradient-to-r from-[#4C9F38] to-[#00689D] flex justify-between items-center flex-shrink-0 shadow-sm rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shadow-sm">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">StatBot Assistant</h3>
                <p className="text-white/70 text-xs">Powered by NCS 2025 Knowledge Base</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Reset Chat Button */}
              <button 
                onClick={handleResetChat}
                className="text-white/80 hover:text-white w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200"
                aria-label="Reset conversation"
                title="Reset conversation"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button 
                onClick={handleToggleChat}
                className="text-white/80 hover:text-white w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200"
                aria-label="Minimize chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="p-4 overflow-y-auto flex-grow" id="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 ${message.isUser ? 'flex justify-end' : 'flex justify-start'}`}>
                <div className={`${
                  message.isUser 
                    ? 'bg-[#00689D] text-white' 
                    : 'bg-muted text-foreground'
                  } rounded-2xl p-3 max-w-[90%] shadow-sm`}>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  
                  {/* Sources Section */}
                  {!message.isUser && message.sources && message.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-200/20">
                      <button 
                        onClick={() => handleToggleSources(message.id)}
                        className="flex items-center gap-1 text-xs text-white/80 hover:text-white/100"
                      >
                        <Database className="w-3 h-3" />
                        <span>Sources ({message.sources.length})</span>
                        {showSources[message.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                      
                      {showSources[message.id] && (
                        <div className="mt-2 space-y-2">
                          {message.sources.map((source, index) => (
                            <div key={index} className="bg-black/10 rounded p-2 text-xs">
                              <div className="font-medium">{source.title}</div>
                              <div className="text-white/80 mt-1">{source.snippet}</div>
                              {source.url && (
                                <a 
                                  href={source.url} 
                                  className="inline-block mt-1 text-[#FCC30B] hover:underline"
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                >
                                  View source
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="mb-4 flex justify-start">
                <div className="bg-muted rounded-2xl p-3 max-w-[90%] shadow-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                    <span className="text-sm text-muted-foreground">Searching for information...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggested Questions */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 py-2 bg-muted/50 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                <span>Suggested questions:</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-xs bg-background border border-border text-foreground rounded-full px-3 py-1 hover:bg-muted transition-colors duration-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Terms Agreement */}
          {!termsAgreed && showTerms ? (
            <div className="p-4 border-t border-border flex-shrink-0 bg-background">
              <div className="bg-gradient-to-r from-[#4C9F38]/20 to-[#00689D]/20 p-4 rounded-lg mb-3 border border-[#00689D]/30">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#FD6925]" />
                  Terms of Use Agreement Required
                </h4>
                <p className="text-sm text-foreground mb-3">
                  To use the StatBot assistant, please read and agree to the following terms:
                </p>
                <ul className="text-xs text-muted-foreground list-disc pl-4 mb-4 space-y-2">
                  <li>The AI assistant provides information about the NCS 2025 event</li>
                  <li>Responses are generated from the event's knowledge base</li>
                  <li>Information is for reference only and may be updated</li>
                  <li>No personal data is stored beyond this session</li>
                </ul>
                <button 
                  onClick={handleAgreeToTerms}
                  className="w-full bg-[#00689D] text-white rounded-md py-3 mt-2 text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#00689D]/90 transition-colors shadow-md"
                >
                  <Check className="w-4 h-4" />
                  I agree to these terms
                </button>
              </div>
            </div>
          ) : (
            /* Input Form */
            <div className="p-4 border-t border-border flex-shrink-0 bg-background">
              <form onSubmit={handleSendMessage} className="relative">
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="Ask about the convention..." 
                  className="w-full bg-muted border-none rounded-full px-4 py-3 pr-12 text-sm focus:ring-2 focus:ring-[#00689D]/30 focus:outline-none text-foreground"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading || !termsAgreed}
                />
                
                {/* Send Button */}
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00689D] text-white rounded-full w-9 h-9 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-muted-foreground/30 disabled:shadow-none"
                  disabled={isLoading || !input.trim() || !termsAgreed}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
              
              {/* About and Feedback buttons */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-3">
                  <button 
                    onClick={handleAboutChat}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                  >
                    <HelpCircle className="w-3 h-3" />
                    About
                  </button>
                  <button 
                    onClick={handleFeedback}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    Feedback
                  </button>
                </div>
                {!termsAgreed && (
                  <button 
                    onClick={handleAgreeToTerms}
                    className="text-xs text-[#00689D] hover:text-[#00689D]/90 flex items-center gap-1 transition-colors"
                  >
                    <Check className="w-3 h-3" />
                    Agree to terms
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <button 
          onClick={handleToggleChat}
          className="bg-gradient-to-r from-[#4C9F38] to-[#00689D] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
