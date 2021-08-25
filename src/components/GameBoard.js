import React, { useRef } from "react";

import GameButton from "./GameButton";
import svgIMGs from "../img/svg-imgs";

const GameBoard = () => {
  const rules = useRef(null);

  let GameButtons = ["spock", "lizard", "rock", "paper", "scissors"];

  const buttonClick = () => {
    rules.current.style.display = "block";
  };

  const rulesClick = (e) => {
    if (e.target.id === "close" || e.target.parentElement.id === "close") {
      rules.current.style.display = "none";
    }
  };

  return (
    <div className="game-board">
      <div className="rules" ref={rules} onClick={rulesClick}>
        <div>
          <span>RULES</span>
          {svgIMGs.close}
          {svgIMGs.rules}
        </div>
      </div>
      <div className="centered">{svgIMGs.bgPentagon}</div>

      {GameButtons.map((button) => (
        <GameButton img={button} />
      ))}
      <button onClick={buttonClick}>RULES</button>
    </div>
  );
};

export default GameBoard;
