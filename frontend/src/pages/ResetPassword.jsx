
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const isVerified =
      sessionStorage.getItem("myStoryWorldOtpVerified") === "true";

    if (!isVerified) {
      setError("Please verify your OTP first.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // DEMO ONLY: Password is not saved because authentication
    // is not connected to the backend yet.
    sessionStorage.removeItem("myStoryWorldOtpVerified");

    setSuccess(
      "Password validation successful! Actual password update will work after backend integration."
    );

    setTimeout(() => {
      navigate("/login");
    }, 2500);
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <Link to="/" className="reset-logo">
          MyStory<span>World</span>
        </Link>

        <div className="reset-icon">🔒</div>

        <div className="reset-heading">
          <span>PARENT ACCOUNT</span>
          <h1>Reset Password</h1>
          <p>Create a new password for your account.</p>
        </div>

        {error && <div className="reset-error">{error}</div>}
        {success && <div className="reset-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="reset-input-group">
            <label htmlFor="new-password">New Password</label>
            <input
              id="new-password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="reset-input-group">
            <label htmlFor="confirm-password">
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <p className="reset-hint">
            Password must contain at least 8 characters.
          </p>

          <button type="submit" className="reset-submit">
            Reset Password
          </button>
        </form>

        <Link to="/login" className="reset-back">
          Back to Login
        </Link>

        <p className="reset-demo-note">
          Demo mode: The new password is not saved. Backend
          integration is required for an actual password reset.
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
