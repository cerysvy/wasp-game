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
      health: 80,
      alive: true,
    };
    const drones = new Array(8)
      .fill(null)
      .map(() => ({ name: "Drone", health: 60, alive: true }));
    const workers = new Array(5)
      .fill(null)
      .map(() => ({ name: "Worker", health: 68, alive: true }));
    const waspNest = [...drones, queen, ...workers];
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
      wasp.health = wasp.health-10
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
    return (
      <>
        {waspsNestArr
          .filter((wasp) => wasp.alive === true)
          .map((wasp, index) => (
            <p key={index}>
              {wasp.name} - {wasp.health}
            </p>
          ))}
        <button onClick={gameTurn}>Shoot</button>
      </>
    );
  } else {
    return (
      <>
        <p>Game Over</p>
        <button onClick={startGame}>New Game</button>
      </>
    );
  }
};

  if (isPlaying)
    return (
      <>
        <div>
          <DisplayWasps />
        </div>
      </>
    );
  if (!isPlaying) {
    return <button onClick={startGame}>Start Game</button>;
  }
  };

export default App;
