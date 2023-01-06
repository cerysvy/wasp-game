import React, {useState} from "react";

const App = () => {

  //const [isPlaying, setIsPlaying] = useState(false);
  //const [isGameOver, setIsGameOver] = useState(false);

  //START SCREEN: {!isPlaying} startButton OnClick={() = setIsPlaying(true)} && 
  //PLAY SCREEN: {isPlaying} health = 0 leads to setIsGameOver(true)
  //GAME OVER SCREEN: {!isPlaying} newGameButton OnClick={() = setIsPlaying(true)}

  let drone = { 
    name: 'Drone', 
    health: 60,
    alive: true
  };

  let queen = { 
    name: 'Queen', 
    health: 80,
    alive: true
  };

  let worker = { 
    name: 'Worker', 
    health: 68,
    alive: true
  };

  let waspsNest = [
    ...Array(8).fill(drone),
    queen,
    ...Array(5).fill(worker)
  ];

  // start game 

  // do while - loop
  // shoot() method, listens to shoot button
  // choose randm wasp from waspsNest
  // run score method on that wasp
  // then count all alive the wasps in the array, if none then game over

  function gameTurn() {
    let wasp = chooseWasp();
    shoot(wasp);
  }

  function chooseWasp() {
    let aliveWasps = waspsNest.filter(wasp => wasp.alive);
    let wasp = aliveWasps[Math.floor(Math.random()*aliveWasps.length)];
    return wasp;
  }

  function shoot(wasp) {
    if(wasp.name === "Drone") {
      wasp.health=(wasp.health-12)
    }
    if(wasp.name === "Queen") {
      wasp.health=(wasp.health-7)
    }
    if(wasp.name === "Worker") {
      wasp.health=(wasp.health-10)
    }
    if(wasp.health <= 0) {
      wasp.alive=false
    }
  }
  
  //check the queen is alive
  //check all the wasps are alive at the end of each click

  let DisplayWasps = () => {
    return waspsNest.map((wasp) => (
      <p>{wasp.name} - {wasp.health}</p>
    ))
  };
  

  // if isPlaying == false show start screen/game over screen
  // if isPlaying == true show game

  return (
    <div>
      <p>
        <DisplayWasps />
      </p>
      <button onClick={gameTurn}>
        Shoot
      </button>
    </div>
  );
}

export default App;
