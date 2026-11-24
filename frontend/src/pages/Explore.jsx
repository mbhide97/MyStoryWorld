
import React from "react";
import { Link } from "react-router-dom";
import "./Explore.css";

function Explore() {
  const categories = [
    { title: "Princess & Prince", emoji: "👑", description: "Royal adventures filled with magic.", color: "pink" },
    { title: "Jungle Adventure", emoji: "🦁", description: "Explore the magical animal kingdom.", color: "green" },
    { title: "Space Adventure", emoji: "🚀", description: "Travel through stars and planets.", color: "blue" },
    { title: "Magic & Fairy Tales", emoji: "🧚", description: "Discover fairies and magical worlds.", color: "purple" },
    { title: "Dinosaur World", emoji: "🦖", description: "Meet friendly dinosaurs.", color: "orange" },
    { title: "Bedtime Stories", emoji: "🌙", description: "Sweet stories for peaceful nights.", color: "sky" },
  ];

  return (
    <div className="explore-page">
      <section className="explore-header">
        <span className="explore-tag">✨ STORY COLLECTION</span>
        <h1>Explore Magical Stories</h1>
        <p>Discover wonderful adventures and find a story your little one will love!</p>
      </section>

      <section className="explore-grid">
        {categories.map((category) => (
          <article className={`explore-card ${category.color}`} key={category.title}>
            <div className="explore-art">{category.emoji}</div>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
            <Link to="/stories" className="explore-button">
              Explore Stories <span>→</span>
            </Link>
          </article>
        ))}
      </section>

      <div className="explore-back">
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
}

export default Explore;
