import { useState, useRef, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const initialMessage: Message = {
  id: '1',
  text: "Hello! I'm StatBot, your personal assistant for NCS 2025. How can I help you today?",
  isUser: false,
  timestamp: new Date()
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
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
      
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        isUser: false,
        timestamp: new Date()
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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-xl w-80 transition-all transform origin-bottom-right">
          <div className="p-4 bg-gradient-to-r from-primary to-accent rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-robot text-white"></i>
                </div>
                <h3 className="text-white font-medium">StatBot Assistant</h3>
              </div>
              <button 
                onClick={handleToggleChat}
                className="text-white/80 hover:text-white"
                aria-label="Minimize chat"
              >
                <i className="fas fa-minus"></i>
              </button>
            </div>
          </div>
          
          <div className="p-4 max-h-80 overflow-y-auto" id="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 ${message.isUser ? 'text-right' : ''}`}>
                <div className={`${
                  message.isUser 
                    ? 'bg-primary text-white' 
                    : 'bg-neutral-100 text-neutral-800'
                  } rounded-lg p-3 max-w-[80%] inline-block`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-4">
                <div className="bg-neutral-100 rounded-lg p-3 max-w-[80%] inline-block">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce delay-150"></div>
                    <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t border-neutral-200">
            <form onSubmit={handleSendMessage} className="relative">
              <input 
                type="text" 
                placeholder="Type your question..." 
                className="w-full bg-neutral-100 border-none rounded-full px-4 py-2 pr-10 text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary disabled:text-neutral-400"
                disabled={isLoading || !input.trim()}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button 
          onClick={handleToggleChat}
          className="bg-gradient-to-r from-primary to-accent text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Open chat"
        >
          <i className="fas fa-comment-dots text-xl"></i>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
