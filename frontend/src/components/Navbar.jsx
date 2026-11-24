 import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // CHECK LOGIN STATUS
  const checkLoginStatus = () => {
    try {
      const localLogin = JSON.parse(
        localStorage.getItem("myStoryWorldLogin") || "null"
      );

      const sessionLogin = JSON.parse(
        sessionStorage.getItem("myStoryWorldLogin") || "null"
      );

      setIsLoggedIn(
        localLogin?.isLoggedIn === true ||
        sessionLogin?.isLoggedIn === true
      );
    } catch (error) {
      console.error("Navbar login status error:", error);
      setIsLoggedIn(false);
    }
  };
useEffect(() => {
  checkLoginStatus();

  window.addEventListener("storage", checkLoginStatus);
  window.addEventListener("myStoryWorldAuthChanged", checkLoginStatus);

  return () => {
    window.removeEventListener("storage", checkLoginStatus);
    window.removeEventListener(
      "myStoryWorldAuthChanged",
      checkLoginStatus
    );
  };
}, []);

  // CLOSE MOBILE MENU
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // LOGOUT
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    // Clear login information
    localStorage.removeItem("myStoryWorldLogin");
    sessionStorage.removeItem("myStoryWorldLogin");

    // Clear temporary child/story data
    sessionStorage.removeItem("myStoryWorldChild");
    sessionStorage.removeItem("myStoryWorldDraft");
    sessionStorage.removeItem("myStoryWorldCharacterStyle");

    setIsLoggedIn(false);
    closeMenu();

    navigate("/login", { replace: true });
  };

  // THEME
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="main-navbar">

      {/* LOGO */}
      <Link
        to="/"
        className="navbar-logo"
        onClick={closeMenu}
      >
        MyStory<span>World</span>
      </Link>

      {/* MOBILE MENU BUTTON */}
      <button
        className="navbar-menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* NAVIGATION LINKS */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>

        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/explore" onClick={closeMenu}>
          Explore Stories
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/favorites" onClick={closeMenu}>
              Favourites
            </Link>

            <Link to="/my-stories" onClick={closeMenu}>
              My Stories
            </Link>

            <Link to="/parent-dashboard" onClick={closeMenu}>
              Dashboard
            </Link>

            <Link to="/parent-settings" onClick={closeMenu}>
              Settings
            </Link>
          </>
        )}

        <a href="/#how" onClick={closeMenu}>
          How It Works
        </a>

        <a href="/#pricing" onClick={closeMenu}>
          Pricing
        </a>

        {/* MOBILE ACTIONS */}
        <div className="navbar-mobile-actions">

          <button
            className="navbar-theme"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="navbar-login"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="navbar-start"
                onClick={closeMenu}
              >
                Get Started
              </Link>
            </>
          ) : (
            <button
              className="navbar-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        </div>
      </div>

      {/* DESKTOP ACTIONS */}
      <div className="navbar-actions">

        <button
          className="navbar-theme"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {!isLoggedIn ? (
          <>
            <Link to="/login" className="navbar-login">
              Login
            </Link>

            <Link to="/register" className="navbar-start">
              Get Started
            </Link>
          </>
        ) : (
          <button
            className="navbar-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
