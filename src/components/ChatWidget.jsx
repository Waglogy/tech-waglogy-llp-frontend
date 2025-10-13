import { useState, useEffect, useRef } from 'react';
import chatService from '../services/chatService';
import '../styles/ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [needsInfo, setNeedsInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHookMessage, setShowHookMessage] = useState(false);
  const [currentHookIndex, setCurrentHookIndex] = useState(0);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Hook messages that rotate
  const hookMessages = [
    "👋 Need help? Chat with us!",
    "💡 Have questions? We're here!",
    "🚀 Let's discuss your project!",
    "💬 Quick question? Ask away!",
    "✨ Get a free consultation!",
    "🎯 Looking for solutions? Chat now!",
  ];

  // Load session from localStorage on mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem('chatSessionId');
    const savedUserName = localStorage.getItem('chatUserName');
    
    if (savedSessionId) {
      setSessionId(savedSessionId);
      loadConversationHistory(savedSessionId);
    }
    
    if (savedUserName) {
      setUserName(savedUserName);
    }
  }, []);

  // Show hook message after delay and rotate them
  useEffect(() => {
    // Show first hook message after 3 seconds
    const showTimer = setTimeout(() => {
      setShowHookMessage(true);
    }, 3000);

    // Rotate hook messages every 5 seconds
    const rotateTimer = setInterval(() => {
      setCurrentHookIndex((prevIndex) => (prevIndex + 1) % hookMessages.length);
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(rotateTimer);
    };
  }, []);

  // Hide hook message when chat is open
  useEffect(() => {
    if (isOpen) {
      setShowHookMessage(false);
    } else {
      // Show hook message again after closing chat (after 5 seconds)
      const timer = setTimeout(() => {
        setShowHookMessage(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversationHistory = async (sessionId) => {
    try {
      const response = await chatService.getConversation(sessionId);
      if (response.success && response.data.messages) {
        const formattedMessages = response.data.messages.map(msg => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp,
        }));
        setMessages(formattedMessages);
        setUserName(response.data.name);
      }
    } catch (error) {
      console.error('Failed to load conversation:', error);
      // Clear invalid session
      localStorage.removeItem('chatSessionId');
      setSessionId(null);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    // If we need user info and don't have it, show the info form
    if (!sessionId && !userName && !userEmail) {
      setNeedsInfo(true);
      return;
    }

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatService.sendMessage({
        message: inputMessage,
        sessionId,
        name: userName,
        email: userEmail,
      });

      if (response.success) {
        // Check if we need user info
        if (response.needInfo) {
          setNeedsInfo(true);
          const botMessage = {
            role: 'assistant',
            content: response.reply,
            timestamp: new Date().toISOString(),
          };
          setMessages(prev => [...prev, botMessage]);
        } else {
          // Save session info
          if (response.sessionId && !sessionId) {
            setSessionId(response.sessionId);
            localStorage.setItem('chatSessionId', response.sessionId);
          }
          
          if (response.name) {
            setUserName(response.name);
            localStorage.setItem('chatUserName', response.name);
          }

          const botMessage = {
            role: 'assistant',
            content: response.reply,
            timestamp: new Date().toISOString(),
          };
          setMessages(prev => [...prev, botMessage]);
          setNeedsInfo(false);
        }
      } else {
        throw new Error(response.error || 'Failed to send message');
      }
    } catch (error) {
      setError(error.message || 'Failed to send message. Please try again.');
      console.error('Send message error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    
    if (!userName.trim() || !userEmail.trim()) {
      setError('Please provide both name and email');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setError('Please provide a valid email address');
      return;
    }

    setNeedsInfo(false);
    setError(null);
    
    // If there's a message waiting to be sent, send it now with user info
    if (inputMessage.trim()) {
      handleSendMessage(e);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowHookMessage(false); // Hide hook message when opening chat
    if (!isOpen && messages.length === 0) {
      // Add welcome message when opening for the first time
      const welcomeMessage = {
        role: 'assistant',
        content: "Hello! 👋 I'm Waglogy's AI Sales Manager. How can I help you today?",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const dismissHookMessage = () => {
    setShowHookMessage(false);
  };

  const handleNewChat = () => {
    localStorage.removeItem('chatSessionId');
    localStorage.removeItem('chatUserName');
    setSessionId(null);
    setUserName('');
    setUserEmail('');
    setMessages([]);
    setNeedsInfo(false);
    setError(null);
    
    // Add welcome message
    const welcomeMessage = {
      role: 'assistant',
      content: "Hello! 👋 I'm Waglogy's AI Sales Manager. How can I help you today?",
      timestamp: new Date().toISOString(),
    };
    setMessages([welcomeMessage]);
  };

  return (
    <>
      {/* Hook Message */}
      {showHookMessage && !isOpen && (
        <div className="chat-hook-message">
          <div className="chat-hook-content">
            <span className="chat-hook-text">{hookMessages[currentHookIndex]}</span>
            <button 
              className="chat-hook-close"
              onClick={dismissHookMessage}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
          <div className="chat-hook-arrow"></div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        className={`chat-widget-button ${isOpen ? 'chat-widget-button-open' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-widget-window">
          {/* Header */}
          <div className="chat-widget-header">
            <div className="chat-widget-header-content">
              <div className="chat-widget-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <div>
                <h3 className="chat-widget-title">Waglogy AI Assistant</h3>
                <p className="chat-widget-status">
                  <span className="status-indicator"></span>
                  Online
                </p>
              </div>
            </div>
            <button 
              className="chat-widget-new-chat-btn"
              onClick={handleNewChat}
              title="Start new conversation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chat-widget-messages" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.role === 'user' ? 'chat-message-user' : 'chat-message-bot'}`}
              >
                <div className="chat-message-content">
                  {message.content}
                </div>
                <div className="chat-message-time">
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message chat-message-bot">
                <div className="chat-message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="chat-widget-error">
              {error}
            </div>
          )}

          {/* User Info Form */}
          {needsInfo && (
            <div className="chat-widget-info-form">
              <form onSubmit={handleSubmitInfo}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
                <button type="submit" className="chat-widget-info-submit">
                  Start Chat
                </button>
              </form>
            </div>
          )}

          {/* Input */}
          <div className="chat-widget-input-container">
            <form onSubmit={handleSendMessage} className="chat-widget-form">
              <input
                type="text"
                className="chat-widget-input"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="chat-widget-send-btn"
                disabled={isLoading || !inputMessage.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;

