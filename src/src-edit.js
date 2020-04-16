var platform = require('platform');

/**
 * Since 100vh in mobile doesn't include brower bars this hack is helpful. See https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 */
function realVisualHeight() {
  let vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  vh = vh * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}
realVisualHeight();
window.addEventListener('resize', function() {
  realVisualHeight();
});
window.addEventListener('orientationchange', function() {
  realVisualHeight();
});

// alternative feImagePath = '$ { tplImagePath }';

/**
 * To read GET variables php style (kinda). Remember that this is a function, so it's not used $_GET[] but $_GET().
 *
 * @param {string} parameterName - The GET variable you're considering. E.g. if the url is sending ?q=1 you'll use $_GET('q').
 * @return {string|null} The value in that variable or null.
 */
var $_GET = function(parameterName) {
  /* global location*/
  var result = null;
  location.search
    .substr(1)
    .split('&')
    .forEach(function(foundGetVar) {
      var tmp = foundGetVar.split('=');
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
};

const littleSquareSize = 16;
const checkIfMightResize = function(evt, eachBox) {
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
};

window.platformOs = $_GET('emu') || platform.os.family.toLowerCase();
window.platformName = platform.name.toLowerCase();
let fileName = $_GET('i');

let imgWidth = 0;
let imgHeight = 0;

new Vue({
  el: '#app',
  data: function() { // eslint-disable-line require-jsdoc
    return {
      vdBoxes: [],
      vdTexts: [null, ''],
      vdFontSizes: [null, 46],
      vdBoxModel: {
        left: 0,
        top: 0,
        width: 0,
        height: 80,
      },
      vdMightDrag: -1,
      vdDragging: false,
      draggingOffsetX: 0,
      draggingOffsetY: 0,
      vdMightResize: -1,
      vdMightResizeCorner: -1,
      vdResizing: false,
      vdInitialResizeWidth: -1,
      vdInitialResizeHeight: -1,
      vdInitialResizePosX: -1,
      vdInitialResizePosY: -1,
      vdPlatformOs: window.platformOs,
      vdPlatformName: window.platformName,
      vdMovingMouse: 0,
    };
  },
  mounted: function() {
    let feImagePath = 'memes/' + $_GET('i');

    let vueInstanceData = this._data;
    let updateCanvas = this.updateCanvas;
    let img = document.getElementById('img');
    img.onload = function() {
      imgWidth = this.width;
      imgHeight = this.height;
      this.style.display = 'none';

      new p5(function(p) {
        window.p = p;
        let font1;

        vueInstanceData.vdBoxes.push(JSON.parse(JSON.stringify(vueInstanceData.vdBoxModel)));
        p.preload = function() {
          font1 = p.loadFont('anton-regular.ttf');
          window.bg = p.loadImage(feImagePath);
        }
        let textBox = document.getElementById('textbox');
        p.setup = function() {
          p.createCanvas(imgWidth, imgHeight);

          p.textFont(font1);

          vueInstanceData.vdBoxes.forEach(function(eachBox) {
            eachBox.width = Math.floor(imgWidth * .8);
            eachBox.left = Math.floor((imgWidth - Math.floor(imgWidth * .8)) / 2);
            eachBox.top = imgHeight - 100;
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
            resizeHandle = checkIfMightResize(evt, eachBox);
            if (resizeHandle > -1)
              mightResize = index;
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

        //p.mouseMoved = function() {
          //updateCanvas();
        //}

        document.getElementById('download-button').onclick = function() {
          var filePart = feImagePath.split('/');
          p.saveCanvas(filePart[filePart.length - 1]);
        };
      }, 'container');
    }
    img.src = feImagePath;
  },
  methods: {
    /**
     *
     */
    updateCanvas: function(evt, isMouse) {
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
          newWidth =
            this.vdInitialResizeWidth + (this.vdInitialResizePosX - mouseX);
          newLeft = mouseX;
        }

        if (
          this.vdMightResizeCorner === 1 ||
          this.vdMightResizeCorner === 2 ||
          this.vdMightResizeCorner === 3
        ) {
          newHeight =
            this.vdInitialResizeHeight + (this.vdInitialResizePosY - mouseY);
          newTop = mouseY;
        }

        if (
          this.vdMightResizeCorner === 3 ||
          this.vdMightResizeCorner === 5 ||
          this.vdMightResizeCorner === 8
        )
          newWidth =
            this.vdInitialResizeWidth + (mouseX - this.vdInitialResizePosX);
        if (
          this.vdMightResizeCorner === 6 ||
          this.vdMightResizeCorner === 7 ||
          this.vdMightResizeCorner === 8
        )
          newHeight = this.vdInitialResizeHeight + (mouseY - this.vdInitialResizePosY);

        if (newLeft <= 0) { newLeft = 0; newWidth = this.vdBoxes[this.vdMightResize].width; }
        if (newLeft + newWidth > imgWidth) newWidth = imgWidth - newLeft;
        if (newTop <= 0) { newTop = 0; newHeight = this.vdBoxes[this.vdMightResize].height; }
        if (newTop + newHeight > imgHeight) newHeight = imgHeight - newTop;
        if (newHeight < 0) newHeight = 0;
        if (newWidth < 0) newWidth = 0;

        this.vdBoxes[this.vdMightResize].height = newHeight;
        this.vdBoxes[this.vdMightResize].left = newLeft;
        this.vdBoxes[this.vdMightResize].top = newTop;
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
              resizeHandle = checkIfMightResize(evt, eachBox);
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

      // window.p.filter(window.p.BLUR);
      window.p.textAlign(window.p.CENTER);

      let leftOffset = 4;
      let topOffset = 11;

      window.p.stroke(0);
      window.p.strokeWeight(6);
      window.p.fill(255, 255, 255);

      const theTexts = this.vdTexts;
      const theFontsizes = this.vdFontSizes;
      this.vdBoxes.forEach(function(eachBox, i) {
        //let topOffset = eachBox.height / 2 + 18;
        window.p.textSize(Number(theFontsizes[i + 1]));
        window.p.text(theTexts[i + 1].toUpperCase(),
          eachBox.left + leftOffset, eachBox.top + topOffset, eachBox.width, eachBox.height
        );
      });
    },

    /**
     *
     */
    mtdAddText: function() {
      this.vdBoxes.push(JSON.parse(JSON.stringify(this.vdBoxModel)));
      this.vdBoxes[this.vdBoxes.length - 1].width = Math.floor(imgWidth * .8);
      this.vdBoxes[this.vdBoxes.length - 1].left = Math.floor((imgWidth - Math.floor(imgWidth * .8)) / 2);
      this.vdTexts.push('');
      this.vdFontSizes.push(46);
    },

    /**
     *
     */
    share: function() {
      if (!navigator.share) return;

      var canvas = document.querySelector('#container canvas');

      canvas.toBlob(function(blob) {
        navigator.share({
          title: '',
          text: '',
          // files: [new File(['content'], 'sample1.txt', { type: 'text/plain' })],
          files: [
            new File([
              blob // the blob
            ], fileName, { type: 'image/jpeg', lastModified: Date.now() })
          ],
        })
          .then(function() {
          })
          .catch(function(err) {
            console.log(err)
          });
      });
    },
  }
});
