import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/projectPage.css";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]); // projects vsebuje vse projekte pridobljene iz LocalStorage
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [fileUploads, setFileUploads] = useState({}); // Spremljanje/hranjenje datotek za projekte
  const location = useLocation();

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects"); // pridobivanje projektov iz localStorage
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjects(parsedProjects);

      const params = new URLSearchParams(location.search); // check za URL filter in sama funkcija
      const filter = params.get("filter");
      if (filter) {
        const filtered = parsedProjects.filter(
          (project) => project.name === filter
        );
        setFilteredProjects(filtered);
      } else {
        setFilteredProjects(parsedProjects);
      }
    }

    const savedFiles = localStorage.getItem("fileUploads");
    if (savedFiles) {
      setFileUploads(JSON.parse(savedFiles));
    }
  }, [location]);
  // Odstranjevanje iz projects
  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);

    const updatedFiles = { ...fileUploads };
    delete updatedFiles[index];
    setFileUploads(updatedFiles);

    //PosodobitevLocalStorage
    localStorage.setItem("projects", JSON.stringify(updatedProjects)); 
    localStorage.setItem("fileUploads", JSON.stringify(updatedFiles));
  };

  //Dodajanje datotek
  const handleFileUpload = (event, index) => {
    const files = Array.from(event.target.files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file), // Ustvari URL za prenos datoteke
    }));

    const updatedFiles = {
      ...fileUploads,
      [index]: [...(fileUploads[index] || []), ...files],
    };

    setFileUploads(updatedFiles);
    localStorage.setItem("fileUploads", JSON.stringify(updatedFiles));
  };

  const handleDeleteFile = (projectIndex, fileIndex) => {
    const updatedFiles = { ...fileUploads };
    updatedFiles[projectIndex] = updatedFiles[projectIndex].filter((_, i) => i !== fileIndex);

    if (updatedFiles[projectIndex].length === 0) {
      delete updatedFiles[projectIndex];
    }

    setFileUploads(updatedFiles);
    localStorage.setItem("fileUploads", JSON.stringify(updatedFiles));
  };

  return (
    <div className="project-page-container">
      <h1 className="project-page-title">Seznam Projektov</h1>
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
                <div className="project-actions">
                  {/* Prikaz naloženih datotek */}
                  {fileUploads[index] && fileUploads[index].length > 0 && (
                    <div className="uploaded-files">
                      <h5>Dokumenti</h5>
                      <ul>
                        {fileUploads[index].map((file, fileIndex) => (
                          <li key={fileIndex}>
                            <a href={file.url} download={file.name}>
                              {file.name}
                            </a>
                            <button
                              className="delete-file-button"
                              onClick={() => handleDeleteFile(index, fileIndex)}
                            >
                              ❌
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Ikona za nalaganje datotek */}
                  <label className="upload-icon" htmlFor={`file-upload-${index}`}>
                    📁
                  </label>
                  <input
                    type="file"
                    id={`file-upload-${index}`}
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => handleFileUpload(e, index)}
                  />
                  {/* Ikona za brisanje */}
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteProject(index)}
                  >
                    🗑️
                  </button>
                </div>
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
