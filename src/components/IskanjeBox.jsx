import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to filtered project

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
    if (query === "") {
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
      <div className="window-box p-4 shadow-sm">
        <h3>Iskanje po projektih</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Vnesite ime projekta..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {filteredProjects.length > 0 && (
          <ul className="search-results">
            {filteredProjects.map((project, index) => (
              <li
                key={index}
                onClick={() => handleProjectClick(project.name)}
                style={{ cursor: "pointer" }}
              >
                {project.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default IskanjeBox;
