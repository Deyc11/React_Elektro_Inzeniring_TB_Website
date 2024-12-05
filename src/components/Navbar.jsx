import React from 'react';
import '../styles/styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-menu">
        <i className="fas fa-home home-icon"></i>
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
