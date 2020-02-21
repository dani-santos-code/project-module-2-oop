class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];
    this.mushrooms = [];
    this.bgMusic = new Audio(
      "http://www.orangefreesounds.com/wp-content/uploads/2020/02/Breakbeat-downtempo-electronic-loop.mp3?_=1"
    );
    this.youLose = new Audio(
      "http://www.orangefreesounds.com/wp-content/uploads/2017/07/You-lose-sound-effect.mp3"
    );
    this.youWin = new Audio(
      "https://d1490khl9dq1ow.cloudfront.net/audio/sfx/mp3preview/BsTwCwBHBjzwub4i4/incredible-joy-small-group_fyzpQrVd_NWM.mp3"
    );
    addBackground(this.root);
  }

  generateMushrooms = () => {
    this.mushrooms.push({
      left: this.player.x + 13,
      top: this.player.y - 40
    });
    const mushroomDiv = document.getElementById("mushroom");

    mushroomDiv.innerHTML = "";
    this.mushrooms.forEach(mushroom => {
      mushroomDiv.innerHTML += `<div class='mushroom' style='left:${mushroom.left}px; top:${mushroom.top}px;'></div>`;
    });
  };

  moveMushrooms = () => {
    const mushroomDiv = document.getElementById("mushroom");

    mushroomDiv.innerHTML = "";
    this.mushrooms.forEach(mushroom => {
      mushroom.top = mushroom.top - 5;
      mushroomDiv.innerHTML += `<div class='mushroom' style='left:${mushroom.left}px; top:${mushroom.top}px;'></div>`;
    });
  };

  gameLoop = () => {
    this.isEnemyDead();
    this.moveMushrooms();
    document.cookie = "Set-Cookie: key=value; HttpOnly; SameSite=None; Secure";
    const btn = document.getElementById("button-start");
    btn.style.display = "none";
    document.querySelector(".score").innerText = `${PLAYER_SCORE}`;

    if (this.lastFrame === undefined) this.lastFrame = new Date().getTime();
    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();
    this.enemies.forEach(enemy => {
      enemy.update(timeDiff);
    });
    this.enemies = this.enemies.filter(enemy => {
      return !enemy.destroyed;
    });
    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }
    if (PLAYER_SCORE >= 10) {
      document.querySelector(".win").style.display = "block";
      document.querySelector("#button-restart").style.display = "block";
      this.bgMusic.pause();
      this.youWin.play();
      return;
    }
    if (this.isPlayerDead()) {
      document.querySelector(".lose").style.display = "block";
      document.querySelector("#button-restart").style.display = "block";
      this.bgMusic.pause();
      this.youLose.play();
      return;
    }

    setTimeout(this.gameLoop, 40);
  };

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
            this.mushrooms.splice(this.mushrooms[mushroom], 1);
            // console.log(this.mushrooms[mushroom]);
            PLAYER_SCORE += 1;
            document.querySelector(".score").innerText = `${PLAYER_SCORE}`;
          }
        }
      }
    }
    return isDead;
  };
}
