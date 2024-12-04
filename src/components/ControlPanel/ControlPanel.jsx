import React from "react";
import SearchBox from "../SearchBox/SearchBox"; // Uvozimo komponente
import ProjectList from "../ProjectList/ProjectList";
import CalendarTodo from "../CalendarTodo/CalendarTodo";
import "./ControlPanel.css"; // Dodatni CSS za ControlPanel

const ControlPanel = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* 1. SearchBox */}
        <div className="col-md-4 mb-4">
          <SearchBox />
        </div>

        {/* 2. Project List */}
        <div className="col-md-4 mb-4">
          <ProjectList />
        </div>

        {/* 3. Calendar & To-Do */}
        <div className="col-md-4 mb-4">
          <CalendarTodo />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
