import React from "react";
import { Link } from "react-router-dom";

const KoledarBox = () => {
  return (
    <div className="col-md-4 mb-4">
      <div className="window-box p-4 shadow-sm">
        <h3>Koledar & To Do</h3>
        <Link to="/koledar">
          <button className="button-in-wrapper">Pojdi na Koledar</button>
        </Link>
      </div>
    </div>
  );
};

export default KoledarBox;
