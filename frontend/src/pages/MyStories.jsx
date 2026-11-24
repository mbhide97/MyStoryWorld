
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./MyStories.css";

const storyImages = {
  "Princess & Prince": "/story-images/princess.png",
  "Jungle Adventure": "/story-images/jungle.png",
  "Animal Friends": "/story-images/jungle.png",
  Adventure: "/story-images/jungle.png",
  "Space Adventure": "/story-images/space.png",
  "Magic & Fairy Tales": "/story-images/fairy.png",
  "Dinosaur World": "/story-images/dino.png",
  "Bedtime Stories": "/story-images/moon.png",
};

function MyStories() {
  const navigate = useNavigate();

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // LOAD STORIES FROM DJANGO BACKEND
  const loadStories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("accounts/stories/");

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      const formattedStories = data.map((story) => ({
        ...story,
        storyId: story.id,
        storyTitle: story.title,
        childName: story.child_name || "Little Hero",
        ageGroup: story.age_group,
        storyContent: story.story_content || "",
      }));

      setStories(formattedStories);

      // UPDATE LOCAL HISTORY
      localStorage.setItem(
        "myStoryWorldStories",
        JSON.stringify(formattedStories)
      );

    } catch (err) {
      console.error("Story loading error:", err);

      setError(
        err.response?.data?.detail ||
        "Unable to load stories. Please login again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  // OPEN STORY
  const openStory = (story) => {
    sessionStorage.setItem(
      "myStoryWorldDraft",
      JSON.stringify(story)
    );

    navigate("/generated-story");
  };

  // DELETE STORY
  const deleteStory = async (story) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this story?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`accounts/stories/${story.id}/`);

      const updatedStories = stories.filter(
        (item) => item.id !== story.id
      );

      setStories(updatedStories);

      localStorage.setItem(
        "myStoryWorldStories",
        JSON.stringify(updatedStories)
      );

    } catch (err) {
      console.error("Delete story error:", err);

      alert(
        err.response?.data?.detail ||
        "Unable to delete story. Please try again."
      );
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="my-stories-page">
        <h2>Loading your magical stories... 📚</h2>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="my-stories-page">
        <h2>Unable to Load Stories</h2>
        <p>{error}</p>

        <button onClick={loadStories}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="my-stories-page">

      <div className="my-stories-header">
        <div>
          <span className="my-stories-label">
            YOUR STORY COLLECTION
          </span>

          <h1>My Stories 📚</h1>

          <p>
            All your child's magical adventures in one place.
          </p>
        </div>

        <button onClick={() => navigate("/create-story")}>
          + Create New Story
        </button>
      </div>

      <div className="my-stories-count">
        <span>📖</span>

        <div>
          <h3>{stories.length}</h3>
          <p>Saved Stories</p>
        </div>
      </div>

      {stories.length === 0 ? (
        <div className="my-stories-empty">
          <div className="empty-book">📚</div>

          <h2>No Stories Yet!</h2>

          <p>
            Create your first personalized story and it will appear here.
          </p>

          <button onClick={() => navigate("/create-story")}>
            Create Your First Story
          </button>
        </div>
      ) : (
        <div className="my-stories-grid">

          {stories.map((story) => {
            const image =
              storyImages[story.category] ||
              "/story-images/princess.png";

            return (
              <div className="my-story-card" key={story.id}>

                <div className="my-story-image">
                  <img
                    src={image}
                    alt={story.storyTitle || "My Story"}
                  />

                  <span className="my-story-language">
                    {story.language || "English"}
                  </span>
                </div>

                <div className="my-story-info">

                  <span className="my-story-category">
                    {story.category || "Adventure"}
                  </span>

                  <h2>
                    {story.storyTitle || "My Magical Story"}
                  </h2>

                  <p>
                    For {story.childName}
                  </p>

                  <small>
                    {story.ageGroup || "Children"}
                  </small>

                  <div className="my-story-actions">

                    <button
                      className="read-story-btn"
                      onClick={() => openStory(story)}
                    >
                      Read Story →
                    </button>

                    <button
                      className="delete-story-btn"
                      onClick={() => deleteStory(story)}
                      aria-label="Delete story"
                      title="Delete story"
                    >
                      🗑️
                    </button>

                  </div>
                </div>
              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default MyStories;
