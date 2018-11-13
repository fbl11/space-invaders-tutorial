class Invader {
  constructor(game, center) {
    this.game = game
    this.size = { x: 15, y: 10 }
    this.center = center
    this.patrolX = 0 // when invaders are in the far left, 40 when they are in the far right
    this.speedX = 0.3 // speed with which the invader moves, positive if moving right, negative if moving left
  }

  update() {
    if (this.patrolX < 0 || this.patrolX > 40) { // if invader out of bounds of the canvas...
      this.speedX = -this.speedX // ...invert current direction
    }
    this.center.x += this.speedX // moves invader left or right at increments of speed
    this.patrolX += this.speedX  // keep track on where invader is in their patrol
    if (Math.random() > 0.995 && !this.game.invadersBelow(this)) { // roll produces result between 0 and 1, called 60x per second for all invaders; && checks that no invaders are below shooter
      var bullet = new Bullet({ x: this.center.x, y: this.center.y + this.size.x / 2 }, { x: Math.random() - 0.5, y: 2 }) // spawn location beneath the invader, bullet velocity with a little added drift, bullet direction down (+2 instead of -2)
      this.game.addUnit(bullet)
    } 
    // console.log(this.center)
  }
}