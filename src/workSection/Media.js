import React from "react";

export default ({ url, active, x, y }) => {
  return (
    <img
      className={active ? "is-active" : undefined}
      src={url}
      alt="work media"
      style={{
        transform: `translate(${x - 50}px, ${y + 900}px)`
      }}
    />
  );
};
