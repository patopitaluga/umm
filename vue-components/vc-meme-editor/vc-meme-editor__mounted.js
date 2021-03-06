const utils = require('./vc-meme-editor__utils');

/**
 * Vue mounted function for this component.
 */
module.exports = function() {
  const containerWidth = document.querySelector('#container').offsetWidth;

  let boxes = [];
  if (typeof this.vpMeme.texts !== 'undefined') {
    this.vpMeme.texts.forEach(function(eachBoxText) {
      boxes.push(
        {
          left: (String(eachBoxText.left).indexOf('%') === -1) ? eachBoxText.left : containerWidth * eachBoxText.left.replace('%', '') / 100,
          top: (String(eachBoxText.top).indexOf('%') === -1) ? eachBoxText.top : containerWidth * eachBoxText.top.replace('%', '') / 100,
          height: 80,
          fontSize: ((eachBoxText.fontSize) ? eachBoxText.fontSize : 46),
          fontFamily: ((eachBoxText.fontFamily) ? eachBoxText.fontFamily : 1),
          width: ((eachBoxText.width) ? eachBoxText.width : null),
        }
      );
    });
  }
  this.vdBoxes = boxes;

  const vueInstanceData = this._data;
  const updateCanvas = this.updateCanvas;
  const thismemeImg = ((this.vpMeme.img.substr(0, 5) === 'data:') ? this.vpMeme.img : 'memes/' + this.vpMeme.img);
  const img = document.getElementById('img');
  img.onload = function() {
    imgWidth = this.width;
    imgHeight = this.height;
    if (imgWidth > containerWidth) {
      imgHeight = (containerWidth * imgHeight) / imgWidth;
      imgWidth = containerWidth;
      this.style.width = imgWidth + 'px';
    }
    this.style.display = 'none';

    new p5(function(p) {
      window.p = p;
      p.preload = function() {
        // vueInstanceData.vdLoadedFonts[1] = p.loadFont('impact.ttf');
        vueInstanceData.vdLoadedFonts[1] = p.loadFont('anton-regular.ttf');
        vueInstanceData.vdLoadedFonts[2] = p.loadFont('definitely-not-arial.ttf');
        window.bg = p.loadImage(thismemeImg);
      }
      p.setup = function() {
        p.createCanvas(imgWidth, imgHeight);

        if (vueInstanceData.vdBoxes.length === 0)
          vueInstanceData.vdBoxes.push(JSON.parse(JSON.stringify(vueInstanceData.vdBoxModel)));

        vueInstanceData.vdBoxes.forEach(function(eachBox) {
          eachBox.width = ((eachBox.width) ? containerWidth * String(eachBox.width).replace('%', '') / 100 : Math.floor(imgWidth * .8));
          if (eachBox.left === -1) eachBox.left = Math.floor((imgWidth - Math.floor(imgWidth * .8)) / 2);
          if (eachBox.top === -1) eachBox.top = imgHeight - 100;
        });
        p.noLoop();
      }

      /**
       * Triggered on mouse / tap press.
       *
       * @param {object} evt -
       */
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
          if (vueInstanceData.vdPlatformOs === 'ios' || vueInstanceData.vdPlatformOs === 'android')
            document.body.classList.add('body--prevent-scroll');

          vueInstanceData.draggingOffsetX = mouseX - vueInstanceData.vdBoxes[mightDrag].left;
          vueInstanceData.draggingOffsetY = mouseY - vueInstanceData.vdBoxes[mightDrag].top;
          vueInstanceData.vdDragging = true;
          return;
        }
        if (mightResize > -1) {
          if (vueInstanceData.vdPlatformOs === 'ios' || vueInstanceData.vdPlatformOs === 'android')
            document.body.classList.add('body--prevent-scroll');

          vueInstanceData.vdInitialResizeWidth = vueInstanceData.vdBoxes[mightResize].width,
          vueInstanceData.vdInitialResizeHeight = vueInstanceData.vdBoxes[mightResize].height,
          vueInstanceData.vdInitialResizePosX = mouseX,
          vueInstanceData.vdInitialResizePosY = mouseY,
          vueInstanceData.vdResizing = true;
        }
      }

      /**
       * Triggered on mouse / tap release.
       */
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
  img.src = thismemeImg;
};
