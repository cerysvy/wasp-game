import React, {useEffect, useState} from "react";

// let queen = { 
//   name: 'Queen', 
//   health: 1,
//   alive: true
// };

// let drones = new Array(8).fill(null).map(() => ({"name":"Drone", "health":60, "alive":true}));
// let workers = new Array(5).fill(null).map(() => ({"name":"Worker", "health":68, "alive":true}));
// let waspNest = [...drones, queen, ...workers];

const App = () => {

  let waspNest = [
    {name: 'Drone', health: 60, alive: true, index: 0},
    {name: 'Drone', health: 60, alive: true, index: 1},
    {name: 'Drone', health: 60, alive: true, index: 2},
    {name: 'Drone', health: 60, alive: true, index: 3},
    {name: 'Drone', health: 60, alive: true, index: 4},
    {name: 'Drone', health: 60, alive: true, index: 5},
    {name: 'Drone', health: 60, alive: true, index: 6},
    {name: 'Drone', health: 60, alive: true, index: 7},
    {name: 'Queen', health: 80, alive: true, index: 8},
    {name: 'Worker', health: 68, alive: true, index: 9},
    {name: 'Worker', health: 68, alive: true, index: 10},
    {name: 'Worker', health: 68, alive: true, index: 11},
    {name: 'Worker', health: 68, alive: true, index: 12},
    {name: 'Worker', health: 68, alive: true, index: 13}
  ]

  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isGameOver, setIsGameOver] = useState(false);

  //START SCREEN: {!isPlaying} startButton OnClick={() = setIsPlaying(true)} && 
  //PLAY SCREEN: {isPlaying} health = 0 leads to setIsGameOver(true)
  //GAME OVER SCREEN: {!isPlaying} newGameButton OnClick={() = setIsPlaying(true)}

    // const [droneHealth, setDroneHealth] = useState(60);
    // const [queenHealth, setQueenHealth] = useState(80);
    // const [workerHealth, setWorkerHealth] = useState(68);
    // const [isDroneAlive, setIsDroneAlive] = useState(true);

  const [waspsNestArr, setWaspsNestArr] = useState(waspNest);

  function chooseWasp(wasps) {
    const aliveWasps = wasps.filter((wasp) => wasp.alive);
    console.log(aliveWasps);
    const wasp = aliveWasps[Math.floor(Math.random()*aliveWasps.length)];
    return wasp;
  }

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
    let wasp = chooseWasp(wasps);
    console.log(wasp);
    shoot(wasp);
    let newWasps = checkQueen(wasps);
    setWaspsNestArr(newWasps);
  }

  function checkQueen(wasps) {
    let queen = wasps.filter(wasp => wasp.name=="Queen");
    if (queen.alive==false) {
      for (let i=0; i < wasps.length; i++) {
        wasps[i].health = 0;
        wasps[i].alive = false;
      }};
    return wasps;
  };

  const DisplayWasps = () => {
    return waspsNestArr.filter(wasp => (wasp.alive === true)).map((wasp, index) => (
      <p key ={index}>{wasp.name} - {wasp.health}</p>
    ))
  };

  // if isPlaying == false show start screen/game over screen
  // if isPlaying == true show game

  return (
    <>
    {/* {!isPlaying && !isGameOver && 
      <div>
        Start Menu
      </div>
    }
    {isPlaying && !isGameOver && */}
      <div>
        <DisplayWasps />
        <button onClick={gameTurn}>
          Shoot
        </button>
      </div>
    {/*}}
    {!isPlaying && isGameOver && <div>Game Over</div>}*/}
    </>

  );
}

export default App;
