
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./CharacterStyle.css";

function CharacterStyle() {
  const navigate = useNavigate();

  const [selectedStyle, setSelectedStyle] = useState("chibi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const styles = [
    {
      id: "chibi",
      name: "Chibi Style",
      description: "Cute characters with big eyes and adorable expressions.",
      image: "/character-styles/chibi.png",
      tag: "Cute & Sweet",
    },
    {
      id: "3d",
      name: "3D Cartoon",
      description: "Beautiful animated characters with a magical 3D look.",
      image: "/character-styles/3d-cartoon.png",
      tag: "Magical & Realistic",
    },
    {
      id: "storybook",
      name: "Storybook Illustration",
      description: "Soft artistic illustrations straight from a fairy tale.",
      image: "/character-styles/storybook.png",
      tag: "Artistic & Dreamy",
    },
  ];

  useEffect(() => {
    const savedStyle = sessionStorage.getItem(
      "myStoryWorldCharacterStyle"
    );

    if (savedStyle && styles.some((style) => style.id === savedStyle)) {
      setSelectedStyle(savedStyle);
    }
  }, []);

  const handleContinue = async () => {
    setError("");

    try {
      const savedChild = sessionStorage.getItem("myStoryWorldChild");

      if (!savedChild) {
        setError("Child profile not found. Please create a child profile first.");
        return;
      }

      const child = JSON.parse(savedChild);

      if (!child?.id) {
        setError("Child ID not found. Please save the child profile again.");
        return;
      }

      setLoading(true);

      console.log("Child ID:", child.id);
      console.log("Selected Style:", selectedStyle);

      const response = await api.post(
        `accounts/children/${child.id}/character-style/`,
        {
          style: selectedStyle,
        }
      );

      console.log("Character Style Saved:", response.data);

      sessionStorage.setItem(
        "myStoryWorldCharacterStyle",
        selectedStyle
      );

      sessionStorage.setItem(
        "myStoryWorldSavedCharacterStyle",
        JSON.stringify(response.data)
      );

      navigate("/character-preview");

    } catch (err) {
      const errorData = err.response?.data;

      console.error("Character Style Error:", errorData || err);

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else if (err.response?.status === 404) {
        setError("Child profile not found. Please save the profile again.");
      } else if (err.response?.status === 400) {
        const message =
          errorData?.detail ||
          errorData?.style?.[0] ||
          errorData?.child?.[0] ||
          JSON.stringify(errorData);

        setError(`Validation Error: ${message}`);
      } else {
        setError(
          errorData?.message ||
          errorData?.detail ||
          "Unable to save character style. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="character-style-page">
      <div className="character-style-container">

        <div className="character-style-top">
          <Link to="/" className="character-style-logo">
            MyStory<span>World</span>
          </Link>

          <span className="character-style-step">
            CHARACTER PERSONALIZATION
          </span>
        </div>

        <div className="character-style-heading">
          <span>MAKE YOUR CHILD THE HERO</span>

          <h1>Choose Your Cartoon Style</h1>

          <p>
            Select a beautiful art style for your child's story character.
            Every style creates a different magical experience.
          </p>
        </div>

        <div className="character-style-grid">
          {styles.map((style) => (
            <div
              key={style.id}
              className={`character-style-card ${
                selectedStyle === style.id ? "active" : ""
              }`}
              onClick={() => setSelectedStyle(style.id)}
            >
              <div className="character-style-image">
                <img
                  src={style.image}
                  alt={style.name}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                {selectedStyle === style.id && (
                  <span className="character-selected-mark">✓</span>
                )}
              </div>

              <div className="character-style-info">
                <span className="character-style-tag">
                  {style.tag}
                </span>

                <h2>{style.name}</h2>
                <p>{style.description}</p>

                <button
                  type="button"
                  className={
                    selectedStyle === style.id
                      ? "character-select-btn selected"
                      : "character-select-btn"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStyle(style.id);
                  }}
                >
                  {selectedStyle === style.id
                    ? "Selected"
                    : "Choose Style"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <div className="character-style-footer">
          <p>
            You can change your character style before creating a story.
          </p>

          <button
            type="button"
            className="character-continue-btn"
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default CharacterStyle;
