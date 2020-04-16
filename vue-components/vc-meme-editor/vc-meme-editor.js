export default {
  props: {
    vpMeme: {
      required: true,
      type: Object,
    },
  },
  data: function() { // eslint-disable-line require-jsdoc
    let boxes = [];
    if (typeof this.vpMeme.texts !== 'undefined') {
      this.vpMeme.texts.forEach(function(eachBoxText) {
        boxes.push(
          {
            left: eachBoxText.left,
            top: eachBoxText.top,
            height: 80,
          }
        );
      });
    }

    return {
      vdBoxes: boxes,
      vdTexts: function() { const a = [null, '']; for (let r = 0; r < boxes.length; r++) a.push(''); return a; }(),
      vdFontSizes: function() { const a = [null, 46]; for (let r = 0; r < boxes.length; r++) a.push(46); return a; }(),
      vdBoxModel: {
        left: -1,
        top: -1,
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
  mounted: require('./vc-meme-editor__mounted'),
  methods: require('./vc-meme-editor__methods.js'),
};
