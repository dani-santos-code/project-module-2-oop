const gameEngine = new Engine(document.getElementById("app"));
const btn = document.getElementById("button-start");
const btnRestart = document.getElementById("button-restart");

const keydownHandler = event => {
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }
  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }
  if (event.code === "ArrowUp") {
    event.preventDefault();
    gameEngine.player.moveUp();
  }
  if (event.code === "ArrowDown") {
    event.preventDefault();
    gameEngine.player.moveDown();
  }
  if (event.keyCode === 32) {
    gameEngine.generateMushrooms();
  }
};

const handleStartClick = () => {
  document.addEventListener("keydown", keydownHandler);
  btn.style.display = "none";
  gameEngine.bgMusic.play();
  gameEngine.gameLoop();
};

const handleRestart = () => {
  location.reload();
};
// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.

btn.addEventListener("click", handleStartClick);
// We call the gameLoop method to start the game

btnRestart.addEventListener("click", handleRestart);
