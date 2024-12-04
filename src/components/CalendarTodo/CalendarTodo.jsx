import React from "react";
import "./CalendarTodo.css";

const CalendarTodo = () => {
  return (
    <div className="window-box p-4 shadow-sm">
      <h3>Koledar & To Do</h3>
      <a href=".\Calendar\index.html">
        <button className="btn btn-primary">Pojdi na Koledar</button>
      </a>
    </div>
  );
};

export default CalendarTodo;
