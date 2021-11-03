const littleSquareSize = 16;

const enumDirections = {
  TOPLEFT: 1,
  TOP: 2,
  TOPRIGHT: 3,
  LEFT: 4,
  RIGHT: 5,
  BOTTOMLEFT: 6,
  BOTTOM: 7,
  BOTTOMRIGHT: 8,
};

module.exports = {
  /**
   * Triggered when the user moves the mouse to check if they're moving over a resize handle.
   *
   * @param {object} evt -
   * @param {object} eachBox -
   * @return {number} - -1 is unavailable.
   */
  checkIfMightResize: function(evt, eachBox) {
    let mouseX;
    let mouseY;
    if (evt.touches) { mouseX = evt.touches[0].pageX; mouseY = evt.touches[0].pageY; } // touch
    if (evt.pageX) { mouseX = evt.pageX; mouseY = evt.pageY; } // mouse
    mouseX -= document.getElementById('container').offsetLeft;
    mouseY -= document.getElementById('container').offsetTop;

    if (
      mouseX > eachBox.left - (littleSquareSize / 2) && mouseX < eachBox.left + (littleSquareSize / 2) &&
      mouseY > eachBox.top - (littleSquareSize / 2) && mouseY < eachBox.top + (littleSquareSize / 2)
    )
      return enumDirections.TOPLEFT;
    if (
      mouseX > eachBox.left + eachBox.width / 2 - (littleSquareSize / 2) && mouseX < eachBox.left + eachBox.width / 2 + (littleSquareSize / 2) &&
      mouseY > eachBox.top - (littleSquareSize / 2) && mouseY < eachBox.top + (littleSquareSize / 2)
    )
      return enumDirections.TOP;
    if (
      mouseX > eachBox.left + eachBox.width - (littleSquareSize / 2) && mouseX < eachBox.left + eachBox.width + (littleSquareSize / 2) &&
      mouseY > eachBox.top - (littleSquareSize / 2) && mouseY < eachBox.top + (littleSquareSize / 2)
    )
      return enumDirections.TOPRIGHT;
    if (
      mouseX > eachBox.left - (littleSquareSize / 2) && mouseX < eachBox.left + (littleSquareSize / 2) &&
      mouseY > eachBox.top + eachBox.height / 2 - (littleSquareSize / 2) && mouseY < eachBox.top + eachBox.height / 2 + (littleSquareSize / 2)
    )
      return enumDirections.LEFT;
    if (
      mouseX > eachBox.left + eachBox.width - (littleSquareSize / 2) && mouseX < eachBox.left + eachBox.width + (littleSquareSize / 2) &&
      mouseY > eachBox.top + eachBox.height / 2 - (littleSquareSize / 2) && mouseY < eachBox.top + eachBox.height / 2 + (littleSquareSize / 2)
    )
      return enumDirections.RIGHT;
    if (
      mouseX > eachBox.left - (littleSquareSize / 2) && mouseX < eachBox.left + (littleSquareSize / 2) &&
      mouseY > eachBox.top + eachBox.height - (littleSquareSize / 2) && mouseY < eachBox.top + eachBox.height + (littleSquareSize / 2)
    )
      return enumDirections.BOTTOMLEFT;
    if (
      mouseX > eachBox.left + eachBox.width / 2 - (littleSquareSize / 2) && mouseX < eachBox.left + eachBox.width / 2 + (littleSquareSize / 2) &&
      mouseY > eachBox.top + eachBox.height - (littleSquareSize / 2) && mouseY < eachBox.top + eachBox.height + (littleSquareSize / 2)
    )
      return enumDirections.BOTTOM;
    if (
      mouseX > eachBox.left + eachBox.width - (littleSquareSize / 2) && mouseX < eachBox.left + eachBox.width + (littleSquareSize / 2) &&
      mouseY > eachBox.top + eachBox.height - (littleSquareSize / 2) && mouseY < eachBox.top + eachBox.height + (littleSquareSize / 2)
    )
      return enumDirections.BOTTOMRIGHT;
    return -1;
  },
};
