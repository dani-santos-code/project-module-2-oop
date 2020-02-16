class Enemy extends Entity {
  constructor(theRoot, enemySpot) {
    super();
    this.root = theRoot;
    this.spot = enemySpot;
    this.x = enemySpot * ENEMY_WIDTH;
    this.y = -ENEMY_HEIGHT;
    this.destroyed = false;
    this.render("./images/enemy.png", `${this.x}px`, `${this.y}px`, 5);
    theRoot.appendChild(this.domElement);
    this.speed = Math.random() / 10 + 0.25;
  }

  update(timeDiff) {
    this.y = this.y + timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;
    if (this.y > GAME_HEIGHT) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  }

  removeElement() {
    this.root.removeChild(this.domElement);
    this.destroyed = true;
  }
}
