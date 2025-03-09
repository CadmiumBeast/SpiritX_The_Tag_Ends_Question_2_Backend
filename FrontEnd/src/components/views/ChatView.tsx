import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot } from 'lucide-react';
import { players } from '../../data/mockData';
import { calculatePlayerPoints } from '../../utils/calculations';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatView = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    // Check for player stats request
    if (lowerMessage.includes('stats') || lowerMessage.includes('information')) {
      const playerName = players.find(player =>
        lowerMessage.includes(player.name.toLowerCase())
      );
      
      if (playerName) {
        return `Here are ${playerName.name}'s stats:
- University: ${playerName.university}
- Category: ${playerName.category}
- Runs: ${playerName.runs}
- Wickets: ${playerName.wickets_taken}`;
      }
    }

    // Check for team suggestion
    if (lowerMessage.includes('suggest') && lowerMessage.includes('team')) {
      const sortedPlayers = [...players]
        .sort((a, b) => calculatePlayerPoints(b) - calculatePlayerPoints(a))
        .slice(0, 11);

      return `Here's a suggested team based on performance:
${sortedPlayers.map(player => `- ${player.name} (${player.category})`).join('\n')}`;
    }

    // Default responses
    const defaultResponses = [
      "I can help you with player stats and team suggestions. What would you like to know?",
      "Try asking me about a specific player's stats or for team suggestions!",
      "I don't have enough information to answer that question. Would you like to know about player stats or team suggestions instead?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg h-[calc(100vh-8rem)]">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Bot className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold">Spiriter Chat</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Ask about player stats or team suggestions
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about player stats or team suggestions..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatView;