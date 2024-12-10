import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import KoledarPage from './pages/KoledarPage';
import OdjavaPage from './pages/OdjavaPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/koledar" element={<KoledarPage />} />
        <Route path="/odjava" element={<OdjavaPage />} />
      </Routes>
    </Router>
  );
};

export default App;
