import React, { useEffect, useState } from "react";

/* Components */
import Title from "./Title";
import Media from "./Media";

/* Utils */
import Data from "./Data";

/* Css */
import "./workSection.scss";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

function WorkSection() {
    const [activeIndex, setActiveIndex] = useState(-1);
    const { x, y } = useMousePosition();
  
    return (
      <>
        <div className="page-wrapper">
          <div className="project-list">
            {Data.map(({ title }, index) => (
              <Title
                title={title}
                setActiveIndex={setActiveIndex}
                index={index}
              />
            ))}
          </div>
          <div className="project-media">
            {Data.map(({ imageUrl }, index) => {
              const isActive = index === activeIndex;
              const xPos = isActive ? x : 0;
              const yPos = isActive ? y : 0;
              return (
                <Media
                  key={index}
                  url={imageUrl}
                  active={isActive}
                  x={xPos}
                  y={yPos}
                />
              );
            })}
          </div>
        </div>
      </>
    );
}

export default WorkSection