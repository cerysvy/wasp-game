import React, { useState } from "react";
import styles from "./index.css";

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
      health: 80,
      alive: true,
      className: "queenStyles"
    };
    const drones = new Array(8)
      .fill(null)
      .map(() => ({ name: "Drone", img: "./drone.png", health: 60, alive: true, className: "droneStyles" }));
    const workers = new Array(5)
      .fill(null)
      .map(() => ({ name: "Worker", img: "./worker.png", health: 68, alive: true, className: "workerStyles" }));
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
  // let aliveWasps = waspsNestArr.filter((wasp) => wasp.alive);
  // if (aliveWasps.length > 0) {
  //   return(aliveWasps.map((wasp, index) => (
  //     <>
  //     {alive.wasps.map((wasp, index) => (
  //       <div>
  //         <p key={index}>
  //           {wasp.health}
  //         </p>
  //         <img src={`src/img/${wasp.name}.png`}/>
  //       </div>
  //     ))}
  //     <button onClick={gameTurn}>
  //       Shoot
  //     </button>
  //     </>
  //   )))
  // }
  if (waspsNestArr.filter((wasp) => wasp.alive).length > 0) {
    let aliveWasps = waspsNestArr.filter((wasp) => wasp.alive)
    if (aliveWasps.length > 0) {
      return (
      <>
        {aliveWasps
          .map((wasp, index) => (
            <div  className={styles.backgroundContainer}>
              <div className={wasp.className}>
                <p key={index}>
                  {wasp.health}
                </p>
              <img src={wasp.img} width="50" height="50" />
              </div>

            </div>
          ))}


        <button onClick={gameTurn}>Shoot</button>
      </>
    )}
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
