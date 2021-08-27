import React, { useRef, useState} from "react";

import GameButton from "./GameButton";
import svgIMGs from "../img/svg-imgs";

const GameBoard = () => {

  let gameButtons = ["spock", "lizard", "rock", "paper", "scissors"];
  const [computerChoice, setComputerChoice] = useState(null)

  const rules = useRef(null);
  const pentagonContainer = useRef(null);
  const gameButtonContainer = useRef(null);
  const player = useRef(null);
  const house = useRef(null);
  const nullButtonContainer = useRef(null);

  const closeClick = () => {
    rules.current.style.display = "block";
  };

  const rulesClick = (e) => {
    if (e.target.id === "close" || e.target.parentElement.id === "close") {
      rules.current.style.display = "none";
    }
  };

  const gameButtonClick = (e) => {
    let container;
    if(e.target.nodeName === 'svg' || e.target.nodeName === 'path' || !e.target.className.includes("container")) {
      container =  e.target.closest(".game-button-container")
    } else {
      container = e.target
    }
    container.className = "game-button-container game-button-chosen"

    pentagonContainer.current.style.display = "none";
    nullButtonContainer.current.firstElementChild.style.display = "block";
    player.current.style.display = "block";
    house.current.style.display = "block";

    let currentButtons = gameButtonContainer.current.querySelectorAll(".game-button-container")
    for(let i = 0; i < gameButtons.length; i++) {
      if(currentButtons[i] !== container) {
        currentButtons[i].style.display = "none";
      }
    }

    let intOne = setInterval(() => {
      nullButtonContainer.current.firstElementChild.firstElementChild.style.background = 'white'
      nullButtonContainer.current.firstElementChild.firstElementChild.firstElementChild.style.background = 'radial-gradient(circle, #1f3756 0%, #141539 100%)'
    }, 100)
    let intTwo = setInterval(() => {
      nullButtonContainer.current.firstElementChild.firstElementChild.style.background = ''
      nullButtonContainer.current.firstElementChild.firstElementChild.firstElementChild.style.background = 'white'
    }, 200)

    setTimeout(() => {
      let housePick = Math.floor(Math.random() * gameButtons.length)
      setComputerChoice(gameButtons[housePick])
      clearInterval(intOne);
      clearInterval(intTwo);
      }, 1000);
  }

  return (
    <div className="game-board">
      <div className="rules" ref={rules} onClick={rulesClick}>
        <div>
          <span>RULES</span>
          {svgIMGs.close}
          {svgIMGs.rules}
        </div>
      </div>
      <div ref={pentagonContainer} className="centered">{svgIMGs.bgPentagon}</div>
      <div ref={gameButtonContainer}>
        {gameButtons.map((button) => (
          <GameButton key={button} img={button} handleClick={gameButtonClick}/>
        ))}
      </div>
      <div ref={nullButtonContainer}>
      <GameButton img={computerChoice} handleClick={null} otherButton={true}/>
      </div>
      <span ref={player} className="player">You Picked</span>
      <span ref={house} className="house">The House Picked</span>
      <button className="rule-button" onClick={closeClick}>
        RULES
      </button>
    </div>
  );
};

export default GameBoard;
