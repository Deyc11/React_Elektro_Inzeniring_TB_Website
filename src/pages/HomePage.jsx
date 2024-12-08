import React from 'react';
import '../styles/styles.css';
import Navbar from '../components/Navbar';
import ControlPanel from '../components/ControlPanel';


const HomePage = () => {
  return (
    <div>
      <Navbar />
      <ControlPanel />
    </div>
  );
};

export default HomePage;
