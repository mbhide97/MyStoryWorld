
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("myStoryFavorites") || "[]"
    );

    setFavorites(saved);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((story) => story.id !== id);

    setFavorites(updated);
    localStorage.setItem("myStoryFavorites", JSON.stringify(updated));
  };

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <div className="favorites-header">
          <span>YOUR COLLECTION</span>
          <h1>Favourite Stories</h1>
          <p>Your saved magical stories are waiting for you.</p>
        </div>

        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <h2>No Favourite Stories Yet</h2>
            <p>Explore stories and save your favourites here.</p>
            <Link to="/stories" className="favorites-explore-btn">
              Explore Stories
            </Link>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((story) => (
              <div className="favorite-card" key={story.id}>
                <div className="favorite-card-content">
                  <span className="favorite-category">
                    {story.category}
                  </span>

                  <h2>{story.title}</h2>
                  <p>{story.description}</p>

                  <div className="favorite-actions">
                    <Link
                      to={`/read-story/${story.id}`}
                      className="favorite-read-btn"
                    >
                      Read Story
                    </Link>

                    <button
                      onClick={() => removeFavorite(story.id)}
                      className="favorite-remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
