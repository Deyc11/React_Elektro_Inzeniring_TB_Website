import React from 'react';
import ProjectList from './ProjectList';

const ControlPanel = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Iskanje po projektih */}
        <div className="col-md-4 mb-4">
          <div className="window-box p-4 shadow-sm">
            <h3>Iskanje po projektih</h3>
            <input type="text" className="form-control" placeholder="Vnesite ime projekta..." />
          </div>
        </div>

        {/* Projekti */}
        <div className="col-md-4 mb-4">
          <div className="window-box p-4 shadow-sm">
            <h3>Projekti</h3>
            <ul className="list-group mb-4">
              <li className="list-group-item">Meritve</li>
              <li className="list-group-item">Elektro projekti</li>
              <li className="list-group-item">Energetika</li>
              <li className="list-group-item">Vsi Projekti</li>
            </ul>
            <button className="add-project">
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>

        {/* Koledar */}
        <div className="col-md-4 mb-4">
          <div className="window-box p-4 shadow-sm">
            <h3>Koledar & To Do</h3>
            <a href="./Calendar/index.html">
              <button className="btn btn-primary">Pojdi na Koledar</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
