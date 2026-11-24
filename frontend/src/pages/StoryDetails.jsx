
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./StoryDetails.css";

function StoryDetails() {
  const stories = [
    {
      id: 1,
      title: "The Magical Princess",
      emoji: "👸",
      category: "Princess & Prince",
      age: "3–6 Years",
      description:
        "Join a brave little princess on a magical adventure through an enchanted kingdom.",
      color: "pink",
    },
    {
      id: 2,
      title: "The Friendly Jungle",
      emoji: "🦁",
      category: "Jungle Adventure",
      age: "3–8 Years",
      description:
        "Meet friendly jungle animals and discover the power of friendship.",
      color: "green",
    },
    {
      id: 3,
      title: "Journey to the Stars",
      emoji: "🚀",
      category: "Space Adventure",
      age: "5–10 Years",
      description:
        "Travel across the universe and explore amazing planets and stars.",
      color: "blue",
    },
    {
      id: 4,
      title: "The Little Fairy",
      emoji: "🧚",
      category: "Magic & Fairy Tales",
      age: "3–7 Years",
      description:
        "Discover a magical fairy garden filled with kindness and surprises.",
      color: "purple",
    },
    {
      id: 5,
      title: "Dino's New Friend",
      emoji: "🦖",
      category: "Dinosaur World",
      age: "3–8 Years",
      description:
        "Meet a little dinosaur who learns how to make new friends.",
      color: "orange",
    },
    {
      id: 6,
      title: "The Sleepy Moon",
      emoji: "🌙",
      category: "Bedtime Stories",
      age: "0–5 Years",
      description:
        "A peaceful bedtime adventure under a beautiful starry sky.",
      color: "sky",
    },
  ];

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("myStoryFavorites") || "[]"
    );

    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (story) => {
    const alreadySaved = favorites.some(
      (item) => item.id === story.id
    );

    let updatedFavorites;

    if (alreadySaved) {
      updatedFavorites = favorites.filter(
        (item) => item.id !== story.id
      );
    } else {
      updatedFavorites = [
        ...favorites,
        {
          id: story.id,
          title: story.title,
          category: story.category,
          description: story.description,
        },
      ];
    }

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "myStoryFavorites",
      JSON.stringify(updatedFavorites)
    );
  };

  return (
    <div className="story-details-page">
      <section className="story-details-heading">
        <span className="story-details-tag">OUR STORY LIBRARY</span>
        <h1>Choose Your Magical Story</h1>
        <p>Every story is a new adventure waiting to begin!</p>

        <Link to="/favorites" className="view-favorites-link">
          View Favourite Stories ({favorites.length})
        </Link>
      </section>

      <section className="story-details-grid">
        {stories.map((story) => {
          const isFavorite = favorites.some(
            (item) => item.id === story.id
          );

          return (
            <article
              className={`story-details-card ${story.color}`}
              key={story.id}
            >
              <button
                type="button"
                className={`story-favorite-btn ${
                  isFavorite ? "active" : ""
                }`}
                onClick={() => toggleFavorite(story)}
                aria-label={
                  isFavorite
                    ? "Remove from favourites"
                    : "Add to favourites"
                }
                title={
                  isFavorite
                    ? "Remove from favourites"
                    : "Add to favourites"
                }
              >
                {isFavorite ? "♥" : "♡"}
              </button>

              <div className="story-details-art">
                {story.emoji}
              </div>

              <span className="story-details-category">
                {story.category}
              </span>

              <h2>{story.title}</h2>

              <p>{story.description}</p>

              <span className="story-details-age">
                Age: {story.age}
              </span>

              <Link
                to={`/read-story/${story.id}`}
                className="story-details-button"
              >
                Read Story
              </Link>
            </article>
          );
        })}
      </section>

      <div className="story-details-back">
        <Link to="/explore">Back to Categories</Link>
      </div>
    </div>
  );
}

export default StoryDetails;
