(function() {
  var Game = function(canvasId) {
    var canvas = document.getElementById(canvasId)
    var screen = canvas.getContext('2d')
    var screenSize = { x: canvas.width, y: canvas.height }

    this.activeUnits = createInvaders(this).concat(new Player(this, screenSize)) // contains player, invaders , bullets - when invaders are added: call createInvaders() function - which returns an array of invader entities, passing in the current game ('this').  Concat this with the Player entity.

    var self = this
    var tick = function() {
      self.update() // updates game logic
      self.draw(screen, screenSize) // draw game
      requestAnimationFrame(tick) // repeats tick about 60 times per second
    }
    tick()
  }

  Game.prototype = {
    update: function() {
      var activeUnits = this.activeUnits
      var notCollidingWithAnything = function(unitOne) { // passes in the unit I want to check for collisions
        return activeUnits.filter(function(unitTwo) { // filters out and collects all units from the array that are colliding with unitOne
          return isColliding(unitOne, unitTwo)
        }).length === 0 // if this is zero, no units are colliding with unitOne
      }

      this.activeUnits = this.activeUnits.filter(notCollidingWithAnything) // removes all units that are colliding from the active units array

      for (var i = 0; i < this.activeUnits.length; i++) {
        this.activeUnits[i].update()
      }

    },
    draw: function(screen, screenSize) { // like update, would normally be handled by each entity / unit
      screen.clearRect(0 , 0, screenSize.x, screenSize.y)
      // screen.fillRect(30, 30, 40, 40) // testing rendering a rectangle to the screen - x, y, width, height
      for (var i = 0; i < this.activeUnits.length; i++) {
        drawRect(screen, this.activeUnits[i])  
      }
    },
    addUnit: function(unit) {
      this.activeUnits.push(unit)
    },
    
    invadersBelow: function(invader) {
      return this.activeUnits.filter(function(unit) {
        return unit instanceof(Invader) &&
          unit.center.y > invader.center.y &&
          unit.center.x - invader.center.x < invader.size.x
      }).length > 0
    }
  }

  window.onload = function() {
    new Game("screen")
  }
})()

