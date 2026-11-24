
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CharacterPreview.css";

function CharacterPreview() {
  const navigate = useNavigate();

  const [selectedStyle, setSelectedStyle] = useState("chibi");
  const [childProfile, setChildProfile] = useState(null);

  const styles = [
    {
      id: "chibi",
      name: "Chibi Style",
      description: "Cute, tiny and adorable character",
      image: "/character-styles/chibi.png",
    },
    {
      id: "3d",
      name: "3D Cartoon",
      description: "Colorful 3D animated character",
      image: "/character-styles/3d-cartoon.png",
    },
    {
      id: "storybook",
      name: "Storybook Illustration",
      description: "Beautiful hand-painted storybook look",
      image: "/character-styles/storybook.png",
    },
  ];

  useEffect(() => {
    try {
      const savedProfile = sessionStorage.getItem("myStoryWorldChild");
      const savedStyle = sessionStorage.getItem(
        "myStoryWorldCharacterStyle"
      );

      if (savedProfile) {
        setChildProfile(JSON.parse(savedProfile));
      }

      if (savedStyle && styles.some((style) => style.id === savedStyle)) {
        setSelectedStyle(savedStyle);
      }
    } catch (error) {
      console.error("Unable to load character preview:", error);
    }
  }, []);

  const currentStyle = styles.find(
    (style) => style.id === selectedStyle
  );

  const handleStyleChange = (styleId) => {
    setSelectedStyle(styleId);

    sessionStorage.setItem(
      "myStoryWorldCharacterStyle",
      styleId
    );
  };

  const handleContinue = () => {
    if (!childProfile) {
      alert("Please create your child's profile first.");
      navigate("/child-profile");
      return;
    }

    sessionStorage.setItem(
      "myStoryWorldCharacterStyle",
      selectedStyle
    );

    navigate("/create-story");
  };

  return (
    <div className="character-preview-page">
      <div className="preview-container">

        <div className="preview-heading">
          <span className="preview-step">STEP 3 OF 4</span>
          <h1>Meet Your Story Character!</h1>
          <p>
            Choose your favourite look and get ready for a magical adventure.
          </p>
        </div>

        {childProfile && (
          <div className="preview-child-profile">
            <div className="preview-child-photo">
              {childProfile.photoPreview ? (
                <img
                  src={childProfile.photoPreview}
                  alt={childProfile.childName}
                />
              ) : (
                <span>
                  {childProfile.childName?.charAt(0).toUpperCase() || "C"}
                </span>
              )}
            </div>

            <div className="preview-child-info">
              <h2>{childProfile.childName}'s Character</h2>
              <p>
                Age: {childProfile.age} years
                {" "} | {" "}
                Language: {childProfile.language}
              </p>

              <div className="preview-child-interests">
                {childProfile.interests?.map((interest) => (
                  <span key={interest}>{interest}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="preview-content">

          <div className="preview-image-section">
            <div className="preview-image-card">
              <span className="preview-label">CHARACTER PREVIEW</span>

              <img
                src={currentStyle.image}
                alt={currentStyle.name}
                className="preview-character-image"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <h2>{currentStyle.name}</h2>
              <p>{currentStyle.description}</p>
            </div>
          </div>

          <div className="preview-options-section">
            <h2>Choose Character Style</h2>
            <p>Select the style you love the most.</p>

            <div className="preview-style-list">
              {styles.map((style) => (
                <button
                  type="button"
                  key={style.id}
                  className={`preview-style-option ${
                    selectedStyle === style.id ? "active" : ""
                  }`}
                  onClick={() => handleStyleChange(style.id)}
                >
                  <span className="style-radio">
                    {selectedStyle === style.id ? "✓" : ""}
                  </span>

                  <span className="style-option-text">
                    <strong>{style.name}</strong>
                    <small>{style.description}</small>
                  </span>
                </button>
              ))}
            </div>

            <div className="preview-note">
              Your character will be personalized using your child's photo
              when AI generation is connected.
            </div>

            <button
              className="preview-continue-btn"
              onClick={handleContinue}
            >
              Continue to Create Story
            </button>

            <button
              className="preview-back-btn"
              onClick={() => navigate("/character-style")}
            >
              Back to Character Style
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CharacterPreview;
