import React from "react";
import ProjectList from "./ProjectList";
import { Link } from "react-router-dom";
const ProjektiBox = () => {
  return (
    <div className="col-md-4 mb-4">
      <div className="window-box p-4 shadow-sm">
        <h3>Projekti</h3>
        <ul className="list-group mb-4">
        <Link to="/projekti?filter=meritve" style={{ textDecoration: "none", color: "inherit" }}>
            <li className="list-group-item">Meritve</li>
          </Link>
          <Link to="/projekti?filter=elektro_projekt" style={{ textDecoration: "none", color: "inherit" }}>
            <li className="list-group-item">Elektro Projekti</li>
          </Link>
          <Link to="/projekti?filter=energetika" style={{ textDecoration: "none", color: "inherit" }}>
            <li className="list-group-item">Energetika</li>
          </Link>
          <Link to="/projekti" style={{ textDecoration: "none", color: "inherit" }}>
            <li className="list-group-item">Vsi Projekti</li>
          </Link>
        </ul>
        <ProjectList hideList={true} />
      </div>
    </div>
  );
};

export default ProjektiBox;
