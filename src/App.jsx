import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase'; // Uvozi Firebase autentikacijo
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import KoledarPage from './pages/KoledarPage';
import OdjavaPage from './pages/OdjavaPage';
import ProjectPage from './pages/ProjectPage';
import LoginPage from './pages/LoginPage'; // Dodana prijavna stran

// Komponenta za zaščiten dostop
const PrivateRoute = ({ element }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Nalaganje...</div>; // Lahko kasneje dodaš lepše nalagalno sporočilo
  return user ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
        <Route path="/koledar" element={<PrivateRoute element={<KoledarPage />} />} />
        <Route path="/projekti" element={<PrivateRoute element={<ProjectPage />} />} />
        <Route path="/odjava" element={<OdjavaPage />} />
      </Routes>
    </Router>
  );
};

export default App;
