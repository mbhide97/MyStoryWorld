
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./OTPVerification.css";

function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    // DEMO OTP: 123456
    if (otp !== "123456") {
      setError("Invalid OTP. Please try again.");
      return;
    }

    sessionStorage.setItem("myStoryWorldOtpVerified", "true");

    setSuccess("OTP verified successfully!");

    setTimeout(() => {
      navigate("/reset-password");
    }, 1000);
  };

  const handleResend = () => {
    setOtp("");
    setError("");
    setSuccess("Demo OTP is 123456.");
  };

  return (
    <div className="otp-page">
      <div className="otp-card">
        <Link to="/" className="otp-logo">
          MyStory<span>World</span>
        </Link>

        <div className="otp-icon">✉️</div>

        <div className="otp-heading">
          <span>PARENT ACCOUNT</span>
          <h1>Verify OTP</h1>
          <p>
            Enter the 6-digit verification code to continue
            resetting your password.
          </p>
        </div>

        {error && <div className="otp-error">{error}</div>}
        {success && <div className="otp-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="otp">6-Digit OTP</label>

          <input
            id="otp"
            type="text"
            inputMode="numeric"
            maxLength="6"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, ""));
              setError("");
              setSuccess("");
            }}
            required
          />

          <button type="submit" className="otp-submit">
            Verify OTP
          </button>
        </form>

        <button
          type="button"
          className="otp-resend"
          onClick={handleResend}
        >
          Resend OTP
        </button>

        <Link to="/forgot-password" className="otp-back">
          ← Back to Forgot Password
        </Link>

        <p className="otp-demo-note">
          Demo mode: Use OTP 123456. Actual email OTP will be
          connected with the backend later.
        </p>
      </div>
    </div>
  );
}

export default OTPVerification;
