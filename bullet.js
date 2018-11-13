class Bullet {
  constructor(center, velocity) {
    this.center = center
    this.size = { x: 3, y: 3 }
    this.velocity = velocity
  }

  update() {
    this.center.x += this.velocity.x
    this.center.y += this.velocity.y
  }

}