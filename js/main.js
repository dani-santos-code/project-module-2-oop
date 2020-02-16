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
    event.preventDefault();
    gameEngine.generateMushrooms();
  }
};

const handleStartClick = () => {
  if (handleRestart) {
    gameEngine.bgMusic.play();
    gameEngine.gameLoop();
  }
  document.addEventListener("keydown", keydownHandler);
  event.preventDefault();
  btn.style.display = "none";
  gameEngine.bgMusic.play();
  gameEngine.gameLoop();
};

const handleRestart = () => {
  document.removeEventListener("keydown", keydownHandler);
  location.reload();
  gameEngine.gameLoop();
};

btn.addEventListener("click", handleStartClick);
btnRestart.addEventListener("click", handleRestart);
