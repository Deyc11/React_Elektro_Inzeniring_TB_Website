import React, { useEffect, useState } from "react";
import "../styles/projectPage.css"; // Nov CSS za stilizacijo

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects)); // Posodobitev localStorage
  };

  return (
    <div className="project-page-container">
      <h1 className="project-page-title">Seznam Projektov</h1>
      <div className="project-list-wrapper">
        {projects.length > 0 ? (
          <ul className="project-list">
            {projects.map((project, index) => (
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
          <p className="no-projects">Trenutno ni projektov za prikaz.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
