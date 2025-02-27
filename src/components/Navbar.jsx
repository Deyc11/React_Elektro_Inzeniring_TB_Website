import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import '../styles/styles.css';

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="navbar">
      <div className="left-menu">
        <Link to="/">
          <i className="fas fa-home home-icon"></i>
        </Link>
      </div>
      <div className="right-menu">
        {user ? (
          <span>
            Dobrodošli, <strong>{user.email}</strong>
            <button className="button-in-wrapper" onClick={() => auth.signOut()}>
              Odjava
            </button>
          </span>
        ) : (
          <Link to="/login">
            <button className="button-in-wrapper">Prijava</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
