
import React from "react";
import "./Home.css";

function Home() {
  const categories = [
    {
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Princess",
      title: "Princess & Prince",
      desc: "Magical royal adventures",
      color: "pink",
      decoration: "🏰",
      tag: "FAIRYTALE",
    },
    {
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Jungle",
      title: "Jungle Adventure",
      desc: "Meet amazing animal friends",
      color: "green",
      decoration: "🌴",
      tag: "WILD WORLD",
    },
    {
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Space",
      title: "Space Adventure",
      desc: "Explore the magical universe",
      color: "blue",
      decoration: "🚀",
      tag: "GALAXY",
    },
    {
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Fairy",
      title: "Magic & Fairy Tales",
      desc: "Enter a world of magic",
      color: "purple",
      decoration: "✨",
      tag: "MAGICAL",
    },
    {
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Dinosaur",
      title: "Dinosaur World",
      desc: "Travel to the dinosaur age",
      color: "yellow",
      decoration: "🌋",
      tag: "PREHISTORIC",
    },
    {
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Bedtime",
      title: "Bedtime Stories",
      desc: "Sweet dreams begin here",
      color: "orange",
      decoration: "🌙",
      tag: "SWEET DREAMS",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: "👧",
      title: "Add Your Child",
      description:
        "Create a parent account and add your little one's profile with their name, age and language.",
    },
    {
      number: "02",
      icon: "🎨",
      title: "Create Their Hero",
      description:
        "Upload a photo and choose a beautiful cartoon style to turn your child into a storybook hero.",
    },
    {
      number: "03",
      icon: "📖",
      title: "Enjoy The Story",
      description:
        "Choose a magical story and watch your child become the star of their own adventure.",
    },
  ];

  return (
    <div className="app">
      <section className="hero-section" id="home">
        <div className="hero-content">
          <div className="hero-badge">
            ✨ A magical world made just for your child
          </div>

          <h1>
            Every Child Is The <span>Hero</span> Of Their Own Story!
          </h1>

          <p>
            Turn your little one's imagination into magical adventures.
            Create personalized storybooks where your child becomes the
            hero of every beautiful story.
          </p>

          <div className="hero-buttons">
            <a href="#how-it-works" className="primary-btn">
              ✨ Create Your Story
            </a>
            <a href="/explore" className="secondary-btn">
              📚 Explore Stories
            </a>
          </div>

          <div className="hero-trust">
            <div className="trust-avatars">
              <span>👧</span>
              <span>👦</span>
              <span>🧒</span>
            </div>
            <span>Made with love for little dreamers 💜</span>
          </div>
        </div>

        <div className="hero-art">
          <img
            src="/hero-story.png"
            alt="Children enjoying a magical storybook adventure"
            className="hero-image"
          />
        </div>
      </section>

      <section className="features-strip">
        <div className="feature-item">
          <div className="feature-icon">🧒</div>
          <div>
            <h4>Personalized Characters</h4>
            <p>Your child, your hero</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">📖</div>
          <div>
            <h4>Magical Stories</h4>
            <p>Endless imagination</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">🌍</div>
          <div>
            <h4>3 Languages</h4>
            <p>English, Hindi & Marathi</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">💜</div>
          <div>
            <h4>Made with Love</h4>
            <p>For little dreamers</p>
          </div>
        </div>
      </section>

      <section className="section" id="stories">
        <div className="section-heading">
          <div className="section-label">EXPLORE THE MAGIC</div>
          <h2>
            A World Full Of <span>Wonderful Stories</span>
          </h2>
          <p>
            From magical kingdoms to exciting space journeys, discover
            adventures that make every little imagination come alive.
          </p>
        </div>

        <div className="category-grid">
          {categories.map((item, index) => (
            <article className={`category-card ${item.color}`} key={index}>
              <span className="category-tag">{item.tag}</span>
              <span className="category-decoration">{item.decoration}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <img
                src={item.image}
                alt={item.title}
                className="category-image"
                loading="lazy"
              />
            </article>
          ))}
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="section-heading">
          <div className="section-label">SIMPLE & MAGICAL</div>
          <h2>Three Little Steps To Big Adventures</h2>
          <p>
            Creating a personalized story for your child is as easy as
            one, two, three!
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <article className="step-card" key={index}>
              <span className="step-number">{step.number}</span>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-section" id="pricing">
        <div className="pricing-box">
          <h2>Little Dreams, Big Adventures! ✨</h2>
          <p>
            Start with a free demo and discover a magical storytelling
            experience made especially for your little one.
          </p>
          <a href="#how-it-works" className="primary-btn">
            Start Your Free Demo →
          </a>
        </div>
      </section>

      <footer className="footer" id="footer">
        <div className="footer-content">
          <div>
            <div className="footer-logo">🌈 MyStoryWorld</div>
            <p className="footer-text">
              Every Child Becomes the Hero of Their Own Story.
            </p>
          </div>

          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/explore">Stories</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} MyStoryWorld. Made with 💜 for little dreamers.
        </div>
      </footer>
    </div>
  );
}

export default Home;
