import React, { useState } from "react";

const App = () => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [waspsNestArr, setWaspsNestArr] = useState();

  function startGame() {
    setIsPlaying(true);
    setUpWasps();
  };

  function setUpWasps() {
    const queen = {
      name: "Queen",
      img: "./queen.png",
      alt: "https://www.flaticon.com/free-icon/bee_4794502",
      health: 80,
      alive: true,
      className: "queen",
      height: "100px"
    };
    const drones = new Array(8)
      .fill(null)
      .map(() => ({ 
        name: "Drone", 
        img: "./drone.png", 
        alt: "https://www.flaticon.com/free-icon/wasp_311590", 
        health: 60,
        alive: true,
        className: "drone",
        height: "70px"
      }));
    const workers = new Array(5)
      .fill(null)
      .map(() => ({ 
        name: "Worker", 
        img: "./worker.png",
        alt: "https://www.flaticon.com/free-icon/wasp_1850229", 
        health: 68, 
        alive: true, 
        className: "worker", 
        height: "70px" 
      }));
    const waspNest = [queen, ...drones, ...workers];
    setWaspsNestArr(waspNest);
  };

  function chooseWasp(wasps) {
    const aliveWasps = wasps.filter((wasp) => wasp.alive);
    const wasp = aliveWasps[Math.floor(Math.random()*aliveWasps.length)];
    return wasp;
  };

  function shoot(wasp) {
    if(wasp.name === "Drone") {
      wasp.health = wasp.health-12

    }
    if(wasp.name === "Queen") {
      wasp.health = wasp.health-7

    }
    if(wasp.name === "Worker") {
      wasp.health = wasp.health-10;
      // className = workerHit;
      // className = workerUnhit;
    }
    if(wasp.health <= 0) {
      wasp.alive=false
    }
  }
  
  function gameTurn() {
    let wasps = [...waspsNestArr];
    const wasp = chooseWasp(wasps);
    shoot(wasp);
    const newWasps = checkQueen(wasps);
    setWaspsNestArr(newWasps);
  }

  function checkQueen(wasps) {
    let queen = wasps.find(wasp => wasp.name==="Queen");
    if(!queen.alive) {
      wasps = killAllWasps(wasps);
    };
    return wasps;
  };

  function killAllWasps(wasps) {
    wasps = wasps.map((wasp) => ({
      ...wasp,
      health: 0,
      alive: false
    }))
    return wasps;
  };

const DisplayWasps = () => {
  if (waspsNestArr.filter((wasp) => wasp.alive).length > 0) {
    let aliveWasps = waspsNestArr.filter((wasp) => wasp.alive)
    if (aliveWasps.length > 0) {
      return (
      <>
        {aliveWasps
          .map((wasp, index) => (
            <div className={wasp.className}>
              <p key={index} className="score">
                {wasp.health}
              </p>  
              <img src={wasp.img} height={wasp.height} alt={wasp.alt}/>
            </div>
          ))}
      </>
    )}
    } else {
    return (
      <>
        <button onClick={startGame} className="newGameDeadQueenButton">
          <img 
            src="./queen.png"
            alt="https://www.flaticon.com/free-icon/bee_4794502"
            className="deadQueen"
          />
        </button>
        <p className="newGameText">
        &lt; &lt; Click the queen to play again
        </p>
        <img
          className="gameOverIcon"
          src="./game-over.png" 
          alt="https://www.flaticon.com/free-icon/game-over_7372017?term=game+over&page=1&position=73&origin=search&related_id=7372017"
        />
      </>
    );
  }
};

  if (isPlaying)
    return (
      <>
        <div className="gameContainer">
          <div className="gridContainer">
            <div>
              <img 
                src="./nest.png" 
                alt="https://www.flaticon.com/free-icon/beehive_2988574?related_id=2988574&origin=search"
                className="nestIcon"
              />
            </div>
            <DisplayWasps />
          </div>
          <button className="shootButton" onClick={gameTurn}>
            <img 
              src="./shoot.png" 
              alt="https://www.flaticon.com/free-icon/scope_7030486?term=hit&page=1&position=43&origin=search&related_id=7030486" 
              className="shootButtonIcon"
            />
          </button>
        </div>
      </>
    );
  if (!isPlaying) {
    return (
      <>
      <div className="startDiv">
        <div className="startWording">
          <h3>Wasp Game</h3>
          <img className="startMenuLogo" src="./worker.png" alt="https://www.flaticon.com/free-icon/wasp_1850229" />
          <p>
            Press the button to shoot at a random wasp. Wasps have and lose different points depending on their type. If the queen dies, all wasps in the nest die with her.
          </p>
        </div>
        <button onClick={startGame} className="startButton">
          <img 
            src="./start.png" 
            alt="https://www.flaticon.com/free-icon/start_5243423?related_id=5241750&origin=search" 
            className="startButtonIcon"
          />
        </button>
        <p className="funFactText">
          Fun fact: Drone wasps don't have a visible stinger...
        </p>
      </div>
      </>
    )
  }
  };

export default App;
