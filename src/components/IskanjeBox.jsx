import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IskanjeBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjects(parsedProjects);
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProjects([]); // Clear suggestions if query is empty
    } else {
      const lowercasedQuery = query.toLowerCase();
      setFilteredProjects(
        projects.filter((project) =>
          project.name.toLowerCase().includes(lowercasedQuery)
        )
      );
    }
  };

  const handleProjectClick = (projectName) => {
    navigate(`/projekti?filter=${encodeURIComponent(projectName)}`);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="window-box p-4 shadow-sm" style={{ position: "relative" }}>
        <h3>Iskanje po projektih</h3>
        <input
          type="text"
          className="form-control search-input"
          placeholder="Vnesite ime projekta..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {filteredProjects.length > 0 && (
          <div className="dropdown-menu-custom">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
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
