class Player extends Entity {
  constructor(root) {
    super();
    this.x = 2 * PLAYER_WIDTH;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
    this.render("images/player.png", `${this.x}px`, `${this.y}px`, "10");
    root.appendChild(this.domElement);
  }
  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
  }
  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
  }
  moveUp() {
    if (this.y > 0 && this.y > 55) {
      this.y = this.y - PLAYER_HEIGHT;
    }
    this.domElement.style.top = `${this.y}px`;
  }
  moveDown() {
    if (this.y + PLAYER_HEIGHT < GAME_HEIGHT) {
      if (this.y < 436) {
        this.y = this.y + PLAYER_HEIGHT;
      }
    }
    this.domElement.style.top = `${this.y}px`;
  }
}
