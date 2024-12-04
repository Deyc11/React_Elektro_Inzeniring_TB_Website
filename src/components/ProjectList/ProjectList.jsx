import React from "react";
import "./ProjectList.css";

const ProjectList = () => {
  return (
    <div className="window-box p-4 shadow-sm">
      <h3>Projekti</h3>
      <ul className="list-group mb-3">
        <li className="list-group-item">Meritve</li>
        <li className="list-group-item">Elektro projekti</li>
        <li className="list-group-item">Energetika</li>
        <li className="list-group-item">Vsi Projekti</li>
      </ul>
      <button className="add-project">
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default ProjectList;
