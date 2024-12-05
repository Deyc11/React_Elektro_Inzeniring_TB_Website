import React from "react";
import Navbar from "./components/Navbar/Navbar";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import SearchBox from "./components/SearchBox/SearchBox";
import ProjectList from "./components/ProjectList/ProjectList";
import CalendarTodo from "./components/CalendarTodo/CalendarTodo";




const App = () => {
  return (
    <div>
      <Navbar />
      <ControlPanel />
      <SearchBox />
      <ProjectList />
      <CalendarTodo />
      <div className="container">
        {/* Tukaj bo preostala vsebina aplikacije */}
      </div>
    </div>
  );
};

export default App;
