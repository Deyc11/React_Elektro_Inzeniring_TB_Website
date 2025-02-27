import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Firebase Firestore
import { collection, getDocs } from "firebase/firestore";

const IskanjeBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const navigate = useNavigate();

  // 🔥 Naloži projekte iz Firestore
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

  // 🔍 Iskanje projektov po imenu
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProjects([]); // Počisti predloge, če ni vnosa
    } else {
      const lowercasedQuery = query.toLowerCase();
      setFilteredProjects(
        projects.filter((project) =>
          project.name.toLowerCase().includes(lowercasedQuery)
        )
      );
    }
  };

  // 📌 Preusmeritev na /projekti?filter=ime_projekta
  const handleProjectClick = (projectName) => {
    navigate(`/projekti?filter=${encodeURIComponent(projectName)}`);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="window-box p-4 shadow-sm" style={{ position: "relative" }}>
        <h3>Iskanje Projektov</h3>
        <input
          type="text"
          className="form-control search-input"
          placeholder="Vnesite ime projekta..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {filteredProjects.length > 0 && (
          <div className="dropdown-menu-custom">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="dropdown-item-custom"
                onClick={() => handleProjectClick(project.name)}
              >
                {project.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IskanjeBox;
