import React, {useEffect, useState} from "react";

let queen = { 
  name: 'Queen', 
  health: 1,
  alive: true
};

let drones = new Array(8).fill(null).map(() => ({"name":"Drone", "health":60, "alive":true}));
let workers = new Array(5).fill(null).map(() => ({"name":"Worker", "health":68, "alive":true}));
let waspNest = [...drones, queen, ...workers];

const App = () => {

  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isGameOver, setIsGameOver] = useState(false);

  //START SCREEN: {!isPlaying} startButton OnClick={() = setIsPlaying(true)} && 
  //PLAY SCREEN: {isPlaying} health = 0 leads to setIsGameOver(true)
  //GAME OVER SCREEN: {!isPlaying} newGameButton OnClick={() = setIsPlaying(true)}

    // const [droneHealth, setDroneHealth] = useState(60);
    // const [queenHealth, setQueenHealth] = useState(80);
    // const [workerHealth, setWorkerHealth] = useState(68);
    // const [isDroneAlive, setIsDroneAlive] = useState(true);

  console.log(waspNest);

  const [waspsNestArr, setWaspsNestArr] = useState(waspNest);

  function chooseWasp(wasps) {
    let aliveWasps = wasps.filter(wasp => wasp.alive);
    let wasp = aliveWasps[Math.floor(Math.random()*aliveWasps.length)];
    return wasp;
  }

  function shoot(wasp) {
    console.log("inside shoot");
    console.log(wasp);
    if(wasp.name === "Drone") {
      (wasp.health = wasp.health-12)
    }
    if(wasp.name === "Queen") {
      wasp.health = wasp.health-7
      //setQueenHealth(queenHealth-7)
    }
    if(wasp.name === "Worker") {
      wasp.health = wasp.health-10
      //setWorkerHealth(workerHealth-10)
    }
    if(wasp.health <= 0) {
      wasp.alive=false
    }
    console.log("after shoot");
    console.log(wasp);
  }
  
  function gameTurn() {
    let wasps = [...waspsNestArr];
    console.log(wasps)
    let wasp = chooseWasp(wasps);
    console.log(wasp);
    shoot(wasp);
    console.log(wasps);
    let newWasps = checkQueen(wasps);
    setWaspsNestArr(newWasps);
  }

  function checkQueen(wasps) {
    let queen = wasps.filter(wasp => wasp.name == "Queen");
    console.log(queen);
    if (!queen.alive) {
      for (let i = 0; i < wasps.length; i++) {
        wasps[i].health = 0;
        wasps[i].alive = false;
      }};
    console.log(wasps)
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
