
import React, { useState } from "react";
import "./login.css";

function Login({ onLoginSuccess }) {
  const [mobile, setMobile] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  function handleContinue(event) {
    event.preventDefault();

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!accepted) {
      setError("Please accept the Terms of Use and Privacy Policy.");
      return;
    }

    setError("");

    // Login demo successful: return to the homepage
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-offer-banner">
          <div className="offer-copy">
            <span className="offer-sparkle">✦</span>
            <h1>
              FLAT
              <br />
              ₹300 OFF
            </h1>
            <p>ON YOUR 1ST ORDER</p>
            <span className="offer-code">CODE: MYNTRA300</span>
          </div>

          <div className="offer-discount">
            <span>₹300</span>
            <strong>OFF</strong>
          </div>

          <img
            className="offer-model"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=450&q=85"
            alt="Fashion collection"
          />

          <span className="offer-disclaimer">
            *T&C Apply | Limited Time Offer
          </span>
        </div>

        <div className="login-content">
          <h2>
            Login <span>or</span> Signup
          </h2>

          <p className="login-description">
            Enter your mobile number to continue
          </p>

          <form onSubmit={handleContinue}>
            <div className="mobile-input">
              <span className="country-code">+91</span>
              <span className="input-divider">|</span>

              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(event) => {
                  setMobile(
                    event.target.value.replace(/\D/g, "").slice(0, 10)
                  );
                  setError("");
                }}
                maxLength={10}
                inputMode="numeric"
                aria-label="Mobile Number"
              />

              <span className="required-star">*</span>
            </div>

            <label className="terms-row">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(event) => {
                  setAccepted(event.target.checked);
                  setError("");
                }}
              />

              <span>
                By continuing, I agree to the{" "}
                <a href="#terms" onClick={(event) => event.preventDefault()}>
                  Terms of Use
                </a>{" "}
                &amp;{" "}
                <a href="#privacy" onClick={(event) => event.preventDefault()}>
                  Privacy Policy
                </a>{" "}
                and I am above 18 years old.
              </span>
            </label>

            {error && <p className="login-error">{error}</p>}

            <button className="continue-button" type="submit">
              CONTINUE
            </button>
          </form>

          <p className="help-text">
            Have trouble logging in?{" "}
            <button
              type="button"
              onClick={() =>
                setError("For this demo, login support is not connected yet.")
              }
            >
              Get help
            </button>
          </p>
        </div>

        <div className="login-footer">
          <span>YOUR STYLE. YOUR RULES.</span>
          <span>FASHION STORE © 2026</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
