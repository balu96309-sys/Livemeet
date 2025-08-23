import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot } from 'lucide-react';
import { ChatMessage } from '../../types';
import { Button } from '../ui/Button';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI assistant for LiveStock Market. I can help you find products, answer questions about our services, and assist with your orders. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('live') && input.includes('animal')) {
      return 'I can help you find live animals! We have cattle, goats, sheep, chickens, and fish. What specific type of animal are you looking for? I can also provide information about breeds, ages, and pricing.';
    }
    
    if (input.includes('cut') && input.includes('meat')) {
      return 'Looking for cut meat? We offer premium quality beef, lamb, goat, chicken, and fish cuts. All our meat is fresh and comes from trusted local butchers. What type of cut are you interested in?';
    }
    
    if (input.includes('price') || input.includes('cost')) {
      return 'Prices vary depending on the product type, quality, and seller. Live animals typically range from $50-$2000 depending on the species and size. Cut meat is priced per kg/lb. Would you like me to help you find specific products within your budget?';
    }
    
    if (input.includes('delivery') || input.includes('shipping')) {
      return 'We offer various delivery options depending on your location and the type of product. Live animals require special transportation, while cut meat can be delivered via refrigerated trucks. Delivery times typically range from 1-7 days. What\'s your location?';
    }
    
    if (input.includes('seller') || input.includes('farmer')) {
      return 'Our platform connects you with verified farmers and meat sellers. All sellers are screened for quality and reliability. You can view seller profiles, ratings, and reviews before making a purchase. Are you looking to buy from a specific type of seller?';
    }
    
    if (input.includes('order') || input.includes('track')) {
      return 'You can track your orders from your account dashboard. We provide real-time updates on order status, from confirmation to delivery. If you need help with a specific order, please provide your order ID.';
    }
    
    if (input.includes('quality') || input.includes('fresh')) {
      return 'Quality is our top priority! All live animals are health-certified, and cut meat products are fresh and properly stored. We have a quality guarantee and return policy. Our sellers maintain high standards and customer ratings reflect their quality.';
    }
    
    if (input.includes('payment') || input.includes('pay')) {
      return 'We accept various payment methods including credit cards, debit cards, and digital wallets. All payments are secure and encrypted. You can also set up payment plans for larger purchases like live animals.';
    }
    
    // Default responses
    const defaultResponses = [
      'I understand you\'re interested in our livestock and meat products. Could you be more specific about what you\'re looking for?',
      'That\'s a great question! Our marketplace offers a wide variety of products. Let me know what specific information you need.',
      'I\'m here to help! Whether you\'re looking for live animals or cut meat, I can guide you to the right products and sellers.',
      'Thanks for reaching out! I can assist with product searches, seller information, orders, and general questions about our platform.',
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-colors z-50"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={!isOpen ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 right-6 w-96 h-96 bg-white rounded-lg shadow-2xl border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs opacity-90">Online now</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-xs px-3 py-2 rounded-lg text-sm
                      ${message.type === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                      }
                    `}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 max-w-xs px-3 py-2 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};