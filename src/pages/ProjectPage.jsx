import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/projectPage.css";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [filterType, setFilterType] = useState("vse");
  const location = useLocation(); // Pridobimo URL parametre

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }

    // Preberi filter iz URL parametrov
    const params = new URLSearchParams(location.search);
    const filter = params.get("filter");
    if (filter) {
      setFilterType(filter);
    }
  }, [location]);

  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects)); // Posodobitev localStorage
  };

  const filteredProjects =
    filterType === "vse"
      ? projects
      : projects.filter((project) => project.type === filterType);

  return (
    <div className="project-page-container">
      <h1 className="project-page-title">Seznam Projektov</h1>
      {/* Dropdown meni za filtriranje */}
      <div className="filter-container">
        <label htmlFor="filter">Filtriraj po tipu: </label>
        <select
          id="filter"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="vse">Vse</option>
          <option value="meritve">Meritve</option>
          <option value="elektro_projekt">Elektro projekt</option>
          <option value="energetika">Energetika</option>
        </select>
      </div>
      <div className="project-list-wrapper">
        {filteredProjects.length > 0 ? (
          <ul className="project-list">
            {filteredProjects.map((project, index) => (
              <li className="project-item" key={index}>
                <div className="project-info">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-details">
                    <span className="project-label">Tip:</span> {project.type}
                  </p>
                  <p className="project-details">
                    <span className="project-label">Lokacija:</span> {project.location}
                  </p>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteProject(index)}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-projects">Ni projektov za izbrani tip.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
