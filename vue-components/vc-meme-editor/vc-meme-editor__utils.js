const littleSquareSize = 16;

module.exports = {
  /**
   * Todo.
   *
   * @param {object} evt -
   * @param {object} eachBox -
   * @return {number}
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
      return 1;
    if (
      mouseX > eachBox.left + eachBox.width / 2 - (littleSquareSize / 2) && mouseX < eachBox.left + eachBox.width / 2 + (littleSquareSize / 2) &&
      mouseY > eachBox.top - (littleSquareSize / 2) && mouseY < eachBox.top + (littleSquareSize / 2)
    )
      return 2;
    if (
      mouseX > eachBox.left + eachBox.width - (littleSquareSize / 2) && mouseX < eachBox.left + eachBox.width + (littleSquareSize / 2) &&
      mouseY > eachBox.top - (littleSquareSize / 2) && mouseY < eachBox.top + (littleSquareSize / 2)
    )
      return 3;
    if (
      mouseX > eachBox.left - (littleSquareSize / 2) && mouseX < eachBox.left + (littleSquareSize / 2) &&
      mouseY > eachBox.top + eachBox.height / 2 - (littleSquareSize / 2) && mouseY < eachBox.top + eachBox.height / 2 + (littleSquareSize / 2)
    )
      return 4;
    if (
      mouseX > eachBox.left + eachBox.width - (littleSquareSize / 2) && mouseX < eachBox.left + eachBox.width + (littleSquareSize / 2) &&
      mouseY > eachBox.top + eachBox.height / 2 - (littleSquareSize / 2) && mouseY < eachBox.top + eachBox.height / 2 + (littleSquareSize / 2)
    )
      return 5;
    if (
      mouseX > eachBox.left - (littleSquareSize / 2) && mouseX < eachBox.left + (littleSquareSize / 2) &&
      mouseY > eachBox.top + eachBox.height - (littleSquareSize / 2) && mouseY < eachBox.top + eachBox.height + (littleSquareSize / 2)
    )
      return 6;
    if (
      mouseX > eachBox.left + eachBox.width / 2 - (littleSquareSize / 2) && mouseX < eachBox.left + eachBox.width / 2 + (littleSquareSize / 2) &&
      mouseY > eachBox.top + eachBox.height - (littleSquareSize / 2) && mouseY < eachBox.top + eachBox.height + (littleSquareSize / 2)
    )
      return 7;
    if (
      mouseX > eachBox.left + eachBox.width - (littleSquareSize / 2) && mouseX < eachBox.left + eachBox.width + (littleSquareSize / 2) &&
      mouseY > eachBox.top + eachBox.height - (littleSquareSize / 2) && mouseY < eachBox.top + eachBox.height + (littleSquareSize / 2)
    )
      return 8;
    return -1;
  },
};
