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
      vdBoxModel: {
        dragging: false,
        left: 0,
        top: 0,
        width: 0,
        height: 80,
        draggingOffsetX: 0,
        draggingOffsetY: 0,
      },
      vdMightDrag: false,
      vdDragging: false,
      vdPlatformOs: window.platformOs,
      vdPlatformName: window.platformName,
    };
  },
  mounted: function() {
    let feImagePath = 'memes/' + $_GET('i');

    let vueInstanceData = this._data;
    let img = document.getElementById('img');
    img.onload = function() {
      imgWidth = this.width;
      imgHeight = this.height;
      this.style.display = 'none';

      new p5(function(p) {
        let font1;
        let bg;

        vueInstanceData.vdBoxes.push(JSON.parse(JSON.stringify(vueInstanceData.vdBoxModel)));
        p.preload = function() {
          font1 = p.loadFont('anton-regular.ttf');
          bg = p.loadImage(feImagePath);
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
        }
        p.mousePressed = function() {
          let foundOne = false;
          for (let r = vueInstanceData.vdBoxes.length - 1; r >= 0; r--) {
            const eachBox = vueInstanceData.vdBoxes[r];
            if (foundOne) return;
            if (
              p.mouseX > eachBox.left &&
              p.mouseX < eachBox.left + eachBox.width &&
              p.mouseY > eachBox.top &&
              p.mouseY < eachBox.top + eachBox.height
            ) {
              foundOne = true;
              eachBox.dragging = true;
              eachBox.draggingOffsetX = p.mouseX - eachBox.left;
              eachBox.draggingOffsetY = p.mouseY - eachBox.top;
              vueInstanceData.vdDragging = true;
            }
          }
        }
        p.mouseReleased = function() {
          vueInstanceData.vdBoxes.forEach(function(eachBox) {
            eachBox.dragging = false;
          });
          vueInstanceData.vdDragging = false;
        }

        p.draw = function() {
          p.image(bg, 0, 0, imgWidth, imgHeight);

          p.strokeWeight(1)
          p.stroke(255)
          p.fill(255, 255, 255, 0)

          let mightDrag = false;
          vueInstanceData.vdBoxes.forEach(function(eachBox) {
            if (eachBox.dragging) {
              var leftPos = (p.mouseX - eachBox.draggingOffsetX);
              // if (leftPos < 0) leftPos = 0;
              // if (leftPos > imgWidth - eachBox.width) leftPos = imgWidth - eachBox.width;
              eachBox.left = leftPos;
              var topPos = (p.mouseY - eachBox.draggingOffsetY);
              // if (topPos < 0) topPos = 0;
              // if (topPos > imgHeight - eachBox.height) topPos = imgHeight - eachBox.height;
              eachBox.top = topPos;
            }

            mightDrag = (
              p.mouseX > eachBox.left &&
              p.mouseX < eachBox.left + eachBox.width &&
              p.mouseY > eachBox.top &&
              p.mouseY < eachBox.top + eachBox.height
            )

            if (
              p.mouseX > 0 && p.mouseX < imgWidth &&
              p.mouseY > 0 && p.mouseY < imgHeight
            )
              p.rect(eachBox.left, eachBox.top, eachBox.width, eachBox.height);


          });
          vueInstanceData.vdMightDrag = mightDrag;

          // p.filter(p.BLUR);
          p.textAlign(p.CENTER);
          p.textSize(46);

          let topOffset = 11;
          let leftOffset = 4;

          p.stroke(0);
          p.strokeWeight(6);
          p.fill(255, 255, 255);

          vueInstanceData.vdBoxes.forEach(function(eachBox, i) {
            p.text(vueInstanceData.vdTexts[i + 1].toUpperCase(), eachBox.left + leftOffset, eachBox.top + topOffset, eachBox.width, eachBox.height);
          });
        }

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
    mtdAddText: function() {
      this.vdBoxes.push(JSON.parse(JSON.stringify(this.vdBoxModel)));
      this.vdBoxes[this.vdBoxes.length - 1].width = Math.floor(imgWidth * .8);
      this.vdBoxes[this.vdBoxes.length - 1].left = Math.floor((imgWidth - Math.floor(imgWidth * .8)) / 2);
      this.vdTexts.push('');
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
