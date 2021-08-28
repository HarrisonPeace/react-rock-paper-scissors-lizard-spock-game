import React, { useRef, useState } from "react";

import GameButton from "./GameButton";
import svgIMGs from "../img/svg-imgs";

const GameBoard = ({ setScore, score }) => {
  let gameButtons = ["spock", "lizard", "rock", "paper", "scissors"];
  const [computerChoice, setComputerChoice] = useState(null);

  const rules = useRef(null);
  const pentagonContainer = useRef(null);
  const gameButtonContainer = useRef(null);
  const player = useRef(null);
  const house = useRef(null);
  const nullButtonContainer = useRef(null);
  const playAgain = useRef(null);
  const winOrLose = useRef(null);
  const overlay = useRef(null);

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
    if (
      e.target.nodeName === "svg" ||
      e.target.nodeName === "path" ||
      !e.target.className.includes("container")
    ) {
      container = e.target.closest(".game-button-container");
    } else {
      container = e.target;
    }
    container.className = "game-button-container game-button-chosen";

    pentagonContainer.current.style.display = "none";
    nullButtonContainer.current.firstElementChild.style.display = "block";
    player.current.style.display = "block";
    house.current.style.display = "block";
    overlay.current.style.display = "block";

    let currentButtons = gameButtonContainer.current.querySelectorAll(
      ".game-button-container"
    );
    for (let i = 0; i < gameButtons.length; i++) {
      if (currentButtons[i] !== container) {
        currentButtons[i].style.display = "none";
      }
    }

    let intOne = setInterval(() => {
      nullButtonContainer.current.firstElementChild.firstElementChild.style.background =
        "white";
      nullButtonContainer.current.firstElementChild.firstElementChild.firstElementChild.style.background =
        "radial-gradient(circle, #1f3756 0%, #141539 100%)";
    }, 100);
    let intTwo = setInterval(() => {
      nullButtonContainer.current.firstElementChild.firstElementChild.style.background =
        "";
      nullButtonContainer.current.firstElementChild.firstElementChild.firstElementChild.style.background =
        "white";
    }, 200);

    setTimeout(() => {
      console.log(score);
      let housePick = Math.floor(Math.random() * gameButtons.length);
      let playerPick = gameButtons.indexOf(container.id);
      setComputerChoice(gameButtons[housePick]);
      clearInterval(intOne);
      clearInterval(intTwo);
      playAgain.current.style.display = "block";
      winOrLose.current.style.display = "block";
      let checkWin = checkWinLose(playerPick, housePick);
      if (checkWin === "error") {
        return;
      } else if (checkWin === "draw") {
        winOrLose.current.innerHTML = "DRAW";
      } else if (checkWin) {
        winOrLose.current.innerHTML = "YOU WIN";
        setScore(score + 1);
      } else {
        winOrLose.current.innerHTML = "YOU LOSE";
        if (score > 0) {
          setScore(score - 1);
        }
      }
    }, 1000);
  };

  /*spock    = 0
    lizard   = 1
    rock     = 2
    paper    = 3
    scissors = 4
  */
  const checkWinLose = (player, computer) => {
    if (player === computer) return "draw";
    switch (player) {
      case 0:
        if (computer === 3 || computer === 1) return false;
        else return true;
      case 1:
        if (computer === 2 || computer === 4) return false;
        else return true;
      case 2:
        if (computer === 3 || computer === 0) return false;
        else return true;
      case 3:
        if (computer === 1 || computer === 4) return false;
        else return true;
      case 4:
        if (computer === 2 || computer === 0) return false;
        else return true;
      default:
        return "error";
    }
  };

  const resetGame = () => {
    setComputerChoice(null);
    pentagonContainer.current.style.display = "block";
    nullButtonContainer.current.firstElementChild.style.display = "none";
    player.current.style.display = "none";
    house.current.style.display = "none";
    playAgain.current.style.display = "none";
    winOrLose.current.style.display = "none";
    overlay.current.style.display = "none";

    let currentButtons = gameButtonContainer.current.querySelectorAll(
      ".game-button-container"
    );
    for (let i = 0; i < gameButtons.length; i++) {
      currentButtons[i].style.display = "block";
      currentButtons[
        i
      ].className = `container-${gameButtons[i]} game-button-container`;
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
      <div ref={pentagonContainer} className="centered">
        {svgIMGs.bgPentagon}
      </div>
      <div ref={gameButtonContainer}>
        {gameButtons.map((button) => (
          <GameButton key={button} img={button} handleClick={gameButtonClick} />
        ))}
      </div>
      <div ref={nullButtonContainer}>
        <GameButton
          img={computerChoice}
          handleClick={null}
          otherButton={true}
        />
      </div>
      <span ref={player} className="player">
        You Picked
      </span>
      <span ref={house} className="house">
        The House Picked
      </span>
      <span ref={winOrLose} className="win-or-lose"></span>
      <button ref={playAgain} className="play-again" onClick={resetGame}>
        PLAY AGAIN
      </button>
      <button className="rule-button" onClick={closeClick}>
        RULES
      </button>
      <div ref={overlay} id="overlay"></div>
    </div>
  );
};

export default GameBoard;
