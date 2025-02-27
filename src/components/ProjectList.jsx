import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Firebase Firestore
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import "../styles/koledar.css";

const ProjectList = ({ hideList }) => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ name: "", type: "", location: "" });
    const [isAddProjectActive, setIsAddProjectActive] = useState(false);

    // 🔥 Naloži projekte iz Firestore
    useEffect(() => {
        const fetchProjects = async () => {
            const querySnapshot = await getDocs(collection(db, "projects"));
            const projectList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProjects(projectList);
        };

        fetchProjects();
    }, []);

    // 🔥 Dodaj nov projekt v Firestore
    const handleAddProject = async () => {
        if (!newProject.name || !newProject.type || !newProject.location) {
            alert("Prosim, izpolnite vsa polja.");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "projects"), newProject);
            setProjects([...projects, { id: docRef.id, ...newProject }]);
            setNewProject({ name: "", type: "", location: "" });
            setIsAddProjectActive(false);
        } catch (error) {
            console.error("Napaka pri dodajanju projekta:", error);
        }
    };

    // 🔥 Izbriši projekt iz Firestore
    const handleDeleteProject = async (id) => {
        try {
            await deleteDoc(doc(db, "projects", id));
            setProjects(projects.filter((project) => project.id !== id));
        } catch (error) {
            console.error("Napaka pri brisanju projekta:", error);
        }
    };

    return (
        <div>
            {/* Gumb za dodajanje projektov */}
            <button className="add-project" onClick={() => setIsAddProjectActive(!isAddProjectActive)}>
                <i className="fas fa-plus"></i>
            </button>

            {/* Obrazec za dodajanje projektov */}
            <div className={`add-project-wrapper ${isAddProjectActive ? "active" : ""}`}>
                <div className="add-project-header">
                    <div className="title">Dodaj Projekt</div>
                    <i className="fas fa-times close" onClick={() => setIsAddProjectActive(false)}></i>
                </div>
                <div className="add-project-body">
                    <div className="add-project-input">
                        <input
                            type="text"
                            placeholder="Ime Projekta"
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
                            value={newProject.type}
                            onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                        >
                            <option value="" disabled>Vrsta Projekta</option>
                            <option value="meritve">Meritve</option>
                            <option value="elektro_projekt">Elektro projekt</option>
                            <option value="energetika">Energetika</option>
                        </select>
                    </div>
                </div>
                <div className="add-project-footer">
                    <button className="button-in-wrapper" onClick={handleAddProject}>Dodaj</button>
                </div>
            </div>

            {/* Seznam projektov */}
            {!hideList && (
                <ul>
                    {projects.map((project) => (
                        <li key={project.id}>
                            <strong>{project.name}</strong> ({project.type}) - {project.location}
                            <button onClick={() => handleDeleteProject(project.id)}>🗑️</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default ProjectList;
