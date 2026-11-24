
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./ParentDashboard.css";

// function ParentDashboard() {
//   const navigate = useNavigate();

//   const [child, setChild] = useState(null);
//   const [stories, setStories] = useState([]);
//   const [favorites, setFavorites] = useState([]);

//   // LOAD DASHBOARD DATA
//   useEffect(() => {
//     try {
//       const savedChild = sessionStorage.getItem("myStoryWorldChild");

//       const savedStories = JSON.parse(
//         localStorage.getItem("myStoryWorldStories") || "[]"
//       );

//       const savedFavorites = JSON.parse(
//         localStorage.getItem("myStoryFavorites") || "[]"
//       );

//       if (savedChild) {
//         setChild(JSON.parse(savedChild));
//       }

//       setStories(Array.isArray(savedStories) ? savedStories : []);
//       setFavorites(Array.isArray(savedFavorites) ? savedFavorites : []);

//     } catch (error) {
//       console.error("Dashboard data loading error:", error);
//     }
//   }, []);

//   // LOGOUT
//   const handleLogout = () => {
//     const confirmLogout = window.confirm(
//       "Are you sure you want to logout?"
//     );

//     if (!confirmLogout) return;

//     sessionStorage.removeItem("myStoryWorldChild");
//     sessionStorage.removeItem("myStoryWorldDraft");
//     sessionStorage.removeItem("myStoryWorldCharacterStyle");

//     localStorage.removeItem("myStoryWorldParent");

//     navigate("/login");
//   };

//   return (
//     <div className="parent-dashboard">

//       {/* HEADER */}
//       <div className="dashboard-header">
//         <div>
//           <span className="dashboard-label">PARENT SPACE</span>

//           <h1>Welcome to Your Dashboard!</h1>

//           <p>
//             Manage your child's magical storytelling journey.
//           </p>
//         </div>

//         <div className="dashboard-header-actions">
//           <Link to="/child-profile" className="dashboard-primary-btn">
//             + Child Profile
//           </Link>

//           <button
//             type="button"
//             onClick={handleLogout}
//             className="dashboard-logout-btn"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* STATISTICS */}
//       <div className="dashboard-stats">

//         <div className="dashboard-stat-card">
//           <span>📚</span>
//           <div>
//             <h2>{stories.length}</h2>
//             <p>My Stories</p>
//           </div>
//         </div>

//         <div className="dashboard-stat-card">
//           <span>❤️</span>
//           <div>
//             <h2>{favorites.length}</h2>
//             <p>Favourite Stories</p>
//           </div>
//         </div>

//         <div className="dashboard-stat-card">
//           <span>👧</span>
//           <div>
//             <h2>{child ? "1" : "0"}</h2>
//             <p>Child Profiles</p>
//           </div>
//         </div>

//       </div>

//       {/* CHILD PROFILE */}
//       <section className="dashboard-child-section">

//         <div className="dashboard-section-heading">
//           <h2>Child Profile</h2>
//           <Link to="/child-profile">Edit Profile →</Link>
//         </div>

//         {child ? (
//           <div className="dashboard-child-card">

//             <div className="dashboard-child-avatar">
//               {child.photoPreview ? (
//                 <img
//                   src={child.photoPreview}
//                   alt={child.childName || "Child"}
//                 />
//               ) : (
//                 child.childName?.charAt(0)?.toUpperCase() || "C"
//               )}
//             </div>

//             <div className="dashboard-child-info">
//               <h3>{child.childName || "Little Hero"}</h3>

//               <p>Age: {child.age || "Not added"} years</p>

//               <p>Language: {child.language || "Not selected"}</p>

//               <div className="dashboard-interests">
//                 {(child.interests || []).map((interest) => (
//                   <span key={interest}>{interest}</span>
//                 ))}
//               </div>
//             </div>

//           </div>
//         ) : (
//           <div className="dashboard-empty">
//             <h3>Create Your Child's Profile</h3>

//             <p>
//               Add your child's details to begin their magical journey.
//             </p>

//             <Link to="/child-profile">
//               Create Child Profile
//             </Link>
//           </div>
//         )}

//       </section>

//       {/* QUICK ACTIONS */}
//       <section className="dashboard-actions-section">

//         <h2>Quick Actions</h2>

//         <div className="dashboard-action-grid">

//           <Link to="/create-story" className="dashboard-action-card">
//             <span>✨</span>
//             <h3>Create a Story</h3>
//             <p>Create a personalized magical adventure.</p>
//           </Link>

//           <Link to="/my-stories" className="dashboard-action-card">
//             <span>📚</span>
//             <h3>My Stories</h3>
//             <p>Read and manage all your saved stories.</p>
//           </Link>

//           <Link to="/explore" className="dashboard-action-card">
//             <span>📖</span>
//             <h3>Explore Stories</h3>
//             <p>Discover exciting stories for your child.</p>
//           </Link>

//           <Link to="/favorites" className="dashboard-action-card">
//             <span>❤️</span>
//             <h3>My Favorites</h3>
//             <p>View your saved favourite stories.</p>
//           </Link>

//           <Link to="/character-preview" className="dashboard-action-card">
//             <span>🎨</span>
//             <h3>My Character</h3>
//             <p>View your child's story character.</p>
//           </Link>

//           <Link to="/parent-settings" className="dashboard-action-card">
//             <span>⚙️</span>
//             <h3>Account Settings</h3>
//             <p>Manage your parent account details.</p>
//           </Link>

//         </div>

//       </section>

//     </div>
//   );
// }

// export default ParentDashboard;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ParentDashboard.css";

function ParentDashboard() {
  const navigate = useNavigate();

  const [child, setChild] = useState(null);
  const [stories, setStories] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // LOAD DASHBOARD DATA
  useEffect(() => {
    try {
      const savedChild = sessionStorage.getItem("myStoryWorldChild");

      const savedStories = JSON.parse(
        localStorage.getItem("myStoryWorldStories") || "[]"
      );

      const savedFavorites = JSON.parse(
        localStorage.getItem("myStoryFavorites") || "[]"
      );

      if (savedChild) {
        setChild(JSON.parse(savedChild));
      }

      setStories(Array.isArray(savedStories) ? savedStories : []);
      setFavorites(Array.isArray(savedFavorites) ? savedFavorites : []);

    } catch (error) {
      console.error("Dashboard data loading error:", error);
    }
  }, []);

  // LOGOUT
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    sessionStorage.removeItem("myStoryWorldChild");
    sessionStorage.removeItem("myStoryWorldDraft");
    sessionStorage.removeItem("myStoryWorldCharacterStyle");

    localStorage.removeItem("myStoryWorldParent");

    navigate("/login");
  };

  return (
    <div className="parent-dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <span className="dashboard-label">PARENT SPACE</span>

          <h1>Welcome to Your Dashboard!</h1>

          <p>
            Manage your child's magical storytelling journey.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <Link to="/child-profile" className="dashboard-primary-btn">
            + Child Profile
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="dashboard-logout-btn"
          >
            Logout
          </button>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="dashboard-stats">

        <div className="dashboard-stat-card">
          <span>📚</span>
          <div>
            <h2>{stories.length}</h2>
            <p>My Stories</p>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <span>❤️</span>
          <div>
            <h2>{favorites.length}</h2>
            <p>Favourite Stories</p>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <span>👧</span>
          <div>
            <h2>{child ? "1" : "0"}</h2>
            <p>Child Profiles</p>
          </div>
        </div>

      </div>

      {/* CHILD PROFILE */}
      <section className="dashboard-child-section">

        <div className="dashboard-section-heading">
          <h2>Child Profile</h2>
          <Link to="/child-profile">Edit Profile →</Link>
        </div>

        {child ? (
          <div className="dashboard-child-card">

            <div className="dashboard-child-avatar">
              {child.photoPreview ? (
                <img
                  src={child.photoPreview}
                  alt={child.childName || "Child"}
                />
              ) : (
                child.childName?.charAt(0)?.toUpperCase() || "C"
              )}
            </div>

            <div className="dashboard-child-info">
              <h3>{child.childName || "Little Hero"}</h3>

              <p>Age: {child.age || "Not added"} years</p>

              <p>Language: {child.language || "Not selected"}</p>

              <div className="dashboard-interests">
                {(child.interests || []).map((interest) => (
                  <span key={interest}>{interest}</span>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="dashboard-empty">
            <h3>Create Your Child's Profile</h3>

            <p>
              Add your child's details to begin their magical journey.
            </p>

            <Link to="/child-profile">
              Create Child Profile
            </Link>
          </div>
        )}

      </section>

      {/* QUICK ACTIONS */}
      <section className="dashboard-actions-section">

        <h2>Quick Actions</h2>

        <div className="dashboard-action-grid">

          <Link to="/create-story" className="dashboard-action-card">
            <span>✨</span>
            <h3>Create a Story</h3>
            <p>Create a personalized magical adventure.</p>
          </Link>

          <Link to="/my-stories" className="dashboard-action-card">
            <span>📚</span>
            <h3>My Stories</h3>
            <p>Read and manage all your saved stories.</p>
          </Link>

          <Link to="/explore" className="dashboard-action-card">
            <span>📖</span>
            <h3>Explore Stories</h3>
            <p>Discover exciting stories for your child.</p>
          </Link>

          <Link to="/favorites" className="dashboard-action-card">
            <span>❤️</span>
            <h3>My Favorites</h3>
            <p>View your saved favourite stories.</p>
          </Link>

          <Link to="/character-preview" className="dashboard-action-card">
            <span>🎨</span>
            <h3>My Character</h3>
            <p>View your child's story character.</p>
          </Link>

          <Link to="/parent-settings" className="dashboard-action-card">
            <span>⚙️</span>
            <h3>Account Settings</h3>
            <p>Manage your parent account details.</p>
          </Link>

        </div>

      </section>

    </div>
  );
}

export default ParentDashboard;
