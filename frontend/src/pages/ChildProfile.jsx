
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./ChildProfile.css";

function ChildProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    gender: "",
    language: "English",
    interests: [],
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [childId, setChildId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedProfile = sessionStorage.getItem("myStoryWorldChild");

    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);

        setFormData({
          childName: parsedProfile.childName || parsedProfile.name || "",
          age: parsedProfile.age || "",
          gender: parsedProfile.gender || "",
          language: parsedProfile.language || "English",
          interests: Array.isArray(parsedProfile.interests)
            ? parsedProfile.interests
            : [],
        });

        setPhotoPreview(parsedProfile.photoPreview || parsedProfile.profile_photo || "");
        setChildId(parsedProfile.id || null);
      } catch (error) {
        console.error("Unable to load child profile:", error);
      }
    }
  }, []);

  const interestsList = [
    "Princess & Prince",
    "Animals",
    "Dinosaurs",
    "Space",
    "Fairy Tales",
    "Magic",
    "Adventure",
    "Superheroes",
    "Vehicles",
    "Nature",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setPhoto(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.age) < 1 || Number(formData.age) > 18) {
      alert("Child age must be between 1 and 18 years.");
      return;
    }

    if (formData.interests.length === 0) {
      alert("Please select at least one interest.");
      return;
    }

    const data = new FormData();

    data.append("name", formData.childName.trim());
    data.append("age", formData.age);
    data.append("gender", formData.gender);
    data.append("interests", formData.interests.join(", "));

    if (photo) {
      data.append("profile_photo", photo);
    }

    setLoading(true);

    try {
      let response;

      if (childId) {
        response = await api.put(
          `accounts/children/${childId}/`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await api.post(
          "accounts/children/",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      const savedChild = response.data;

      const childProfile = {
        id: savedChild.id,
        childName: savedChild.name,
        name: savedChild.name,
        age: savedChild.age,
        gender: savedChild.gender,
        language: formData.language,
        interests: formData.interests,
        profile_photo: savedChild.profile_photo || "",
        photoPreview: photoPreview,
        createdAt: savedChild.created_at,
      };

      sessionStorage.setItem(
        "myStoryWorldChild",
        JSON.stringify(childProfile)
      );

      alert(
        childId
          ? "Child profile updated successfully!"
          : "Child profile created successfully!"
      );

      navigate("/character-style");

    } catch (error) {
      console.error("Child profile API error:", error);

      if (error.response?.status === 401) {
        alert("Your session has expired. Please login again.");
        navigate("/login");
      } else {
        const errorData = error.response?.data;

        if (errorData) {
          const errorMessage = Object.entries(errorData)
            .map(([key, value]) => {
              return `${key}: ${
                Array.isArray(value) ? value.join(", ") : value
              }`;
            })
            .join("\n");

          alert(errorMessage || "Unable to save child profile.");
        } else {
          alert("Unable to connect to server. Please try again.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="child-profile-page">
      <div className="child-profile-container">

        <div className="child-profile-header">
          <Link to="/" className="child-profile-logo">
            MyStory<span>World</span>
          </Link>

          <span className="profile-step">PARENT DASHBOARD</span>
        </div>

        <div className="child-profile-heading">
          <span className="profile-eyebrow">LET'S CREATE MAGIC</span>
          <h1>Create Your Child's Profile</h1>
          <p>
            Tell us a little about your child so we can create
            wonderful personalized stories.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="child-profile-card">

            <div className="profile-section-title">
              <span className="profile-section-number">01</span>
              <div>
                <h2>Basic Information</h2>
                <p>Let's get to know your little storyteller.</p>
              </div>
            </div>

            <div className="profile-photo-section">
              <div className="profile-photo-preview">
                {photoPreview ? (
                  <img src={photoPreview} alt="Child preview" />
                ) : (
                  <span className="profile-photo-placeholder">+</span>
                )}
              </div>

              <div className="profile-photo-info">
                <h3>Child's Photo</h3>
                <p>Upload a photo to personalize story characters.</p>

                <label htmlFor="childPhoto" className="profile-upload-btn">
                  Choose Photo
                </label>

                <input
                  id="childPhoto"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handlePhoto}
                  hidden
                />

                <small>JPG, PNG or WEBP. Maximum 5 MB.</small>
              </div>
            </div>

            <div className="profile-form-grid">

              <div className="profile-input-group">
                <label htmlFor="childName">Child's Name *</label>
                <input
                  id="childName"
                  type="text"
                  name="childName"
                  placeholder="Enter child's name"
                  value={formData.childName}
                  onChange={handleChange}
                  maxLength={50}
                  required
                />
              </div>

              <div className="profile-input-group">
                <label htmlFor="age">Child's Age *</label>
                <select
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select age</option>
                  {Array.from({ length: 18 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? "Year" : "Years"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="profile-input-group">
                <label htmlFor="gender">Gender (Optional)</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Prefer not to say</option>
                  <option value="Girl">Girl</option>
                  <option value="Boy">Boy</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="profile-input-group">
                <label htmlFor="language">Preferred Story Language *</label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                >
                  <option value="English">English</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>

            </div>
          </div>

          <div className="child-profile-card">

            <div className="profile-section-title">
              <span className="profile-section-number">02</span>
              <div>
                <h2>Choose Favourite Interests</h2>
                <p>Select what your child loves. Choose multiple options.</p>
              </div>
            </div>

            <div className="profile-interests">
              {interestsList.map((interest) => (
                <button
                  type="button"
                  key={interest}
                  className={
                    formData.interests.includes(interest)
                      ? "interest-option selected"
                      : "interest-option"
                  }
                  onClick={() => handleInterest(interest)}
                >
                  {interest}

                  {formData.interests.includes(interest) && (
                    <span className="interest-check">✓</span>
                  )}
                </button>
              ))}
            </div>

          </div>

          <div className="profile-submit-area">
            <p>Your child's profile will be private and managed by you.</p>

            <button
              type="submit"
              className="create-profile-btn"
              disabled={loading}
            >
              {loading
                ? "Saving Profile..."
                : "Continue to Character Style"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ChildProfile;
