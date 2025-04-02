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
  Mic
} from 'lucide-react';

// TypeScript interfaces for Speech Recognition
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: ((event: Event) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

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
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Speech recognition setup
  const recognition = useRef<SpeechRecognition | null>(null);
  
  useEffect(() => {
    // Initialize speech recognition if available
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      
      recognition.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + ' ' + transcript.trim());
        setIsListening(false);
      };
      
      recognition.current.onerror = () => {
        setIsListening(false);
      };
      
      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      // Clean up
      if (recognition.current) {
        recognition.current.onresult = null;
        recognition.current.onerror = null;
        recognition.current.onend = null;
      }
    };
  }, []);

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
  
  const toggleVoiceInput = () => {
    if (isListening) {
      if (recognition.current) {
        recognition.current.stop();
      }
      setIsListening(false);
    } else {
      if (recognition.current) {
        try {
          recognition.current.start();
          setIsListening(true);
        } catch (error) {
          console.error('Error starting speech recognition:', error);
        }
      } else {
        alert('Speech recognition is not supported in your browser.');
      }
    }
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
        <div className="bg-white rounded-2xl shadow-xl w-80 md:w-96 transition-all transform origin-bottom-right border border-gray-200 overflow-hidden flex flex-col" style={{ maxHeight: 'calc(100vh - 100px)' }}>
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#4C9F38] to-[#00689D] flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Database className="w-4 h-4 text-white" />
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
                className="text-white/80 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
                aria-label="Reset conversation"
                title="Reset conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button 
                onClick={handleToggleChat}
                className="text-white/80 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
                aria-label="Minimize chat"
              >
                <X className="w-4 h-4" />
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
                    : 'bg-gray-100 text-gray-800'
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
                <div className="bg-gray-100 rounded-2xl p-3 max-w-[90%]">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
                    <span className="text-sm text-gray-500">Searching for information...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggested Questions */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                <span>Suggested questions:</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-xs bg-white border border-gray-200 text-gray-700 rounded-full px-3 py-1 hover:bg-gray-100 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input Form */}
          <div className="p-4 border-t border-gray-200 flex-shrink-0 bg-white">
            <form onSubmit={handleSendMessage} className="relative">
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Ask about the convention..." 
                className="w-full bg-gray-100 border-none rounded-full px-4 py-3 pr-24 text-sm focus:ring-2 focus:ring-[#00689D]/30 focus:outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading || isListening}
              />
              
              {/* Voice Input Button */}
              <button 
                type="button"
                onClick={toggleVoiceInput}
                className={`absolute right-12 top-1/2 -translate-y-1/2 ${
                  isListening 
                    ? 'bg-[#E5243B] text-white animate-pulse' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                } rounded-full w-8 h-8 flex items-center justify-center transition-colors`}
                disabled={isLoading}
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
                title={isListening ? "Stop voice input" : "Start voice input"}
              >
                <Mic className="w-4 h-4" />
              </button>
              
              {/* Send Button */}
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00689D] text-white rounded-full w-8 h-8 flex items-center justify-center disabled:bg-gray-300"
                disabled={isLoading || !input.trim() || isListening}
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
            
            {isListening && (
              <div className="text-xs text-center mt-2 text-[#E5243B] font-medium animate-pulse">
                Listening... Speak now
              </div>
            )}
          </div>
        </div>
      ) : (
        <button 
          onClick={handleToggleChat}
          className="bg-gradient-to-r from-[#4C9F38] to-[#00689D] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Open chat"
        >
          <Database className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
