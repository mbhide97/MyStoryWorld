import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import StoryDetails from "./pages/StoryDetails";
import ReadStory from "./pages/ReadStory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ChildProfile from "./pages/ChildProfile";
import CharacterStyle from "./pages/CharacterStyle";
import CharacterPreview from "./pages/CharacterPreview";
import CreateStory from "./pages/CreateStory";
import StoryPreview from "./pages/StoryPreview";
import GeneratedStory from "./pages/GeneratedStory";
import Favorites from "./pages/Favorites";
import ParentDashboard from "./pages/ParentDashboard";
import MyStories from "./pages/MyStories";
import ParentSettings from "./pages/ParentSettings";
import OTPVerification from "./pages/OTPVerification";
import ResetPassword from "./pages/ResetPassword";



// Components
import Navbar from "./components/Navbar";

import "./App.css";

// ----------------------------------
// CHECK LOGIN STATUS
// ----------------------------------

function isUserLoggedIn() {
  try {
    const localLogin = JSON.parse(
      localStorage.getItem("myStoryWorldLogin") || "null"
    );

    const sessionLogin = JSON.parse(
      sessionStorage.getItem("myStoryWorldLogin") || "null"
    );

    return (
      localLogin?.isLoggedIn === true ||
      sessionLogin?.isLoggedIn === true
    );
  } catch (error) {
    console.error("Login status error:", error);
    return false;
  }
}

// ----------------------------------
// PROTECTED ROUTE
// ----------------------------------

function ProtectedRoute({ children }) {
  if (!isUserLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ----------------------------------
// APP
// ----------------------------------

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("myStoryTheme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem(
      "myStoryTheme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : "light"}>

      <BrowserRouter>

        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Routes>

          {/* PUBLIC ROUTES */}

          <Route path="/" element={<Home />} />

          <Route path="/explore" element={<Explore />} />

          <Route path="/stories" element={<StoryDetails />} />

          <Route
            path="/read-story/:id"
            element={<ReadStory />}
          />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />


          {/* PROTECTED ROUTES */}

          <Route
            path="/child-profile"
            element={
              <ProtectedRoute>
                <ChildProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/character-style"
            element={
              <ProtectedRoute>
                <CharacterStyle />
              </ProtectedRoute>
            }
          />

          <Route
            path="/character-preview"
            element={
              <ProtectedRoute>
                <CharacterPreview />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-story"
            element={
              <ProtectedRoute>
                <CreateStory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/story-preview"
            element={
              <ProtectedRoute>
                <StoryPreview />
              </ProtectedRoute>
            }
          />

          <Route
            path="/generated-story"
            element={
              <ProtectedRoute>
                <GeneratedStory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route
            path="/parent-dashboard"
            element={
              <ProtectedRoute>
                <ParentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-stories"
            element={
              <ProtectedRoute>
                <MyStories />
              </ProtectedRoute>
            }
          />

          <Route
            path="/parent-settings"
            element={
              <ProtectedRoute>
                <ParentSettings />
              </ProtectedRoute>
            }
          />

          {/* PAGE NOT FOUND */}

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

          <Route
  path="/otp-verification"
  element={<OTPVerification />}
/>


<Route
  path="/reset-password"
  element={<ResetPassword />}
/>

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
