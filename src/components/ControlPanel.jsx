import React from 'react';
import IskanjeBox from './IskanjeBox';
import ProjektiBox from './ProjektiBox';
import KoledarBox from './KoledarBox';

const ControlPanel = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <IskanjeBox />
        <ProjektiBox />
        <KoledarBox />
      </div>
    </div>
  );
}
export default ControlPanel;
