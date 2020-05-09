export default {
  props: {
    vpMeme: {
      required: true,
      type: Object,
    },
  },
  data: function() { // eslint-disable-line require-jsdoc
    return {
      vdBoxes: [],
      vdBoxModel: {
        left: -1,
        top: -1,
        width: 0,
        height: 80,
        fontSize: 46,
        fontFamily: 1,
        text: '',
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
      vdSharing: false,
      vdLoadedFonts: [],

      vdShowDownloadForIos: false,
      vdImage4DownloadIos: {},
    };
  },
  mounted: require('./vc-meme-editor__mounted'),
  methods: require('./vc-meme-editor__methods.js'),
};
