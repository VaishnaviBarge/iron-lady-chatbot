import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';

const IronLadyChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help you with information about Iron Lady's leadership programs. You can ask me about program details, duration, certification, mentors, and more!",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Replace with your actual backend URL
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText })
      });

      const data = await response.json();
      
      const botMessage = {
        id: messages.length + 2,
        text: data.response || "I apologize, but I'm having trouble connecting to our services right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm currently offline. Here are some quick facts: Our flagship program is a 12-week comprehensive leadership course with industry mentors, available online and hybrid. We offer certifications in Strategic Leadership, Team Management, and Executive Communication.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "What programs do you offer?",
    "How long are the courses?",
    "Do you provide certifications?",
    "Who are the mentors?",
    "What's the mode of delivery?"
  ];

  const handleQuickQuestion = (question) => {
    setInputText(question);
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-full">
            <Bot className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Iron Lady Leadership Assistant</h1>
            <p className="text-purple-100">Your guide to our leadership programs</p>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="bg-gray-50 p-4">
        <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="bg-white hover:bg-purple-50 text-purple-600 px-3 py-2 rounded-full text-sm border border-purple-200 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-6 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`p-2 rounded-full ${message.sender === 'user' ? 'bg-purple-600' : 'bg-white shadow-md'}`}>
                {message.sender === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-purple-600" />
                )}
              </div>
              <div className={`p-3 rounded-lg ${message.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-white shadow-md'}`}>
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex items-start space-x-2">
              <div className="p-2 rounded-full bg-white shadow-md">
                <Loader className="w-5 h-5 text-purple-600 animate-spin" />
              </div>
              <div className="p-3 rounded-lg bg-white shadow-md">
                <p className="text-sm text-gray-500">Typing...</p>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about our leadership programs..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isLoading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IronLadyChatbot;