class Player {
  constructor(game, screenSize) {
    this.game = game
    this.size = { x: 15, y: 15 }
    this.center = { x: screenSize.x / 2, y: screenSize.y - this.size.x }
    this.keyboarder = new Keyboarder()
  }

  update() {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT )) {
      this.center.x += 2
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x -= 2
    }
    if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
      var bullet = new Bullet({ x: this.center.x, y: this.center.y - this.size.x /  2 }, { x: 0, y: -6 }) // spawn location, bullet velocity
      this.game.addUnit(bullet)
    } 
  }
  
}
