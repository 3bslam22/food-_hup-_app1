import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'motion/react';

export default function Chatbot() {
  const { t } = useTranslation();
  const { isChatbotOpen: isOpen, setChatbotOpen: setIsOpen } = useStore();
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hello! I am your Food Hub assistant. How can I help you choose your meal today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const restaurants = useStore(state => state.restaurants);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Mock AI response
    setTimeout(() => {
      let mockResponse = "I'm sorry, I'm just a mock assistant right now. But you should check out our amazing restaurants!";
      
      const lowerMessage = userMessage.toLowerCase();
      if (lowerMessage.includes('burger')) {
        mockResponse = "If you're looking for burgers, most of our restaurants have great options! Check the 'Burgers' category.";
      } else if (lowerMessage.includes('pizza')) {
        mockResponse = "Pizza sounds great! You can find pizza options in several restaurants in the app.";
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        mockResponse = "Hello! I'm here to help you find the best food on campus. What are you craving?";
      }

      setMessages(prev => [...prev, { role: 'model', text: mockResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Trigger Button - Floating Icon */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-[0_10px_25px_rgba(255,107,0,0.3)] flex items-center justify-center border-4 border-background group relative"
        >
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
          <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
        </motion.button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-24 right-6 w-[340px] sm:w-[400px] h-[550px] bg-secondary border border-border rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col z-[70] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <div className="font-bold flex items-center gap-2">
              <MessageCircle size={20} />
              {t('Food Hub Assistant')}
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3 bg-background">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white self-end rounded-tr-sm' 
                    : 'bg-secondary border border-border text-text-main self-start rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-secondary border border-border text-text-main self-start p-3 rounded-xl rounded-tl-sm">
                <Loader2 size={16} className="animate-spin text-primary" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-secondary border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('Ask about food...')}
              className="flex-grow bg-background border border-border rounded-full px-4 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
