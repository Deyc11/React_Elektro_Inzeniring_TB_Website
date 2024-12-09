import React from 'react';
import { Link } from 'react-router-dom'; // Uvozi Link
import '../styles/styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-menu">
        <Link to="/"> {/* Navigacija na domačo stran */}
          <i className="fas fa-home home-icon"></i>
        </Link>
      </div>
      <div className="right-menu">
        <span>
          Dobrodošli, <strong>[Ime Uporabnika]</strong>
          <a href="signout_link" className="sign-out">Odjava</a>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;

