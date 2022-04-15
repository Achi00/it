import React from "react";

export default ({ title, setActiveIndex, index }) => (
  <div
    className="project-item"
    onMouseEnter={() => setActiveIndex(index)}
    onMouseLeave={() => setActiveIndex(-1)}
  >
    <h1 className="project-title">
      <span>{title}</span>
    </h1>
  </div>
);
