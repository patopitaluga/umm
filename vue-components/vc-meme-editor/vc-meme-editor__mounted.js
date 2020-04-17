const utils = require('./vc-meme-editor__utils');

/**
 *
 */
module.exports = function() {
  const vueInstanceData = this._data;
  const updateCanvas = this.updateCanvas;
  const thismemeImg = this.vpMeme.img;
  const img = document.getElementById('img');
  img.onload = function() {
    imgWidth = this.width;
    imgHeight = this.height;
    this.style.display = 'none';

    new p5(function(p) {
      window.p = p;
      let font1;

      p.preload = function() {
        font1 = p.loadFont('anton-regular.ttf');
        window.bg = p.loadImage('memes/' + thismemeImg);
      }
      let textBox = document.getElementById('textbox');
      p.setup = function() {
        p.createCanvas(imgWidth, imgHeight);

        p.textFont(font1);

        if (vueInstanceData.vdBoxes.length === 0)
          vueInstanceData.vdBoxes.push(JSON.parse(JSON.stringify(vueInstanceData.vdBoxModel)));

        vueInstanceData.vdBoxes.forEach(function(eachBox) {
          eachBox.width = Math.floor(imgWidth * .8);
          if (eachBox.left === -1) eachBox.left = Math.floor((imgWidth - Math.floor(imgWidth * .8)) / 2);
          if (eachBox.top === -1) eachBox.top = imgHeight - 100;
        });
        p.noLoop();
      }

      const mPressed = function(evt) {
        let mouseX;
        let mouseY;
        if (evt.touches) { mouseX = evt.touches[0].pageX; mouseY = evt.touches[0].pageY; } // touch
        if (evt.pageX) { mouseX = evt.pageX; mouseY = evt.pageY; } // mouse
        mouseX -= document.getElementById('container').offsetLeft;
        mouseY -= document.getElementById('container').offsetTop;

        let resizeHandle = -1;
        let mightResize = -1;
        let mightDrag = -1;
        vueInstanceData.vdBoxes.forEach(function(eachBox, index) {
          if (resizeHandle !== -1) return;
          resizeHandle = utils.checkIfMightResize(evt, eachBox);
          if (resizeHandle > -1)
            mightResize = index;
        });
        vueInstanceData.vdBoxes.forEach(function(eachBox, index) {
          if (
            mightResize === -1 &&
            mouseX > eachBox.left &&
            mouseX < eachBox.left + eachBox.width &&
            mouseY > eachBox.top &&
            mouseY < eachBox.top + eachBox.height
          ) {
            mightDrag = index;
          }
        });

        vueInstanceData.vdMightResize = mightResize;
        vueInstanceData.vdMightResizeCorner = resizeHandle;
        vueInstanceData.vdMightDrag = mightDrag;

        if (mightDrag > -1) {
          document.body.classList.add('body--prevent-scroll');

          vueInstanceData.draggingOffsetX = mouseX - vueInstanceData.vdBoxes[mightDrag].left;
          vueInstanceData.draggingOffsetY = mouseY - vueInstanceData.vdBoxes[mightDrag].top;
          vueInstanceData.vdDragging = true;
          return;
        }
        if (mightResize > -1) {
          document.body.classList.add('body--prevent-scroll');

          vueInstanceData.vdInitialResizeWidth = vueInstanceData.vdBoxes[mightResize].width,
          vueInstanceData.vdInitialResizeHeight = vueInstanceData.vdBoxes[mightResize].height,
          vueInstanceData.vdInitialResizePosX = mouseX,
          vueInstanceData.vdInitialResizePosY = mouseY,
          vueInstanceData.vdResizing = true;
        }
      }

      const mReleased = function() {
        vueInstanceData.vdDragging = false;
        vueInstanceData.vdResizing = false;
        vueInstanceData.vdMightResize = -1;
        vueInstanceData.vdMightResizeCorner = -1;
        document.body.classList.remove('body--prevent-scroll');
      }

      p.draw = function() {
        p.image(window.bg, 0, 0, imgWidth, imgHeight);

        document.addEventListener('touchstart', mPressed, false);
        document.addEventListener('touchmove', updateCanvas, false);
        document.addEventListener('touchend', mReleased, false);

        document.addEventListener('mousedown', mPressed, false);
        document.addEventListener('mousemove', function(evt) { updateCanvas(evt, true); }, false);
        document.addEventListener('mouseup', mReleased, false);

        updateCanvas();
      }
    }, 'container');
  }
  img.src = 'memes/' + this.vpMeme.img;
};
