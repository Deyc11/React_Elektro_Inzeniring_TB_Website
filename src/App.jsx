import React from 'react';
import Navbar from './components/Navbar';
import ControlPanel from './components/ControlPanel';
import './styles/styles.css';
import ProjectList from './components/ProjectList';

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