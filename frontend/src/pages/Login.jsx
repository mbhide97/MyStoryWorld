
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     const cleanEmail = email.trim().toLowerCase();

//     if (!cleanEmail || !password.trim()) {
//       setError("Please enter your email and password.");
//       return;
//     }

//     // DEMO LOGIN
//     const savedParent = JSON.parse(
//       localStorage.getItem("myStoryWorldParent") || "{}"
//     );

//     const parent = {
//       name:
//         savedParent.email === cleanEmail && savedParent.name
//           ? savedParent.name
//           : cleanEmail.split("@")[0],
//       email: cleanEmail,
//     };

//     localStorage.setItem(
//       "myStoryWorldParent",
//       JSON.stringify(parent)
//     );

//     // LOGIN STATUS
//     const loginData = {
//       email: cleanEmail,
//       isLoggedIn: true,
//       loginTime: new Date().toISOString(),
//     };

//     if (rememberMe) {
//       localStorage.setItem(
//         "myStoryWorldLogin",
//         JSON.stringify(loginData)
//       );

//       sessionStorage.removeItem("myStoryWorldLogin");
//     } else {
//       sessionStorage.setItem(
//         "myStoryWorldLogin",
//         JSON.stringify(loginData)
//       );

//       localStorage.removeItem("myStoryWorldLogin");
//     }

//     // UPDATE NAVBAR LOGIN STATUS
//     window.dispatchEvent(
//       new Event("myStoryWorldAuthChanged")
//     );

//     // GO TO PARENT DASHBOARD
//     navigate("/parent-dashboard");
//   };

//   return (
//     <div className="parent-login-page">
//       <div className="login-container">

//         {/* LEFT SECTION */}
//         <div className="login-left">

//           <Link to="/" className="login-logo">
//             MyStory<span>World</span>
//           </Link>

//           <div className="login-welcome">
//             <span className="login-label">PARENT ZONE</span>

//             <h1>
//               Welcome Back to
//               <span> Magical Stories!</span>
//             </h1>

//             <p>
//               Sign in to create magical adventures,
//               manage your child's profile and explore
//               personalized stories together.
//             </p>

//             <div className="login-features">
//               <div>Personalized Stories</div>
//               <div>Multiple Child Profiles</div>
//               <div>Safe & Private Experience</div>
//             </div>
//           </div>

//           <p className="login-left-footer">
//             Every Child Becomes the Hero of Their Own Story.
//           </p>

//         </div>

//         {/* RIGHT SECTION */}
//         <div className="login-right">

//           <div className="login-form-wrapper">

//             <div className="login-heading">
//               <span>WELCOME BACK</span>
//               <h2>Parent Login</h2>
//               <p>Enter your details to continue your journey.</p>
//             </div>

//             {error && (
//               <div className="login-error">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>

//               <div className="login-input-group">
//                 <label htmlFor="email">
//                   Email Address
//                 </label>

//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   autoComplete="email"
//                   required
//                 />
//               </div>

//               <div className="login-input-group">
//                 <label htmlFor="password">
//                   Password
//                 </label>

//                 <input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   autoComplete="current-password"
//                   required
//                 />
//               </div>

//               <div className="login-options">

//                 <label className="remember-option">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) =>
//                       setRememberMe(e.target.checked)
//                     }
//                   />
//                   Remember me
//                 </label>

//                 <Link to="/forgot-password">
//                   Forgot Password?
//                 </Link>

//               </div>

//               <button
//                 type="submit"
//                 className="login-submit-btn"
//               >
//                 Login to My Account
//               </button>

//             </form>

//             <div className="login-register-link">
//               Don't have an account?
//               <Link to="/register"> Create Account</Link>
//             </div>

//             <div className="login-home-link">
//               <Link to="/">Back to Home</Link>
//             </div>

//             <p className="login-demo-note">
//               Demo mode: Any valid email and non-empty password
//               will continue to the dashboard.
//             </p>

//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("accounts/login/", {
        email: cleanEmail,
        password,
      });

      const { access, refresh, user } = response.data;

      if (!access || !refresh) {
        setError("Login failed. Authentication tokens not received.");
        return;
      }

      // SAVE TOKENS
      const storage = rememberMe ? localStorage : sessionStorage;
      const otherStorage = rememberMe ? sessionStorage : localStorage;

      storage.setItem("myStoryWorldAccessToken", access);
      storage.setItem("myStoryWorldRefreshToken", refresh);

      // Remove old tokens from other storage
      otherStorage.removeItem("myStoryWorldAccessToken");
      otherStorage.removeItem("myStoryWorldRefreshToken");

      // SAVE PARENT DETAILS
      const parent = {
        name: user?.name || cleanEmail.split("@")[0],
        email: user?.email || cleanEmail,
      };

      localStorage.setItem(
        "myStoryWorldParent",
        JSON.stringify(parent)
      );

      // SAVE LOGIN STATUS
      const loginData = {
        email: cleanEmail,
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
      };

      storage.setItem(
        "myStoryWorldLogin",
        JSON.stringify(loginData)
      );

      otherStorage.removeItem("myStoryWorldLogin");

      // UPDATE NAVBAR
      window.dispatchEvent(
        new Event("myStoryWorldAuthChanged")
      );

      alert("Login successful! Welcome to MyStoryWorld.");

      navigate("/parent-dashboard");

    } catch (err) {
      console.error("Login Error:", err.response?.data || err);

      const data = err.response?.data;

      if (data?.detail) {
        setError(data.detail);
      } else if (data?.non_field_errors) {
        setError(data.non_field_errors[0]);
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="parent-login-page">
      <div className="login-container">

        {/* LEFT SECTION */}
        <div className="login-left">

          <Link to="/" className="login-logo">
            MyStory<span>World</span>
          </Link>

          <div className="login-welcome">
            <span className="login-label">PARENT ZONE</span>

            <h1>
              Welcome Back to
              <span> Magical Stories!</span>
            </h1>

            <p>
              Sign in to create magical adventures,
              manage your child's profile and explore
              personalized stories together.
            </p>

            <div className="login-features">
              <div>Personalized Stories</div>
              <div>Multiple Child Profiles</div>
              <div>Safe & Private Experience</div>
            </div>
          </div>

          <p className="login-left-footer">
            Every Child Becomes the Hero of Their Own Story.
          </p>

        </div>

        {/* RIGHT SECTION */}
        <div className="login-right">

          <div className="login-form-wrapper">

            <div className="login-heading">
              <span>WELCOME BACK</span>
              <h2>Parent Login</h2>
              <p>Enter your details to continue your journey.</p>
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="login-input-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="login-input-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              <div className="login-options">

                <label className="remember-option">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                  />
                  Remember me
                </label>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>

              </div>

              <button
                type="submit"
                className="login-submit-btn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login to My Account"}
              </button>

            </form>

            <div className="login-register-link">
              Don't have an account?
              <Link to="/register"> Create Account</Link>
            </div>

            <div className="login-home-link">
              <Link to="/">Back to Home</Link>
            </div>

            <p className="login-demo-note">
              Secure login powered by MyStoryWorld.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;
