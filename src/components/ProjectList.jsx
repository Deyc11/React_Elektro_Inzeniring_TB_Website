import React, { useState, useEffect } from "react";
import "../styles/styles.css";

const ProjectList = ({ hideList }) => {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  const [newProject, setNewProject] = useState({ name: "", type: "", location: "" });
  const [isAddProjectActive, setIsAddProjectActive] = useState(false);

  const toggleAddProject = () => {
    setIsAddProjectActive((prevState) => !prevState);
  };

  const handleAddProject = () => {
    if (!newProject.name || !newProject.type || !newProject.location) {
      alert("Prosim, izpolnite vsa polja.");
      return;
    }

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setNewProject({ name: "", type: "", location: "" });
    setIsAddProjectActive(false);
  };

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  return (
    <div>
      {/* Gumb za odpiranje/zapiranje */}
      <button className="add-project" onClick={toggleAddProject}>
        <i className="fas fa-plus"></i>
      </button>

      {/* Add Project Wrapper */}
      <div className={`add-project-wrapper ${isAddProjectActive ? "active" : ""}`}>
        <div className="add-project-header">
          <div className="title">Dodaj Projekt</div>
          <i className="fas fa-times close" onClick={toggleAddProject}></i>
        </div>
        <div className="add-project-body">
          <div className="add-project-input">
            <input
              type="text"
              placeholder="Ime Projekta"
              className="project-name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
          </div>
          <div className="add-project-input">
            <input
              type="text"
              placeholder="Lokacija"
              value={newProject.location}
              onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
            />
          </div>
          <div className="add-project-option">
            <select
              className="project-type"
              value={newProject.type}
              onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
            >
              <option value="" disabled>
                Izberite vrsto projekta
              </option>
              <option value="meritve">Meritve</option>
              <option value="elektro_projekt">Elektro projekt</option>
              <option value="energetika">Energetika</option>
            </select>
          </div>
        </div>
        <div className="add-project-footer">
          <button className="button-in-wrapper" onClick={handleAddProject}>
            Dodaj
          </button>
        </div>
      </div>

      {/* Seznam projektov */}
      {!hideList && (
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              <strong>{project.name}</strong> ({project.type}) - {project.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;
