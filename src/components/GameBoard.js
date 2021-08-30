import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

//Import components
import GameButton from "./GameButton";

//Import Images
import svgIMGs from "../img/svg-imgs";

const GameBoard = ({ setScore, score }) => {
  //create history reference
  let history = useHistory();

  //create list of game options
  let gameItems = ["spock", "lizard", "rock", "paper", "scissors"];

  //create state
  const [computerChoice, setComputerChoice] = useState(null);

  //create element references
  const rules = useRef(null);
  const pentagonContainer = useRef(null);
  const gameButtonContainer = useRef(null);
  const player = useRef(null);
  const computer = useRef(null);
  const computerButtonContainer = useRef(null);
  const playAgain = useRef(null);
  const winOrLose = useRef(null);
  const overlay = useRef(null);

  //close rules overlay/div
  const closeClick = () => {
    rules.current.style.display = "block";
  };

  //show rules overlay/div
  const rulesClick = (e) => {
    if (e.target.id === "close" || e.target.parentElement.id === "close") {
      rules.current.style.display = "none";
    }
  };

  /**
   * @description Checks to see if the player has won or lost the round - compares what the computer chose to what the player chose
   * @param player = number of what the player chose
   * @param computer = number of what the computer chose
   * @Return "boolean" of true for win or false for loss | "string" of draw for a draw (same pick) error if nothing matches
   * --- images to numbers ---
   * --- spock    = 0
   * --- lizard   = 1
   * --- rock     = 2
   * --- paper    = 3
   * --- scissors = 4
   **/
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

  /**
   * @description Function for when the user (player) clicks and selects a game item
   * @param e = event object
   **/
  const gameButtonClick = (e) => {
    //create container variable
    let container;

    //assign main (parent) container element to container variable depending on item clicked
    //if event occurred on SVG, SVG PATH or other element
    if (
      e.target.nodeName === "svg" ||
      e.target.nodeName === "path" ||
      !e.target.className.includes("container")
    ) {
      container = e.target.closest(".game-button-container");
    } else {
      //if click event happened on container itself
      container = e.target;
    }

    //change class of clicked container to change its position on the screen
    container.className = "game-button-container game-button-chosen";

    //Hide center pentagon
    pentagonContainer.current.style.display = "none";

    //display game play elements of computer button, player heading, computer heading, and overlay
    computerButtonContainer.current.firstElementChild.style.display = "block";
    player.current.style.display = "block";
    computer.current.style.display = "block";
    overlay.current.style.display = "block";

    //select all game buttons
    let currentButtons = gameButtonContainer.current.querySelectorAll(
      ".game-button-container"
    );

    //hide all game buttons that didn't get clicked
    for (let i = 0; i < gameItems.length; i++) {
      if (currentButtons[i] !== container) {
        currentButtons[i].style.display = "none";
      }
    }

    //Create flashing game button animation
    //set border to white and inner background to blue gradient
    let intOne = setInterval(() => {
      computerButtonContainer.current.firstElementChild.firstElementChild.style.background =
        "white";
      computerButtonContainer.current.firstElementChild.firstElementChild.firstElementChild.style.background =
        "radial-gradient(circle, #1f3756 0%, #141539 100%)";
    }, 100);

    //set border to null and inner background to white
    let intTwo = setInterval(() => {
      computerButtonContainer.current.firstElementChild.firstElementChild.style.background =
        "";
      computerButtonContainer.current.firstElementChild.firstElementChild.firstElementChild.style.background =
        "white";
    }, 200);

    //finalize game play after 1 second
    setTimeout(() => {
      //select a game item for the computer in number format
      let computerPick = Math.floor(Math.random() * gameItems.length);

      //convert the players pick to nu,ber format
      let playerPick = gameItems.indexOf(container.id);

      //* --- Number format relating to index number of game item in gameItem array  */

      //set computer chose in state to update computer button component
      setComputerChoice(gameItems[computerPick]);

      //remove flashing button animation
      clearInterval(intOne);
      clearInterval(intTwo);

      //show play and again button and win/lose text
      playAgain.current.style.display = "block";
      winOrLose.current.style.display = "block";

      //check for win or lose
      let checkWin = checkWinLose(playerPick, computerPick);

      //if error push to error screen
      if (checkWin === "error") {
        history.push("/error");
      } else if (checkWin === "draw") {
        //if draw show draw text
        winOrLose.current.innerHTML = "DRAW";
      } else if (checkWin) {
        //if win show you win text and add 1 to score
        winOrLose.current.innerHTML = "YOU WIN";
        setScore(score + 1);
      } else {
        //if lose show you lose text and minus 1 to score (if score not already 0)
        winOrLose.current.innerHTML = "YOU LOSE";
        if (score > 0) {
          setScore(score - 1);
        }
      }
    }, 1000);
  };

  /**
   * @description reset the game so it can be played again
   **/
  const resetGame = () => {
    //set computer chose to null to remove computer button images and border color
    setComputerChoice(null);

    //display pentagon
    pentagonContainer.current.style.display = "block";

    //hide game play elements of computer button, player heading, computer heading, play again button, win/lose text and overlay
    computerButtonContainer.current.firstElementChild.style.display = "none";
    player.current.style.display = "none";
    computer.current.style.display = "none";
    playAgain.current.style.display = "none";
    winOrLose.current.style.display = "none";
    overlay.current.style.display = "none";

    //select all game buttons
    let currentButtons = gameButtonContainer.current.querySelectorAll(
      ".game-button-container"
    );

    //display all game buttons and re-assign them there classes
    for (let i = 0; i < gameItems.length; i++) {
      currentButtons[i].style.display = "block";
      currentButtons[
        i
      ].className = `container-${gameItems[i]} game-button-container`;
    }
  };

  return (
    <div className="game-board">
      <div id="rules" ref={rules} onClick={rulesClick}>
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
        {gameItems.map((button) => (
          <GameButton key={button} img={button} handleClick={gameButtonClick} />
        ))}
      </div>
      <div ref={computerButtonContainer}>
        <GameButton
          img={computerChoice}
          handleClick={null}
          otherButton={true}
        />
      </div>
      <span ref={player} id="player-text">
        You Picked
      </span>
      <span ref={computer} id="computer-text">
        The House Picked
      </span>
      <span ref={winOrLose} id="win-or-lose-text"></span>
      <button ref={playAgain} id="play-again" onClick={resetGame}>
        PLAY AGAIN
      </button>
      <button id="rule-button" onClick={closeClick}>
        RULES
      </button>
      <div ref={overlay} id="overlay"></div>
    </div>
  );
};

export default GameBoard;
