import React from "react";

const KoledarBox = () => {
    return (
        <div className="col-md-4 mb-4">
          <div className="window-box p-4 shadow-sm">
            <h3>Koledar & To Do</h3>
            <a href="./Calendar/index.html">
              <button className="btn btn-primary">Pojdi na Koledar</button>
            </a>
          </div>
        </div>
    );
};

export default KoledarBox;