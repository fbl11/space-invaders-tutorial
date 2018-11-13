var Keyboarder = function() {
  var keyState = {}

  window.onkeydown = function(event) {
    keyState[event.keyCode] = true
  }
  window.onkeyup = function(event) {
    keyState[event.keyCode] = false
  }

  this.isDown = function(keyCode) {
    return keyState[keyCode] === true
  }
  this.KEYS = { RIGHT: 37, LEFT: 39, SPACE: 32}
}

var drawRect = function(screen, activeUnit) {
  screen.fillRect(activeUnit.center.x - activeUnit.size.x / 2, // horizontal position
    activeUnit.center.y - activeUnit.size.y / 2, // vertical position
    activeUnit.size.x, // width
    activeUnit.size.y) // hight
}

var createInvaders = function(game) {
  var invaders = []
  for (i = 0; i < 24; i++) {
    var x = 30 + (i % 8) * 30 // horizontal position: center is 30 from the left border of the canvas, + i%8 because we need 8 colums of invaders, * 30 to space each invader 30 apart
    var y = 30 + (i % 3) * 20 // vertical position: center is 30 from the top border of the canvas, + i%3 to create three rows, * 20 to space them 30 apart
    invaders.push(new Invader(game, { x: x, y: y })) // creates new invaders with game and center as calculated above
  }
  return invaders
}

var isColliding = function(unitOne, unitTwo) { // returns true if any of the blow are false
  return !(unitOne === unitTwo || // if this is true, the two compared units are one and the same and therefore can't be colliding
    unitOne.center.x + unitOne.size.x / 2 < unitTwo.center.x - unitTwo.size.x / 2 || // if the right edge of the left unit is to the left of the left edge of the right unit, they cannot be colliding
    unitOne.center.x - unitOne.size.x / 2 > unitTwo.center.x + unitTwo.size.x / 2 || // if the left edge of the right unit is to the right of the right edge of the left unit, they cannot be colliding
    unitOne.center.y + unitOne.size.y / 2 < unitTwo.center.y - unitTwo.size.y / 2 || // if the top edge of the bottom unit is below the bottom edge of the top unit, they cannot be colliding
    unitOne.center.y - unitOne.size.y / 2 > unitTwo.center.y + unitTwo.size.y / 2) // if the bottom edge of the top unit is above the top edge of the bottom unit, they cannot be colliding
}


