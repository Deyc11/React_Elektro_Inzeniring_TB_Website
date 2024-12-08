import React from 'react';
import './styles/styles.css';
import Navbar from './components/Navbar';
import ControlPanel from './components/ControlPanel';
import IskanjeBox from './components/IskanjeBox';
import ProjektiBox from './components/ProjektiBox';
import KoledarBox from './components/KoledarBox';

const App = () => {
  return (
    <div>
      <Navbar />
      <ControlPanel />
    </div>
  );
};

export default App;
// 