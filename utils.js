var Keyboarder = function() {
  var keyState = {}

  window.onkeydown = function(event) {
    keyState[event.keyCode] = true
  }
  window.onkeyup = function (event) {
    keyState[event.keyCode] = false
  }

  this.isDown = function(keyCode) {
    return keyState[keyCode] === true
  }
  this.KEYS = { RIGHT: 37, LEFT: 39, SPACE: 32}
}
