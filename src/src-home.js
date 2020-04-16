import search from '../vue-components/vc-search/vc-search.vue';
import memelist from '../vue-components/vc-meme-list/vc-meme-list.vue';
var platform = require('platform');
const helpers = require('./helpers');

var memes = require('../memes.json');

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
    memelist,
    search,
  },
  data: function() { // eslint-disable-line require-jsdoc
    return {
      vdFrequent: [],
      vdMemeList: memes,
      vdRandomMemes: randomMemes,
    };
  },
  mounted: function() {
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
     *
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
  },
});
