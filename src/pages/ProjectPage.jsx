import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db, storage } from "../firebase"; // Firebase Firestore & Storage
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import "../styles/projectPage.css";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const location = useLocation();

  // 🔥 Naloži projekte iz Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectList);

      // Če je v URL-ju filter, uporabimo filtriranje
      const params = new URLSearchParams(location.search);
      const filter = params.get("filter");
      if (filter) {
        setFilteredProjects(
          projectList.filter((project) => project.type.toLowerCase() === filter.toLowerCase())
      );      
      } else {
        setFilteredProjects(projectList);
      }
    };

    fetchProjects();
  }, [location]);

  // 🔥 Brisanje projekta iz Firestore
  const handleDeleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, "projects", projectId));
      setProjects(projects.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error("Napaka pri brisanju projekta:", error);
    }
  };

  // 🔥 Funkcija za nalaganje datotek v Firebase Storage
  const handleFileUpload = async (event, projectId) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    for (let file of files) {
      const storageRef = ref(storage, `projects/${projectId}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => console.error("Napaka pri nalaganju:", error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // 🔥 Posodobi projekt v Firestore z novim URL-jem datoteke
          const projectRef = doc(db, "projects", projectId);
          const project = projects.find(p => p.id === projectId);
          const updatedFiles = [...(project.files || []), { name: file.name, url: downloadURL }];
          
          await updateDoc(projectRef, { files: updatedFiles });

          // Osveži prikaz
          setProjects(projects.map(p => p.id === projectId ? { ...p, files: updatedFiles } : p));
        }
      );
    }
  };

  // 🔥 Brisanje datoteke iz Firebase Storage in Firestore
  const handleDeleteFile = async (projectId, fileName) => {
    try {
      const fileRef = ref(storage, `projects/${projectId}/${fileName}`);
      await deleteObject(fileRef);

      const projectRef = doc(db, "projects", projectId);
      const project = projects.find(p => p.id === projectId);
      const updatedFiles = project.files.filter((file) => file.name !== fileName);
      
      await updateDoc(projectRef, { files: updatedFiles });

      setProjects(projects.map(p => p.id === projectId ? { ...p, files: updatedFiles } : p));
    } catch (error) {
      console.error("Napaka pri brisanju datoteke:", error);
    }
  };

  return (
    <div className="project-page-container">
      <h1 className="project-page-title">Seznam Projektov</h1>
      <div className="project-list-wrapper">
        {filteredProjects.length > 0 ? (
          <ul className="project-list">
            {filteredProjects.map((project) => (
              <li className="project-item" key={project.id}>
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
                  {project.files && project.files.length > 0 && (
                    <div className="uploaded-files">
                      <h5>Dokumenti</h5>
                      <ul>
                        {project.files.map((file, index) => (
                          <li key={index}>
                            <a href={file.url} download={file.name}>
                              {file.name}
                            </a>
                            <button
                              className="delete-file-button"
                              onClick={() => handleDeleteFile(project.id, file.name)}
                            >
                              ❌
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Ikona za nalaganje datotek */}
                  <label className="upload-icon" htmlFor={`file-upload-${project.id}`}>
                    📁
                  </label>
                  <input
                    type="file"
                    id={`file-upload-${project.id}`}
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => handleFileUpload(e, project.id)}
                  />
                  {/* Ikona za brisanje */}
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteProject(project.id)}
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
