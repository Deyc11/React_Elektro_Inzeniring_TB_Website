import React from "react";
import Navbar from "./components/Navbar/Navbar";
import ControlPanel from "./components/ControlPanel/ControlPanel"



const App = () => {
  return (
    <div>
      <Navbar />
      <ControlPanel />
      <div className="container">
        {/* Tukaj bo preostala vsebina aplikacije */}
      </div>
    </div>
  );
};

export default App;
