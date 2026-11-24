
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StoryPreview.css";

function StoryPreview() {
  const navigate = useNavigate();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const savedStory = sessionStorage.getItem("myStoryWorldDraft");

    if (savedStory) {
      try {
        setStory(JSON.parse(savedStory));
      } catch (error) {
        console.error("Unable to load story:", error);
        setStory(null);
      }
    }
  }, []);

  if (!story) {
    return (
      <div className="story-preview-page">
        <div className="story-preview-empty">
          <h2>No Story Details Found</h2>
          <p>Please create your story details first.</p>
          <Link to="/create-story">Create Your Story</Link>
        </div>
      </div>
    );
  }

  const title = story.storyTitle || "Untitled Story";
  const childName = story.childName || "Your Little Hero";

  return (
    <div className="story-preview-page">
      <div className="story-preview-container">

        <div className="story-preview-heading">
          <span className="story-preview-label">
            YOUR STORY IS READY
          </span>
          <h1>Let's Preview Your Story!</h1>
          <p>
            Review your story details before creating your magical adventure.
          </p>
        </div>

        <div className="story-preview-card">

          <div className="story-preview-cover">
            <span className="story-cover-category">
              {story.category}
            </span>

            <div className="story-cover-art">
              <div className="story-cover-circle">
                <span className="story-cover-letter">
                  {title.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            <h2>{title}</h2>
            <p>A magical adventure awaits!</p>
          </div>

          <div className="story-preview-details">
            <h2>Story Information</h2>

            {story.id && (
              <div className="story-detail-row">
                <span>Story ID</span>
                <strong>#{story.id}</strong>
              </div>
            )}

            <div className="story-detail-row">
              <span>Story Title</span>
              <strong>{title}</strong>
            </div>

            <div className="story-detail-row">
              <span>Category</span>
              <strong>{story.category}</strong>
            </div>

            <div className="story-detail-row">
              <span>Language</span>
              <strong>{story.language}</strong>
            </div>

            <div className="story-detail-row">
              <span>Age Group</span>
              <strong>{story.ageGroup}</strong>
            </div>

            <div className="story-detail-row">
              <span>Moral / Lesson</span>
              <strong>{story.lesson || "Not selected"}</strong>
            </div>

            <div className="story-detail-row">
              <span>Child Name</span>
              <strong>{childName}</strong>
            </div>

            <div className="story-detail-row">
              <span>Child Age</span>
              <strong>
                {story.childAge ? `${story.childAge} years` : "Not available"}
              </strong>
            </div>

            <div className="story-detail-row">
              <span>Character Style</span>
              <strong>{story.characterStyle || "Chibi"}</strong>
            </div>

            <div className="story-idea-box">
              <h3>Your Story Idea</h3>
              <p>{story.description}</p>
            </div>

            <div className="story-preview-actions">
              <button
                type="button"
                className="story-edit-btn"
                onClick={() => navigate("/create-story")}
              >
                Edit Story
              </button>

              <button
                type="button"
                className="story-generate-btn"
                onClick={() => navigate("/generated-story")}
              >
                Generate My Story
              </button>
            </div>

            <p className="story-preview-note">
              Your story details are saved. AI-generated story content
              will be connected in the next stage.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default StoryPreview;
