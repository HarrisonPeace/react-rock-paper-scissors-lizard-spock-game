import React from "react";

import svgIMGs from "../img/svg-imgs";

const GameButton = ({ img }) => {
  return (
    <div className={`border border-${img}`}>
      <div className="game-button">{svgIMGs[img]}</div>
    </div>
  );
};

export default GameButton;
