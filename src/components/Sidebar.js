import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const sidebarNavRef = useRef(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.pageY - sidebarNavRef.current.offsetTop);
    setScrollTop(sidebarNavRef.current.scrollTop);
    sidebarNavRef.current.style.cursor = "grabbing";
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const y = e.pageY - sidebarNavRef.current.offsetTop;
      const walk = (y - startY) * 2;
      sidebarNavRef.current.scrollTop = scrollTop - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (sidebarNavRef.current) {
        sidebarNavRef.current.style.cursor = "grab";
      }
    };

    const handleMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false);
        if (sidebarNavRef.current) {
          sidebarNavRef.current.style.cursor = "grab";
        }
      }
    };

    const nav = sidebarNavRef.current;
    if (nav) {
      nav.addEventListener("mousemove", handleMouseMove);
      nav.addEventListener("mouseup", handleMouseUp);
      nav.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        nav.removeEventListener("mousemove", handleMouseMove);
        nav.removeEventListener("mouseup", handleMouseUp);
        nav.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [isDragging, startY, scrollTop]);

  const features = [
    { icon: "🏠", name: "Home", path: "/", description: "Dashboard overview" },
    { icon: "💬", name: "Chat", path: "/chat", description: "AI conversation" },
    {
      icon: "📜",
      name: "History",
      path: "/history",
      description: "Chat history",
    },
    {
      icon: "🔖",
      name: "Bookmarks",
      path: "/bookmarks",
      description: "Saved chats",
    },
    {
      icon: "📊",
      name: "Analytics",
      path: "/analytics",
      description: "Usage statistics",
    },
    {
      icon: "🎨",
      name: "Themes",
      path: "/themes",
      description: "Customize appearance",
    },
    {
      icon: "🔔",
      name: "Notifications",
      path: "/notifications",
      description: "Stay updated",
    },
    {
      icon: "🌐",
      name: "Languages",
      path: "/languages",
      description: "Multi-language support",
    },
    {
      icon: "🔒",
      name: "Privacy",
      path: "/privacy",
      description: "Data protection",
    },
    {
      icon: "⚙️",
      name: "Settings",
      path: "/settings",
      description: "App preferences",
    },
    { icon: "❓", name: "Help", path: "/help", description: "Get assistance" },
    {
      icon: "📚",
      name: "Documentation",
      path: "/docs",
      description: "User guides",
    },
    {
      icon: "🚀",
      name: "What's New",
      path: "/updates",
      description: "Latest features",
    },
    {
      icon: "💡",
      name: "Tips",
      path: "/tips",
      description: "Pro tips & tricks",
    },
  ];

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "✕" : "☰"}
      </button>
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>AI ChatBot</h2>
          <p className="sidebar-subtitle">Explore Features</p>
        </div>
        <nav
          className="sidebar-nav"
          ref={sidebarNavRef}
          onMouseDown={handleMouseDown}
        >
          <div className="sidebar-scroll-hint">
            <span>↓ Drag to scroll ↓</span>
          </div>
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className={`sidebar-link ${isActive(feature.path)}`}
            >
              <span className="sidebar-icon">{feature.icon}</span>
              <div className="sidebar-link-content">
                <span className="sidebar-text">{feature.name}</span>
                <span className="sidebar-description">
                  {feature.description}
                </span>
              </div>
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <Link to="/profile" className="sidebar-profile">
            <span className="sidebar-icon">👤</span>
            <span className="sidebar-text">Profile</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
