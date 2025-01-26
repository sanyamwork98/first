import React, { useState } from 'react';
import { Brain, Pill, Bell, Activity, Calendar, Users, ChevronRight, Shield, MessageCircle, X, Send } from 'lucide-react';
import { getChatResponse } from './lib/gemini';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m HealthGuard\'s AI Medical Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      // Prepare the prompt with context
      const prompt = `You are a medical AI assistant. Please provide accurate, helpful, and concise information about the following medical question. Always include a reminder that this is for informational purposes only and users should consult healthcare professionals for medical advice.

Question: ${userMessage}`;

      const response = await getChatResponse(prompt);
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: "I apologize, but I'm having trouble processing your request at the moment. Please try again later."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="hidden md:inline">Chat with AI Assistant</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-[350px] md:w-[400px] h-[500px] flex flex-col">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6" />
              <span className="font-semibold">Medical AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a medical question..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-600"
                disabled={!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'your_api_key_here'}
              />
              <button
                onClick={handleSend}
                disabled={!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'your_api_key_here'}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {(!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'your_api_key_here') 
                ? "Please configure your Gemini API key to use the chat feature."
                : "*For general information only. Consult healthcare professionals for medical advice."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">HealthGuard AI</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-blue-600">Benefits</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              AI-Powered Healthcare Monitoring for Better Patient Outcomes
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Revolutionizing patient care with intelligent monitoring and treatment adherence tracking.
            </p>
            <div className="mt-8 flex space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center">
                Start Monitoring
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
              alt="Medical monitoring"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Comprehensive Monitoring Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity className="h-8 w-8 text-blue-600" />,
                title: "Real-time Monitoring",
                description: "Continuous tracking of vital signs and health metrics with AI-powered analysis"
              },
              {
                icon: <Pill className="h-8 w-8 text-blue-600" />,
                title: "Treatment Adherence",
                description: "Smart medication reminders and compliance tracking system"
              },
              {
                icon: <Bell className="h-8 w-8 text-blue-600" />,
                title: "Intelligent Alerts",
                description: "Predictive alerts for potential health issues and medication schedules"
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose HealthGuard AI?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="h-6 w-6 text-blue-600" />,
                title: "Enhanced Safety",
                description: "Proactive monitoring reduces risks"
              },
              {
                icon: <Calendar className="h-6 w-6 text-blue-600" />,
                title: "Better Adherence",
                description: "Improved medication compliance"
              },
              {
                icon: <Users className="h-6 w-6 text-blue-600" />,
                title: "Care Coordination",
                description: "Seamless team communication"
              },
              {
                icon: <Brain className="h-6 w-6 text-blue-600" />,
                title: "AI Insights",
                description: "Data-driven health decisions"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Patient Care?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join healthcare providers worldwide in adopting AI-driven patient monitoring
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition">
            Schedule a Demo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold text-white">HealthGuard AI</span>
              </div>
              <p className="text-sm">
                Advancing healthcare through intelligent monitoring and AI-driven insights.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Features</a></li>
                <li><a href="#" className="hover:text-blue-400">Solutions</a></li>
                <li><a href="#" className="hover:text-blue-400">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">About</a></li>
                <li><a href="#" className="hover:text-blue-400">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Support</a></li>
                <li><a href="#" className="hover:text-blue-400">Sales</a></li>
                <li><a href="#" className="hover:text-blue-400">Partners</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; 2024 HealthGuard AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot Component */}
      <ChatBot />
    </div>
  );
}

export default App;