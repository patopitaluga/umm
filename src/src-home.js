import search from '../vue-components/vc-search/vc-search.vue';
import memelist from '../vue-components/vc-meme-list/vc-meme-list.vue';
var memes = require('../memes.js');

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
    var strFrequent = window.localStorage.getItem('memesd2_frequent');
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
    memeClicked: function(meme) {
      var arFrequent = [];
      var strFrequent = window.localStorage.getItem('memesd2_frequent');
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
        });
        window.localStorage.setItem('memesd2_frequent', JSON.stringify(arFrequent));
      }
      this.vdFrequent = arFrequent;
      // window.location.href = '/download/' + meme.img;

      var file_path = 'memes/' + meme.img;
      var a = document.createElement('A');
      a.href = file_path;
      a.style.display = 'block';
      a.style.overflow = 'hidden';
      a.style.width = '0';
      a.style.height = '0';
      a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  },
});
