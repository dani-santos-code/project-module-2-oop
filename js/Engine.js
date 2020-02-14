// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    this.mushrooms = [];
    this.bgMusic = new Audio(
      "http://www.orangefreesounds.com/wp-content/uploads/2020/02/Breakbeat-downtempo-electronic-loop.mp3?_=1"
    );
    // We add the background image to the game
    addBackground(this.root);
  }

  generateMushrooms = () => {
    this.mushrooms.push({
      left: this.player.x + 13,
      top: this.player.y - 40
    });
    document.getElementById("mushroom").innerHTML = "";
    for (let mushroom = 0; mushroom < this.mushrooms.length; mushroom++) {
      document.getElementById(
        "mushroom"
      ).innerHTML += `<div class='mushroom' style='left:${this.mushrooms[mushroom].left}px; top:${this.mushrooms[mushroom].top}px;'></div>`;
    }
  };

  moveMushrooms = () => {
    for (let mushroom = 0; mushroom < this.mushrooms.length; mushroom++) {
      this.mushrooms[mushroom].top = this.mushrooms[mushroom].top - 10;
    }
  };

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array

  gameLoop = () => {
    document.cookie = "Set-Cookie: key=value; HttpOnly; SameSite=None; Secure";
    this.isEnemyDead();
    this.moveMushrooms();
    const youLose = new Audio(
      "http://www.orangefreesounds.com/wp-content/uploads/2017/07/You-lose-sound-effect.mp3"
    );
    const youWin = new Audio(
      "https://d1490khl9dq1ow.cloudfront.net/audio/sfx/mp3preview/BsTwCwBHBjzwub4i4/incredible-joy-small-group_fyzpQrVd_NWM.mp3"
    );
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) this.lastFrame = new Date().getTime();
    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach(enemy => {
      enemy.update(timeDiff);
    });
    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter(enemy => {
      return !enemy.destroyed;
    });
    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }
    if (PLAYER_SCORE >= 10) {
      this.bgMusic.pause();
      youWin.play();
      console.log("You Win");
      return;
    }
    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      this.bgMusic.pause();
      youLose.play();
      console.log("You Lose");
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 40);
  };
  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    const playerX = this.player.x;
    const playerY = this.player.y;
    const enemiesList = this.enemies;
    let isDead = false;
    enemiesList.forEach(enemy => {
      if (
        enemy.x < playerX + 75 &&
        enemy.x + 75 > playerX &&
        enemy.y < playerY + 54 &&
        enemy.y + 156 > playerY
      ) {
        isDead = true;
      }
    });
    return isDead;
  };
  isEnemyDead = () => {
    let isDead = false;
    for (let enemy = 0; enemy < this.enemies.length; enemy++) {
      for (let mushroom = 0; mushroom < this.mushrooms.length; mushroom++) {
        if (
          this.mushrooms[mushroom].left < this.enemies[enemy].x + 75 &&
          this.mushrooms[mushroom].left + 32 > this.enemies[enemy].x &&
          this.mushrooms[mushroom].top < this.enemies[enemy].y + 54 &&
          this.mushrooms[mushroom].top + 32 > this.enemies[enemy].y
        ) {
          {
            this.enemies[enemy].removeElement();
            document.getElementById("mushroom").innerHTML = "";
            PLAYER_SCORE += 1;
            document.querySelector(".score").innerText = `${PLAYER_SCORE}`;
          }
        }
      }
    }
    return isDead;
  };
}
