import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Moon, Zap, Pill, UtensilsCrossed, BedDouble, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'ai';
  text: string;
  suggestions?: string[];
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      text: "Hi! I've analyzed your health data. Your sleep quality improved by 15% this week. Would you like to know what contributed to this?",
      suggestions: ['Tell me more', 'Show my sleep trends', 'What should I improve?']
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'ai',
        text: "I understand. Based on your recent activity, I'd recommend focusing on consistent sleep schedule and staying hydrated.",
        suggestions: ['Create sleep routine', 'Set water reminders', 'View detailed analysis']
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-12">
        
        {/* AI HERO SECTION */}
        <section className="flex flex-col items-center text-center space-y-8">
          {/* Glowing Orb */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Outer glow rings */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute inset-4 rounded-full bg-gradient-to-br from-green-500/30 to-blue-500/30 blur-2xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Main orb */}
            <motion.div
              className="relative w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-blue-500 shadow-2xl shadow-green-500/50"
              animate={{
                boxShadow: [
                  '0 0 60px rgba(34, 197, 94, 0.5)',
                  '0 0 80px rgba(59, 130, 246, 0.5)',
                  '0 0 60px rgba(34, 197, 94, 0.5)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-white/90" />
              </div>
            </motion.div>
          </div>

          {/* Greeting */}
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight">Good evening</h1>
            <p className="text-lg text-white/60">Your health looks stable today</p>
          </div>

          {/* Chat Input */}
          <div className="w-full max-w-lg relative">
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-2 shadow-2xl">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about your health..."
                className="w-full bg-transparent px-6 py-4 pr-14 text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </section>

        {/* CHAT SECTION */}
        <section className="space-y-6">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] space-y-3 ${message.type === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                {/* Message Bubble */}
                <div
                  className={`rounded-3xl px-6 py-4 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/10'
                      : 'backdrop-blur-xl bg-white/5 border border-white/10'
                  }`}
                >
                  <p className="text-white/90 leading-relaxed">{message.text}</p>
                </div>

                {/* Suggestion Buttons */}
                {message.suggestions && (
                  <div className="flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInputValue(suggestion)}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all backdrop-blur-xl"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </section>

        {/* TODAY OVERVIEW */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Today Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Health Score */}
            <div className="md:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-white/60">Health Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-semibold bg-gradient-to-br from-green-400 to-blue-500 bg-clip-text text-transparent">87</span>
                    <span className="text-2xl text-white/40">/100</span>
                  </div>
                  <p className="text-sm text-green-400">↑ 5 points from yesterday</p>
                </div>
                
                {/* Circular Progress */}
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="12"
                    />
                    <motion.circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="url(#healthGradient)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - 0.87) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* Sleep Card */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                  <Moon className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-sm text-white/60">Last night</span>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Sleep</p>
                <p className="text-3xl font-semibold">7h 32m</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
                <span className="text-sm text-white/60">85%</span>
              </div>
            </div>

            {/* Energy Card */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <span className="text-sm text-white/60">Current</span>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Energy Level</p>
                <p className="text-3xl font-semibold">High</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                </div>
                <span className="text-sm text-white/60">92%</span>
              </div>
            </div>

            {/* Supplements Card */}
            <div className="md:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                    <Pill className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Supplements</p>
                    <p className="text-xl font-semibold">3 of 5 taken today</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((pill) => (
                    <div
                      key={pill}
                      className={`w-3 h-3 rounded-full ${
                        pill <= 3
                          ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                          : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SMART ACTIONS */}
        <section className="space-y-6 pb-12">
          <h2 className="text-2xl font-semibold tracking-tight">Smart Actions</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <button className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl hover:bg-white/10 transition-all text-left">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UtensilsCrossed className="w-7 h-7 text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Log meal</h3>
                  <p className="text-sm text-white/60">Track your nutrition and calories</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-white/60">→</span>
                </div>
              </div>
            </button>

            <button className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl hover:bg-white/10 transition-all text-left">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BedDouble className="w-7 h-7 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Log sleep</h3>
                  <p className="text-sm text-white/60">Record your sleep quality and duration</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-white/60">→</span>
                </div>
              </div>
            </button>

            <button className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl hover:bg-white/10 transition-all text-left">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Pill className="w-7 h-7 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Take supplements</h3>
                  <p className="text-sm text-white/60">Mark your supplements as taken</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-white/60">→</span>
                </div>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
