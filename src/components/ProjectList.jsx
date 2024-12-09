import React, { useState } from 'react';

const ProjectList = () => {
  const [isFormActive, setFormActive] = useState(false);

  const toggleForm = () => {
    setFormActive((prevState) => !prevState);
  };

  const closeForm = () => {
    setFormActive(false);
  };

  return (
    <div>
      <button className="add-project" onClick={toggleForm}>
        <i className="fas fa-plus"></i>
      </button>
      {isFormActive && (
        <div className="add-project-wrapper active">
          <div className="add-project-header">
            <div className="title">Nov Projekt</div>
            <i className="fas fa-times close" onClick={closeForm}></i>
          </div>
          <div className="add-project-body">
            <div className="add-project-input">
              <input type="text" placeholder="Ime Projekta..." className="project-name" />
            </div>
            <div className="add-project-input">
              <select placeholder="Vrsta Projekta" className="project-type">
                <option value="" disabled defaultValue>Vrsta Projekta</option>
                <option value="meritve">Meritve</option>
                <option value="Elektro_projekti">Elektro Projekti</option>
                <option value="Energetika">Energetika</option>
              </select>
            </div>
            <div className="add-project-input">
              <input type="text" placeholder="Naslov..." className="project_address" />
            </div>
            <div className="add-project-documents">
              <input type="file" className="project-documents" />
            </div>
          </div>
          <div className="add-project-footer">
            <button className="btn btn-primary">Dodaj</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
