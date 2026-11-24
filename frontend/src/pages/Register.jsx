
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Register.css";

// function Register() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     const name = formData.name.trim();
//     const email = formData.email.trim().toLowerCase();

//     if (name.length < 2) {
//       setError("Please enter your full name.");
//       return;
//     }

//     if (formData.password.length < 8) {
//       setError("Password must contain at least 8 characters.");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     if (!acceptedTerms) {
//       setError("Please accept the Terms & Conditions.");
//       return;
//     }

//     // DEMO REGISTRATION
//     // Never store the password in browser storage.
//     const parent = {
//       name,
//       email,
//       createdAt: new Date().toISOString(),
//     };

//     localStorage.setItem(
//       "myStoryWorldParent",
//       JSON.stringify(parent)
//     );

//     // SAVE LOGIN STATUS
//     const loginData = {
//       email,
//       isLoggedIn: true,
//       loginTime: new Date().toISOString(),
//     };

//     localStorage.setItem(
//       "myStoryWorldLogin",
//       JSON.stringify(loginData)
//     );

//     sessionStorage.removeItem("myStoryWorldLogin");

//     // UPDATE NAVBAR IMMEDIATELY
//     window.dispatchEvent(
//       new Event("myStoryWorldAuthChanged")
//     );

//     alert("Your account has been created successfully!");

//     // GO TO PARENT DASHBOARD
//     navigate("/parent-dashboard");
//   };

//   return (
//     <div className="parent-register-page">
//       <div className="register-container">

//         {/* LEFT SECTION */}
//         <div className="register-left">

//           <Link to="/" className="register-logo">
//             MyStory<span>World</span>
//           </Link>

//           <div className="register-welcome">
//             <span className="register-label">PARENT ZONE</span>

//             <h1>
//               Create Your Account &
//               <span> Start the Magic!</span>
//             </h1>

//             <p>
//               Join MyStoryWorld and create personalized magical
//               adventures where your child becomes the hero.
//             </p>

//             <div className="register-features">
//               <div>Personalized Story Adventures</div>
//               <div>Multiple Child Profiles</div>
//               <div>Safe & Private Experience</div>
//             </div>
//           </div>

//           <p className="register-left-footer">
//             Every Child Becomes the Hero of Their Own Story.
//           </p>

//         </div>

//         {/* RIGHT SECTION */}
//         <div className="register-right">

//           <div className="register-form-wrapper">

//             <div className="register-heading">
//               <span>GET STARTED</span>
//               <h2>Create Parent Account</h2>
//               <p>Fill in your details to begin your journey.</p>
//             </div>

//             {error && (
//               <div className="register-error">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>

//               <div className="register-input-group">
//                 <label htmlFor="name">Full Name</label>

//                 <input
//                   id="name"
//                   type="text"
//                   name="name"
//                   placeholder="Enter your full name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   autoComplete="name"
//                   required
//                 />
//               </div>

//               <div className="register-input-group">
//                 <label htmlFor="register-email">
//                   Email Address
//                 </label>

//                 <input
//                   id="register-email"
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   autoComplete="email"
//                   required
//                 />
//               </div>

//               <div className="register-input-group">
//                 <label htmlFor="register-password">
//                   Password
//                 </label>

//                 <input
//                   id="register-password"
//                   type="password"
//                   name="password"
//                   placeholder="Create a password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   minLength={8}
//                   autoComplete="new-password"
//                   required
//                 />
//               </div>

//               <div className="register-input-group">
//                 <label htmlFor="confirmPassword">
//                   Confirm Password
//                 </label>

//                 <input
//                   id="confirmPassword"
//                   type="password"
//                   name="confirmPassword"
//                   placeholder="Confirm your password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   minLength={8}
//                   autoComplete="new-password"
//                   required
//                 />
//               </div>

//               <label className="register-terms">
//                 <input
//                   type="checkbox"
//                   checked={acceptedTerms}
//                   onChange={(e) =>
//                     setAcceptedTerms(e.target.checked)
//                   }
//                   required
//                 />

//                 <span>
//                   I agree to the Terms & Conditions and Privacy Policy.
//                 </span>
//               </label>

//               <button
//                 type="submit"
//                 className="register-submit-btn"
//               >
//                 Create My Account
//               </button>

//             </form>

//             <div className="register-login-link">
//               Already have an account?
//               <Link to="/login"> Login</Link>
//             </div>

//             <div className="register-home-link">
//               <Link to="/">Back to Home</Link>
//             </div>

//             <p className="register-demo-note">
//               Demo mode: Registration is currently stored in this
//               browser. Secure backend registration will be connected later.
//             </p>

//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();

    if (name.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("accounts/register/", {
        name,
        email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });

      alert(
        response.data.message ||
        "Your account has been created successfully! Please login."
      );

      navigate("/login");

    } catch (err) {
      console.error("Registration Error:", err.response?.data || err);

      const data = err.response?.data;

      if (data?.email) {
        setError(
          Array.isArray(data.email) ? data.email[0] : data.email
        );
      } else if (data?.password) {
        setError(
          Array.isArray(data.password) ? data.password[0] : data.password
        );
      } else if (data?.confirm_password) {
        setError(
          Array.isArray(data.confirm_password)
            ? data.confirm_password[0]
            : data.confirm_password
        );
      } else if (data?.detail) {
        setError(data.detail);
      } else if (data && typeof data === "object") {
        const firstError = Object.values(data)[0];
        setError(
          Array.isArray(firstError)
            ? firstError[0]
            : String(firstError)
        );
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="parent-register-page">
      <div className="register-container">

        {/* LEFT SECTION */}
        <div className="register-left">

          <Link to="/" className="register-logo">
            MyStory<span>World</span>
          </Link>

          <div className="register-welcome">
            <span className="register-label">PARENT ZONE</span>

            <h1>
              Create Your Account &
              <span> Start the Magic!</span>
            </h1>

            <p>
              Join MyStoryWorld and create personalized magical
              adventures where your child becomes the hero.
            </p>

            <div className="register-features">
              <div>Personalized Story Adventures</div>
              <div>Multiple Child Profiles</div>
              <div>Safe & Private Experience</div>
            </div>
          </div>

          <p className="register-left-footer">
            Every Child Becomes the Hero of Their Own Story.
          </p>

        </div>

        {/* RIGHT SECTION */}
        <div className="register-right">

          <div className="register-form-wrapper">

            <div className="register-heading">
              <span>GET STARTED</span>
              <h2>Create Parent Account</h2>
              <p>Fill in your details to begin your journey.</p>
            </div>

            {error && (
              <div className="register-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="register-input-group">
                <label htmlFor="name">Full Name</label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="register-input-group">
                <label htmlFor="register-email">
                  Email Address
                </label>

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="register-input-group">
                <label htmlFor="register-password">
                  Password
                </label>

                <input
                  id="register-password"
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={8}
                  autoComplete="new-password"
                  required
                />
              </div>

              <div className="register-input-group">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  minLength={8}
                  autoComplete="new-password"
                  required
                />
              </div>

              <label className="register-terms">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) =>
                    setAcceptedTerms(e.target.checked)
                  }
                  required
                />

                <span>
                  I agree to the Terms & Conditions and Privacy Policy.
                </span>
              </label>

              <button
                type="submit"
                className="register-submit-btn"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create My Account"}
              </button>

            </form>

            <div className="register-login-link">
              Already have an account?
              <Link to="/login"> Login</Link>
            </div>

            <div className="register-home-link">
              <Link to="/">Back to Home</Link>
            </div>

            <p className="register-demo-note">
              Your account details are securely registered with MyStoryWorld.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;
