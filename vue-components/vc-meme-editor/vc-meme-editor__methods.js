const utils = require('./vc-meme-editor__utils');

/**
 * TODO.
 *
 * @param {string} text -
 * @param {number} maxWidth -
 * @param {number} _theFontSize -
 * @return {number}
 */
function textHeight(text, maxWidth, _theFontSize) {
  var words = text.split(' ');
  var line = '';
  var h = _theFontSize * 1.8;

  for (var i = 0; i < words.length; i++) {
    var testLine = line + words[i] + ' ';
    var testWidth = window.p.textWidth(testLine);

    if (testWidth > maxWidth && i > 0) {
      line = words[i] + ' ';
      h += window.p.textAscent(testLine);
    } else {
      line = testLine;
    }
  }

  return h;
}

module.exports = {
  /**
   * Updates the content of the canvas. Since the draw function is not a loop it's triggered on dragging, writing and other user interactions.
   *
   * @param {object} evt -
   * @param {boolean} isMouse -
   * @param {boolean} renderOnlyTexts -
   */
  updateCanvas: function(evt, isMouse, renderOnlyTexts) {
    let mouseX;
    let mouseY;
    if (evt) {
      if (evt.touches) { mouseX = evt.touches[0].pageX; mouseY = evt.touches[0].pageY; } // touch
      if (evt.pageX) { mouseX = evt.pageX; mouseY = evt.pageY; } // mouse
      mouseX -= document.getElementById('container').offsetLeft;
      mouseY -= document.getElementById('container').offsetTop;
    }

    if (window.bg)
      window.p.image(window.bg, 0, 0, imgWidth, imgHeight);

    window.p.textAlign(window.p.CENTER);

    let leftOffset = 4;
    let topOffset = 11;

    window.p.stroke(0);
    window.p.strokeWeight(6);
    window.p.fill(255, 255, 255);

    const theTexts = this.vdTexts;
    const theFontsizes = this.vdFontSizes;
    this.vdBoxes.forEach(function(eachBox, i) {
      if (theTexts[i + 1] === '') return;

      window.p.textSize(Number(theFontsizes[i + 1]));
      let textWillMeasure = textHeight(theTexts[i + 1].toUpperCase(), eachBox.width, Number(theFontsizes[i + 1]));

      while (textWillMeasure > eachBox.height) {
        theFontsizes[i + 1] -= 1;
        window.p.textSize(Number(theFontsizes[i + 1]));
        textWillMeasure = textHeight(theTexts[i + 1].toUpperCase(), eachBox.width, Number(theFontsizes[i + 1]));
      }
      window.p.text(
        theTexts[i + 1].toUpperCase(),
        eachBox.left + leftOffset, eachBox.top + topOffset, eachBox.width, eachBox.height
      );
    });

    if (renderOnlyTexts) return;

    if (this.vdDragging) {
      var leftPos = (mouseX - this.draggingOffsetX);
      if (leftPos < 0) leftPos = 0;
      if (leftPos > imgWidth - this.vdBoxes[this.vdMightDrag].width) leftPos = imgWidth - this.vdBoxes[this.vdMightDrag].width;
      this.vdBoxes[this.vdMightDrag].left = leftPos;
      var topPos = (mouseY - this.draggingOffsetY);
      if (topPos < 0) topPos = 0;
      if (topPos > imgHeight - this.vdBoxes[this.vdMightDrag].height) topPos = imgHeight - this.vdBoxes[this.vdMightDrag].height;
      this.vdBoxes[this.vdMightDrag].top = topPos;
    }
    if (this.vdResizing) {
      let newHeight = this.vdBoxes[this.vdMightResize].height;
      let newLeft = this.vdBoxes[this.vdMightResize].left;
      let newTop = this.vdBoxes[this.vdMightResize].top;
      let newWidth = this.vdBoxes[this.vdMightResize].width;

      if (
        this.vdMightResizeCorner === 1 ||
        this.vdMightResizeCorner === 4 ||
        this.vdMightResizeCorner === 6
      ) {
        newWidth = this.vdInitialResizeWidth + (this.vdInitialResizePosX - mouseX);
        newLeft = mouseX;
        if (newLeft <= 0) { newLeft = 0; newWidth = this.vdBoxes[this.vdMightResize].width; }
      }

      if (
        this.vdMightResizeCorner === 1 ||
        this.vdMightResizeCorner === 2 ||
        this.vdMightResizeCorner === 3
      ) {
        newHeight = this.vdInitialResizeHeight + (this.vdInitialResizePosY - mouseY);
        newTop = mouseY;
      }

      if (
        this.vdMightResizeCorner === 3 ||
        this.vdMightResizeCorner === 5 ||
        this.vdMightResizeCorner === 8
      )
        newWidth = this.vdInitialResizeWidth + (mouseX - this.vdInitialResizePosX);
      if (
        this.vdMightResizeCorner === 6 ||
        this.vdMightResizeCorner === 7 ||
        this.vdMightResizeCorner === 8
      ) {
        newHeight = this.vdInitialResizeHeight + (mouseY - this.vdInitialResizePosY);
        while (newTop + newHeight > imgHeight) newHeight--;
      }

      // if (newLeft + newWidth > imgWidth) newWidth = imgWidth - newLeft;
      if (newTop <= 0) { newTop = 0; newHeight = this.vdBoxes[this.vdMightResize].height; }
      if (newHeight < 80) newHeight = 80;
      if (newWidth < 80) newWidth = 80;

      if (newHeight !== this.vdBoxes[this.vdMightResize].height)
        this.vdBoxes[this.vdMightResize].top = newTop;
      this.vdBoxes[this.vdMightResize].height = newHeight;
      this.vdBoxes[this.vdMightResize].left = newLeft;
      this.vdBoxes[this.vdMightResize].width = newWidth;
    }

    if (window.p)
      window.p.strokeWeight(1)

    let mightDrag = -1;
    let mightResize = -1;
    let resizeHandle = -1;
    const isDragging = this.vdDragging;
    const isResizing = this.vdResizing;

    if (
      true ||
      (
        mouseX > 0 && mouseX < imgWidth &&
        mouseY > 0 && mouseY < imgHeight
      ) || isResizing || isDragging
    )
      this.vdBoxes.forEach(function(eachBox, index) {
        window.p.stroke(255)
        window.p.fill(255, 255, 255, 0)

        window.p.rect(eachBox.left, eachBox.top, eachBox.width, eachBox.height);

        if (!isDragging || true) {
          window.p.stroke(0)
          window.p.fill(255, 255, 255)
          window.p.rect(eachBox.left - 6, eachBox.top - 6, 12, 12);
          window.p.rect(eachBox.left + eachBox.width / 2 - 6, eachBox.top - 6, 12, 12);
          window.p.rect(eachBox.left + eachBox.width - 6, eachBox.top - 6, 12, 12);
          window.p.rect(eachBox.left - 6, eachBox.top + eachBox.height / 2 - 6, 12, 12);
          window.p.rect(eachBox.left + eachBox.width - 6, eachBox.top + eachBox.height / 2 - 6, 12, 12);
          window.p.rect(eachBox.left - 6, eachBox.top + eachBox.height - 6, 12, 12);
          window.p.rect(eachBox.left + eachBox.width / 2 - 6, eachBox.top + eachBox.height - 6, 12, 12);
          window.p.rect(eachBox.left + eachBox.width - 6, eachBox.top + eachBox.height - 6, 12, 12);

          if (isMouse && !isResizing && mightResize === -1) {
            resizeHandle = utils.checkIfMightResize(evt, eachBox);
            if (resizeHandle > -1)
              mightResize = index;
          }
        }

        if (
          isMouse &&
          mightResize === -1 &&
          mouseX > eachBox.left &&
          mouseX < eachBox.left + eachBox.width &&
          mouseY > eachBox.top &&
          mouseY < eachBox.top + eachBox.height
        ) {
          mightDrag = index;
        }
      });
    if (!this.vdResizing) {
      this.vdMightResize = mightResize;
      this.vdMightResizeCorner = resizeHandle;
    }
    if (!this.vdDragging)
      this.vdMightDrag = mightDrag;
  },

  /**
   * Todo.
   */
  mtdAddText: function() {
    this.vdBoxes.push(JSON.parse(JSON.stringify(this.vdBoxModel)));
    this.vdBoxes[this.vdBoxes.length - 1].width = Math.floor(imgWidth * .8);
    this.vdBoxes[this.vdBoxes.length - 1].left = Math.floor((imgWidth - Math.floor(imgWidth * .8)) / 2);
    this.vdTexts.push('');
    this.vdFontSizes.push(46);
  },

  /**
  * Todo.
  */
  mtdShare: function() {
    if (!navigator.share) return;
    this.updateCanvas(null, null, true);

    this.vdSharing = true;

    const memeImg = this.vpMeme.img;
    const vueInstanceData = this._data;
    this.$nextTick(function() {
      var canvas = document.querySelector('#container canvas');

      canvas.toBlob(function(blob) {
        navigator.share({
          title: '',
          text: '',
          // files: [new File(['content'], 'sample1.txt', { type: 'text/plain' })],
          files: [
            new File([
              blob // the blob
            ], memeImg, { type: 'image/jpeg', lastModified: Date.now() })
          ],
        })
          .then(function() {
            vueInstanceData.vdSharing = false;
          })
          .catch(function(err) {
            console.log(err)
          });
      });
    });
  },

  /**
   * Download the meme as a file.
   */
  triggerDownload: function() {
    this.updateCanvas(null, null, true);
    if (this.vdPlatformOs === 'ios') {
      this.vdImage4DownloadIos = document.querySelector('#container canvas').toDataURL();

      this.vdShowDownloadForIos = 'none';
      return;
    }

    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    window.p.saveCanvas(result, 'jpg');
  },
};
