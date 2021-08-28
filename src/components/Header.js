import React from "react";

const Header = ({ score }) => {
  return (
    <div id="header">
      <div id="game-name">
        <span>Rock</span>
        <span>Paper</span>
        <span>Scissors</span>
        <span>Lizard</span>
        <span>Spock</span>
      </div>
      <div id="score-container">
        <span>Score</span>
        <span id="score">{score}</span>
      </div>
    </div>
  );
};

export default Header;
