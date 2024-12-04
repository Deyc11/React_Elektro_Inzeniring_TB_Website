import React, { useState, useRef, useEffect } from "react";
import "./ProjectList.css";

const ProjectList = () => {
  // State za vidnost obrazca
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formRef = useRef(null); // Referenca na obrazec za sledenje klikom izven njega

  // Funkcija za prikaz obrazca
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible); // Preklopi stanje za vidnost obrazca
  };

  // Funkcija za zapiranje obrazca
  const closeForm = () => {
    setIsFormVisible(false);
  };

  // Zapri obrazec, če klikneš izven njega
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="window-box p-4 shadow-sm">
      <h3>Projekti</h3>
      <ul className="list-group mb-3">
        <li className="list-group-item">Meritve</li>
        <li className="list-group-item">Elektro projekti</li>
        <li className="list-group-item">Energetika</li>
        <li className="list-group-item">Vsi Projekti</li>
      </ul>

      {/* Gumb za prikaz obrazca */}
      <button className="add-project" onClick={toggleFormVisibility}>
        <i className="fas fa-plus"></i>
      </button>

      {/* Obrazec za dodajanje projekta */}
      {isFormVisible && (
        <div className="add-project-wrapper active" ref={formRef}>
          <div className="add-project-header">
            <div className="title">Nov Projekt</div>
            <button className="close" onClick={closeForm}>
              X
            </button>
          </div>
          <div className="add-project-body">
            <div className="add-project-input">
              <input type="text" placeholder="Ime Projekta" className="project-name" />
            </div>
            <div className="add-project-input">
              <select className="project-type">
                <option value="" disabled selected>
                  Vrsta Projekta
                </option>
                <option value="meritve">Meritve</option>
                <option value="Elektro_projekti">Elektro Projekti</option>
                <option value="Energetika">Energetika</option>
              </select>
            </div>
            <div className="add-project-documents">
              <input type="file" className="project-documents" />
            </div>
          </div>
          <div className="add-project-footer">
            <button className="btn btn-primary">+ Nov projekt</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
