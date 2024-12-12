import React, { useState } from "react";
import "./Navbar.css"; // Create a separate CSS file for styling
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-brand">
          MyWebsite
        </a>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`menu ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link capitalize">
            create post
          </Link>

          <Link to="/all" className="nav-link capitalize">
           all post
          </Link>
       
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
