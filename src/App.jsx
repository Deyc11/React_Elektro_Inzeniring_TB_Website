import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import KoledarPage from './pages/KoledarPage';
import OdjavaPage from './pages/OdjavaPage';
import ProjectPage from './pages/ProjectPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/koledar" element={<KoledarPage />} />
        <Route path="/odjava" element={<OdjavaPage />} />
        <Route path="/projekti" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
};

export default App;
