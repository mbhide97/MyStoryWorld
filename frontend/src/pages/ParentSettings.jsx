
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./ParentSettings.css";

function ParentSettings() {
  const navigate = useNavigate();

  const [parent, setParent] = useState({
    name: "",
    email: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // FETCH ORIGINAL PROFILE
  const fetchOriginalProfile = async () => {
    try {
      const response = await api.get("accounts/profile/");
      const profile = response.data.user || response.data;

      setParent({
        name: profile.name || "",
        email: profile.email || "",
      });
    } catch (error) {
      console.error(
        "Profile loading error:",
        error.response?.data || error
      );

      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        setMessage("Unable to load profile. Please try again.");
      }
    }
  };

  // LOAD PROFILE WHEN PAGE OPENS
  useEffect(() => {
    const loadProfile = async () => {
      try {
        await fetchOriginalProfile();
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {
    setParent({
      ...parent,
      [e.target.name]: e.target.value,
    });
  };

  // SAVE UPDATED PROFILE
  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    const name = parent.name.trim();
    const email = parent.email.trim().toLowerCase();

    if (!name || !email) {
      setMessage("Please enter your name and email.");
      return;
    }

    if (name.length < 2) {
      setMessage("Name must contain at least 2 characters.");
      return;
    }

    try {
      setSaving(true);

      const response = await api.put("accounts/profile/", {
        name,
        email,
      });

      const updatedParent = response.data.user;

      setParent({
        name: updatedParent.name,
        email: updatedParent.email,
      });

      // UPDATE LOCAL PARENT DETAILS
      localStorage.setItem(
        "myStoryWorldParent",
        JSON.stringify({
          name: updatedParent.name,
          email: updatedParent.email,
        })
      );

      // UPDATE LOGIN EMAIL
      ["localStorage", "sessionStorage"].forEach(
        (storageName) => {
          const storage =
            storageName === "localStorage"
              ? localStorage
              : sessionStorage;

          const loginData = JSON.parse(
            storage.getItem("myStoryWorldLogin") || "null"
          );

          if (loginData) {
            loginData.email = updatedParent.email;

            storage.setItem(
              "myStoryWorldLogin",
              JSON.stringify(loginData)
            );
          }
        }
      );

      setEditMode(false);

      setMessage(
        response.data.message ||
        "Profile updated successfully!"
      );

    } catch (error) {
      console.error(
        "Profile update error:",
        error.response?.data || error
      );

      const data = error.response?.data;

      setMessage(
        data?.message ||
        data?.detail ||
        "Profile update failed. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // CANCEL EDITING
  const handleCancel = async () => {
    setEditMode(false);
    setMessage("");
    await fetchOriginalProfile();
  };

  if (loading) {
    return (
      <div className="parent-settings-page">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div className="parent-settings-page">

      {/* HEADER */}
      <div className="settings-header">
        <span>PARENT ACCOUNT</span>
        <h1>Account Settings ⚙️</h1>
        <p>Manage your MyStoryWorld account details.</p>
      </div>

      {/* PROFILE CARD */}
      <div className="settings-card">

        <div className="settings-card-heading">
          <div className="settings-avatar">👤</div>

          <div>
            <h2>Parent Profile</h2>
            <p>Update your personal information.</p>
          </div>
        </div>

        {message && (
          <div className="settings-message">
            {message}
          </div>
        )}

        <form onSubmit={handleSave}>

          <div className="settings-field">
            <label>Parent Name</label>

            <input
              type="text"
              name="name"
              value={parent.name}
              onChange={handleChange}
              placeholder="Enter your name"
              disabled={!editMode || saving}
              required
            />
          </div>

          <div className="settings-field">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={parent.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={!editMode || saving}
              required
            />
          </div>

          {/* BUTTONS */}
          <div className="settings-buttons">

            {editMode ? (
              <>
                <button
                  type="submit"
                  className="settings-save-btn"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  className="settings-cancel-btn"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="settings-edit-btn"
                onClick={() => {
                  setEditMode(true);
                  setMessage("");
                }}
              >
                Edit Profile
              </button>
            )}

          </div>

        </form>
      </div>

      {/* ACCOUNT SECURITY */}
      <div className="settings-card settings-help-card">
        <h2>Account Security 🔐</h2>

        <p>
          Password changes and account deletion will be connected
          to your secure backend authentication system.
        </p>
      </div>

      {/* BACK BUTTON */}
      <button
        className="settings-back-btn"
        onClick={() => navigate("/parent-dashboard")}
      >
        ← Back to Dashboard
      </button>

    </div>
  );
}

export default ParentSettings;
