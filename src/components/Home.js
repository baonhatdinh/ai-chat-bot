import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Banner from "./Banner";
import Footer from "./Footer";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate("/chat");
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="home-main">
        <Banner
          title="Welcome to AI ChatBot"
          subtitle="Your intelligent conversation partner powered by advanced AI"
          showCTA={true}
          onCTAClick={handleCTAClick}
        />
        <div className="home-content">
          <div className="hero-section">
            <h2>Why Choose Our AI ChatBot?</h2>
            <div className="hero-features">
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h3>Natural Conversations</h3>
                <p>Engage in human-like conversations with our advanced AI</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Fast Responses</h3>
                <p>Get instant answers to your questions in real-time</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Accurate & Reliable</h3>
                <p>Receive accurate information you can trust</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
