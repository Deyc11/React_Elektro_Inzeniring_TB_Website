import React from "react";
import ProjectList from "./ProjectList";

const ProjektiBox = () => {
    return(
        <div className="col-md-4 mb-4">
          <div className="window-box p-4 shadow-sm">
            <h3>Projekti</h3>
            <ul className="list-group mb-4">
              <li className="list-group-item">Meritve</li>
              <li className="list-group-item">Elektro projekti</li>
              <li className="list-group-item">Energetika</li>
              <li className="list-group-item">Vsi Projekti</li>
            </ul>
            <ProjectList />
          </div>
        </div>
    );
};

export default ProjektiBox;