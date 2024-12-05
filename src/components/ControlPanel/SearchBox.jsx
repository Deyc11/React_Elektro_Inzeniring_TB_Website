import React from "react";
import "./ControlPanel.css"

const SearchBox = () => {
  return (
    <div className="window-box p-4 shadow-sm">
      <h3>Iskanje po projektih</h3>
      <input type="text" className="form-control" placeholder="Vnesite ime projekta" />
    </div>
  );
};

export default SearchBox;
