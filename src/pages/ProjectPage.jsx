import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { createClient } from "@supabase/supabase-js";
import "../styles/projectPage.css";

const supabase = createClient(
  "https://ryqewdinehhdforcpqxy.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5cWV3ZGluZWhoZGZvcmNwcXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExODIzODYsImV4cCI6MjA1Njc1ODM4Nn0.9VMnpK41bLCw07FrA884vYfxmZZRoGdUp1n1E_ltddg"
);

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [files, setFiles] = useState({});
  const location = useLocation();

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
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;
    const params = new URLSearchParams(location.search);
    const filterValue = params.get("filter");
    if (filterValue) {
      const foundProject = projects.find(
        (project) => project.name.toLowerCase() === filterValue.toLowerCase()
      );
      if (foundProject) {
        setFilteredProjects([foundProject]);
      } else {
        setFilteredProjects(
          projects.filter(
            (project) => project.type.toLowerCase() === filterValue.toLowerCase()
          )
        );
      }
    } else {
      setFilteredProjects(projects);
    }
  }, [location, projects]);

  useEffect(() => {
    if (projects.length === 0) return;
    projects.forEach((project) => {
      fetchFiles(project.id);
    });
  }, [projects]);

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, "projects", projectId));
      setProjects(prev => prev.filter(project => project.id !== projectId));
      setFilteredProjects(prev => prev.filter(project => project.id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleFileUpload = async (event, projectId) => {
    const files = event.target.files;
    if (!files.length) return;
    
    for (let file of files) {
      const { data, error } = await supabase.storage
        .from("project-files")
        .upload(`${projectId}/${file.name}`, file, { upsert: true });
      
      if (error) {
        console.error("Error uploading file:", error.message);
      } else {
        console.log("File uploaded successfully:", data.path);
      }
    }
    fetchFiles(projectId);
  };

  const fetchFiles = async (projectId) => {
    const { data, error } = await supabase.storage.from("project-files").list(projectId);
    if (error) {
      console.error("Error fetching files:", error.message);
      return;
    }
    setFiles((prevFiles) => ({ ...prevFiles, [projectId]: data }));
  };

  const handleDownloadFile = async (projectId, fileName) => {
    const { data, error } = await supabase.storage.from("project-files").getPublicUrl(`${projectId}/${fileName}`);
    if (error) {
      console.error("Error getting file URL:", error.message);
      return;
    }
    window.open(data.publicUrl, "_blank");
  };

  const handleDeleteFile = async (projectId, fileName) => {
    const { error } = await supabase.storage.from("project-files").remove([`${projectId}/${fileName}`]);
    if (error) {
      console.error("Error deleting file:", error.message);
      return;
    }
    fetchFiles(projectId);
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
                  <p className="project-details"><span className="project-label">Tip:</span> {project.type}</p>
                  <p className="project-details"><span className="project-label">Lokacija:</span> {project.location}</p>
                </div>
                <div className="project-actions static-icons">
                  <label className="upload-icon" htmlFor={`file-upload-${project.id}`}>📁</label>
                  <input
                    type="file"
                    id={`file-upload-${project.id}`}
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => handleFileUpload(e, project.id)}
                  />
                  <button className="delete-button" onClick={() => handleDeleteProject(project.id)}>🗑️</button>
                </div>
                <div className="file-list">
                  {files[project.id]?.map((file) => (
                    <div key={file.name} className="file-item">
                      <span title={file.name}>{file.name}</span>
                      <div className="file-actions">
                        <button onClick={() => handleDownloadFile(project.id, file.name)}>⬇️</button>
                        <button onClick={() => handleDeleteFile(project.id, file.name)}>❌</button>
                      </div>
                    </div>
                  ))}
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