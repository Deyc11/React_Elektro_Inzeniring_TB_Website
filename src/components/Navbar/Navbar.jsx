import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-menu">
        <i className="fas fa-home home-icon"></i>
      </div>
      <div className="right-menu">
        <span>Welcome, <strong>[Ime Uporabnika]</strong><a href="signout_link" className="sign-out">Sign Out</a></span>
        
      </div>
    </nav>
  );
};

export default Navbar;
