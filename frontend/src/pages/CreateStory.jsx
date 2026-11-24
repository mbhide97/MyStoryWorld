
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./CreateStory.css";

function CreateStory() {
  const navigate = useNavigate();

  const [childProfile, setChildProfile] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("chibi");

  const [storyTitle, setStoryTitle] = useState("");
  const [category, setCategory] = useState("Adventure");
  const [language, setLanguage] = useState("English");
  const [ageGroup, setAgeGroup] = useState("5-7 Years");
  const [lesson, setLesson] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const categories = [
    "Adventure",
    "Princess & Prince",
    "Animal Friends",
    "Magic & Fairy Tales",
    "Space Adventure",
    "Dinosaur World",
    "Bedtime Story",
    "Superhero Story",
  ];

  useEffect(() => {
    try {
      const savedProfile = sessionStorage.getItem("myStoryWorldChild");
      const savedStyle = sessionStorage.getItem(
        "myStoryWorldCharacterStyle"
      );

      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setChildProfile(profile);

        if (profile.language) {
          setLanguage(profile.language);
        }

        if (profile.age !== "") {
          const age = Number(profile.age);

          if (age <= 2) setAgeGroup("0-2 Years");
          else if (age <= 4) setAgeGroup("3-4 Years");
          else if (age <= 7) setAgeGroup("5-7 Years");
          else setAgeGroup("8-10 Years");
        }

        const interests = Array.isArray(profile.interests)
          ? profile.interests
          : (profile.interests || "").split(",").map((item) => item.trim());

        if (interests.includes("Princess & Prince")) {
          setCategory("Princess & Prince");
        } else if (interests.includes("Animals")) {
          setCategory("Animal Friends");
        } else if (interests.includes("Dinosaurs")) {
          setCategory("Dinosaur World");
        } else if (interests.includes("Space")) {
          setCategory("Space Adventure");
        } else if (
          interests.includes("Fairy Tales") ||
          interests.includes("Magic")
        ) {
          setCategory("Magic & Fairy Tales");
        } else if (interests.includes("Superheroes")) {
          setCategory("Superhero Story");
        } else if (
          interests.includes("Adventure") ||
          interests.includes("Vehicles") ||
          interests.includes("Nature")
        ) {
          setCategory("Adventure");
        }
      }

      if (savedStyle) {
        setSelectedStyle(savedStyle);
      }
    } catch (error) {
      console.error("Unable to load child details:", error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storyTitle.trim()) {
      alert("Please enter a story title.");
      return;
    }

    if (!description.trim()) {
      alert("Please describe your story idea.");
      return;
    }

    if (!childProfile?.id) {
      alert("Child profile not found. Please create a child profile first.");
      navigate("/child-profile");
      return;
    }

    setLoading(true);

    const storyData = {
      child: childProfile.id,
      title: storyTitle.trim(),
      category,
      language,
      age_group: ageGroup,
      lesson,
      description: description.trim(),
      character_style: selectedStyle,
    };

    try {
      // Save story details in Django Database
      const response = await api.post("accounts/stories/", storyData);

      const savedStory = response.data;

      // Prepare story data for Story Preview page
      const draftData = {
        id: savedStory.id,
        storyTitle: savedStory.title,
        category: savedStory.category,
        language: savedStory.language,
        ageGroup: savedStory.age_group,
        lesson: savedStory.lesson,
        description: savedStory.description,

        childId: childProfile.id,
        childName: childProfile.name || childProfile.childName || "",
        childAge: childProfile.age || "",
        childGender: childProfile.gender || "",
        childInterests: childProfile.interests || [],
        childPhoto:
          childProfile.photoPreview ||
          childProfile.profile_photo ||
          "",

        characterStyle: savedStory.character_style,
        storyContent: savedStory.story_content || "",
        createdAt: savedStory.created_at,
      };

      sessionStorage.setItem(
        "myStoryWorldDraft",
        JSON.stringify(draftData)
      );

      alert("Story details saved successfully!");

      navigate("/story-preview");
    } catch (error) {
      console.error("Story save error:", error.response?.data || error);

      if (error.response?.status === 401) {
        alert("Your session has expired. Please login again.");
        navigate("/login");
      } else {
        const errorData = error.response?.data;

        let message = "Unable to save story. Please try again.";

        if (errorData) {
          message = Object.entries(errorData)
            .map(([key, value]) => {
              return `${key}: ${
                Array.isArray(value) ? value.join(", ") : value
              }`;
            })
            .join("\n");
        }

        alert(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-story-page">
      <div className="create-story-container">

        <div className="create-story-heading">
          <span className="create-story-label">YOUR MAGICAL STORY</span>
          <h1>Create a Story for Your Little Hero</h1>
          <p>
            Add your ideas and create a magical adventure starring your child.
          </p>
        </div>

        {childProfile && (
          <div className="create-story-child-info">
            <div className="create-story-child-photo">
              {childProfile.photoPreview ? (
                <img
                  src={childProfile.photoPreview}
                  alt={childProfile.name || childProfile.childName || "Child"}
                />
              ) : (
                <span>
                  {(childProfile.name || childProfile.childName || "?")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <h3>
                Story for {childProfile.name || childProfile.childName}
              </h3>
              <p>
                Age: {childProfile.age} years | Language: {language}
              </p>
              <small>Selected Style: {selectedStyle}</small>
            </div>
          </div>
        )}

        <form className="create-story-form" onSubmit={handleSubmit}>

          <div className="create-story-section">
            <h2>01. Story Details</h2>
            <p>Give your story a special name.</p>

            <label htmlFor="storyTitle">Story Title</label>
            <input
              id="storyTitle"
              type="text"
              placeholder="Example: The Little Brave Explorer"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              maxLength={100}
              required
            />

            <label htmlFor="category">Choose Story Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="create-story-section">
            <h2>02. Story Preferences</h2>
            <p>Choose the language and reading level.</p>

            <label htmlFor="language">Story Language</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
            </select>

            <label htmlFor="ageGroup">Child's Age Group</label>
            <select
              id="ageGroup"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
            >
              <option value="0-2 Years">0-2 Years</option>
              <option value="3-4 Years">3-4 Years</option>
              <option value="5-7 Years">5-7 Years</option>
              <option value="8-10 Years">8-10 Years</option>
            </select>
          </div>

          <div className="create-story-section">
            <h2>03. Story Message</h2>
            <p>What would you like your child to learn?</p>

            <label htmlFor="lesson">Moral or Lesson (Optional)</label>
            <select
              id="lesson"
              value={lesson}
              onChange={(e) => setLesson(e.target.value)}
            >
              <option value="">Choose a lesson</option>
              <option value="Kindness">Kindness</option>
              <option value="Sharing">Sharing</option>
              <option value="Honesty">Honesty</option>
              <option value="Courage">Courage</option>
              <option value="Friendship">Friendship</option>
              <option value="Confidence">Confidence</option>
              <option value="Respect">Respect</option>
              <option value="Helping Others">Helping Others</option>
            </select>

            <label htmlFor="description">Describe Your Story Idea</label>
            <textarea
              id="description"
              rows="5"
              placeholder="Example: My child goes on a magical adventure with a friendly dragon and learns to be brave..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
              required
            />

            <small className="create-story-hint">
              {description.length}/1000 characters
            </small>
          </div>

          <div className="create-story-actions">
            <button
              type="button"
              className="create-story-back"
              onClick={() => navigate("/character-preview")}
            >
              Back to Character
            </button>

            <button
              type="submit"
              className="create-story-submit"
              disabled={loading}
            >
              {loading ? "Saving Story..." : "Preview My Story"}
            </button>
          </div>

          <p className="create-story-demo-note">
            Story details will be saved to your account. AI story writing will
            be connected in a later step.
          </p>

        </form>
      </div>
    </div>
  );
}

export default CreateStory;
