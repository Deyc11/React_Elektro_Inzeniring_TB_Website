import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db, storage } from "../firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import "../styles/projectPage.css";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const location = useLocation();

  // 🔥 1. Pridobi projekte iz Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectList);
      } catch (error) {
        console.error("Napaka pri nalaganju projektov:", error);
      }
    };

    fetchProjects();
  }, []);

  // 🔍 2. Filtriranje projektov glede na URL parameter `filter`
  useEffect(() => {
    if (projects.length === 0) return;

    const params = new URLSearchParams(location.search);
    const filterValue = params.get("filter");

    if (filterValue) {
      // ✅ Najprej poskusimo najti projekt po imenu
      const foundProject = projects.find((project) => project.name.toLowerCase() === filterValue.toLowerCase());

      if (foundProject) {
        setFilteredProjects([foundProject]); // Prikaz samo enega projekta
      } else {
        // Če ni projekta s tem imenom, filtriramo po tipu
        setFilteredProjects(
          projects.filter((project) => project.type.toLowerCase() === filterValue.toLowerCase())
        );
      }
    } else {
      setFilteredProjects(projects); // Če ni filtra, prikažemo vse projekte
    }
  }, [location, projects]);

  // 🔥 3. Brisanje projekta iz Firestore
  const handleDeleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, "projects", projectId));
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
      setFilteredProjects((prevFiltered) => prevFiltered.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error("Napaka pri brisanju projekta:", error);
    }
  };

  // 🔥 4. Funkcija za nalaganje datotek v Firebase Storage
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
          setProjects((prevProjects) =>
            prevProjects.map(p => p.id === projectId ? { ...p, files: updatedFiles } : p)
          );
          setFilteredProjects((prevFiltered) =>
            prevFiltered.map(p => p.id === projectId ? { ...p, files: updatedFiles } : p)
          );
        }
      );
    }
  };

  // 🔥 5. Brisanje datoteke iz Firebase Storage in Firestore
  const handleDeleteFile = async (projectId, fileName) => {
    try {
      const fileRef = ref(storage, `projects/${projectId}/${fileName}`);
      await deleteObject(fileRef);

      const projectRef = doc(db, "projects", projectId);
      const project = projects.find(p => p.id === projectId);
      const updatedFiles = project.files.filter((file) => file.name !== fileName);

      await updateDoc(projectRef, { files: updatedFiles });

      setProjects((prevProjects) =>
        prevProjects.map(p => p.id === projectId ? { ...p, files: updatedFiles } : p)
      );
      setFilteredProjects((prevFiltered) =>
        prevFiltered.map(p => p.id === projectId ? { ...p, files: updatedFiles } : p)
      );
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
          <p className="no-projects">Ni rezultatov za ta filter.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
