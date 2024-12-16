// import image from "../icons/Bookify.jpeg";
// import { Link } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";

// function Header({ isLoggedIn, onLogout }) {
//   const [showNavbar, setShowNavbar] = useState(false);
//   const navbarRef = useRef(null);

//   useEffect(() => {
//     document.body.classList.toggle("nav-open", showNavbar);
//     return () => {
//       document.body.classList.remove("nav-open");
//     };
//   }, [showNavbar]);

//   const toggleNavbar = () => {
//     setShowNavbar(!showNavbar);
//   };

//   // Close the navbar when clicking outside of it
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         navbarRef.current &&
//         !navbarRef.current.contains(event.target) && 
//         event.target.className !== "hamburger active" 
//       ) {
//         setShowNavbar(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className = "header">
//       <header>
//         <div className = "logo">
//           <Link to = "/" style={{ textDecoration: "none" }}>
//             <img src = {image} alt = "Logo" />
//           </Link>
//           <span className = "tool-name">&nbsp;&nbsp;Bookify</span>
//         </div>

//         <button
//           className = {`hamburger ${showNavbar ? "active" : ""}`}
//           onClick = {toggleNavbar}>
//           &#9776;
//         </button>
//         <nav
//           className = {`navbar ${showNavbar ? "active" : ""}`}
//           ref = {navbarRef} >
//           {isLoggedIn ? (
//             <>
//               <div className = "nav-item">
//                 <Link to = "/MemberPage">Home</Link>
//               </div>


//               <div className = "nav-item">
//                 <button
//                   onClick = {onLogout}
//                   style = {{
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                     color: "white",
//                     fontSize: "13px",
//                     fontFamily: "lato",
//                     textDecoration: "none"
//                   }}>
//                   Log Out
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="nav-item">
//                 <Link to="/">Home</Link>
//               </div>
//               <div className="nav-item">
//                 <Link to="/ApptForm">History</Link>
//               </div>
//               <div className="nav-item">
//                 <Link to="/PublicEvents">Events</Link>
//               </div>
//               <div className="nav-item">
//                 <Link to="/Login">Login</Link>
//               </div>

//               <div className = "nav-item">
//                 <Link to = "/Register">Register</Link>
//               </div>
//             </>
//           )}
//         </nav>
//       </header>
//     </div>
//   );
// }

// export default Header;


import image from "../icons/Bookify.jpeg";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Header({ isLoggedIn, onLogout }) {
  const [showNavbar, setShowNavbar] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    if (!isLoggedIn) {
      document.body.classList.toggle("nav-open", showNavbar);
    }
    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [showNavbar, isLoggedIn]);

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  // Close the navbar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        event.target.className !== "hamburger active"
      ) {
        setShowNavbar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <header>
        <div className="logo">
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={image} alt="Logo" />
          </Link>
          <span className="tool-name">&nbsp;&nbsp;Bookify</span>
        </div>

        {/* Only show hamburger menu and navbar on public pages */}
        {!isLoggedIn && (
          <>
            <button
              className={`hamburger ${showNavbar ? "active" : ""}`}
              onClick={toggleNavbar}
            >
              &#9776;
            </button>
            <nav
              className={`navbar ${showNavbar ? "active" : ""}`}
              ref={navbarRef}
            >
              <div className="nav-item">
                <Link to="/">Home</Link>
              </div>
              <div className="nav-item">
                <Link to="/ApptForm">History</Link>
              </div>
              <div className="nav-item">
                <Link to="/PublicEvents">Events</Link>
              </div>
              <div className="nav-item">
                <Link to="/Login">Login</Link>
              </div>
              <div className="nav-item">
                <Link to="/Register">Register</Link>
              </div>
            </nav>
          </>
        )}

        {/* Logged-in navigation (always visible) */}
        {isLoggedIn && (
          <nav className="navbar">
            <div className="nav-item">
              <Link to="/MemberPage">Home</Link>
            </div>
            <div className="nav-item">
              <button
                onClick={onLogout}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "13px",
                  fontFamily: "lato",
                  textDecoration: "none",
                }}
              >
                Log Out
              </button>
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}

export default Header;
