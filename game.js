(function() {
  var Game = function(canvasId) {
    var canvas = document.getElementById(canvasId)
    var screen = canvas.getContext('2d')
    var screenSize = { x: canvas.width, y: canvas.height }

    this.activeUnits = [new Player(this, screenSize)] // contains player, invaders , bullets

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
    }


  }

  var drawRect = function(screen, activeUnit) {
    screen.fillRect(activeUnit.center.x - activeUnit.size.x / 2, // horizontal position
                    activeUnit.center.y - activeUnit.size.y / 2, // vertical position
                    activeUnit.size.x, // width
                    activeUnit.size.y) // hight
   }

  window.onload = function() {
    new Game("screen")
  }
})()

