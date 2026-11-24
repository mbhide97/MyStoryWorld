
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your registered email address.");
      return;
    }

    try {
      const savedParent = JSON.parse(
        localStorage.getItem("myStoryWorldParent") || "null"
      );

      if (!savedParent || savedParent.email !== cleanEmail) {
        setError(
          "No account found with this email address. Please check your email."
        );
        return;
      }

      // DEMO RESET REQUEST
      setSuccess(
        "Your account was found! Password reset through email will be available after backend integration."
      );

    } catch (error) {
      console.error("Forgot password error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">

        <Link to="/" className="forgot-logo">
          MyStory<span>World</span>
        </Link>

        <div className="forgot-icon">
          <div className="forgot-icon-circle">?</div>
        </div>

        <div className="forgot-heading">
          <span>PARENT ACCOUNT</span>

          <h1>Forgot Password?</h1>

          <p>
            Don't worry! Enter your registered email address.
            We'll help you reset your password.
          </p>
        </div>

        {error && (
          <div className="forgot-error">
            {error}
          </div>
        )}

        {success && (
          <div className="forgot-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="forgot-input-group">
            <label htmlFor="forgot-email">
              Email Address
            </label>

            <input
              id="forgot-email"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setSuccess("");
              }}
              autoComplete="email"
              required
            />
          </div>

          <button type="submit" className="forgot-submit">
            Send Reset Instructions
          </button>

        </form>

        <div className="forgot-login-link">
          Remember your password?
          <Link to="/login"> Back to Login</Link>
        </div>

        <Link to="/" className="forgot-home-link">
          Back to Home
        </Link>

        <p className="forgot-demo-note">
          Demo mode: Actual password reset emails will work
          after backend integration.
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;
