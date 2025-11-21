import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (inputMessage.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: generateBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    // Simple response logic (replace with actual AI API)
    const responses = [
      "That's an interesting question! Let me help you with that.",
      "I understand what you're asking. Here's what I think...",
      "Great question! Based on what you've told me...",
      "I'm here to help! Let me provide you with some information.",
      "Thank you for asking! Here's my response...",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([
        {
          id: 1,
          text: "Hello! I'm your AI assistant. How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <div className="chat-page">
      <Sidebar />
      <div className="chat-main">
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-header-info">
              <h2>AI Chat Assistant</h2>
              <span className="status-indicator">● Online</span>
            </div>
            <button onClick={clearChat} className="clear-chat-btn">
              Clear Chat
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.sender === "user" ? "message-user" : "message-bot"
                }`}
              >
                <div className="message-avatar">
                  {message.sender === "user" ? "👤" : "🤖"}
                </div>
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message message-bot">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
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

          <form onSubmit={handleSendMessage} className="chat-input-container">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="chat-input"
              rows="1"
            />
            <button
              type="submit"
              className="send-button"
              disabled={!inputMessage.trim()}
            >
              <span className="send-icon">➤</span>
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Chat;
