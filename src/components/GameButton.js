import React from "react";

import svgIMGs from "../img/svg-imgs";

const GameButton = ({ img, handleClick, otherButton = false }) => {
  return (
    <div
      id={img}
      onClick={handleClick}
      className={
        otherButton
          ? "game-button-container game-button-computer"
          : `container-${img} game-button-container`
      }
    >
      <div className={`game-button-border game-button-color-${img}`}>
        <div className="game-button-inner">{svgIMGs[img]}</div>
      </div>
    </div>
  );
};

export default GameButton;
