// In this file we have functions that will be used in the Engine.js file.
// nextEnemySpot is a variable that refers to a function. The function has one parameter,
// which we called enemies. enemies will refer to an array that will contain instances of the
// Enemy class. To get more information about the argument that will get passed to this function,
// please see the Engine.js file.

// The purpose of this function is to determine in which slot to place our next enemy.
// The possibilities are 0, 1, 2, 3 or 4.
const nextEnemySpot = enemies => {
  // enemySpots will refer to the number of spots available (can you calculate it?)
  const enemySpots = GAME_WIDTH / ENEMY_WIDTH;
  // To find out where to place an enemy, we first need to find out which are the spots available.
  // We don't want to place two enemies in the same lane. To accomplish this, we first create an
  // array with 5 elements (why 5?) and each element is false.
  // We then use forEach to iterate through all the enemies.
  // If you look at the constructor of the Enemy class, you can see that every instance will have a spot property.
  // We can use this property to modify the spotsTaken array.
  const spotsTaken = [false, false, false, false, false];
  enemies.forEach(enemy => {
    spotsTaken[enemy.spot] = true;
  });
  // We are now in a position to find out position. We declare a variable candidate that is initially undefined.
  // candidate represents a potential spot. The variable will be repeatedly assigned different numbers.
  // We will randomly try different spots until we find out that is available
  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    // candidate is assigned a random number between 0 and enemySpots (not including enemySpots). (what number is enemySpots?)
    candidate = Math.floor(Math.random() * enemySpots);
  }
  // When the while loop is finished, we are assured that we have a number that corresponds to a free spot, so we return it.
  return candidate;
};

// addBackground contains all the logic to display the starry background of the game.
// It is a variable that refers to a function.
// The function takes one parameter
const addBackground = root => {
  const bg = document.createElement("img");
  bg.src = "images/stars.png";
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH}px`;

  root.append(bg);
  const whiteBox = document.createElement("div");
  whiteBox.style.zIndex = 100;
  whiteBox.style.position = "absolute";
  whiteBox.style.top = `${GAME_HEIGHT}px`;
  whiteBox.style.height = `${ENEMY_HEIGHT}px`;
  whiteBox.style.width = `${GAME_WIDTH}px`;
  whiteBox.style.background = "#fff";
  root.append(whiteBox);
};
