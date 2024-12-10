import React, { useState } from "react";
import "../styles/koledar.css"; // Poskrbi, da ta CSS pravilno deluje

const ProjectList = () => {
  const [isAddProjectActive, setIsAddProjectActive] = useState(false);

  const toggleAddProject = () => {
    setIsAddProjectActive((prevState) => !prevState);
  };

  return (
    <div>
      {/* Gumb za odpiranje/zapiranje */}
      <button className="add-project" onClick={toggleAddProject}>
        <i className="fas fa-plus"></i>
      </button>

      {/* Add Project Wrapper */}
      <div className={`add-project-wrapper ${isAddProjectActive ? "active" : ""}`}>
        <div className="add-project-header">
          <div className="title">Dodaj Dogodek</div>
          <i className="fas fa-times close" onClick={toggleAddProject}></i>
        </div>
        <div className="add-project-body">
          <div className="add-project-input">
            <input
              type="text"
              placeholder="Ime Dogodka"
              className="project-name"
            />
          </div>
          <div className="add-project-input">
            <input
              type="text"
              placeholder="Kraj"
            />
          </div>
          <div className="add-project-option">
            <select className="project-type">
              <option value="" disabled selected>Izberite vrsto projekta</option>
              <option value="meritve">Meritve</option>
              <option value="elektro_projekt">Elektro projekt</option>
              <option value="energetika">Energetika</option>
          </select>
          </div>
          <div className="add-project-documents">
            <label className="button-in-wrapper">
              Naloži dokumente
              <input type="file" className="project-documents" hidden />
           </label>
          </div>

        </div>
        <div className="add-project-footer">
          <button className="button-in-wrapper">Dodaj</button>
        </div>
      </div>
      </div>
  );
};

export default ProjectList;
