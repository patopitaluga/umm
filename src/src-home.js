import search from '../vue-components/vc-search/vc-search.vue';
import memelist from '../vue-components/vc-meme-list/vc-meme-list.vue';
import memeeditor from '../vue-components/vc-meme-editor/vc-meme-editor.vue';

var platform = require('platform');
const helpers = require('./helpers');

var memes = require('../memes.json');

/**
 * Randomize the position of elements in a given array.
 *
 * @param {array} array -
 * @return {array}
 */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
let randomMemes = shuffle(memes);
randomMemes = randomMemes.slice(0, 8);

window.platformOs = helpers.$_GET('emu') || platform.os.family.toLowerCase();
window.platformName = platform.name.toLowerCase();

new Vue({
  el: '#app',
  components: {
    memeeditor,
    memelist,
    search,
  },
  data: function() { // eslint-disable-line require-jsdoc
    return {
      vdEditingMeme: false,
      vdMemeToEdit: {},
      vdDraggingFile: false,
      vdFrequent: [],
      vdMemeList: memes,
      vdRandomMemes: randomMemes,
    };
  },
  mounted: function() { // eslint-disable-line require-jsdoc
    var arFrequent = [];
    var strFrequent = window.localStorage.getItem('memesd6_frequent');
    if (strFrequent === null) strFrequent = '[]';
    try {
      arFrequent = JSON.parse(strFrequent);
    } catch (err) {
      arFrequent = [];
    }
    this.vdFrequent = arFrequent;
  },
  methods: {
    /**
     * Add meme to frequent list in localStorage.
     *
     * @param {object} meme -
     */
    addToFrequent: function(meme) {
      var arFrequent = [];
      var strFrequent = window.localStorage.getItem('memesd6_frequent');
      if (strFrequent === null) strFrequent = '[]';
      try {
        arFrequent = JSON.parse(strFrequent);
      } catch (err) {
        arFrequent = [];
      }
      var alreadyFrequent = false;
      arFrequent.forEach(function(eachFreq) {
        if (eachFreq.name === meme.name) alreadyFrequent = true;
      });
      if (!alreadyFrequent) {
        if (arFrequent.length > 5) arFrequent = arFrequent.slice(1, 4);
        arFrequent.push({
          'name': meme.name,
          'img': meme.img,
          'editable': meme.editable,
        });
        window.localStorage.setItem('memesd6_frequent', JSON.stringify(arFrequent));
      }
      arFrequent.forEach(function(eachFreq) {
        eachFreq.active = true;
      });
      // this.vdFrequent = arFrequent;
    },

    /**
     * Triggered when the user drops a file in the chat component.
     *
     * @param {object} e -
     */
    mtdFileDropped: function (e) {
      this.vdDraggingFile = false;
      const vueInstanceData = this._data;
      let droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return;

      var mtdUploadFile = this.mtdUploadFile;
      for (var i = 0; i < droppedFiles.length; i++) {
        var file = droppedFiles[i];
        let ext = file.name.slice(-4);

        var readerForFrontend = new FileReader();
        readerForFrontend.onload = function() {
          // const file = evtReaderForFrontend.target.result; // THE FILE 🤖

          // If it's an image.
          // Message types cheatsheet:
          // 1 Text, 2 Image, 3 Video, 4 Audio, 5 Document, 6 Goals Group
          // file.type might be absent, so we can't check file.type.match(/image*/)
          if (ext === 'jpeg') ext = '.jpg';
          if (
            ext === '.jpg' ||
            ext === '.gif' ||
            ext === '.png' ||
            ext === 'webp'
          ) {
            helpers.processImageFile(file,
              function(_imageAsDataUrl) {
                vueInstanceData.vdEditingMeme = true;
                vueInstanceData.vdMemeToEdit = {
                  img: _imageAsDataUrl,
                };
              }
            );
            return;
          }
          emitMessage({
            type: 5,
            isMine: true,
            file: file.name,
          }, true);
          mtdUploadFile(file);
        };
        readerForFrontend.readAsDataURL(file);
      }
    },
  },
});
