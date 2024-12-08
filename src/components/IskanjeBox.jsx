import React from "react";

const IskanjeBox = () => {
    return (
        <div className="col-md-4 mb-4">
          <div className="window-box p-4 shadow-sm">
            <h3>Iskanje po projektih</h3>
            <input type="text" className="form-control" placeholder="Vnesite ime projekta..." />
          </div>
        </div>
    );
};

export default IskanjeBox;