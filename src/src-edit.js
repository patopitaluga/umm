var platform = require('platform');

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
        p.mousePressed = function() {
          if (vueInstanceData.vdMightDrag > -1) {
            vueInstanceData.draggingOffsetX = p.mouseX - vueInstanceData.vdBoxes[vueInstanceData.vdMightDrag].left;
            vueInstanceData.draggingOffsetY = p.mouseY - vueInstanceData.vdBoxes[vueInstanceData.vdMightDrag].top;
            vueInstanceData.vdDragging = true;
          }
          if (vueInstanceData.vdMightResize > -1) {
            vueInstanceData.vdInitialResizeWidth = vueInstanceData.vdBoxes[vueInstanceData.vdMightResize].width,
            vueInstanceData.vdInitialResizeHeight = vueInstanceData.vdBoxes[vueInstanceData.vdMightResize].height,
            vueInstanceData.vdInitialResizePosX = p.mouseX,
            vueInstanceData.vdInitialResizePosY = p.mouseY,
            vueInstanceData.vdResizing = true;
          }
        }
        p.mouseReleased = function() {
          vueInstanceData.vdDragging = false;
          vueInstanceData.vdResizing = false;
        }

        p.draw = function() {
          p.image(window.bg, 0, 0, imgWidth, imgHeight);

          document.addEventListener('touchmove', updateCanvas, false);
          document.addEventListener('mousemove', updateCanvas, false);
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
    updateCanvas: function() {
      window.p.image(window.bg, 0, 0, imgWidth, imgHeight);

      if (this.vdDragging) {
        var leftPos = (window.p.mouseX - this.draggingOffsetX);
        if (leftPos < 0) leftPos = 0;
        if (leftPos > imgWidth - this.vdBoxes[this.vdMightDrag].width) leftPos = imgWidth - this.vdBoxes[this.vdMightDrag].width;
        this.vdBoxes[this.vdMightDrag].left = leftPos;
        var topPos = (window.p.mouseY - this.draggingOffsetY);
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
            this.vdInitialResizeWidth + (this.vdInitialResizePosX - window.p.mouseX);
          newLeft = window.p.mouseX;
        }

        if (
          this.vdMightResizeCorner === 1 ||
          this.vdMightResizeCorner === 2 ||
          this.vdMightResizeCorner === 3
        ) {
          newHeight =
            this.vdInitialResizeHeight + (this.vdInitialResizePosY - window.p.mouseY);
          newTop = window.p.mouseY;
        }

        if (
          this.vdMightResizeCorner === 3 ||
          this.vdMightResizeCorner === 5 ||
          this.vdMightResizeCorner === 8
        )
          newWidth =
            this.vdInitialResizeWidth + (window.p.mouseX - this.vdInitialResizePosX);
        if (
          this.vdMightResizeCorner === 6 ||
          this.vdMightResizeCorner === 7 ||
          this.vdMightResizeCorner === 8
        )
          newHeight = this.vdInitialResizeHeight + (window.p.mouseY - this.vdInitialResizePosY);

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

      window.p.strokeWeight(1)

      let mightDrag = -1;
      let mightResize = -1;
      let resizeHandle = -1;
      const isDragging = this.vdDragging;
      const isResizing = this.vdResizing;
      if (
        (
          window.p.mouseX > 0 && window.p.mouseX < imgWidth &&
          window.p.mouseY > 0 && window.p.mouseY < imgHeight
        ) || isResizing || isDragging
      )
        this.vdBoxes.forEach(function(eachBox, index) {
          window.p.stroke(255)
          window.p.fill(255, 255, 255, 0)

          window.p.rect(eachBox.left, eachBox.top, eachBox.width, eachBox.height);

          if (!isDragging) {
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

            if (!isResizing) {
              if (
                mightResize === -1 &&
                window.p.mouseX > eachBox.left - 6 && window.p.mouseX < eachBox.left - 6 + 12 &&
                window.p.mouseY > eachBox.top - 6 && window.p.mouseY < eachBox.top - 6 + 12
              ) {
                mightResize = index;
                resizeHandle = 1;
              }
              if (
                mightResize === -1 &&
                window.p.mouseX > eachBox.left + eachBox.width / 2 - 6 && window.p.mouseX < eachBox.left + eachBox.width / 2 - 6 + 12 &&
                window.p.mouseY > eachBox.top - 6 && window.p.mouseY < eachBox.top - 6 + 12
              ) {
                mightResize = index;
                resizeHandle = 2;
              }
              if (
                mightResize === -1 &&
                window.p.mouseX > eachBox.left + eachBox.width - 6 && window.p.mouseX < eachBox.left + eachBox.width - 6 + 12 &&
                window.p.mouseY > eachBox.top - 6 && window.p.mouseY < eachBox.top - 6 + 12
              ) {
                mightResize = index;
                resizeHandle = 3;
              }
              if (
                mightResize === -1 &&
                window.p.mouseX > eachBox.left - 6 && window.p.mouseX < eachBox.left - 6 + 12 &&
                window.p.mouseY > eachBox.top + eachBox.height / 2 - 6 && window.p.mouseY < eachBox.top + eachBox.height / 2 - 6 + 12
              ) {
                mightResize = index;
                resizeHandle = 4;
              }
              if (
                mightResize === -1 &&
                window.p.mouseX > eachBox.left + eachBox.width - 6 && window.p.mouseX < eachBox.left + eachBox.width - 6 + 12 &&
                window.p.mouseY > eachBox.top + eachBox.height / 2 - 6 && window.p.mouseY < eachBox.top + eachBox.height / 2 - 6 + 12
              ) {
                mightResize = index;
                resizeHandle = 5;
              }
              if (
                mightResize === -1 &&
                window.p.mouseX > eachBox.left - 6 && window.p.mouseX < eachBox.left - 6 + 12 &&
                window.p.mouseY > eachBox.top + eachBox.height - 6 && window.p.mouseY < eachBox.top + eachBox.height - 6 + 12
              ) {
                mightResize = index;
                resizeHandle = 6;
              }
              if (
                mightResize === -1 &&
                window.p.mouseX > eachBox.left + eachBox.width / 2 - 6 && window.p.mouseX < eachBox.left + eachBox.width / 2 - 6 + 12 &&
                window.p.mouseY > eachBox.top + eachBox.height - 6 && window.p.mouseY < eachBox.top + eachBox.height - 6 + 12
              ) {
                mightResize = index;
                resizeHandle = 7;
              }
              if (
                mightResize === -1 &&
                window.p.mouseX > eachBox.left + eachBox.width - 6 && window.p.mouseX < eachBox.left + eachBox.width - 6 + 12 &&
                window.p.mouseY > eachBox.top + eachBox.height - 6 && window.p.mouseY < eachBox.top + eachBox.height - 6 + 12
              ) {
                mightResize = index;
                resizeHandle = 8;
              }
            }
          }

          if (
            mightResize === -1 &&
            window.p.mouseX > eachBox.left &&
            window.p.mouseX < eachBox.left + eachBox.width &&
            window.p.mouseY > eachBox.top &&
            window.p.mouseY < eachBox.top + eachBox.height
          )
            mightDrag = index;
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
